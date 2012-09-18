//
//  ARBinding.m
//  Unity-iPhone
//
//  Created by Mike on 12/16/10.
//  Copyright 2010 Prime31 Studios. All rights reserved.
//

#import "ARManager.h"
#import "VideoTextureManager.h"


// Converts C style string to NSString
#define GetStringParam( _x_ ) ( _x_ != NULL ) ? [NSString stringWithUTF8String:_x_] : [NSString stringWithUTF8String:""]



bool _arIsCaptureAvailable()
{
	return [ARManager isCaptureAvailable];
}


void _arStartCameraCapture( bool useFrontCameraIfAvailable, bool useLowQuality, int textureId )
{
	NSArray *devices = [ARManager availableDevices];
	NSString *deviceId;
	
	// Locate our deviceId
	for( AVCaptureDevice *device in devices )
	{
		// do we just want the standard camera or the front?
		if( useFrontCameraIfAvailable && device.position == AVCaptureDevicePositionFront )
		{
			deviceId = device.uniqueID;
			break;
		}
		else if( device.position == AVCaptureDevicePositionBack )
		{
			deviceId = device.uniqueID;
		}
	}
	
	if( !deviceId )
		return;
	
	[ARManager sharedManager].textureId = (GLuint)textureId;
	[[ARManager sharedManager] startCameraCaptureWithDevice:deviceId lowQuality:useLowQuality];
}


void _arStopCameraCapture()
{
	[[ARManager sharedManager] stopCameraCapture];
}


void _arSetExposureMode( int exposureMode )
{
	[[ARManager sharedManager] setExposureMode:exposureMode];
}


void _arSetFocusMode( int focusMode )
{
	[[ARManager sharedManager] setFocusMode:focusMode];
}


// video texture methods
void _arStartVideoTexturePlayback( const char * filename, int textureId, bool shouldLoop )
{
	NSString *path = GetStringParam( filename );
	
	// if the url starts with '/' then use it directly else get the bundle path
	if( ![[path substringToIndex:1] isEqualToString:@"/"] )
		path = [[NSBundle mainBundle] pathForResource:path ofType:nil];
	
	[VideoTextureManager sharedManager].textureId = (GLuint)textureId;
	[VideoTextureManager sharedManager].loop = shouldLoop;
	[[VideoTextureManager sharedManager] startPlayback:path];
}


void _arPauseVideoTexturePlayback()
{
	[[VideoTextureManager sharedManager] pause];
}


void _arUnpauseVideoTexturePlayback()
{
	[[VideoTextureManager sharedManager] unpause];
}


void _arStopVideoTexturePlayback()
{
	[[VideoTextureManager sharedManager] stopAndCancel];
}
