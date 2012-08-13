//
//  VideoTextureManager.m
//  VideoTextureTest
//
//  Created by Mike DeSaro on 8/22/11.
//  Copyright (c) 2011 __MyCompanyName__. All rights reserved.
//

#import "VideoTextureManager.h"


void UnitySendMessage( const char * className, const char * methodName, const char * param );


@implementation VideoTextureManager

@synthesize reader, readerThreadCondition, shouldContinueProcessing, textureId, loop;

///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark NSObject

+ (VideoTextureManager*)sharedManager
{
	static VideoTextureManager *sharedSingleton;
	
	if( !sharedSingleton )
		sharedSingleton = [[VideoTextureManager alloc] init];
	
	return sharedSingleton;
}


///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark Private

- (void)processVideoFrame:(CVImageBufferRef)cvimgRef
{
	// actual pixel buffer size debug
	if( NO )
	{
		int width = CVPixelBufferGetWidth( cvimgRef );
		int height = CVPixelBufferGetHeight( cvimgRef );
		NSLog( @"pixel buffer width: %d, height: %d", width, height );
	}
	
	// access the data
	int width = CVPixelBufferGetWidth( cvimgRef );
	int height = CVPixelBufferGetHeight( cvimgRef );
	
	// get the raw image bytes
	uint8_t *buf = (uint8_t*)CVPixelBufferGetBaseAddress( cvimgRef );
	size_t bprow = CVPixelBufferGetBytesPerRow( cvimgRef );
	
	// turn it into something useful
	CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
	CGContextRef context = CGBitmapContextCreate( buf, width, height, 8, bprow, colorSpace, kCGBitmapByteOrder32Little | kCGImageAlphaNoneSkipFirst );
	
	CGImageRef image = CGBitmapContextCreateImage( context );
	CGContextRelease( context );
	CGColorSpaceRelease( colorSpace );
	

	// START CGIMAGE CREATION
	// Allocated memory needed for the bitmap context
	GLubyte *data = (GLubyte*)calloc( width * height * 4, sizeof(GLubyte) );
	
	// Uses the bitmap creation function provided by the Core Graphics framework. 
	context = CGBitmapContextCreate( data, width, height, 8, width * 4, CGImageGetColorSpace( image ), kCGImageAlphaPremultipliedLast );
	
	// flip the image and rotate 90 degrees. we translate height AND width because we scale and rotate the image
	//CGContextTranslateCTM( context, height, 0 );
	//CGContextRotateCTM( context, M_PI_2 );
	
	
	// After you create the context draw the image into it
	CGContextDrawImage( context, CGRectMake( 0.0, 0.0, (CGFloat)width, (CGFloat)height ), image );
	CGImageRelease( image );
	
	// we don't need the context at this point, so you need to release it to avoid memory leaks.
	CGContextRelease( context );
	
	dispatch_async( dispatch_get_main_queue(), ^{
		// Bind the texture 
		glBindTexture( GL_TEXTURE_2D, textureId );
		
		// Specify a 2D texture image, providing the a pointer to the image data in memory
		glTexImage2D( GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data );
		
		// Release the image data
		free( data );
	});
}



///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark Public

- (void)startPlayback:(NSString*)path
{
	// Unity created a new texture for us so change a couple settings on it
	glBindTexture( GL_TEXTURE_2D, textureId );
	
	// this is necessary for non-power-of-two textures
	glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR );
	glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR );
	glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE );
	glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE );
	
	
	// setup our Assets options
	NSDictionary *options = [NSDictionary dictionaryWithObject:[NSNumber numberWithBool:NO]
														forKey:AVURLAssetPreferPreciseDurationAndTimingKey];
	
	AVURLAsset *asset = [AVURLAsset URLAssetWithURL:[NSURL fileURLWithPath:path] options:options];
	if( !asset )
	{
		NSLog( @"couldn't find asset: %@", path );
		return;
	}
	
	// load the asset track's information
	[asset loadValuesAsynchronouslyForKeys:[NSArray arrayWithObject:@"tracks"] completionHandler:^
	{
		[self performSelectorInBackground:@selector(processAsset:) withObject:asset];
	}]; // end load tracks async
}


