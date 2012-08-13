//
//  ARManager.h
//  Unity-iPhone
//
//  Created by Mike on 12/17/10.
//  Copyright 2010 Prime31 Studios. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <OpenGLES/ES1/gl.h>
#import <OpenGLES/ES1/glext.h>


@interface ARManager : NSObject <AVCaptureVideoDataOutputSampleBufferDelegate>
{
	AVCaptureSession *session;
	
	GLuint _textureId;
	int _width;
	int _height;
}
@property (nonatomic, assign) GLuint textureId;
@property (nonatomic, assign) int width;
@property (nonatomic, assign) int height;


+ (ARManager*)sharedManager;

+ (BOOL)isCaptureAvailable;

+ (NSArray*)availableDevices;


- (void)startCameraCaptureWithDevice:(NSString*)deviceId lowQuality:(BOOL)useLowQuality;

- (void)stopCameraCapture;

- (void)setExposureMode:(AVCaptureExposureMode)exposureMode;

- (void)setFocusMode:(AVCaptureFocusMode)focusMode;

@end