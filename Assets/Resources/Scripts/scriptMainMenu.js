

var buttonWidth : int = 20;
var buttonHeight : int = 30;

static var curMenu : int;
var bLoading : boolean = false;
//var style : GUIStyle;
var wwwData : String;
var Audio : AudioSource;
var located : boolean;
var defaultLat : float;
var defaultLon : float;
var password_modified : boolean;
var hidden_password : String;
var new_password : String;
var nLogin : int = 0;

var style : GUIStyle;
var guiStyle : GUIStyle;
var styleSlider		: GUIStyle;
var stylePointer	: GUIStyle;
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
var chooseFace: String;

// GENERAL MENU TEXTURES
var texLoading		: Texture2D;
//var texBack			: Texture2D;
//var texBackP		: Texture2D;
var texSlider		: Texture2D;
var texSliderG		: Texture2D;
var texSliderP		: Texture2D;
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
var texResetBase	: Texture2D;
var texResetBaseP	: Texture2D;
var texSignOut		: Texture2D;
var texSignOutP		: Texture2D;

// Options menu
var texOptionsB		: Texture2D;
var texSound		: Texture2D;
var texSoundP		: Texture2D;

// Sound menu
//var texMusic		: Texture2D;
//var texMusicP		: Texture2D;
//var texEffects		: Texture2D;
//var texEffectsP		: Texture2D;
//var texMute			: Texture2D;
//var texMuteP		: Texture2D;
var bMusic			: boolean;
static var nMusicVol	: float;
var bEffects		: boolean;
var nEffectsVol		: int;
static var bMute	: boolean;

// Social menu
//var texAutoBlock	: Texture2D;
//var texAutoBlockP	: Texture2D;
//var texAutoFriend	: Texture2D;
//var texAutoFriendP	: Texture2D;
//var texAutoDuels	: Texture2D;
//var texAutoDuelsP	: Texture2D;
///var bAutoBlock		: boolean;
//var bAutoFriend		: boolean;
//var bAutoDuels		: boolean;

// Gameplay menu
//var texAutoLoot		: Texture2D;
//var texAutoLootP	: Texture2D;
//var bAutoLoot		: boolean;

// Login menu
var texUsername		: Texture2D;
var texPassword		: Texture2D;
//var texLogin		: Texture2D;
//var texLoginP		: Texture2D;
//var texRegister		: Texture2D;
//var texRegisterP	: Texture2D;
var sUsername		: String;
var sPassword		: String;

// Register menu
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
static var nLat		: float;
static var nLon		: float;
var nZoom			: float;

// Sel Char face menu
var texSelChar 			: Texture2D;
var texSelCharFrame		: Texture2D;
var styleSelChar		: GUIStyle;
//var styleBtnLeftSelChar	: GUIStyle;
//var styleBtnRightSelChar: GUIStyle;
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

var playButton 				: GUIStyle;
var optionsButton			: GUIStyle;
var resetHomeBaseButton		: GUIStyle;
var signOutButton 			: GUIStyle;
var soundButton				: GUIStyle;
var backButton				: GUIStyle;	 
var musicButton				: GUIStyle;	 
var effectsButton			: GUIStyle;	 
var muteButton				: GUIStyle;	 
var checkButton				: GUIStyle;
var loginButton				: GUIStyle;
var registerButton			: GUIStyle;
var setHomeBaseButton		: GUIStyle; 
var leftSelectButton		: GUIStyle; 
var rightSelectButton		: GUIStyle; 


