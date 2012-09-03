//vineri 12 august (vineri sambata)

static var curMenu : int;
var bLoading : boolean = false;
var style : GUIStyle;
var wwwData : String;

var Audio : AudioSource;

var located : boolean;

var defaultLat : float;
var defaultLon : float;
var password_modified : boolean;
var hidden_password : String;
var new_password : String;

var nLogin : int = 0;
var guiStyle : GUIStyle;

var styleSlider		: GUIStyle;
var stylePointer	: GUIStyle;
var styleCheck		: GUIStyle;
var styleCheckP		: GUIStyle;

var texTone1        : Texture2D;
var texTone2        : Texture2D;
var texTone3        : Texture2D;
var texTone4        : Texture2D;
var MAIN			: int = 0;
var OPTIONS			: int = 1;
var SOUND			: int = 2;
var SOCIAL			: int = 3;
var GAMEPLAY		: int = 4;
var LOGIN			: int = 5;
var REGISTER		: int = 6;
var HOMEBASE		: int = 7;
var SELECTFACE		: int = 61;
var MISSIONS        : int = 9;


var alertHome 		: boolean = false;

var toEquip : Array;

var chooseFace: String;

// GENERAL MENU TEXTURES
var texLoading		: Texture2D;
var texBack			: Texture2D;
var texBackP		: Texture2D;
var texSlider		: Texture2D;
var texSliderG		: Texture2D;
var texSliderP		: Texture2D;
var texSliderPG		: Texture2D;
var texCheck		: Texture2D;
var texCheckP		: Texture2D;

// BACKGROUNDS
var texBackGeneral	: Texture2D;
var texGameplay_1	: Texture2D;
var texGameplay_2	: Texture2D;
var texLogin_1		: Texture2D;
var texLogin_2		: Texture2D;
var texRegister_1	: Texture2D;
var texRegister_2	: Texture2D;
var texSocial_1		: Texture2D;
var texSocial_2		: Texture2D;
var texSound_1		: Texture2D;
var texSound_2		: Texture2D;

// Main menu
var texMainB		: Texture2D;
var texResume		: Texture2D;
var texResumeP		: Texture2D;
var texOptions		: Texture2D;
var texOptionsP		: Texture2D;
var texSetBase		: Texture2D;
var texSetBaseP		: Texture2D;
var texResetBase	: Texture2D;
var texResetBaseP	: Texture2D;
var texSignOut		: Texture2D;
var texSignOutP		: Texture2D;

// Options menu
var texOptionsB		: Texture2D;
var texSound		: Texture2D;
var texSoundP		: Texture2D;
var texSocial		: Texture2D;
var texSocialP		: Texture2D;
var texGameplay		: Texture2D;
var texGameplayP	: Texture2D;

// Sound menu
var texSoundB		: Texture2D;
var texMusic		: Texture2D;
var texMusicP		: Texture2D;
var texEffects		: Texture2D;
var texEffectsP		: Texture2D;
var texMute			: Texture2D;
var texMuteP		: Texture2D;
var bMusic			: boolean;
static var nMusicVol		: float;
var bEffects		: boolean;
var nEffectsVol		: int;
static var bMute			: boolean;

// Social menu
var texSocialB		: Texture2D;
var texAutoBlock	: Texture2D;
var texAutoBlockP	: Texture2D;
var texAutoFriend	: Texture2D;
var texAutoFriendP	: Texture2D;
var texAutoDuels	: Texture2D;
var texAutoDuelsP	: Texture2D;
var bAutoBlock		: boolean;
var bAutoFriend		: boolean;
var bAutoDuels		: boolean;

// Gameplay menu
var texGameplayB	: Texture2D;
var texAutoLoot		: Texture2D;
var texAutoLootP	: Texture2D;
var bAutoLoot		: boolean;

// Login menu
var texLoginB		: Texture2D;
var texUsername		: Texture2D;
var texPassword		: Texture2D;
var texLogin		: Texture2D;
var texLoginP		: Texture2D;
var texRegister		: Texture2D;
var texRegisterP	: Texture2D;
var sUsername		: String;
var sPassword		: String;

// Register menu
var texRegisterB	: Texture2D;
var texItems		: Texture2D;
var sNick			: String;
var sEmail			: String;
var sFirstName		: String;
var sLastName		: String;

// Home base
var texMap			: Texture2D;
var texSetHB		: Texture2D;
var texSetHBP		: Texture2D;
var texHBZone		: Texture2D;
var texHBTextBox	: Texture2D;
static var nLat			: float;
static var nLon			: float;
var nZoom			: float;

// Sel Char face menu
var texSelChar 			: Texture2D;
var texSelCharFrame		: Texture2D;
var styleSelChar		: GUIStyle;
var styleBtnLeftSelChar	: GUIStyle;
var styleBtnRightSelChar: GUIStyle;
var selectedFace		: int;
var selectedBody		: int;
var skinTone            : int;
var texSelFace			: Texture2D;
var sTexSelFace			: String;
var texSelBody          : Texture2D;
var sTexSelBody         : String;
var bOkToRegister		: boolean;

//Home base alert
var styleButSmll	: GUIStyle;
var styleErrorFrame : GUIStyle;
var styleAlertTextBox : GUIStyle;
var alertText 		: String;

function LoadTextures() : void
{
}

// =====  Characters  =====

