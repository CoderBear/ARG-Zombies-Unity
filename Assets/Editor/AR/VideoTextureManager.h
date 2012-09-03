//
//  VideoTextureManager.h
//  VideoTextureTest
//
//  Created by Mike DeSaro on 8/22/11.
//  Copyright (c) 2011 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#include <AVFoundation/AVFoundation.h>
#import <OpenGLES/ES1/gl.h>
#import <OpenGLES/ES1/glext.h>


@interface VideoTextureManager : NSObject
{
	CGSize videoDimensions;
}

@property (nonatomic, retain) AVAssetReader *reader;
@property (nonatomic, retain) NSCondition *readerThreadCondition;
@property (nonatomic, assign) BOOL shouldContinueProcessing;
@property (nonatomic, assign) GLuint textureId;
@property (nonatomic, assign) BOOL loop;


+ (VideoTextureManager*)sharedManager;


- (void)startPlayback:(NSString*)path;

- (void)pause;

- (void)unpause;

- (void)play;

- (void)stopAndCancel;


@end