function makeAllButtons()
{
	playButton.normal.background = Resources.Load("Menus/Menu_Main/play_p");
	playButton.active.background = Resources.Load("Menus/Menu_Main/play");
	
	optionsButton.normal.background = Resources.Load("Menus/Menu_Main/options_p");
	optionsButton.active.background = Resources.Load("Menus/Menu_Main/options");
	
	resetHomeBaseButton.normal.background = Resources.Load("Menus/Menu_Main/reset_homebase_p");
	resetHomeBaseButton.active.background = Resources.Load("Menus/Menu_Main/reset_homebase");
	
	signOutButton.normal.background = Resources.Load("Menus/Menu_Main/sign_out_p");
	signOutButton.active.background = Resources.Load("Menus/Menu_Main/sign_out");
	
	soundButton.normal.background = Resources.Load("Menus/Menu_Options/sound_p");
	soundButton.active.background = Resources.Load("Menus/Menu_Options/sound");
	
	backButton.normal.background = Resources.Load("Menus/Menu_General/back_p");
	backButton.active.background = Resources.Load("Menus/Menu_General/back");
	
	musicButton.normal.background = Resources.Load("Menus/Menu_Sound/music_p");
	musicButton.active.background = Resources.Load("Menus/Menu_Sound/music");
	
	effectsButton.normal.background = Resources.Load("Menus/Menu_Sound/effects_p");
	effectsButton.active.background = Resources.Load("Menus/Menu_Sound/effects");
	
	muteButton.normal.background = Resources.Load("Menus/Menu_Sound/mute_p");
	muteButton.active.background = Resources.Load("Menus/Menu_Sound/mute");
	
	styleSlider.normal.background = Resources.Load("Menus/Menu_General/slider");
	stylePointer.active.background = Resources.Load("Menus/Menu_General/slider_point");	
	
	checkButton.normal.background = Resources.Load("Menus/Menu_General/check");
	checkButton.active.background = Resources.Load("Menus/Menu_General/check_p");
	
	loginButton.normal.background = Resources.Load("Menus/Menu_Login/login_p");
	loginButton.active.background = Resources.Load("Menus/Menu_Login/login");
	
	registerButton.normal.background = Resources.Load("Menus/Menu_Login/register_p");
	registerButton.active.background = Resources.Load("Menus/Menu_Login/register"); 
	
	setHomeBaseButton.normal.background = Resources.Load("Menus/Menu_Homebase/set_button_pr");
	setHomeBaseButton.active.background = Resources.Load("Menus/Menu_Homebase/set_button");  
	
	leftSelectButton.normal.background = Resources.Load("Menus/Menu_SelChar/arrow_left_a");
	leftSelectButton.active.background = Resources.Load("Menus/Menu_SelChar/arrow_left");  
	
	rightSelectButton.normal.background = Resources.Load("Menus/Menu_SelChar/arrow_right_a"); 
	rightSelectButton.active.background = Resources.Load("Menus/Menu_SelChar/arrow_right");  
}





// =====  Characters  =====

//var justRegistered : boolean;
//var startingItems : Array;
function startLocationService()
{
	// Start service before querying location
	iPhoneSettings.StartLocationServiceUpdates(10,10);
	var maxWait : int = 20;
	
	while (iPhoneSettings.locationServiceStatus == LocationServiceStatus.Initializing && maxWait > 0) 
	{
		yield WaitForSeconds(1);
		maxWait--;
	}
	
	// Service didn't initialize in 20 seconds
	if (maxWait < 1) 
		{
			print("Timed out main menu");
			located = false;
			return;
		}
	// User denied access to device location
	if (iPhoneSettings.locationServiceStatus == LocationServiceStatus.Failed) 
		{
			print("User denied access to device location");
			located = false;
			return;
		}
	located = true;
	return;
}

function stopLocationService()
{
	// Stop service if there is no need to query location updates continously
	iPhoneSettings.StopLocationServiceUpdates();
	print(" service stopped " );
}