var justRegistered : boolean;
var startingItems : Array;
function startLocationService(){

	// Start service before querying location
	iPhoneSettings.StartLocationServiceUpdates(10,10);
	
	// Wait until service initializes
	var maxWait : int = 20;
	
	while (iPhoneSettings.locationServiceStatus == LocationServiceStatus.Initializing && maxWait > 0) {
		yield WaitForSeconds(1);
		maxWait--;
	}
	
	// Service didn't initialize in 20 seconds
	if (maxWait < 1) {
		print("Timed out main menu");
		located = false;
		return;
	}
	// User denied access to device location
	if (iPhoneSettings.locationServiceStatus == LocationServiceStatus.Failed) {
		print("User denied access to device location");
		located = false;
		return;
	}
	located = true;
	return;
}

function stopLocationService(){
	// Stop service if there is no need to query location updates continously
	iPhoneSettings.StopLocationServiceUpdates();
	print(" service stopped " );
}

function getMap()
{
var	url = 	"http://maps.google.com/maps/api/staticmap?center="	+ nLat + "," + nLon + "&zoom=" + nZoom + "&size=480x350&sensor=false";
	//print( url );

	var download : WWW = new WWW (url);
	yield download; 
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
		Debug.Log( "Retrying" );
		download = new WWW (url);
		yield download; 
	} 													
	texMap = download.texture;
}

//function login(){
//    if(sUsername!=""){
//	var form = new WWWForm();
//	if (password_modified && sUsername!=null && PlayerPrefs.GetString("sUsername")!=null) hidden_password = new_password;
//	form.AddField( "Username", sUsername );
//	form.AddField( "Password", hidden_password );
//	Global.UserName = sUsername;
//	Global.Password = sPassword;
//	var login_url = Global.server + "/mmo_iphone/test.php";
//	
//	var download = new WWW( login_url, form );
//	yield download;
//	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
//	{
//		Debug.Log( "Retrying" );
//		download = new WWW( login_url, form );
//		yield download;
//	}
//	
//	
//    
//	if(download.error) {
//		//print( "Error downloading: " + download.error );
//		wwwData = "Error! Could not connect.";
//	}else{
//		//print(wwwData);
//		wwwData = download.text;
//	}
// }
//}

//logout function , not used here
//moved to scriptLogout
function logout(){
	SetLastTimeOnline();
	scriptMain.firstLog = 0;
	var login_url = Global.server + "/mmo_iphone/login.php?logout=" + Global.myChar.id;
	
	Debug.Log("Login URL is "+login_url);
	var download = new WWW( login_url);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{	
		Debug.Log( "Retrying" );
		download = new WWW( login_url);
		yield download;
	}

	if(download.error) {
		wwwData = "Error! Could not connect.";
	}else{
		wwwData = download.text;
	}
	
}
 function SetLastTimeOnline()
 {
	var	wwwData;
	var postData : WWWForm = new WWWForm();
	postData.AddField("id", Global.myChar.id);
	if (Global.Hp_incercare > 1)
	postData.AddField("hp", Global.Hp_incercare +"");
	else postData.AddField("hp", Global.myChar.HP +"");
	
	
	var login_url = Global.server + "/mmo_iphone/set_logout.php";
	
	var download = new WWW(login_url, postData);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying" );
		download = new WWW(login_url, postData);
		yield download;
	}
	while (download.error && download.error.ToString().Contains("Resolving host timed out"));
	//while(!download.isDone){}
    
	if(download.error) 
		{
			print( "Error downloading: " + download.error );
			wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			wwwData = download.text;
			print ("A mers!" + Global.myChar.id);
		}
 }
function login2()
{
	if(sUsername!=""&& sUsername.IndexOf("'")==-1)
	{
		if (password_modified && sUsername!=null && PlayerPrefs.GetString("sUsername")!="") hidden_password = new_password;
		var login_url = Global.server + "/mmo_iphone/login.php?User=" + sUsername + "&Pass=" + hidden_password;
		var download = new WWW( login_url );
		yield download;
		while (download.error && download.error.ToString().Contains("Resolving host timed out"))
			{
				Debug.Log( "Retrying" );
				download = new WWW( login_url );
				yield download;
			}
		if(download.error) 
			{
				Debug.Log( "Error downloading: " + download.error );
				wwwData = "Error! Could not connect.";
				return;
			}
		else
			{
				wwwData = download.text;
			}
		if(wwwData.IndexOf("success", 0) > 0 && sUsername!="" )
			{
				Global.myChar.User = sUsername;	
				curMenu = MAIN;
				nLogin = 1;
				yield StartCoroutine( Global.getUserData() );
			}
		else
			{
				nLogin = 2;
				curMenu = LOGIN;
			}
		
		//request premium status.
		Global.premium = false;
		var url = Global.server + "/mmo_iphone/premium.php?user_id="+ Global.myChar.id +"&method=get";
		
		
		var Download : WWW = new WWW (url);
		yield Download;
		while (Download.error && Download.error.Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			Download = new WWW (url);
			yield Download;
		}
		
		if(Download.error) 
		{
			print( "Error downloading: " + Download.error );
		}
		else
		{
			if( Download.text.IndexOf("true", 0) != -1) 
				Global.premium = true;
		}
		
		
		Global.premium = true;
	}
}
//function register(){
//	var form = new WWWForm();
//	form.AddField( "Username", sUsername );
//	form.AddField( "Password", sPassword );
//	form.AddField( "Nick", sNick );
//	form.AddField( "Email", sEmail );
//	form.AddField( "FirstName", sFirstName );
//	form.AddField( "LastName", sLastName );
//
//	var register_url = "";
//	var download = new WWW( register_url, form );
//	yield download;
//	while (download.error && download.error.Contains("Resolving host timed out"))
//	{
//		Debug.Log( "Retrying" );
//		download = new WWW( register_url, form );
//		yield download;
//	}
//   	if(download.error) {
//		//print( "Error downloading: " + download.error );
//		wwwData = "Error! Could not connect.";
//	}else{
//		//print(wwwData);
//		wwwData = download.text;
//	}
//}

