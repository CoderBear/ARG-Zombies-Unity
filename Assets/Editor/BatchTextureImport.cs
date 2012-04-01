using UnityEngine;
using UnityEditor;

// /////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Batch Texture import settings modifier.
//
// Modifies all selected textures in the project window and applies the requested modification on the
// textures. Idea was to have the same choices for multiple files as you would have if you open the
// import settings of a single texture. Put this into Assets/Editor and once compiled by Unity you find
// the new functionality in Custom -> Texture. Enjoy! :-)
//
// Based on the great work of benblo in this thread:
// http://forum.unity3d.com/viewtopic.php?t=16079&start=0&postdays=0&postorder=asc&highlight=textureimporter
//
// Developed by Martin Schultz, Decane in August 2009
// e-mail: ms@decane.net
//
// Updated for Unity 3.0 by col000r in August 2010
// http://col000r.blogspot.com
//
// Improved to change Texture type (Image, Bump, GUI, Reflection, Cookie, Lightmap, Advanced, GUI_FULL) in January 2011
//   GUI_FULL change: wrapMode = clamp, Scale=None
//   Save a lot of time working with GUI/HUD textures (Converting all textures to GUI in one time)     
//   Justo Salcedo
//
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
public class ChangeTextureImportSettingsUnity3 : ScriptableObject {
   
    [MenuItem ("Custom/Texture/Change Texture Type/GUI_FULL")]
    static void ChangeTextureType_GuiFull() {
        Object[] textures = GetSelectedTextures();
        Selection.objects = new Object[0];
        foreach (Texture2D texture in textures)  {
            string path = AssetDatabase.GetAssetPath(texture);
            //Debug.Log("path: " + path);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            textureImporter.textureType = TextureImporterType.GUI; 
            textureImporter.npotScale = TextureImporterNPOTScale.None;
            TextureImporterSettings st = new TextureImporterSettings();
            textureImporter.ReadTextureSettings(st);
            st.wrapMode = TextureWrapMode.Clamp;
            textureImporter.SetTextureSettings(st);
            AssetDatabase.ImportAsset(path);
        }
    }


