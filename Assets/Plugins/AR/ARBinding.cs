using UnityEngine;
using System;
using System.Collections;
using System.Runtime.InteropServices;


public enum ARQuality
{
	Low,
	High
}

public enum ARExposureMode
{
	Locked = 0,
	AutoExpose = 1,
	ContinuousAutoExposure = 2,
}

public enum ARFocusMode
{
	Locked = 0,
	AutoFocus = 1,
	ContinuousAutoFocus = 2,
}


public class ARBinding
{
    [DllImport("__Internal")]
    private static extern bool _arIsCaptureAvailable();
 
	// Checks to see if the device has a supported camera and the proper iOS version
    public static bool isCaptureAvailable()
    {
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			return _arIsCaptureAvailable();
		return false;
    }
    
    
    [DllImport("__Internal")]
    private static extern void _arStartCameraCapture( bool useFrontCameraIfAvailable, bool useLowQuality, int textureId );

	// Starts the camera capture and returns a Texture2D that will have the camera output as it's content
    public static Texture2D startCameraCapture( bool useFrontCameraIfAvailable, ARQuality quality )
    {
    	// we need to figure out the actual size of the texture based on the device and camera
		// Preset	3G			3GS			4 back		4 front		iPad 2
		// High		400x304		640x480		1280x720	640x480		640x480
		// Medium	400x304		480x360		480x360		480x360		480x360
		// Low		400x306		192x144		192x144		192x144		192x144
		// 640x480	NA			640x480		640x480		640x480		640x480
    	
    	int width = 0, height = 0;
    	bool useLowQuality = quality == ARQuality.Low;
    	
    	if( iPhoneSettings.generation == iPhoneGeneration.iPhone3G )
    	{
    		width = 400;
    		height = useLowQuality ? 306 : 304;
    	}
    	else if( iPhoneSettings.generation == iPhoneGeneration.iPhone3GS )
    	{
    		width = useLowQuality ? 192 : 480;
    		height = useLowQuality ? 144 : 360;
    	}
    	else if( iPhoneSettings.generation == iPhoneGeneration.iPhone4 || iPhoneSettings.generation == iPhoneGeneration.iPodTouch4Gen )
    	{
    		if( useFrontCameraIfAvailable )
			{
	    		width = useLowQuality ? 192 : 480;
	    		height = useLowQuality ? 144 : 360;
			}
			else
			{
	    		width = useLowQuality ? 192 : 480;
	    		height = useLowQuality ? 144 : 360;
			}
    	}
    	else if( iPhoneSettings.generation == iPhoneGeneration.Unknown && ( Screen.width == 1024 || Screen.height == 1024 ) ) // ghetto iPad 2 detection
    	{
    		if( useFrontCameraIfAvailable )
			{
	    		width = useLowQuality ? 192 : 480;
	    		height = useLowQuality ? 144 : 360;
			}
			else
			{
	    		width = useLowQuality ? 192 : 480;
	    		height = useLowQuality ? 144 : 360;
			}
    	}
    	else // fallback to catch unknown devices
    	{
    		if( useFrontCameraIfAvailable )
			{
	    		width = useLowQuality ? 192 : 480;
	    		height = useLowQuality ? 144 : 360;
			}
			else
			{
	    		width = useLowQuality ? 192 : 480;
	    		height = useLowQuality ? 144 : 360;
			}
    	}
    	
        // Create texture that will be updated in the plugin code
		Texture2D texture = new Texture2D( width, height, TextureFormat.ARGB32, false );
		
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			_arStartCameraCapture( useFrontCameraIfAvailable, useLowQuality, texture.GetNativeTextureID() );
		
		return texture;
    }
    
    
    [DllImport("__Internal")]
    private static extern void _arStopCameraCapture();
 
	// Stops the camera capture
    public static void stopCameraCapture()
    {
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			_arStopCameraCapture();
    }
	
	
	// Updates the materials UV offset to accommodate the texture being placed into the next biggest power of 2 container
	public static void updateMaterialUVScaleForTexture( Material material, Texture2D texture )
	{
		Vector2 textureOffset = new Vector2( (float)texture.width / (float)nearestPowerOfTwo( texture.width ), (float)texture.height / (float)nearestPowerOfTwo( texture.height ) );
		material.mainTextureScale = textureOffset;
	}
	
	
	private static int nearestPowerOfTwo( float number )
	{
		int n = 1;
		
		while( n < number )
			n <<= 1;

		return n;
	}
	
	
    [DllImport("__Internal")]
    private static extern void _arSetExposureMode( int exposureMode );
 
	// Sets the exposure mode.  Capture must be started for this to work!
    public static void setExposureMode( ARExposureMode mode )
    {
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			_arSetExposureMode( (int)mode );
    }
    
    
    [DllImport("__Internal")]
    private static extern void _arSetFocusMode( int focusMode );
 
	// Sets the focus mode.  Capture must be started for this to work!
    public static void setFocusMode( ARFocusMode mode )
    {
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			_arSetFocusMode( (int)mode );
    }
   
	
	#region Video Texture methods
	
    [DllImport("__Internal")]
    private static extern void _arStartVideoTexturePlayback( string filename, int textureId, bool shouldLoop );

	// Starts 
    public static Texture2D startVideoTexturePlayback( string filename, int width, int height, bool shouldLoop )
    {
        // Create texture that will be updated in the plugin code
		Texture2D texture = new Texture2D( width, height, TextureFormat.ARGB32, false );
    
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			_arStartVideoTexturePlayback( filename, texture.GetNativeTextureID(), shouldLoop );
		
		return texture;
    }

    
    [DllImport("__Internal")]
    private static extern void _arPauseVideoTexturePlayback();
 
	// Pauses the video texture
    public static void pauseVideoTexture()
    {
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			_arPauseVideoTexturePlayback();
    }

    
    [DllImport("__Internal")]
    private static extern void _arUnpauseVideoTexturePlayback();
 
	// Unpauses the video texture
    public static void unpauseVideoTexture()
    {
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			_arUnpauseVideoTexturePlayback();
    }

    
    [DllImport("__Internal")]
    private static extern void _arStopVideoTexturePlayback();
 
	// Stops and releases the video texture player.  You must destroy the Texture2D after calling this method.
    public static void stopVideoTexture()
    {
        if( Application.platform == RuntimePlatform.IPhonePlayer )
			_arStopVideoTexturePlayback();
    }
		
	#endregion

}
