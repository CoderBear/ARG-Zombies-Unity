//
//  ARManager.m
//  Unity-iPhone
//
//  Created by Mike on 12/17/10.
//  Copyright 2010 Prime31 Studios. All rights reserved.
//

#import "ARManager.h"


@implementation ARManager

@synthesize textureId = _textureId, width = _width, height = _height;

///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark NSObject

+ (ARManager*)sharedManager
{
	static ARManager *sharedManager = nil;
	
	if( !sharedManager )
		sharedManager = [[ARManager alloc] init];
	
	return sharedManager;
}


- (id)init
{
	// early out for no support
	if( ![ARManager isCaptureAvailable] )
		return nil;
	
	if( ( self = [super init] ) )
	{
		_textureId = -1;
	}
	return self;
}


///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark Public

+ (BOOL)isCaptureAvailable
{
	Class class = NSClassFromString( @"AVCaptureDevice" );
	NSArray *devices = [ARManager availableDevices];
	
	// we need a legit class and at least one device
	return ( class && devices.count );
}


+ (NSArray*)availableDevices
{
	return [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
}


- (void)startCameraCaptureWithDevice:(NSString*)deviceId lowQuality:(BOOL)useLowQuality
{
	if( session )
	{
		NSLog( @"camera capture already running" );
		return;
	}

	// Bind the texture name. 
	glBindTexture( GL_TEXTURE_2D, _textureId );
	
	// Set the texture parameters to use a minifying filter and a linear filter (weighted average)
	glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR );
	glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR );
	
	// This is necessary for non-power-of-two textures
	glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE );
	glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE );
	
	
	// Create the AVCapture Session
	session = [[AVCaptureSession alloc] init];
	
	// Get the default camera device
	AVCaptureDevice *camera = [AVCaptureDevice deviceWithUniqueID:deviceId];
	
	// Create a AVCaptureInput with the camera device
	NSError *error = nil;
	AVCaptureDeviceInput *cameraInput = [[AVCaptureDeviceInput alloc] initWithDevice:camera error:&error];
	if( cameraInput == nil )
	{
		NSLog( @"Error creating camera capture: %@", [error localizedDescription] );
		return;
	}
	
	if( [session canAddInput:cameraInput] )
		[session addInput:cameraInput];
	
	// Set the output
	AVCaptureVideoDataOutput *videoOutput = [[AVCaptureVideoDataOutput alloc] init];
	videoOutput.alwaysDiscardsLateVideoFrames = YES;
	
	if( [session canAddOutput:videoOutput] )
		[session addOutput:videoOutput];
	
	// create a queue to run the capture on
	dispatch_queue_t captureQueue = dispatch_queue_create( "com.prime31.captureQueue", NULL );
	
	// setup our delegate
	[videoOutput setSampleBufferDelegate:self queue:captureQueue];
	
	// configure the pixel format
	videoOutput.videoSettings = [NSDictionary dictionaryWithObject:[NSNumber numberWithUnsignedInt:kCVPixelFormatType_32BGRA] forKey:(id)kCVPixelBufferPixelFormatTypeKey];
	
	// and the size of the frames we want
	if( useLowQuality )
		[session setSessionPreset:AVCaptureSessionPresetLow];
	else
		[session setSessionPreset:AVCaptureSessionPresetMedium];
	
	// Start the session
	[session startRunning];		
}


- (void)stopCameraCapture
{
	_textureId = -1;
	
	[session stopRunning];
	[session release];
	session = nil;
}


- (void)setExposureMode:(AVCaptureExposureMode)exposureMode
{
	if( !session || session.inputs.count == 0 )
		return;
	
	AVCaptureDeviceInput *input = [session.inputs objectAtIndex:0];
	if( [input.device lockForConfiguration:nil] )
	{
		if( [input.device isExposureModeSupported:exposureMode] )
			input.device.exposureMode = exposureMode;
		[input.device unlockForConfiguration];
	}
}


- (void)setFocusMode:(AVCaptureFocusMode)focusMode
{
	if( !session || session.inputs.count == 0 )
		return;
	
	AVCaptureDeviceInput *input = [session.inputs objectAtIndex:0];
	if( [input.device lockForConfiguration:nil] )
	{
		if( [input.device isFocusModeSupported:focusMode] )
			input.device.focusMode = focusMode;
		[input.device unlockForConfiguration];
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark AVCaptureVideoDataOutputSampleBufferDelegate

- (void)captureOutput:(AVCaptureOutput*)captureOutput didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer fromConnection:(AVCaptureConnection*)connection
{
	static BOOL processing = NO;
	
	// only run if we're not already processing an image
	if( !processing && _textureId > 0 )
	{
		processing = YES;
		
		// this is the image buffer
		CVImageBufferRef cvimgRef = CMSampleBufferGetImageBuffer( sampleBuffer );
		
		// Lock the image buffer
		CVPixelBufferLockBaseAddress( cvimgRef, 0 );
		
		// access the data
		int width = CVPixelBufferGetWidth( cvimgRef );
		int height = CVPixelBufferGetHeight( cvimgRef );
		_width = width;
		_height = height;
		
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
		GLubyte *data = (GLubyte*)calloc( _width * _height * 4, sizeof(GLubyte) );
		
		// Uses the bitmap creation function provided by the Core Graphics framework. 
		context = CGBitmapContextCreate( data, _width, _height, 8, _width * 4, CGImageGetColorSpace( image ), kCGImageAlphaPremultipliedLast );
		
		// flip the image and rotate 90 degrees. we translate height AND width because we scale and rotate the image
		//CGContextTranslateCTM( context, _height, 0 );
		//CGContextRotateCTM( context, M_PI_2 );
		
		
		// After you create the context draw the image into it
		CGContextDrawImage( context, CGRectMake( 0.0, 0.0, (CGFloat)_width, (CGFloat)_height ), image );
		CGImageRelease( image );
		
		// we don't need the context at this point, so you need to release it to avoid memory leaks.
		CGContextRelease( context );
		
		dispatch_async( dispatch_get_main_queue(), ^{
			// Bind the texture 
			glBindTexture( GL_TEXTURE_2D, _textureId );
			
			// Specify a 2D texture image, providing the a pointer to the image data in memory
			glTexImage2D( GL_TEXTURE_2D, 0, GL_RGBA, _width, _height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data );
			
			// Release the image data
			free( data );
		});

		
		processing = NO;
	}
}

@end