function register2() 
{
    var ok = true;
    var escapeChars=new Array("!","@","#","$","%","^","&","*","(",")","-","+","=","|","\\","[","]","{","}",";",":","'","\"","<",",",">",".","?","/");
    for(var i = 0 ; i<sUsername.length; i++)
       { 
         Debug.Log("susername e "+sUsername[i]);
          if(escapeChars.ToString().Contains(sUsername[i].ToString()))
                {
                   ok = false;
                   break;
                }
        }                       
	if( sUsername != WWW.EscapeURL( sUsername ) || ok == false)
	{
		wwwData = "Invalid username. Username should be alphanumeric ( a-z, A-Z, 0-9 )";
		return;
	}

     var login_url = Global.server + "/mmo_iphone/insert.php?User=" + sUsername + "&Pass=" + sPassword + "&Nick=" +
					sUsername + "&Email=" + WWW.EscapeURL( sEmail ) + "&FirstN=" + WWW.EscapeURL( sFirstName ) + 
					"&LastN=" + WWW.EscapeURL( sLastName ) + "&avatar=" + selectedFace + "&body=" + selectedBody;           
    Debug.Log("SELECTED BODY A FOST"+selectedBody);

    var download = new WWW( login_url );
	yield download;
    while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	    {
	    	Debug.Log( "Retrying" );
		    download = new WWW( login_url );
			yield download;
	    }
	if(download.error)
		{
			print( "Error downloading: " + download.error );
			wwwData = "Error! Could not connect.";
		}
	else
		{
			wwwData = download.text;
		}

	if(wwwData.IndexOf("success", 0) > 0) 
	{	
		
		//curMenu = MAIN;
		login2();
		bOkToRegister = true;
		var comp1 : scriptMainMenu = transform.GetComponent(scriptMainMenu);
        var comp2 : scriptSwipeCutScene= transform.GetComponent(scriptSwipeCutScene);
        comp2.enabled = true;
        comp1.enabled = false; 
		/*sTexSelFace = "fata ";
		selectedFace = 1;
		print(sTexSelFace+selectedFace);
		texSelFace = Resources.Load("Menus/Menu_SelChar/"+sTexSelFace+selectedFace);
		curMenu = SELECTFACE;*/
	}
	
	bOkToRegister = false;
}

function setHomebase2() 
{
	var login_url = Global.server + "/mmo_iphone/homebase.php?User=" + Global.myChar.Nick +
					"&Lat=" + nLat + "&Lon=" + nLon;
	
	
	var download = new WWW( login_url );
	yield download;				
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			download = new WWW( login_url );
			yield download;
		}
   	if(download.error) 
	   	{
			wwwData = "Error! Could not connect.";
			alertHome =  false;
		}
	else
		{
			wwwData = download.text;
			MonoBehaviour.print(wwwData);
			if(wwwData.IndexOf("Homebase", 0) > 0) 
				{
					curMenu = MAIN;
					alertHome = false;
				}
			try
			{
				var timeStamp : int = parseInt(wwwData);
				var nextHomeSet : String;
				var days : int = timeStamp / 86400;//86400 seconds in a day;
				timeStamp = timeStamp % 86400;
				var hours : int = timeStamp / 3600;
				timeStamp = timeStamp % 3600;
				var minutes : int = timeStamp / 60;
				nextHomeSet = "You can set your homebase again in: ";
				if( days !=0 ) nextHomeSet += days + " days, ";
				if( hours != 0 ) nextHomeSet += hours + " hours, ";
				if( minutes != 0 ) nextHomeSet += minutes + " minutes";	
				alertText = nextHomeSet;	
				alertHome = true;	
			}
			catch(ex){}
		}		
	
}

//function distance(lat1:float,lon1:float,lat2:float,lon2:float)
////returns distance in km between 2 points
//{
// if (lat2==0&lon2==0) return 0; // daca homebnase(0,0);
// var R = 6371; 
// var dLat = (lat2-lat1) * Mathf.Deg2Rad;  
// var dLon = (lon2-lon1) * Mathf.Deg2Rad;
//lat1 = lat1 * Mathf.Deg2Rad;
//lat2 = lat2 * Mathf.Deg2Rad;
// 
// var a = Mathf.Sin(dLat/2) * Mathf.Sin(dLat/2) +
//         Mathf.Cos(lat1 ) * Mathf.Cos(lat2 ) * 
//         Mathf.Sin(dLon/2) * Mathf.Sin(dLon/2); 
// var c = 2 * Mathf.Atan2(Mathf.Sqrt(a), Mathf.Sqrt(1-a)); 
// var d = R * c;
// return d;
//}

