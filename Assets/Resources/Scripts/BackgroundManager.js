//This script is used to manage application when minimizing it in iphone OS.
//Basically when application is minimised it switches to an empty scene to lower the memory usage.
//When application resumes, it loads either the main menu, or the map scene.

	static var MAIN_MENU 	: int = 0;
	static var MAP 			: int = 1;

	static var activeScene 	: int;
	
	static var sceneToLoad : String = "";
		
	static function changeToBackground()
	{
		//switch to background scene.
		Inventory.bPlayerEq =  false;
		Inventory.bInventory = false;
		scriptBank.bInventory = false;
		scriptBank.bPlayerEq = false;
		//Application.GarbageCollectUnusedAssets();
		
		print( "loading background scene " );
		Application.LoadLevel("BackgroundScene");
	}

	static function changeToActive()
	{ 
		switch( activeScene )
		{
			case MAIN_MENU:
				//load main menu scene
				Application.LoadLevel("sceneMainMenu");
			break;
			case MAP:
				//load map scene.
				var bLoading = true;				
				Application.LoadLevel("sceneMap");
			break;
		}
	}
	var texLoading : Texture2D;
	
	static function LoadLevelSafe( level : String )
	{
		sceneToLoad = level;
		Application.LoadLevel( "BackgroundScene" );
	}
	
	function Start()
	{
		texLoading = Resources.Load("menus/menu_map/loading", Texture2D);
		if( sceneToLoad != "" )
		{
			yield WaitForSeconds( 0.5 );
			Application.LoadLevelAsync( sceneToLoad );
			sceneToLoad = "";
		}
	}
	
	function OnGUI()
	{
		var screenScale: float = Screen.width / 480.0;
     	var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
    	GUI.matrix = scaledMatrix;

		GUI.DrawTexture (Rect(0,0,480,320), texLoading, ScaleMode.StretchToFill, true, 1);
		return;
	}
	