    [MenuItem ("Custom/Texture/Change Texture Type/Image")]
    static void ChangeTextureType_Image() {
        SelectedChangeTextureTypeSettings(TextureImporterType.Image);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Type/Bump")]
    static void ChangeTextureType_Bump() {
        SelectedChangeTextureTypeSettings(TextureImporterType.Bump);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Type/GUI")]
    static void ChangeTextureType_GUI() {
        SelectedChangeTextureTypeSettings(TextureImporterType.GUI);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Type/Reflection")]
    static void ChangeTextureType_Reflection() {
        SelectedChangeTextureTypeSettings(TextureImporterType.Reflection);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Type/Cookie")]
    static void ChangeTextureType_Cookie() {
        SelectedChangeTextureTypeSettings(TextureImporterType.Cookie);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Type/Lightmap")]
    static void ChangeTextureType_Lightmap() {
        SelectedChangeTextureTypeSettings(TextureImporterType.Lightmap);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Type/Advanced")]
    static void ChangeTextureType_Advanced() {
        SelectedChangeTextureTypeSettings(TextureImporterType.Advanced);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/Auto Compressed")]
    static void ChangeTextureFormat_AutoCompressed() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.AutomaticCompressed);
    }

    [MenuItem ("Custom/Texture/Change Texture Format/Auto 16bit")]
    static void ChangeTextureFormat_Auto16Bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.Automatic16bit);
    }

    [MenuItem ("Custom/Texture/Change Texture Format/Auto Truecolor")]
    static void ChangeTextureFormat_AutoTruecolor() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.AutomaticTruecolor);
    }
       
    [MenuItem ("Custom/Texture/Change Texture Format/RGB Compressed DXT1")]
    static void ChangeTextureFormat_RGB_DXT1() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.DXT1);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/RGB Compressed DXT5")]
    static void ChangeTextureFormat_RGB_DXT5() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.DXT5);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/RGB 16 bit")]
    static void ChangeTextureFormat_RGB_16bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.RGB16);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/RGB 24 bit")]
    static void ChangeTextureFormat_RGB_24bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.RGB24);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/Alpha 8 bit")]
    static void ChangeTextureFormat_Alpha_8bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.Alpha8);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/ARGB 16 bit")]
    static void ChangeTextureFormat_RGBA_16bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.ARGB16);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/RGBA 32 bit")]
    static void ChangeTextureFormat_RGBA_32bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.RGBA32);
    }

    [MenuItem ("Custom/Texture/Change Texture Format/ARGB 32 bit")]
    static void ChangeTextureFormat_ARGB_32bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.ARGB32);
    }

    [MenuItem ("Custom/Texture/Change Texture Format/RGB PVRTC 2bit")]
    static void ChangeTextureFormat_RGB_PVRTC_2bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.PVRTC_RGB2);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/RGBA PVRTC 2bit")]
    static void ChangeTextureFormat_RGBA_PVRTC_2bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.PVRTC_RGBA2);
    }   

    [MenuItem ("Custom/Texture/Change Texture Format/RGB PVRTC 4bit")]
    static void ChangeTextureFormat_RGB_PVRTC_4bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.PVRTC_RGB4);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Format/RGBA PVRTC 4bit")]
    static void ChangeTextureFormat_RGBA_PVRTC_4bit() {
        SelectedChangeTextureFormatSettings(TextureImporterFormat.PVRTC_RGBA4);
    }
       
    // ----------------------------------------------------------------------------
   
    [MenuItem ("Custom/Texture/Change Texture Size/Change Max Texture Size/32")]
    static void ChangeTextureSize_32() {
        SelectedChangeMaxTextureSize(32);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Size/Change Max Texture Size/64")]
    static void ChangeTextureSize_64() {
        SelectedChangeMaxTextureSize(64);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Size/Change Max Texture Size/128")]
    static void ChangeTextureSize_128() {
        SelectedChangeMaxTextureSize(128);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Size/Change Max Texture Size/256")]
    static void ChangeTextureSize_256() {
        SelectedChangeMaxTextureSize(256);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Size/Change Max Texture Size/512")]
    static void ChangeTextureSize_512() {
        SelectedChangeMaxTextureSize(512);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Size/Change Max Texture Size/1024")]
    static void ChangeTextureSize_1024() {
        SelectedChangeMaxTextureSize(1024);
    }
   
    [MenuItem ("Custom/Texture/Change Texture Size/Change Max Texture Size/2048")]
    static void ChangeTextureSize_2048() {
        SelectedChangeMaxTextureSize(2048);
    }
   
    // ----------------------------------------------------------------------------
   
    [MenuItem ("Custom/Texture/Change MipMap/Enable MipMap")]
    static void ChangeMipMap_On() {
        SelectedChangeMimMap(true);
    }
   
    [MenuItem ("Custom/Texture/Change MipMap/Disable MipMap")]
    static void ChangeMipMap_Off() {
        SelectedChangeMimMap(false);
    }
   
    // ----------------------------------------------------------------------------


    [MenuItem ("Custom/Texture/Change Non Power of 2/None")]
    static void ChangeNPOT_None() {
        SelectedChangeNonPowerOf2(TextureImporterNPOTScale.None);
    }
 
    [MenuItem ("Custom/Texture/Change Non Power of 2/ToNearest")]
    static void ChangeNPOT_ToNearest() {
        SelectedChangeNonPowerOf2(TextureImporterNPOTScale.ToNearest);
    }
   
    [MenuItem ("Custom/Texture/Change Non Power of 2/ToLarger")]
    static void ChangeNPOT_ToLarger() {
       SelectedChangeNonPowerOf2(TextureImporterNPOTScale.ToLarger);
    }

    [MenuItem ("Custom/Texture/Change Non Power of 2/ToSmaller")]
    static void ChangeNPOT_ToSmaller() {
        SelectedChangeNonPowerOf2(TextureImporterNPOTScale.ToSmaller);
    }   
   
    // ----------------------------------------------------------------------------

    [MenuItem ("Custom/Texture/Change Is Readable/Enable")]
    static void ChangeIsReadable_Yes() {
        SelectedChangeIsReadable(true);
    }
 
    [MenuItem ("Custom/Texture/Change Is Readable/Disable")]
    static void ChangeIsReadable_No() {
        SelectedChangeIsReadable(false);
    } 
    [MenuItem ("Custom/Ansio/Set Ansio 0")]
    static void ChangeAnsio() {
    	SelectedChangeAnsio( 0 );
    }
    [MenuItem ("Custom/TextureMode/set texture clamp")]
    static void ChangeClamp(){
    	SelectedChangeClamp( true );
    }
    [MenuItem ("Custom/TextureMode/set texture repeat")]
    static void ChangeRepeat(){
    	SelectedChangeClamp( false );
    }
    
    // ----------------------------------------------------------------------------
	static void SelectedChangeClamp( bool clamp )
	{
		Object[] textures = GetSelectedTextures();
		Selection.objects = new Object[ 0 ];
		foreach (Texture2D texture in textures) 
		{
            string path = AssetDatabase.GetAssetPath(texture);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            if( clamp )
	            textureImporter.wrapMode = TextureWrapMode.Clamp;
	        else
	        	textureImporter.wrapMode = TextureWrapMode.Repeat;
            AssetDatabase.ImportAsset(path);
        }		
	}
   
   
    // ----------------------------------------------------------------------------

	static void SelectedChangeAnsio( int level )
	{
		Object[] textures = GetSelectedTextures();
		Selection.objects = new Object[ 0 ];
		foreach (Texture2D texture in textures)  {
            string path = AssetDatabase.GetAssetPath(texture);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            textureImporter.anisoLevel = 0;   
            AssetDatabase.ImportAsset(path);
        }		
	}


    static void SelectedChangeIsReadable(bool enabled) {
   
        Object[] textures = GetSelectedTextures();
        Selection.objects = new Object[0];
        foreach (Texture2D texture in textures)  {
            string path = AssetDatabase.GetAssetPath(texture);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            textureImporter.isReadable = enabled;   
            AssetDatabase.ImportAsset(path);
        }
    }


    static void SelectedChangeNonPowerOf2(TextureImporterNPOTScale npot) {
   
        Object[] textures = GetSelectedTextures();
        Selection.objects = new Object[0];
        foreach (Texture2D texture in textures)  {
            string path = AssetDatabase.GetAssetPath(texture);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            textureImporter.npotScale = npot;   
            AssetDatabase.ImportAsset(path);
        }
    }
   
    static void SelectedChangeMimMap(bool enabled) {
   
        Object[] textures = GetSelectedTextures();
        Selection.objects = new Object[0];
        foreach (Texture2D texture in textures)  {
            string path = AssetDatabase.GetAssetPath(texture);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            textureImporter.mipmapEnabled = enabled;   
            AssetDatabase.ImportAsset(path);
        }
    }
   
    static void SelectedChangeMaxTextureSize(int size) {
   
        Object[] textures = GetSelectedTextures();
        Selection.objects = new Object[0];
        foreach (Texture2D texture in textures)  {
            string path = AssetDatabase.GetAssetPath(texture);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            textureImporter.maxTextureSize = size;
            AssetDatabase.ImportAsset(path);
        }
    }
   
    static void SelectedChangeTextureFormatSettings(TextureImporterFormat newFormat) {
   
        Object[] textures = GetSelectedTextures();
        Selection.objects = new Object[0];
        foreach (Texture2D texture in textures)  {
            string path = AssetDatabase.GetAssetPath(texture);
            //Debug.Log("path: " + path);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            textureImporter.textureFormat = newFormat;
            AssetDatabase.ImportAsset(path);
        }
    }
   
     static void SelectedChangeTextureTypeSettings(TextureImporterType newType) {
   
        Object[] textures = GetSelectedTextures();
        Selection.objects = new Object[0];
        foreach (Texture2D texture in textures)  {
            string path = AssetDatabase.GetAssetPath(texture);
            //Debug.Log("path: " + path);
            TextureImporter textureImporter = AssetImporter.GetAtPath(path) as TextureImporter;
            textureImporter.textureType = newType;
            AssetDatabase.ImportAsset(path);
        }
    }
   
    static Object[] GetSelectedTextures()
    {
        return Selection.GetFiltered(typeof(Texture2D), SelectionMode.DeepAssets);
    }
}