function Start()
{   
    Global.oldEXP = -1;
    Audio.volume = PlayerPrefs.GetFloat("nMusicVol")/100;
    Global.randomNumber = 0;
    justRegistered = false;
	BackgroundManager.activeScene = BackgroundManager.MAIN_MENU;	
	hidden_password = "";
	new_password = "";
	password_modified = false;
	
	defaultLat = 44.415172;
	defaultLon = 26.076158;
	
	//No dim to the screen
	iPhoneSettings.screenCanDarken = false;
	iPhoneKeyboard.autorotateToPortrait = false;
    iPhoneKeyboard.autorotateToPortraitUpsideDown = false;
    iPhoneKeyboard.autorotateToLandscapeLeft = false;
    iPhoneKeyboard.autorotateToLandscapeRight = false;
	
	if(Application.platform == RuntimePlatform.IPhonePlayer) Global.GPS_Flag = true; else Global.GPS_Flag = false;
	
	nLogin = 0;
	wwwData = "";
    curMenu = LOGIN;
	
    bLoading = false;
	style = new GUIStyle();
	var firstUse : int = PlayerPrefs.GetInt("First Use");
	print( "firstUse: " + firstUse );
	
	if( firstUse == 0 )
	{
		PlayerPrefs.SetFloat("nMusicVol", 1); //volume 0 - 1
		PlayerPrefs.SetInt("bMusic", 1);		
		PlayerPrefs.SetInt("bEffects", 1);
		PlayerPrefs.SetInt("nEffectsVol", 100);
		PlayerPrefs.SetInt("bMute", 0);
		PlayerPrefs.SetInt( "First Use", 1 );
	}
	
	bMusic = (PlayerPrefs.GetInt("bMusic") == 1);
	nMusicVol = PlayerPrefs.GetFloat("nMusicVol");
	bEffects = (PlayerPrefs.GetInt("bEffects") == 1);
	nEffectsVol = PlayerPrefs.GetInt("nEffectsVol");
	bMute = (PlayerPrefs.GetInt("bMute") == 1);
    
	bAutoBlock = (PlayerPrefs.GetInt("bAutoBlock") == 1);
	bAutoFriend = (PlayerPrefs.GetInt("bAutoFriend") == 1);
	bAutoDuels = (PlayerPrefs.GetInt("bAutoDuels") == 1);

	bAutoLoot = (PlayerPrefs.GetInt("bAutoLoot") == 1);
    
	sUsername = PlayerPrefs.GetString("sUsername");
	hidden_password = PlayerPrefs.GetString("sPassword");
	sPassword = "*";
	while (sPassword.length < hidden_password.length) sPassword += "*";
	
	sNick = PlayerPrefs.GetString("sNick");
	sEmail = PlayerPrefs.GetString("sEmail");
	sFirstName = PlayerPrefs.GetString("sFirstName");
	sLastName = PlayerPrefs.GetString("sLastName");
	
	nZoom = 15;
	located = false;

	nLat = defaultLat;
	nLon = defaultLon;
	getMap();
    
	login2();
	bOkToRegister = true;
	bLoading = false;
	
	//if 0, show tutorial, if 1 don't show tutorial.
	//PlayerPrefs.SetInt( "Active Tutorials", 0 ); //debug only,... must remove this.
	CommonConstants.activeTutorials = PlayerPrefs.GetInt( "Active Tutorials" );
	MusicManager.PlayFile( MusicManager.MUSIC_MENU_LONGER );
	startLocationService();
	LoadTextures();
}