- (void)processAsset:(AVURLAsset*)asset
{
	NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
	
	// make sure the tracks were loaded 
	NSError *error = nil;
	AVKeyValueStatus trackStatus = [asset statusOfValueForKey:@"tracks" error:&error];
	if( error || trackStatus != AVKeyValueStatusLoaded )
	{
		NSLog( @"could not load track status: %@", error );
		return;
	}
	
	// get the video length
	NSTimeInterval videoDuration = CMTimeGetSeconds( asset.duration );
	NSLog( @"videoDuration: %f", videoDuration );
	
	// get the dimensions
	videoDimensions = asset.naturalSize;
	
	// grab the video tracks and make sure we have at least one
	NSArray *tracks = [asset tracksWithMediaType:AVMediaTypeVideo];
	if( tracks.count == 0 )
	{
		NSLog( @"no video tracks found in the asset" );
		return;
	}
	
	// create our asset reader
	reader = [[AVAssetReader alloc] initWithAsset:asset error:&error];
	if( error )
	{
		NSLog( @"error creating AssetReader: %@", error );
		return;
	}
	
	// alternatively apply a timerange
	//reader.timeRange = CMTimeRangeMake( kCMTimeZero, asset.duration );
	
	// create our output handler
	NSDictionary *settings = [NSDictionary dictionaryWithObject:[NSNumber numberWithInt:kCVPixelFormatType_32BGRA] forKey:(NSString*)kCVPixelBufferPixelFormatTypeKey]; // AVVideoSettings.h
	
	AVAssetReaderTrackOutput *output = [AVAssetReaderTrackOutput assetReaderTrackOutputWithTrack:[tracks objectAtIndex:0]
																				  outputSettings:settings];
	
	if( !output )
	{
		NSLog( @"could not create AVAssetReaderTrackOutput" );
		return;
	}
	
	// assign the output handler to the reader
	[reader addOutput:output];
	
	// start reading
	if( ![reader startReading] )
	{
		NSLog( @"couldn't start reading: %@", reader.error );
		return;
	}
	
	
	// shoot off a message so Unity knows we are rolling
	UnitySendMessage( "ARManager", "videoDidStart", "" );
	shouldContinueProcessing = YES;
	
	CMSampleBufferRef sample = [output copyNextSampleBuffer];
	
	
	// time state for rendering and actual
	BOOL shouldProcessFrame = YES;
	BOOL alwaysPlayNextFrame = NO;
	CFAbsoluteTime renderStartTime;
	Float64 lastFrameTime;
	
	
	while( sample != NULL )
	{
		[readerThreadCondition lock];
		
		// pause the thread if we are told to do so by the main thread
		while( !shouldContinueProcessing )
		{
			[readerThreadCondition wait];
			
			// if we paused, ensure we always show the next frame
			alwaysPlayNextFrame = YES;
		}
		
		
		// how long did it take to render the last frame?
		CFAbsoluteTime renderTime = CFAbsoluteTimeGetCurrent() - renderStartTime;
		//NSLog( @"renderTime: %f", renderTime );
		
		// what is the actual presentation time of the frame?
		CMTime presentationTime = CMSampleBufferGetPresentationTimeStamp( sample );
		Float64 actualTime = CMTimeGetSeconds( presentationTime );
		lastFrameTime = actualTime - lastFrameTime;
		//NSLog( @"lastFrameTime: %f", lastFrameTime );
		
		
		// only bother to check if we should skip a frame or sleep if we are not hardcoded to play this frame (after a skip or pause)
		if( !alwaysPlayNextFrame )
		{
			// should we skip a frame or sleep?
			if( lastFrameTime < actualTime )
			{
				useconds_t sleepTime = ( lastFrameTime - renderTime ) * 1000000;
				if( sleepTime > 0 )
				{
					usleep( sleepTime );
					//NSLog( @"sleep for %u", sleepTime );
				}
			}
			else
			{
				NSLog( @"skip a frame. lastFrameTime: %f, actualTime: %f", lastFrameTime, actualTime );
				
				// if we skip a frame, ensure we always show the next frame
				alwaysPlayNextFrame = YES;
			}
		}
		else
		{
			// reset to normal state of processing the next frame without forcing it
			shouldProcessFrame = YES;
			alwaysPlayNextFrame = NO;
			NSLog( @"forcing the next frame to render" );
		}
		
		// set the lastFrameTime now that we no longer need both values
		lastFrameTime = actualTime;
		
		
		
		// only process the frame if we should
		if( shouldProcessFrame )
		{
			CVImageBufferRef imageBuffer = CMSampleBufferGetImageBuffer( sample );
			
			// Lock the image buffer
			CVPixelBufferLockBaseAddress( imageBuffer, 0 );

			[self processVideoFrame:imageBuffer];
			//[self performSelectorOnMainThread:@selector(processVideoFrame:) withObject:(NSObject*)imageBuffer waitUntilDone:YES];
			
			// We unlock the image buffer
			CVPixelBufferUnlockBaseAddress( imageBuffer, 0 );
		}
		shouldProcessFrame = YES;
		
		
		// done with the sample
		CFRelease( sample );
		
		// break out of the loop if we cancelled
		if( reader.status == AVAssetReaderStatusCancelled || reader.status == AVAssetReaderStatusFailed )
			break;
		
		// store the start render time
		renderStartTime = CFAbsoluteTimeGetCurrent();
		
		sample = [output copyNextSampleBuffer];
		
		[readerThreadCondition unlock];
	}
	
	// release our condition and reader
	self.readerThreadCondition = nil;
	self.reader = nil;
	
	if( self.loop )
		[self processAsset:asset];
	else
		UnitySendMessage( "ARManager", "videoDidFinish", "" );
	
	[pool drain];
}


- (void)pause
{
	shouldContinueProcessing = NO;
	[readerThreadCondition lock];
}


- (void)unpause
{
	shouldContinueProcessing = YES;
	[readerThreadCondition signal];
	[readerThreadCondition unlock];
}


- (void)play
{
	// guard against being played twice
	if( readerThreadCondition || reader )
		return;
	
	readerThreadCondition = [[NSCondition alloc] init];
	
	NSString *path = [[NSBundle mainBundle] pathForResource:@"vid.mov" ofType:nil];
	//NSString *path = [[NSBundle mainBundle] pathForResource:@"vid2.m4v" ofType:nil];
	[self startPlayback:path];
}


- (void)stopAndCancel
{
	if( reader && reader.status == AVAssetReaderStatusReading )
	{
		self.loop = NO;
		[reader cancelReading];
	}
}


@end