function getMap()
{
	var	url = 	"http://maps.google.com/maps/api/staticmap?center="	+ nLat + "," + nLon + "&zoom=" + nZoom + "&size=480x350&sensor=false";
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


function logout()
{
	SetLastTimeOnline();
	scriptMain.firstLog = 0;
	var login_url = Global.server + "/mmo_iphone/login.php?logout=" + Global.myChar.id;
	var download = new WWW( login_url);
	yield download;
	
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{	
			Debug.Log( "Retrying" );
			download = new WWW( login_url);
			yield download;
		}

	if(download.error) 
		{
			wwwData = "Error! Could not connect.";
		}
	else
		{
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
	
	postData.AddField("playerzombie", Global.myChar.playerZombie +"");
	postData.AddField("stoken" , Global.myChar.soulToken +"");
	
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
		if (password_modified && sUsername!=null && PlayerPrefs.GetString("sUsername")!="") 
				hidden_password = new_password;
		
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
			
			//login2();
			bOkToRegister = true;
			Global.myChar.User = sUsername;
			yield StartCoroutine( Global.getUserData() );
			
			//var comp1 : scriptMainMenu = transform.GetComponent(scriptMainMenu);
	        //var comp2 : scriptSwipeCutScene= transform.GetComponent(scriptSwipeCutScene);
	       // comp2.enabled = true;
	       Application.LoadLevel("SceneAnimMenu");
	       // comp1.enabled = true;  
	        //curMenu = MAIN;
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


function Start()
{   
   
     Global.oldEXP = -1;
    Audio.volume = PlayerPrefs.GetFloat("nMusicVol")/100;
    Global.randomNumber = 0;
   // justRegistered = false;
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
	
	if(Application.platform == RuntimePlatform.IPhonePlayer) 
			Global.GPS_Flag = true; 
	else Global.GPS_Flag = false;
	
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
    
	//bAutoBlock = (PlayerPrefs.GetInt("bAutoBlock") == 1);
	//bAutoFriend = (PlayerPrefs.GetInt("bAutoFriend") == 1);
	//bAutoDuels = (PlayerPrefs.GetInt("bAutoDuels") == 1);

	//bAutoLoot = (PlayerPrefs.GetInt("bAutoLoot") == 1);
    
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
	//LoadTextures();
	//assignAllButtons();
	makeAllButtons();	
}


/*function assignAllButtons()
{
	optionButton = UIButton.create(mixToolkit,"options.png","options_p.png",0,0);
    optionButton.setSize(100,55);
    optionButton.position=Vector3(51,-145);
    //optionButton.onTouchDown += OptionsButtonDelegate;
    optionButton.hidden = false;
    
    /*loginButton = UIButton.create(mixToolkit,"login.png","login_p.png",0,0);
    loginButton.setSize(buttonWidth,buttonHeight);
    loginButton.position=Vector3(Screen.width*0.52,-Screen.height*0.735);
    //loginButton.onTouchDown += LoginButtonDelegate;
    loginButton.hidden = true;
	
	registerButton = UIButton.create(mixToolkit,"register.png","register_p.png",0,0);
    registerButton.setSize(160,65);
    registerButton.position=Vector3(Screen.width*0.29,-Screen.height*0.735);
    //registerButton.onTouchDown += RegisterButtonDelegate;
    registerButton.hidden = true;
    
	resetHomeBaseButton = UIButton.create(mixToolkit,"reset_homebase.png","reset_homebase_p.png",0,0);
    resetHomeBaseButton.setSize(160,55);
    resetHomeBaseButton.position=Vector3(51,200);
    resetHomeBaseButton.hidden = true;
 	//resetHomeBaseButton.onTouchDown +=ResetPasswordButtonDelegate;
    
    resetTutButton = UIButton.create(mixToolkit,"reset_homebase.png","reset_homebase_p.png",0,0);
    resetTutButton.setSize(buttonWidth,buttonHeight);
    //resetTutButton.onTouchDown +=QuitButtonDelegate;
    resetTutButton.hidden = true;
    
	playButton = UIButton.create(mixToolkit,"play.png","play_p.png",0,0);
    playButton.setSize(buttonWidth,buttonHeight);
    //playButton.onTouchDown += PlayButtonDelegate;
    playButton.hidden = true;
    
    soundButton = UIButton.create(mixToolkit,"sound.png","sound_p.png",0,0);
    soundButton.setSize(buttonWidth,buttonHeight);
    //soundButton.onTouchDown += CreateButtonDelegate;
    soundButton.hidden = true;
       
	backButton = UIButton.create(mixToolkit,"back.png","back_p.png",0,0);
	backButton.setSize(buttonWidth,buttonHeight);
	//backButton.onTouchDown += BackButtonDelegate;
    
	/*toggleRememberAccount = PlayerPrefs.GetInt("SaveAccount")!=0 ? true : fals      e;
	if(toggleRememberAccount)
		rememberAccountToggle = UIToggleButton.create (mixToolkit, "checked_selected.png","checked_idle.png","checked_selected.png",0,0);
	else
		rememberAccountToggle = UIToggleButton.create (mixToolkit, "checked_idle.png","checked_selected.png","checked_selected.png",0,0);
	rememberAccountToggle.setSize(Screen.width*0.05,Screen.height*0.05);
	rememberAccountToggle.position=Vector3(Screen.width*0.29, -Screen.height*0.67);
	rememberAccountToggle.onToggle +=RememberAccountToggle;
	rememberAccountToggle.hidden = true;*//*
}
*/
function Update() {

	if(bMute) 
		Audio.mute = true;
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
		
/*switch(curMenu)	{
		case MAIN:
			 // Main window
			//GUI.DrawTexture (Rect(0,0,480,320), texMainB, ScaleMode.StretchToFill, true, 1);
			
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
			//if(GUI.Button(Rect(51, 145, 100, 55), "", style))
				//{
					curMenu = OPTIONS;
					optionButton.hidden = false;
				//}
			
			// Reset home base
			style.active.background = texResetBase;
			style.normal.background = texResetBaseP;

			//if(GUI.Button(Rect(51, 200, 160, 55), "", style))
				//{
					curMenu = HOMEBASE;
				//}
			
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
		
		case SOCIAL: 
			// Social
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
		
		case GAMEPLAY: 
			// Gameplay
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

		case LOGIN: 
			// Login
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
		
		case REGISTER: 
			// Register
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
		
		case SELECTFACE:  
		
			// select char face
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
	}*/
}

function OnGUI()
{

	// var screenScale: float = Screen.width / 480.0;
     //var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     //GUI.matrix = scaledMatrix;

	if(bLoading)
		{
			GUI.DrawTexture (Rect(0,0,Global.screenW,Global.screenH), texLoading, ScaleMode.StretchToFill, true, 1);
			return;
		}
	
	switch(curMenu)
	{
		case MAIN:
			 // Main window
			GUI.DrawTexture (Rect(0,0,Global.screenW,Global.screenH), texMainB, ScaleMode.StretchToFill, true, 1);
			
			// Play/Resume
			//style.active.background = texResume;
			//style.normal.background = texResumeP;
			
			if(GUI.Button(Rect(Global.screenW * 0.06, Global.screenH * 0.28, Global.screenW * 0.15, Global.screenH * 0.20), "", playButton))
				{
					bLoading = true;	
	                BackgroundManager.LoadLevelSafe( "sceneMap" );
				}
			
			// Options
			//style.active.background = texOptions;
			//style.normal.background = texOptionsP;
			if(GUI.Button(Rect(Global.screenW * 0.08, Global.screenH * 0.45, Global.screenW * 0.25, Global.screenH * 0.20), "", optionsButton))
				{
					curMenu = OPTIONS;
				}
			
			// Reset home base
			//style.active.background = texResetBase;
			//style.normal.background = texResetBaseP;

			if(GUI.Button(Rect(Global.screenW * 0.08, Global.screenH * 0.63, Global.screenW * 0.38, Global.screenH * 0.19), "", resetHomeBaseButton))
				{
					curMenu = HOMEBASE;
				}
			
			// Sign Out
			//style.active.background = texSignOut;
			//style.normal.background = texSignOutP;
			if(GUI.Button(Rect(Global.screenW * 0.08, Global.screenH * 0.81, Global.screenW * 0.25, Global.screenH * 0.19), "", signOutButton))
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
			GUI.DrawTexture (Rect(0,0,Global.screenW,Global.screenH), texOptionsB, ScaleMode.StretchToFill, true, 1);
			// Sound
			//style.active.background = texSound;
			//style.normal.background = texSoundP;
			
			if(GUI.Button(Rect(Global.screenW * 0.1, Global.screenH * 0.30, Global.screenW * 0.2, Global.screenH * 0.16), "", soundButton))
				{
					curMenu = SOUND;
				}

			// Back
			//style.active.background = texBack;
			//style.normal.background = texBackP;
			if(GUI.Button(Rect(Global.screenW * 0.05, Global.screenH * 0.85, Global.screenW * 0.15, Global.screenH * 0.13), "", backButton))
				{
				   curMenu=MAIN;
				}
			/*if(GUI.Button(Rect(Global.screenW * 0.09, Global.screenH * 0.43, Global.screenW * 0.43, Global.screenH * 0.075), "Buy 1000 gold for 1 USD"))
				{
					PlayerPrefs.SetInt("buy", 1);
				}
			if(GUI.Button(Rect(Global.screenW * 0.09, Global.screenH * 0.52, Global.screenW * 0.43, Global.screenH * 0.075), "Buy 2500 gold for 2 USD"))
				{
					PlayerPrefs.SetInt("buy", 2);
				}
			if(GUI.Button(Rect(Global.screenW * 0.09, Global.screenH * 0.605, Global.screenW * 0.43, Global.screenH * 0.075), "Buy 5000 gold for 4 USD"))
				{
					PlayerPrefs.SetInt("buy", 4);
				}
			if(GUI.Button(Rect(Global.screenW * 0.09, Global.screenH * 0.695, Global.screenW * 0.43, Global.screenH * 0.075), "Buy 7000 gold for 5 USD"))
				{
					PlayerPrefs.SetInt("buy", 5);
				}*/
			if( GUI.Button( Rect(Global.screenW * 0.09, Global.screenH * 0.43, Global.screenW * 0.43, Global.screenH * 0.075), "Reset Tutorials" ) )
				{
					PlayerPrefs.SetInt("Active Tutorials", 0);
					CommonConstants.activeTutorials = PlayerPrefs.GetInt( "Active Tutorials" );
				}
		break;
		
		case SOUND: // Sound
			GUI.DrawTexture (Rect(   0,   0, Global.screenW,Global.screenH), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(   0,   0, Global.screenW * 0.233, Global.screenH * 0.25), texSound_1, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(-Global.screenW * 0.04, Global.screenH * 0.35, Global.screenW * 0.48, Global.screenH * 0.47), texSound_2, ScaleMode.StretchToFill, true, 1);
			
			// Music
			if(bMusic && !bMute)
				{
					//style.active.background = texMusicP;
					//style.normal.background = texMusic;
					
					if(GUI.Button(Rect(Global.screenW * 0.1, Global.screenH * 0.33, Global.screenW * 0.2, Global.screenH * 0.16), "", musicButton))
						{
							bMusic = !bMusic;
							bMute = false;
						}
					nMusicVol = GUI.HorizontalSlider (Rect(Global.screenW * 0.33, Global.screenH * 0.30, Global.screenW * 0.48, Global.screenH * 0.2), nMusicVol, 0, 100, styleSlider, stylePointer);
	                Debug.Log("nMusicVol e "+nMusicVol/100 + 0.297);
	                Audio.volume = nMusicVol/100;
					GUI.DrawTexture (Rect(Global.screenW * (0.297+(nMusicVol/100 * 0.4)), Global.screenH * 0.29, Global.screenW * 0.12, Global.screenH * 0.18), texSliderP, ScaleMode.StretchToFill, true, 1);
				}
			else
				{
					//style.active.background = texMusic;
					//style.normal.background = texMusicP;
					if(GUI.Button(Rect(Global.screenW * 0.1, Global.screenH * 0.33, Global.screenW * 0.2, Global.screenH * 0.16), "", musicButton))
						{
							if (bMute)
								{
									bMusic = true;
									bEffects = false;
								}
							else bMusic = !bMusic;
							bMute = false;
						}
					GUI.DrawTexture (Rect(Global.screenW * 0.33, Global.screenH * 0.30, Global.screenW * 0.48, Global.screenH * 0.2),  texSliderG, ScaleMode.StretchToFill, true, 1);
				}
			// Effects
			if(bEffects && !bMute)
				{
					//style.active.background = texEffectsP;
					//style.normal.background = texEffects;
					
					if(GUI.Button(Rect(Global.screenW * 0.1, Global.screenH * 0.50, Global.screenW * 0.2, Global.screenH * 0.16), "", effectsButton))
						{
							bEffects = !bEffects;
							bMute = false;
						}
					
					nEffectsVol = GUI.HorizontalSlider (Rect(Global.screenW * 0.33, Global.screenH * 0.48, Global.screenW * 0.48, Global.screenH * 0.2), nEffectsVol, 0, 100, styleSlider, stylePointer);
					Audio.volume = nEffectsVol/100;
					Debug.Log("nEffectsVol e "+nEffectsVol/100 + 0.297);
					GUI.DrawTexture (Rect(Global.screenW * (0.297+(nEffectsVol/100 * 0.4)), Global.screenH * 0.47, Global.screenW * 0.12, Global.screenH * 0.18),texSliderP, ScaleMode.StretchToFill, true, 1);
				}
			else
				{
					//style.active.background = texEffects;
					//style.normal.background = texEffectsP;
					
					if(GUI.Button(Rect(Global.screenW * 0.1, Global.screenH * 0.50, Global.screenW * 0.2, Global.screenH * 0.16), "", effectsButton))
						{
							if (bMute)
								{
									bEffects = true;
									bMusic = false;
								}
							else bEffects = !bEffects;
							bMute = false;
						}
					GUI.DrawTexture (Rect(Global.screenW * 0.33, Global.screenH * 0.48, Global.screenW * 0.48, Global.screenH * 0.2),  texSliderG, ScaleMode.StretchToFill, true, 1);
				}
			// Mute
			//style.active.background = bMute ? texMuteP : texMute;
			//style.normal.background = bMute ? texMute : texMuteP;
			
			if(GUI.Button(Rect(Global.screenW * 0.1, Global.screenH * 0.70, Global.screenW * 0.2, Global.screenH * 0.16), "", muteButton)) 
						bMute = !bMute;
			
			//style.active.background = bMute ? texCheck : texCheckP;
			//style.normal.background = bMute ? texCheckP : texCheck;
			
			if(GUI.Button(Rect(Global.screenW * 0.33, Global.screenH * 0.69, Global.screenW * 0.16, Global.screenH * 0.16), "", checkButton)) 
	            {
		             bMute = !bMute;
	            }
		
			// Back
			//style.active.background = texBack;
			//style.normal.background = texBackP;
			
			if(GUI.Button(Rect(Global.screenW * 0.05, Global.screenH * 0.85, Global.screenW * 0.15, Global.screenH * 0.13), "", backButton))
				{
					curMenu = OPTIONS;
				}
			
			PlayerPrefs.SetInt("bMusic", bMusic ? 1 : 0);
			PlayerPrefs.SetFloat("nMusicVol", nMusicVol);
			PlayerPrefs.SetInt("bEffects", bEffects ? 1 : 0);
			PlayerPrefs.SetInt("nEffectsVol", nEffectsVol);
			PlayerPrefs.SetInt("bMute", bMute ? 1 : 0);
		break;
		
	/*	case SOCIAL: 
			// Social
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
		
		case GAMEPLAY: 
			// Gameplay
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
*/
		case LOGIN: 
			// Login
			GUI.DrawTexture (Rect(   0,   0, Global.screenW,Global.screenH), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(   0,   0, Global.screenW * 0.22,  Global.screenH * 0.22), texLogin_1, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect( -Global.screenW  * 0.05, Global.screenH * 0.33, Global.screenW  * 0.43, Global.screenH * 0.42), texLogin_2, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(Global.screenW * 0.083,Global.screenH * 0.28,Global.screenW * 0.22,Global.screenH * 0.115), texUsername, ScaleMode.StretchToFill, true, 1);
		    sUsername = GUI.TextField (Rect (Global.screenW * 0.083,Global.screenH * 0.40,Global.screenW * 0.4,Global.screenH * 0.07), sUsername, 25);
			GUI.DrawTexture (Rect(Global.screenW * 0.083,Global.screenH * 0.53,Global.screenW * 0.22,Global.screenH * 0.115), texPassword, ScaleMode.StretchToFill, true, 1);
		    new_password = GUI.PasswordField (Rect (Global.screenW * 0.083,Global.screenH * 0.656,Global.screenW * 0.4,Global.screenH * 0.07), sPassword, "*"[0], 25);
		  
		     if (sPassword != new_password) 
			    {
			    	password_modified = true;
			    	sPassword = new_password;
			    }
		    
			// Login
			//style.active.background = texLoginP;
			//style.normal.background = texLogin;
			
			
			if(GUI.Button(Rect(Global.screenW * 0.354,Global.screenH * 0.78,Global.screenW * 0.14,Global.screenH * 0.165), "", loginButton))
				{
					login2();
					if (password_modified) 
							hidden_password = new_password;
					PlayerPrefs.SetString("sUsername", sUsername);
					PlayerPrefs.SetString("sPassword", hidden_password);
				}

			// Register
			//style.active.background = texRegisterP;
			//style.normal.background = texRegister;
			
			if(GUI.Button(Rect(Global.screenW * 0.093,Global.screenH * 0.775,Global.screenW * 0.218,Global.screenH * 0.175), "", registerButton))
				{
					sUsername="";
					sPassword="";
					sEmail="";
					curMenu = REGISTER;
				}
		 	GUI.Label (Rect(350,20,100,200), wwwData);
	
		break;
		
		case REGISTER: 
			// Register
			GUI.DrawTexture (Rect(   0,   0, Global.screenW, Global.screenH), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(   0,   0, Global.screenW * 0.325,  Global.screenH * 0.19), texRegister_1, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect( -Global.screenW * 0.05, Global.screenH * 0.3125, Global.screenW * 0.709, Global.screenH * 0.521), texRegister_2, ScaleMode.StretchToFill, true, 1);

			GUI.DrawTexture (Rect(Global.screenW * 0.083,Global.screenH * 0.265,Global.screenW * 0.185,Global.screenH * 0.575), texItems, ScaleMode.StretchToFill, true, 1);
		    sUsername = GUI.TextField (Rect (Global.screenW * 0.333, Global.screenH * 0.281, Global.screenW * 0.416, Global.screenH * 0.0625), sUsername, 25);
		    new_password = GUI.PasswordField (Rect (Global.screenW * 0.333, Global.screenH * 0.375, Global.screenW * 0.416, Global.screenH * 0.0625), sPassword, "*"[0], 25);
		 
	        if (sPassword != new_password) 
			    {
			    	password_modified = true;
			    	sPassword = new_password;
			    }
		    //sNick = GUI.TextField (Rect (160, 150, 200, 20), sNick, 25);
		    sEmail = GUI.TextField (Rect (Global.screenW * 0.333, Global.screenH * 0.468, Global.screenW * 0.416, Global.screenH * 0.0625), sEmail, 25);
		    sFirstName = GUI.TextField (Rect (Global.screenW * 0.333, Global.screenH * 0.5625, Global.screenW * 0.416, Global.screenH * 0.0625), sFirstName, 25);
		    sLastName = GUI.TextField (Rect (Global.screenW * 0.333, Global.screenH * 0.65625, Global.screenW * 0.416, Global.screenH * 0.0625), sLastName, 25);

			// Register
			//style.active.background = texRegister;
			//style.normal.background = texRegisterP;
			
			if((sEmail != "")&&(sUsername != "")&&(sPassword != ""))
				{ 
				// add more constraints to allow user to register, i.e.: e-mail is not empty 
				
					if(GUI.Button(Rect(Global.screenW * 0.541,Global.screenH * 0.831,Global.screenW * 0.21875,Global.screenH * 0.175), "", registerButton))
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
			//style.active.background = texBack;
			//style.normal.background = texBackP;
			
			if(GUI.Button(Rect(Global.screenW * 0.05, Global.screenH * 0.85, Global.screenW * 0.15, Global.screenH * 0.13), "", backButton))
				{
					curMenu = LOGIN;
				}
		break;
		
		case HOMEBASE: 
			// Home base
			GUI.DrawTexture (Rect(0,0,Global.screenW,Global.screenH), texMap, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(Global.screenW * 0.4791, Global.screenH * 40625, Global.screenW * 0.12291, Global.screenH * 0.18125), texHBZone, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(Global.screenW * 0.00935, Global.screenH * 0.739, Global.screenW * 0.981, Global.screenH * 0.24375), texHBTextBox, ScaleMode.StretchToFill, true, 1);

			// Back
			//style.active.background = texSetHBP;
			//style.normal.background = texSetHB;
			 
			if(GUI.Button(Rect(Global.screenW * 0.6875, Global.screenH * 0.775, Global.screenW * 0.252, Global.screenH * 0.121), "", setHomeBaseButton))
				{
					setHomebase2();
					if( !alertHome )
							curMenu = MAIN;				
				}
			if( alertHome ) 
			
				GUI.Window (1, Rect (Global.screenW * 0.3125, Global.screenH * 0.3125, Global.screenW * 0.4583, Global.screenH * 0.375), DoHomeBaseAlert, "", styleErrorFrame);
	
			
			if(GUI.Button(Rect(Global.screenW * 0.6875, Global.screenH * 0.9, Global.screenW * 0.252, Global.screenH * 0.0625), "Cancel"))
				{
					curMenu = MAIN;
				}
			if( alertHome ) 
				{
					//draw alert
				}
		break;
		
		case SELECTFACE:  
		
			// select char face
			GUI.DrawTexture(Rect(0, 0, Global.screenW, Global.screenH), texBackGeneral, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(0, 0, Global.screenW * 0.6458, Global.screenW * 0.1968), texSelChar, ScaleMode.StretchToFill, true, 1);
			
			
			GUI.DrawTexture(Rect(Global.screenW * 0.343, Global.screenH * 0.23, Global.screenW * 0.2916, Global.screenH * 0.6145), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            // GUI.DrawTexture(Rect(165, 130, 140, 140), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(Global.screenW * 0.302, Global.screenH * 0.84375, Global.screenW * 0.083, Global.screenH * 0.125), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(Global.screenW * 0.40625, Global.screenH * 0.84375, Global.screenW * 0.083, Global.screenH * 0.125), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(Global.screenW * 0.51041, Global.screenH * 0.84375, Global.screenW * 0.083, Global.screenH * 0.125), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(Global.screenW * 0.6145, Global.screenH * 0.84375, Global.screenW * 0.083, Global.screenH * 0.125), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
            
            if(GUI.Button(Rect(Global.screenW * 0.302, Global.screenH * 0.84375, Global.screenW * 0.083, Global.screenH * 0.125),"",""))
	            {
	               skinTone = 0;
	               selectedFace = 1;
	               selectedBody = 1;
	               texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
	               texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
	            }
             if(GUI.Button(Rect(Global.screenW * 0.40625, Global.screenH * 0.84375, Global.screenW * 0.083, Global.screenH * 0.125),"",""))
	            {
	                skinTone = 1;
	                selectedFace = 2;
	                selectedBody = 2;
	                texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
	                texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
	            }
             if(GUI.Button(Rect(Global.screenW * 0.51041, Global.screenH * 0.84375, Global.screenW * 0.083, Global.screenH * 0.125),"",""))
	            {
	                skinTone = 2;
	                selectedFace = 3;
	                selectedBody = 3;
	                texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
	                texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
	            }
             if(GUI.Button(Rect(Global.screenW * 0.6145, Global.screenH * 0.84375, Global.screenW * 0.083, Global.screenH * 0.125),"",""))
	            {
	                skinTone = 3;
	                selectedFace = 4;
	                selectedBody = 4;
	                texSelFace = Resources.Load("Menus/Menu_SelChar/headsmale/"+sTexSelFace+selectedFace);
	                texSelBody = Resources.Load("Menus/Menu_SelChar/bodies/"+sTexSelBody+selectedBody);
	            }
			
			//GUI.DrawTexture(Rect(0, 159,480,3), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
			//GUI.DrawTexture(Rect(239, 0,3,320), texSelCharFrame, ScaleMode.StretchToFill, true, 1);
			
			if(GUI.Button(Rect(Global.screenW * 0.30, Global.screenH * 0.4, Global.screenW * 0.08, Global.screenH * 0.065), "", leftSelectButton)) 
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
			if(GUI.Button(Rect(Global.screenW * 0.625, Global.screenH * 0.4, Global.screenW * 0.08, Global.screenH * 0.065), "", rightSelectButton)) 
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
            if(GUI.Button(Rect(Global.screenW * 0.30, Global.screenH * 0.65, Global.screenW * 0.08, Global.screenH * 0.065), "", leftSelectButton)) 
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
            if(GUI.Button(Rect(Global.screenW * 0.625, Global.screenH * 0.65, Global.screenW * 0.08, Global.screenH * 0.065), "", rightSelectButton)) 
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
			
			
			
			GUI.DrawTexture(Rect(Global.screenW * 0.3104, Global.screenH * 0.846, Global.screenW * 0.0729, Global.screenH * 0.1093), texTone1, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(Global.screenW * 0.4145, Global.screenH * 0.846, Global.screenW * 0.0729, Global.screenH * 0.1093), texTone2, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(Global.screenW * 0.5175, Global.screenH * 0.846, Global.screenW * 0.0729, Global.screenH * 0.1093), texTone3, ScaleMode.StretchToFill, true, 1);
            GUI.DrawTexture(Rect(Global.screenW * 0.6229, Global.screenH * 0.846, Global.screenW * 0.0729, Global.screenH * 0.1093), texTone4, ScaleMode.StretchToFill, true, 1);
            
            GUI.DrawTexture(Rect(Global.screenW * 0.4104, Global.screenH * 0.2031, Global.screenW * 0.15, Global.screenH * 0.225), texSelFace, ScaleMode.StretchToFill, true, 1);
            
            GUI.DrawTexture(Rect(Global.screenW * 0.4, Global.screenH * 0.3343, Global.screenW * 0.1875, Global.screenH * 0.46875), texSelBody, ScaleMode.StretchToFill, true, 1);
			 
			
			if(GUI.Button(Rect(Global.screenW * 0.85, Global.screenH * 0.82, Global.screenW * 0.1416, Global.screenH * 0.16875), "", backButton))
				{
					register2();
					
				} 
				
			//style.active.background = texBack;
			//style.normal.background = texBackP;
			
			if(GUI.Button(Rect(Global.screenW * 0.052, Global.screenH * 0.8125, Global.screenW * 0.1416, Global.screenH * 0.16875), "", backButton))
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
			GUI.Label(Rect((Global.screenW - (Global.myChar.Nick.length*15)), Global.screenH * 0.90, Global.screenW * 0.5, Global.screenH * 0.5), Global.myChar.Nick, guiStyle);
		}
}

function DoHomeBaseAlert (windowID : int) 
{
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame); 
	
	styleAlertTextBox.normal.textColor  = Color.white; 
	
	GUI.Label(Rect(Global.screenW * 0.0416, Global.screenH * 0.09375, Global.screenW * 0.3958, Global.screenH * 0.125), alertText, styleAlertTextBox); 
	 
	if(GUI.Button(Rect(Global.screenW * 0.1541, Global.screenH * 0.21875, Global.screenW * 0.1729, Global.screenH * 0.1125), "Close", styleButSmll))
			alertHome = false;
}