function Update()
{
	if(bMute) Audio.mute = true;
    else Audio.mute = false;
	
	if (!Global.GPS_Flag)
			 return;
	if (!Application.isPlaying)
	{
		stopLocationService();
	}

	if (!located) 
			return;
	var newLat: float = defaultLat;
	var newLon: float = defaultLon;
	if (iPhoneSettings.locationServiceStatus != LocationServiceStatus.Failed) 
		{
			newLat = iPhoneInput.lastLocation.latitude;
			newLon = iPhoneInput.lastLocation.longitude;
		}
	
	if ((newLat!=nLat)||(newLon!=nLon)) 
		{
			nLat = newLat;
			nLon = newLon;
			getMap();
		}
}
function OnGUI()
{
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	if(bLoading)
		{
			GUI.DrawTexture (Rect(0,0,480,320), texLoading, ScaleMode.StretchToFill, true, 1);
			return;
		}
	
	switch(curMenu)
	{
		case MAIN: // Main window
			GUI.DrawTexture (Rect(0,0,480,320), texMainB, ScaleMode.StretchToFill, true, 1);
			
			// Play/Resume
			style.active.background = texResume;
			style.normal.background = texResumeP;
			
			if(GUI.Button(Rect(45, 90, 64, 55), "", style))
				{
					bLoading = true;	
	                BackgroundManager.LoadLevelSafe( "sceneMap" );
				}
			// Options
			style.active.background = texOptions;
			style.normal.background = texOptionsP;
			if(GUI.Button(Rect(51, 145, 100, 55), "", style))
				{
					curMenu = OPTIONS;
				}
			// Reset home base
			style.active.background = texResetBase;
			style.normal.background = texResetBaseP;
			
		
			if(GUI.Button(Rect(51, 200, 160, 55), "", style))
				{
					curMenu = HOMEBASE;
				}
			// Sign Out
			style.active.background = texSignOut;
			style.normal.background = texSignOutP;
			if(GUI.Button(Rect(51, 255, 100, 55), "", style))
				{
					logout();
					Global.myChar.Nick = "";
	                chooseFace = "";
					wwwData = "";
					curMenu = LOGIN;
				}	
		break;
		
		case OPTIONS: 
			// Options
			GUI.DrawTexture (Rect(0,0,480,320), texOptionsB, ScaleMode.StretchToFill, true, 1);
			// Sound
			style.active.background = texSound;
			style.normal.background = texSoundP;
			if(GUI.Button(Rect(45, 90, 64, 55), "", style))
				{
					curMenu = SOUND;
				}
			// Social

			// Back
			style.active.background = texBack;
			style.normal.background = texBackP;
			if(GUI.Button(Rect(20, 260, 68, 54), "", style))
				{
				   curMenu=MAIN;
				}
			if(GUI.Button(Rect(45, 140, 200, 25), "Buy 1000 gold for 1 USD"))
				{
					PlayerPrefs.SetInt("buy", 1);
				}
			if(GUI.Button(Rect(45, 170, 200, 25), "Buy 2500 gold for 2 USD"))
				{
					PlayerPrefs.SetInt("buy", 2);
				}
			if(GUI.Button(Rect(45, 200, 200, 25), "Buy 5000 gold for 4 USD"))
				{
					PlayerPrefs.SetInt("buy", 4);
				}
			if(GUI.Button(Rect(45, 230, 200, 25), "Buy 7000 gold for 5 USD"))
				{
					PlayerPrefs.SetInt("buy", 5);
				}
			if( GUI.Button( Rect( 265, 140, 200, 25 ), "Reset Tutorials" ) )
				{
					PlayerPrefs.SetInt("Active Tutorials", 0);
					CommonConstants.activeTutorials = PlayerPrefs.GetInt( "Active Tutorials" );
				}
		break;
		
		case SOUND: // Sound
			GUI.DrawTexture (Rect(   0,   0, 480, 320), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(   0,   0, 112,  65), texSound_1, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect( -20, 100, 231, 153), texSound_2, ScaleMode.StretchToFill, true, 1);
			
			// Music
			if(bMusic && !bMute)
				{
					style.active.background = texMusicP;
					style.normal.background = texMusic;
					if(GUI.Button(Rect(40,  90,  68, 54), "", style))
						{
							bMusic = !bMusic;
							bMute = false;
						}
					nMusicVol = GUI.HorizontalSlider (Rect(160, 90, 230, 54), nMusicVol, 0, 100, styleSlider, stylePointer);
	                Debug.Log("nMusicVol e "+nMusicVol/100);
	                Audio.volume = nMusicVol/100;
					GUI.DrawTexture (Rect(143 + (nMusicVol * 2.1), 85, 54, 54),
															texSliderP, ScaleMode.StretchToFill, true, 1);
				}
			else
			{
				style.active.background = texMusic;
				style.normal.background = texMusicP;
				if(GUI.Button(Rect(40,  90,  68, 54), "", style))
				{
					if (bMute)
						{
							bMusic = true;
							bEffects = false;
						}
					else bMusic = !bMusic;
					bMute = false;
				}
				GUI.DrawTexture (Rect(160, 90, 230, 54),  texSliderG, ScaleMode.StretchToFill, true, 1);
			}
			// Effects
			if(bEffects && !bMute)
				{
					style.active.background = texEffectsP;
					style.normal.background = texEffects;
					if(GUI.Button(Rect(40,  145,  103, 61), "", style))
						{
							bEffects = !bEffects;
							bMute = false;
						}
					nEffectsVol = GUI.HorizontalSlider (Rect(160, 145, 230, 54), nEffectsVol, 0, 100, styleSlider, stylePointer);
					GUI.DrawTexture (Rect(143 + (nEffectsVol * 2.1), 140, 54, 54),
															texSliderP, ScaleMode.StretchToFill, true, 1);
				}
			else
			{
				style.active.background = texEffects;
				style.normal.background = texEffectsP;
				if(GUI.Button(Rect(40,  145,  103, 61), "", style))
					{
						if (bMute)
							{
								bEffects = true;
								bMusic = false;
							}
						else bEffects = !bEffects;
						bMute = false;
					}
				GUI.DrawTexture (Rect(160, 145, 230, 54),  texSliderG, ScaleMode.StretchToFill, true, 1);
			}
			// Mute
			style.active.background = bMute ? texMuteP : texMute;
			style.normal.background = bMute ? texMute : texMuteP;
			if(GUI.Button(Rect(43, 200, 92, 57), "", style)) 
						bMute = !bMute;
			
			style.active.background = bMute ? texCheck : texCheckP;
			style.normal.background = bMute ? texCheckP : texCheck;
			if(GUI.Button(Rect(152, 198, 68, 54), "", style)) 
	            {
		             bMute = !bMute;
	            }
		
			// Back
			style.active.background = texBack;
			style.normal.background = texBackP;
			if(GUI.Button(Rect(20, 260, 68, 54), "", style))
				{
					curMenu = OPTIONS;
				}
			
			PlayerPrefs.SetInt("bMusic", bMusic ? 1 : 0);
			PlayerPrefs.SetFloat("nMusicVol", nMusicVol);
			PlayerPrefs.SetInt("bEffects", bEffects ? 1 : 0);
			PlayerPrefs.SetInt("nEffectsVol", nEffectsVol);
			PlayerPrefs.SetInt("bMute", bMute ? 1 : 0);

		break;
		
		case SOCIAL: // Social
			GUI.DrawTexture (Rect(   0,   0, 480, 320), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(   0,   0, 121,  63), texSocial_1, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect( -20, 100, 233, 150), texSocial_2, ScaleMode.StretchToFill, true, 1);
			
			// Block all messages from non-friends
			style.active.background = bAutoBlock ? texAutoBlockP : texAutoBlock;
			style.normal.background = bAutoBlock ? texAutoBlock : texAutoBlockP;
			if(GUI.Button(Rect(60, 90, 403, 67), "", style)) 
					bAutoBlock = !bAutoBlock;
			
			style.active.background = bAutoBlock ? texCheck : texCheckP;
			style.normal.background = bAutoBlock ? texCheckP : texCheck;
			if(GUI.Button(Rect(15, 91, 68, 54), "", style)) 
					bAutoBlock = !bAutoBlock;
			
			// Auto-accept all friend requests
			style.active.background = bAutoFriend ? texAutoFriendP : texAutoFriend;
			style.normal.background = bAutoFriend ? texAutoFriend : texAutoFriendP;
			if(GUI.Button(Rect(49, 145, 374, 68), "", style)) 
					bAutoFriend = !bAutoFriend;
			
			style.active.background = bAutoFriend ? texCheck : texCheckP;
			style.normal.background = bAutoFriend ? texCheckP : texCheck;
			if(GUI.Button(Rect(15, 146, 68, 54), "", style)) 
					bAutoFriend = !bAutoFriend;
			
			// Auto-accept duels
			style.active.background = bAutoDuels ? texAutoDuelsP : texAutoDuels;
			style.normal.background = bAutoDuels ? texAutoDuels : texAutoDuelsP;
			if(GUI.Button(Rect(61, 195, 232, 73), "", style)) 
					bAutoDuels = !bAutoDuels;
			
			style.active.background = bAutoDuels ? texCheck : texCheckP;
			style.normal.background = bAutoDuels ? texCheckP : texCheck;
			if(GUI.Button(Rect(15, 201, 68, 54), "", style)) 
					bAutoDuels = !bAutoDuels;
			
			// Back
			style.active.background = texBack;
			style.normal.background = texBackP;
			if(GUI.Button(Rect(20, 260, 68, 54), "", style))
				{
					curMenu = OPTIONS;
				}
			
			PlayerPrefs.SetInt("bAutoBlock", bAutoBlock ? 1 : 0);
			PlayerPrefs.SetInt("bAutoFriend", bAutoFriend ? 1 : 0);
			PlayerPrefs.SetInt("bAutoDuels", bAutoDuels ? 1 : 0);
		break;
		
		case GAMEPLAY: // Gameplay
			GUI.DrawTexture (Rect(   0,   0, 480, 320), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(   0,   0, 184,  70), texGameplay_1, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect( -20, 100, 333, 171), texGameplay_2, ScaleMode.StretchToFill, true, 1);
			
			// Auto-loot
			style.active.background = bAutoLoot ? texAutoLootP : texAutoLoot;
			style.normal.background = bAutoLoot ? texAutoLoot : texAutoLootP;
			if(GUI.Button(Rect(85, 96, 130, 54), "", style)) 
					bAutoLoot = !bAutoLoot;
			
			style.active.background = bAutoLoot ? texCheck : texCheckP;
			style.normal.background = bAutoLoot ? texCheckP : texCheck;
			if(GUI.Button(Rect(20, 91, 68, 54), "", style)) 
					bAutoLoot = !bAutoLoot;

			// Back
			style.active.background = texBack;
			style.normal.background = texBackP;
			if(GUI.Button(Rect(20, 260, 68, 54), "", style))
				{
					curMenu = OPTIONS;
				}
			PlayerPrefs.SetInt("bAutoLoot", bAutoLoot ? 1 : 0);
		break;

		case LOGIN: // Login
		
			GUI.DrawTexture (Rect(   0,   0, 480, 320), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(   0,   0, 106,  63), texLogin_1, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect( -20, 100, 202, 146), texLogin_2, ScaleMode.StretchToFill, true, 1);
			
			GUI.DrawTexture (Rect(40,90,109,37), texUsername, ScaleMode.StretchToFill, true, 1);
		    sUsername = GUI.TextField (Rect (40, 130, 200, 20), sUsername, 25);

			GUI.DrawTexture (Rect(40,170,109,37), texPassword, ScaleMode.StretchToFill, true, 1);
		    new_password = GUI.PasswordField (Rect (40, 210, 200, 20), sPassword, "*"[0], 25);
		    if (sPassword != new_password) 
			    {
			    	password_modified = true;
			    	sPassword = new_password;
			    }
		    
			// Login
			style.active.background = texLoginP;
			style.normal.background = texLogin;
			if(GUI.Button(Rect(170, 250, 69, 53), "", style))
				{
					login2();
					if (password_modified) 
							hidden_password = new_password;
					PlayerPrefs.SetString("sUsername", sUsername);
					PlayerPrefs.SetString("sPassword", hidden_password);
				}

			// Register
			style.active.background = texRegisterP;
			style.normal.background = texRegister;
			if(GUI.Button(Rect(45, 248, 105, 56), "", style))
				{
					sUsername="";
					sPassword="";
					sEmail="";
					curMenu = REGISTER;
				}
			GUI.Label (Rect(350,20,100,200), wwwData);
	
		break;
		
		case REGISTER: // Register
			GUI.DrawTexture (Rect(   0,   0, 480, 320), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(   0,   0, 156,  61), texRegister_1, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect( -20, 100, 298, 167), texRegister_2, ScaleMode.StretchToFill, true, 1);
			
			
			GUI.DrawTexture (Rect(40,85,89,184), texItems, ScaleMode.StretchToFill, true, 1);
		    sUsername = GUI.TextField (Rect (160, 90, 200, 20), sUsername, 25);
		    new_password = GUI.PasswordField (Rect (160, 120, 200, 20), sPassword, "*"[0], 25);
		    if (sPassword != new_password) 
			    {
			    	password_modified = true;
			    	sPassword = new_password;
			    }
		    //sNick = GUI.TextField (Rect (160, 150, 200, 20), sNick, 25);
		    sEmail = GUI.TextField (Rect (160, 150, 200, 20), sEmail, 25);
		    sFirstName = GUI.TextField (Rect (160, 180, 200, 20), sFirstName, 25);
		    sLastName = GUI.TextField (Rect (160, 210, 200, 20), sLastName, 25);

			// Register
			style.active.background = texRegister;
			style.normal.background = texRegisterP;
			if((sEmail != "")&&(sUsername != "")&&(sPassword != ""))
			{ 
			// add more constraints to allow user to register, i.e.: e-mail is not empty
				if(GUI.Button(Rect(260, 266, 105, 56), "", style))
				{
					//razvan
					bOkToRegister = true;
					sTexSelFace = "fata_";
                    sTexSelBody = "corp_";
					selectedFace = 1;
                    selectedBody = 1;
                    skinTone = 0;
					//print(sTexSelFace+selectedFace);
					texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
                    texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
                    curMenu = SELECTFACE;
                    PlayerPrefs.SetString("sUsername", sUsername);
                    PlayerPrefs.SetString("sPassword", sPassword);
                    Global.myChar.Nick = sUsername;
                    chooseFace = "aaa";
				}
			}
			GUI.Label (Rect(350,20,100,200), wwwData);

			// Back
			style.active.background = texBack;
			style.normal.background = texBackP;
			if(GUI.Button(Rect(25, 266, 68, 54), "", style))
				{
					curMenu = LOGIN;
				}
		break;
		
		case HOMEBASE: 
			// Home base
			GUI.DrawTexture (Rect(0,0,480,320), texMap, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(230, 130, 59, 58), texHBZone, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(4.5, 236.5, 471, 78), texHBTextBox, ScaleMode.StretchToFill, true, 1);

			// Back
			style.active.background = texSetHBP;
			style.normal.background = texSetHB;
			if(GUI.Button(Rect(330, 248, 121, 39), "", style))
				{
					setHomebase2();
					if( !alertHome )
						curMenu = MAIN;				
				}
			if( alertHome )
				GUI.Window (1, Rect (150, 100, 220, 120), DoHomeBaseAlert, "", styleErrorFrame);
			if(GUI.Button(Rect(330, 288, 121, 20), "Cancel"))
				{
					curMenu = MAIN;
				}
			if( alertHome ) 
				{
					//draw alert
				}
		break;
		
		case SELECTFACE: // select char face
			
			GUI.DrawTexture(Rect(0, 0, 480, 320), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(0, 0, 310, 63), texSelChar, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(165, 60, 140, 210), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
           // GUI.DrawTexture(Rect(165, 130, 140, 140), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(145, 270, 40, 40), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(195, 270, 40, 40), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(245, 270, 40, 40), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(295, 270, 40, 40), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            
            if(GUI.Button(Rect(145,270,40,40),"",""))
	            {
	               skinTone = 0;
	               selectedFace = 1;
	               selectedBody = 1;
	               texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
	               texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
	            }
             if(GUI.Button(Rect(195,270,40,40),"",""))
	            {
	                skinTone = 1;
	                selectedFace = 2;
	                selectedBody = 2;
	                texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
	                texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
	            }
             if(GUI.Button(Rect(245,270,40,40),"",""))
	            {
	                skinTone = 2;
	                selectedFace = 3;
	                selectedBody = 3;
	                texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
	                texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
	            }
             if(GUI.Button(Rect(295,270,40,40),"",""))
	            {
	                skinTone = 3;
	                selectedFace = 4;
	                selectedBody = 4;
	                texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
	                texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
	            }
			
			//GUI.DrawTexture(Rect(0, 159,480,3), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
			//GUI.DrawTexture(Rect(239, 0,3,320), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
			
			if(GUI.Button(Rect(150, 80, 30, 30), "", styleBtnLeftSelChar)) 
			{
                switch(skinTone)
                {
                case 0:	selectedFace = (selectedFace == 1)? 29 : selectedFace - 4;
                        if(selectedFace == 29) selectedBody = 17;
                        if(selectedFace == 13) selectedBody = 1;
                                                break;
                case 1: selectedFace = (selectedFace == 2)? 30 : selectedFace - 4;
                        if(selectedFace == 30) selectedBody = 18;
                        if(selectedFace == 14) selectedBody = 2;
                                                break;
                case 2: selectedFace = (selectedFace == 3)? 31 : selectedFace - 4;
                        if(selectedFace == 31) selectedBody = 19;
                         if(selectedFace == 15) selectedBody = 3;
                                                break;
                case 3: selectedFace = (selectedFace == 4)? 32 : selectedFace - 4;
                        if(selectedFace == 32) selectedBody = 20;
                         if(selectedFace == 16) selectedBody = 4;
                                                break;    
                }
			}
			if(GUI.Button(Rect(300, 80, 30, 30), "", styleBtnRightSelChar)) 
			{
                switch(skinTone)
                {
				case 0: selectedFace = (selectedFace == 29)? 1 : selectedFace + 4;
                        if(selectedFace == 17) selectedBody = 17;
                        if(selectedFace == 1) selectedBody = 1;
                                               break;
                case 1: selectedFace = (selectedFace == 30)? 2 : selectedFace + 4;
                        if(selectedFace == 18) selectedBody = 18;
                        if(selectedFace == 2) selectedBody = 2;
                                               break;
                case 2: selectedFace = (selectedFace == 31)? 3 : selectedFace + 4;
                        if(selectedFace == 19) selectedBody = 19;
                        if(selectedFace == 3) selectedBody = 3;
                                                break;
                case 3: selectedFace = (selectedFace == 32)? 4 : selectedFace + 4;
                        if(selectedFace == 20) selectedBody = 20;
                         if(selectedFace == 4) selectedBody = 4;
                                                break;                        
                }
			}
            if(GUI.Button(Rect(150, 160, 30, 60), "", styleBtnLeftSelChar)) 
            {
                switch(skinTone)
                {
                case 0:	 if(selectedFace<17)  selectedBody = (selectedBody == 1)? 13 : selectedBody - 4;
                         else selectedBody = (selectedBody == 17)? 29 : selectedBody - 4;
                        break;
				case 1: if(selectedFace<17)  selectedBody = (selectedBody == 2)? 14 : selectedBody - 4;
                        else  selectedBody = (selectedBody == 18)? 30 : selectedBody - 4;
                        break;
                case 2: if(selectedFace<17)  selectedBody = (selectedBody == 3)? 15 : selectedBody - 4;
                            else selectedBody = (selectedBody == 19)? 31 : selectedBody - 4;
                        break;
                case 3: if(selectedFace<17)  selectedBody = (selectedBody == 4)? 16 : selectedBody - 4;
                        else selectedBody = (selectedBody == 20)? 32 : selectedBody - 4;
                        break;    
                }  
               			}
            if(GUI.Button(Rect(300, 160, 30, 60), "", styleBtnRightSelChar)) 
            {
                 switch(skinTone)
                 {
				case 0:  if(selectedFace>=17) selectedBody = (selectedBody == 29)? 17 : selectedBody + 4;
                         else selectedBody = (selectedBody == 13)? 1 : selectedBody + 4;
                        break;
                case 1:  if(selectedFace>=17) selectedBody = (selectedBody == 30)? 18 : selectedBody + 4;
                        else selectedBody = (selectedBody == 14)? 2 : selectedBody + 4;
                        break;
                case 2: if(selectedFace>=17) selectedBody = (selectedBody == 31)? 19 : selectedBody + 4;
                       else  selectedBody = (selectedBody == 15)? 3 : selectedBody + 4;
                        break;
                case 3: if(selectedFace>=17) selectedBody = (selectedBody == 32)? 20 : selectedBody + 4;
                        else selectedBody = (selectedBody == 16)? 4 : selectedBody + 4;
                        break;                        
                }
				
			}
			texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
			texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
			
			GUI.DrawTexture(Rect(149, 271, 35, 35), texTone1, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(199, 271, 35, 35), texTone2, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(249, 271, 35, 35), texTone3, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(299, 271, 35, 35), texTone4, ScaleMode.StretchToFill, true, 1);
            
            GUI.DrawTexture(Rect(197, 65, 72, 72), texSelFace, ScaleMode.StretchToFill, true, 1);
            
            GUI.DrawTexture(Rect(192, 107, 90, 150), texSelBody, ScaleMode.StretchToFill, true, 1);
			if(GUI.Button(Rect(395, 260, 68, 54), "", styleSelChar))
				{
					register2();
				}
			style.active.background = texBack;
			style.normal.background = texBackP;
			if(GUI.Button(Rect(25, 260, 68, 54), "", style))
				{
					sUsername="";
					sPassword="";
					sEmail="";
					curMenu = REGISTER;
				}
			GUI.Label (Rect(350,20,100,200), wwwData);
		break;
		
		case MISSIONS : //TODO:Add missions menu
	    break;		
	}
	
	if (Global.myChar.Nick && curMenu!=HOMEBASE && !chooseFace) 
	{
		GUI.Label(Rect((470 - (Global.myChar.Nick.length*10)), 280, 100, 100), Global.myChar.Nick, guiStyle);
	}
}

function DoHomeBaseAlert (windowID : int) 
{
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	styleAlertTextBox.normal.textColor  = Color.white;
	GUI.Label(Rect(20,30,190,40), alertText, styleAlertTextBox);
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleButSmll))
		alertHome = false;
}