using UnityEngine;
using UnityEditor;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;


public class P31MenuItem : MonoBehaviour
{

	[MenuItem( "Prime31/Documentation site..." )]
	static void documentationSite()
	{
		openURL( "http://prime31.com/unity/docs/" );
	}
	
	
	[MenuItem( "Prime31/Plugin site..." )]
	static void pluginSite()
	{
		openURL( "http://prime31.com/unity" );
	}

	
	[MenuItem( "Prime31/Contact form..." )]
	static void contactForm()
	{
		openURL( "http://prime31.com/contactUs" );
	}
	
	
	[MenuItem( "Prime31/Info.plist additions..." )]
	static void plistAdditions()
	{
		Prime31PlistHelperWizard.CreateWizard();
	}

	
	[MenuItem( "Prime31/Prompt After Plugin Install/Enable" )]
	static void enablePrompt()
	{
		enablePromptAfterInstall( true );
	}
	
	
	[MenuItem( "Prime31/Prompt After Plugin Install/Disable" )]
	static void disablePrompt()
	{
		enablePromptAfterInstall( false );
	}


	[MenuItem( "Prime31/Open Xcode project..." )]
	static void openXcodeProject()
	{
		// find the Xcode project file
		string path = Environment.CurrentDirectory;
		DirectoryInfo dirInfo = new DirectoryInfo( path );
		
		// dont care about these directories
		string[] invalidDirs = new string[] { "Assets", "Temp", "Library" };
		
		var possibleProjectDirs = from dir in dirInfo.GetDirectories()
									where !( (IList<string>)invalidDirs ).Contains( dir.Name )
									select dir;
		
		foreach( var dir in possibleProjectDirs )
		{
			// check the dir for "Unity-iPhone.xcodeproj"
			var possibleDir = new DirectoryInfo( dir.FullName );
			var projectFile = possibleDir.GetDirectories( "Unity-iPhone.xcodeproj" );
			
			if( projectFile.Length > 0 )
			{
				openURL( projectFile[0].FullName );
				break;
			}
		}
	}
	
 
	public static void openURL( string url )
	{
	    try
	    {
            ProcessStartInfo pInfo = new ProcessStartInfo( "open", url );
            Process.Start( pInfo );
	    }
	    catch( Exception e )
	    {
			UnityEngine.Debug.Log( String.Format( "Error occurred when trying to open URL {0}. Error: {1}", url, e.Message ) );
	    }
	}
	
	
	public static void enablePromptAfterInstall( bool enable )
	{
		// find all the config.plist files in plugin directories
		string basePath = Path.Combine( Application.dataPath, "Editor" );
		var dirInfo = new DirectoryInfo( basePath );
		
		var pluginDirs = from dir in dirInfo.GetDirectories()
							let files = dir.GetFiles( "config.plist" )
							where files.Length == 1
							select files[0];
		
		// loop through our pluginDirs
		foreach( var dir in pluginDirs )
		{
			if( !File.Exists( dir.FullName ) )
				continue;
				
			// initialize the hashtable and plistKeys
			Hashtable plistContents = new Hashtable();
			
			PListEditor.loadPlistFromFile( dir.FullName, plistContents );
			
			if( plistContents.ContainsKey( "neverShowCompletedMessage" ) )
			{
				plistContents["neverShowCompletedMessage"] = !enable;
				PListEditor.savePlistToFile( dir.FullName, plistContents );
			}
		}
	}

}
