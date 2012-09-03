// Main menu
// WTFs per minute = 61;
//static var exitFromTrade : boolean; 
static var FlagStateCheck: String;
var HpRegenerat : int;
static var firstLog : int = 0;
static var s: String; 
var  d : String;

static var drawCutScenes : boolean;
var activateCutscenes : boolean;
var homeQuestion : boolean ;
var newSkin : GUISkin;
var difficultyStyle : GUIStyle;
var difficultyStyleP : GUIStyle;
var theCraft : Craft; 
var cutscenes : Texture2D[];
var indexCutscene : short = 0;
var time : double;
static var bGUI	: boolean = true;
static var bTradeWasCanceled : boolean;
static var bTradeHasFinished : boolean;
static var missionsClicked : boolean;
var goBankPrefab		: GameObject;
static var theBank		: scriptBank;
static var theInventory	: Inventory;
static var theMissions  : scriptMissions;
var goBank				: GameObject;
var tradePressed        : boolean;
var texOwen :Texture2D;
var texDavid :Texture2D;
var alertHome : boolean;
var reloadPlayers       : boolean;

var auxChat 			: Chat;
var bChatAlert 			: boolean;
var bPremiumAlert		: boolean;
var chatAlertRect 		: Rect;
var idChatAlert			: int;
var styleErrorFrame		: GUIStyle;
var styleBaseFrame		: GUIStyle;
var styleBtnCloseX		: GUIStyle;

var texInfoScreen 		: Texture2D;
var texInfoScreenSearch : Texture2D;
var texInfoScreenDiff	: Texture2D;

var theTrade	: scriptTrade;
static var bAH	: boolean;
static var bSO  : boolean;
var bBank 		: boolean;
static var bCanShowBank : boolean;
var texFrame	: Texture2D;
var texName		: Texture2D;
var texLoading	: Texture2D;
var texPers_1	: Texture2D;
var texPers_1P	: Texture2D;
var texPers_2	: Texture2D;
var texFight	: Texture2D;
var texFightP	: Texture2D;
var texMoney	: Texture2D;
var texMenuP	: Texture2D;
var texButtonShadow : Texture2D;
var texGained    : Texture2D;
var btnMMStyle 	: GUIStyle;
var btnInvStyle : GUIStyle;
var btnPInfoStyle : GUIStyle;
var styleButClear : GUIStyle;
var styleButGrayP : GUIStyle;
var styleButGray : GUIStyle;

var styleSelectedNearPlayer : GUIStyle;
var styleListNearPlayers : GUIStyle;
var styleButNearPlayer	: GUIStyle;
var styleButNearPlayerP	: GUIStyle;
var styleDifficulty		: GUIStyle;
var styleDiffP			: GUIStyle;
var styleDiff			: GUIStyle;
var scrollPosInfoP	: float;
var cntListNearPlayers : GUIContent;
var sSearchNearPlayers	: String;
var sAuxSearchNearPlayers : String;

var styleButRedSmll : GUIStyle;
var styleButBlueSmll : GUIStyle;

var bGOAreVisible : boolean;
var bShowInfoScreen : boolean;
var sDifficultyLevels : String[];

var texHead		: Texture2D;
var texHeadNP	: Texture2D;
var texTransparent	: Texture2D;
var texHomebase	: Texture2D;
var goHomebase	: GameObject;
var goHomebaseClone : GameObject;

var texEasy		: Texture2D;
var texEasyP	: Texture2D;
var texEasyS	: Texture2D;
var texMedium	: Texture2D;
var texMediumP	: Texture2D;
var texMediumS	: Texture2D;
var texHard		: Texture2D;
var texHardP	: Texture2D;
var texHardS	: Texture2D;
var texInsane	: Texture2D;
var texInsaneP	: Texture2D;
var texInsaneS	: Texture2D;
var texDifficulty : Texture2D;
var texDifficultyFrame : Texture2D;
var bDifficulty	: boolean;
var bDifficultyActive : boolean = false;

var goChar		: GameObject;
var goCharFrame	: GameObject;
static var bCharFrame	: boolean = false;
var guiStyle	: GUIStyle;
var guiCharStyle : GUIStyle;
var btnstyle : GUIStyle;

var texLoadBattle1	: Texture2D;
var texLoadBattle2	: Texture2D;
var texLoadBattle3	: Texture2D;

var bLoadBattle		: boolean = false;

var goMap		: GameObject;
var goGrid		: GameObject;

var sTmp		: String;
var wwwData		: String;

var bMMenu		: boolean = false;

var homeLon		: float;
var homeLat		: float;

var locating : boolean;
var mRequestedMob : boolean = false;

var ButonStorageApasat : int = 0;

var	styleAlertTextBox : GUIStyle;
var	alertText		: String;
var	styleButSmll : GUIStyle ;

static var CSVData: CSV = new CSV();

// DELETE THIS BLASPHEMY
var nMobType : int = 1;

var defaultLat : float;
var defaultLon : float;

var lblStyle: GUIStyle = new GUIStyle();
lblStyle.normal.textColor = Color.black;

//---------------battle zones variables
var dimArray: float[] = new float[6];
var degArray: float[] = new float[6];

var mapZones:	Array = new Array();

var texBack     : Texture2D;
var texBackP    : Texture2D;
var style : GUIStyle;

var dimKm : float = 0;
var startLat : float = 0;
var startLon : float = 0;
var zoneID : int = 0;
var texZone : Texture2D;

//razvan
var nextUpdate : float = 0.0;
var nextUpdateRate : float = 10; // in seconds, will be set to 30 in Update

var styleBut	: GUIStyle;
var styleButP	: GUIStyle;
var styleLVL 	: GUIStyle;
var styleLVLBnk : GUIStyle;
//--
var nrMobs: int = 20;

var Audio : AudioSource;

class mapZone{
//patrat de pe harta 
	var lat		: float;
	var lon		: float;
	var zone	: Rect;
	var tip		: int;
	var mobs	: int;
	var IDs		: Array;
	function mapZone(){
		IDs = new Array();
	}
}

var curZone : mapZone;

class Players{
	var id 		: String;
	var username : String;
	var lat		: float;
	var long	: float;
	var avatarid	: String;
	var nick	: String;
	var level	: String;
}
var players : Array = new Array();
var playersName : String[];
var nearPlayer : Players = new Players();
var goPlayers : GameObject[];
var goPlayerFace : GameObject;
var goPlayerFacePrefab : GameObject;
var nrOfPlayers : int;
var displayCount : int;
var nSelectedPlayer : int;
var nSelectedPlayerOld : int;
var bSelectedPlayer : boolean;
var buttonFight : Rect;
var frameNearPlayers : Rect;
var mapMinX : float;
var mapMaxX : float;
var mapMinY	: float;
var mapMaxY : float;
var MobLvL : String; 

var scrollPosition = Vector2.zero;
var updatingPlayers : boolean;
var gridSelectedPlayers : int;

var xp_to_level : int;
var black_pixel : Texture2D;
var blue_pixel : Texture2D;
var white_pixel : Texture2D;
var xp_bar_height : int;
var xp_bar_multiplier : float;


var retGetMobToFight : int = 0;
 
 
 
 function FlagState()
 {
 	var	wwwData;
	var postData : WWWForm = new WWWForm();
	postData.AddField("req_type", 1);
	postData.AddField("flag", FlagStateCheck + "");
	postData.AddField("id", Global.myChar.id + "");
	
	var login_url = Global.server + "/mmo_iphone/get_state.php";
	
	var download = new WWW(login_url, postData);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		download = new WWW(login_url, postData);
		yield download;
	}
	while (download.error && download.error.ToString().Contains("Resolving host timed out"));

	if(download.error) {
		print( "Error downloading: " + download.error );
		wwwData = "Error! Could not connect.";
		return;
	}else{
		wwwData = download.text;
		print ("A mers!" + Global.myChar.id + " " + download.text);
	}
 }
 
 function verificareFlagState()
 {
	var values : String[];
	var the_url = Global.server + "/mmo_iphone/get_state.php?req_type=0&id=" + Global.myChar.id;
	print ("url este " + the_url);
	var download = new WWW( the_url );
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
		download = new WWW( the_url );
		yield download;
	}
	if(download.error) 
		{
			print( "Error downloading: " + download.error );
			return;
		}
	else
		{
			var	wwwDat = download.text;
		} 
		
	values = Regex.Split(wwwDat,"<br />");  	
	if (values[1] != "")
		{
			 if (values[1] == "PVP") 
					{
				 		print ("PVP");
				 		s = "PVP";
				 	}
				 
			 if (values[1] == "Inactive")
					{
				 		print ("Inactive");
				 		s = "Inactive";
				 	}
		}
	else 
		{
			print("Playerul nu este flagat!" + download.text);
			s = "Error";
		} 
 } 
 
 function GetLastTimeOnline()
 {
	var values : String[];
	var the_url = Global.server + "/mmo_iphone/user_desc.php?username=" + Global.myChar.User;
	var download = new WWW( the_url );
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
		{
			download = new WWW( the_url );
			yield download;
		}
	if(download.error)
		 {
			print( "Error downloading: " + download.error );
			return;
		 }
	else
		{
		var	wwwDat = download.text;
		}

		values = Regex.Split(wwwDat,"<br />");
	if (values[25] != "")
		{
			Global.myChar.HpVechi		= parseInt(values[25]);
			Global.myChar.dataVeche		= values[26];
			Global.myChar.dataNoua		= values[27];
			RegenerareHpOffline();
		}
	else 
		{
			Global.myChar.HpVechi = Global.myChar.HP;
		}
	 
 } 
 
  function RegenerareHpOffline()
  {
  		if(Global.myChar.HpVechi > 0)
  		{ 
  			var TimpActual =  Global.myChar.dataNoua.Split("-"[0]);
  			var TimpTrecut =  Global.myChar.dataVeche.Split("-"[0]); 
  			if ( TimpActual[0] != TimpTrecut[0] || TimpActual[1] != TimpTrecut[1] || TimpActual[2] != TimpTrecut[2])
 						Global.Hp_incercare = Global.myChar.HP;
 			else if ( TimpActual[3] == TimpTrecut[3])
 				 {
 			   if ( TimpActual[4] == TimpTrecut[4])
		 			   { 
		 			   		if (parseInt(TimpActual[5]) >= parseInt(TimpTrecut[5]) + 10)
			 			   		{
			 			   		HpRegenerat = (parseInt(TimpActual[5]) - parseInt(TimpTrecut[5])) / 10 ;
			 			   		Global.Hp_incercare = Global.myChar.HpVechi + HpRegenerat;
			 			   			if (Global.Hp_incercare > Global.myChar.HP)
			 			   					Global.Hp_incercare = Global.myChar.HP;
			 			   		} 
		 			   		else  Global.Hp_incercare =  Global.myChar.HpVechi;
		 			   }
 			   
 			   else 
		 			   {
						HpRegenerat =  ((parseInt(TimpActual[4]) *60 +  parseInt(TimpActual[5])) - parseInt(TimpTrecut[4]) *60 +  parseInt(TimpTrecut[5])) /10; 
		 			     Global.Hp_incercare = Global.myChar.HpVechi + HpRegenerat;
		 			   			if (Global.Hp_incercare > Global.myChar.HP)
		 			   					Global.Hp_incercare = Global.myChar.HP;
		 			    }
	 			   
	 			 }
 			 else  
 			 { 
 				 HpRegenerat =  ((parseInt(TimpActual[3]) *3600 + parseInt(TimpActual[4]) *60 +  parseInt(TimpActual[5])) - (parseInt(TimpTrecut[3]) *3600 + parseInt(TimpTrecut[4]) *60 +  parseInt(TimpTrecut[5]))) /10; 
		 			Global.Hp_incercare = Global.myChar.HpVechi + HpRegenerat;
		 				if (Global.Hp_incercare > Global.myChar.HP)
		 			   					Global.Hp_incercare = Global.myChar.HP;  
 			 }
 		}
  }
 
function GetCharXP()
{
	var the_url = Global.server + "/mmo_iphone/level_xp.php?id=" + Global.myChar.id;
	
	var download : WWW = new WWW(the_url);
	yield download;	
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			download = new WWW(the_url);
			yield download;
		}
	
	if(download.error) 
		{
			wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			wwwData = download.text;
		}

	values = Regex.Split(wwwData,":");
	if (values[0].length > 3) 
		{
			xp_to_level = parseInt(values[0]);
		}	
	xp_bar_height = 4;
	xp_bar_multiplier = 478;
	xp_bar_multiplier /= xp_to_level;
}

function getMobToFight(charLat: float, charLong : float) 
{
	if( mRequestedMob ) //we already requested the mob.
		return;
	mRequestedMob = true;
	var tempMobLvlMin : int;
	var tempMobLvlMax : int;
	var values : String[];
	
	switch(Global.myChar.Difficulty)
		{
			case 0:
				tempMobLvlMin = 1;
				tempMobLvlMax = 9;
				break;
			case 1:
				tempMobLvlMin = 10;
				tempMobLvlMax = 19;
				break;
			case 2:
				tempMobLvlMin = 20;
				tempMobLvlMax = 29;
				break;
			case 3:
				tempMobLvlMin = 30;
				tempMobLvlMax = 39;
				break;
			case 4:
				tempMobLvlMin = 40;
				tempMobLvlMax = 49;
				break;
			case 5:
				tempMobLvlMin = 50;
				tempMobLvlMax = 0;
				break;
		}
	var postData : WWWForm = new WWWForm();
	postData.AddField("id", Global.myChar.id);
	postData.AddField("lat", charLat+"");
	postData.AddField("lon", charLong+"");
	postData.AddField("moblvlmin", tempMobLvlMin+"");
	postData.AddField("moblvlmax", tempMobLvlMax+"");	
	var login_url = Global.server + "/mmo_iphone/check_mobs.php";

	var download = new WWW(login_url, postData);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			download = new WWW(login_url, postData);
			yield download;
		}
	while (download.error && download.error.ToString().Contains("Resolving host timed out"));
	
	if(download.error) 
		{
			print( "Error downloading: " + download.error );
			wwwData = "Error! Could not connect.";
			mRequestedMob = false;
			return;
		}
	else
		{
			wwwData = download.text;
			mRequestedMob = false;
		}

	if(wwwData.IndexOf("No mobs", 0) > 0) 
		{
			retGetMobToFight = 0; 
		}
	else
	{
		
		values = Regex.Split(wwwData,"<br />");
		if (values[2].length == 0) retGetMobToFight = 0;
		Global.enemyChar.id			= parseInt(values[0]);
		Global.enemyChar.mobname 	= values[1];
		Global.enemyChar.mobModel	= values[2];
		Global.enemyChar.HP			= parseInt(values[3]);
		Global.enemyChar.ENRG		= parseInt(values[4]);
		Global.enemyChar.REGEN		= parseInt(values[5]);
		Global.enemyChar.DEF		= parseInt(values[6]);
		
		if(values[7].length-1 > values[7].IndexOf("-") && values[7].IndexOf("-") > 0)
			{
				Global.enemyChar.ATKMIN = parseInt(Regex.Split(values[7], "-")[0]);
				Global.enemyChar.ATKMAX = parseInt(Regex.Split(values[7], "-")[1]);
				Global.enemyChar.ATK = Random.Range(Global.enemyChar.ATKMIN,Global.enemyChar.ATKMAX+1);
			}
		else
			{
				Global.enemyChar.ATK		= parseInt(Regex.Split(values[7], "-")[0]);
				Global.enemyChar.ATKMIN =  Global.enemyChar.ATKMAX = Global.enemyChar.ATK;
			}
		// TODO: Range
		//Global.enemyChar.ATK		= parseInt(values[6]);
		Global.enemyChar.EVASION	= parseFloat(values[8]);
		Global.enemyChar.SpecialCD	= values[9].length > 0 ?parseInt(values[9]):1;
		Global.enemyChar.LVL		= parseInt(values[12]);
		if (values[10] != ""){
		Global.enemyChar.specialMob	= parseInt(values[10]);;
			if (parseInt(values[10]) == 1)
				{
					Global.enemyChar.photosNames = values[11];
				}
		}
		else Global.enemyChar.specialMob = 0;
		
		retGetMobToFight = 1;

	}	
}

function checkMob(id : int){
	var i : int;
	var mob : Mob;
	var values : String[];
	
	for(i = 0; i < Global.mobs.length; i++)
		{
			mob = Global.mobs[i];
			if(mob.id == id) return;
		}
	
	var login_url = Global.server + "/mmo_iphone/mobs.php?id=" + id;
	
	var download = new WWW( login_url );
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW( login_url );
			yield download;
		}

	if(download.error)
		 {
				wwwData = "Error! Could not connect.";
				return;
		 }
	else
		{
			wwwData = download.text;
		}

	if(wwwData.IndexOf("Invalid mob ID", 0) > 0) 
		return; 
	else
	{
		mob = new Mob();
		values = Regex.Split(wwwData,"<br />");
		mob.id		= id;
		mob.mobname	= values[0].Substring(3, values[0].length-3);
		mob.HP		= parseInt(values[1]);
		mob.ENRG	= parseInt(values[2]);
		mob.REGEN	= parseInt(values[3]);
		mob.DEF		= parseInt(values[4]);
		
		var values2		= Regex.Split(values[5], "-");
		mob.ATK		= parseInt(values2[0]);
		
		mob.EVASION	= parseInt(values[6]);
		
		Global.mobs.Add(mob);
	}
}

function getMob(id : int) : Mob{
	var i : int;
	var mob : Mob;
	
	for(i = 0; i < Global.mobs.length; i++)
		{
			mob = Global.mobs[i];
			if(mob.id == id) 
				{
					return mob;
				}
		}
	return null;
}

//--------- special battle zones
class specialZone
{
	var latMin: float;
	var latMax: float;
	var lonMin: float;
	var lonMax: float;
	var tip:	int;
	var IDs:	Array;
	var zoneName : String;
	function specialZone()
		{
			IDs = new Array();
		}
}
var specialZonesStr		: String = "";
var specialZones		: Array;
var specialZonesLoaded	: boolean;

//------------------------
var visible:	boolean;
var located: 	boolean;
var ready:		boolean;
static var lat: 		float;
static var lon: 		float;
var hAcc:		float;
var vAcc:		float;
var zoom:		int;
var mapTex:		Texture;
var dist:		float;
var user:		String = "";

// Notifications
var lastTime		: float;
var WWWResult		: String;
var nUserID			: int;
var bNewChat		: boolean;
var bNewTrade		: boolean;
var bNewXP          : int;
var bUpdating		: boolean;
var sTo				: String;
var sNick			: String;
static var sFrom	: String;
var values			: String[];
static var nTradeState		: int;
static var bTrade			: boolean;
var blinkTime		: float;
var bBlink			: boolean;
var texCrosshair 			: Texture2D;

function Awake()
{  
	
	if ( firstLog == 0 )
		{
			GetLastTimeOnline();
			firstLog = 1;
		}
	bNewXP = 0;
	Resources.UnloadUnusedAssets();
	BackgroundManager.activeScene = BackgroundManager.MAP;	
	tradePressed = false;
	Global.bDifficultySelected = false;
	bGOAreVisible = true;
	updatingPlayers = true;
	defaultLat = 44.411172;
 	defaultLon = 26.070458;
 	activateCutscenes = false;
 	homeQuestion = false;
 	
	Global.myChar.init("PC", "Animations/Character1.5", Vector3(-24.5, -7.2, 20), Vector3(16, 16, 16), Vector3(-21, -3, 15), Vector3(-21, -3, 15), 1);
	texHead = Resources.Load("Menus/Menu_SelChar/Faces/fata_mic_"+ Global.myChar.AvatarId);
//	texCrosshair = Resources.Load("Menus/Crosshair.png");
     
	sDifficultyLevels = new String[6];
	sDifficultyLevels[0] = "1-9";
	sDifficultyLevels[1] = "10-19";
	sDifficultyLevels[2] = "20-29"; 
	sDifficultyLevels[3] = "30-39"; 
	sDifficultyLevels[4] = "40-49";
	sDifficultyLevels[5] = "50+";  
	switch(Global.myChar.Difficulty)
	{
		case 0:
			texDifficulty = texEasyS;
			break;
		case 1:
			texDifficulty = texMediumS;
			break;
		case 2:
			texDifficulty = texHardS;
			break;
		case 3:
			texDifficulty = texInsaneS;
			break;
	}
	
	specialZones = new Array();
	//-------------
	dimArray[0] = 0.0054;
	dimArray[1] = 0.0076;
	dimArray[2] = 0.0108;
	dimArray[3] = 0.0158;
	dimArray[4] = 0.0311;
	dimArray[5] = 0.3095;
	
	degArray[0] = 0;
	degArray[1] = 45;
	degArray[2] = 60;
	degArray[3] = 70;
	degArray[4] = 80;
	degArray[5] = 89;
	//--------------
	specialZonesLoaded = false;
	visible = false;
	located = false;
	ready = false;
	lat = 0;
	lon = 0;
	hAcc = 0;
	vAcc = 0;
	zoom = 15;
	mapTex = null;
	
	bLoadBattle = false;
	nMobType = Random.Range(1, 5);
	goPlayerFace = Instantiate( goPlayerFacePrefab );
	//z = -maincamera.z + 23(where we need to dispaly the face to be behind any other scene object, but in from of the map)
	var tempX = 480 * 0.5;
	var tempY = 320 * 0.5;
	goPlayerFace.transform.position = camera.ScreenToWorldPoint(Vector3( tempX, tempY,265 - camera.transform.position.z));
	goPlayerFace.transform.localScale = Vector3( 3, 3, 3);
	//goPlayerFace.renderer.materials[0].color = Color.clear;
	goPlayerFace.renderer.material = Resources.Load("Menus/Menu_SelChar/Faces/face_mic_"+Global.myChar.AvatarId, Material);
	goPlayerFace.renderer.enabled = true;
	goPlayerFace.name = "-1";
	nSelectedPlayer = -1;
	nSelectedPlayerOld = -1;
	gridSelectedPlayers = -1;
	bSelectedPlayer = false;
	buttonFight = Rect(370, 255, 93, 72);
	//frameNearPlayers = Rect(380, 80, 100, 150);
	frameNearPlayers = Rect(125, 75, 170, 150);
	
	styleLVL.normal.textColor = Color.white;
	styleLVL.alignment = TextAnchor.MiddleLeft;
    styleLVLBnk.normal.textColor = Color.white;
	styleLVLBnk.alignment = TextAnchor.MiddleLeft;
	theTrade = gameObject.GetComponent(scriptTrade);
	theTrade.GetTradeItems();
	theCraft = GetComponent(Craft);
	goBank = Instantiate(goBankPrefab);
	theBank = goBank.GetComponent(scriptBank);
	theInventory = gameObject.GetComponent(Inventory);
	// Notifications
	bNewChat = false;
	bNewTrade = false;
	
	nUserID = Global.myChar.id;
	sNick = Global.myChar.Nick;
	sTo = "admin";
	bTrade = false;
	nTradeState = 0;
	GetCharXP();	

	locating = false;
	startLocationService();
	theMissions = transform.GetComponent(scriptMissions);

}

//-------------------------------
function startLocationService(){
	
	locating = true;
	iPhoneSettings.StartLocationServiceUpdates(10,10);
	// Wait until service initializes
	var maxWait : int = 10;
	while (iPhoneSettings.locationServiceStatus == LocationServiceStatus.Initializing && maxWait > 0)
		{
			yield WaitForSeconds(1);
			maxWait--;
		}
	
	// Service didn't initialize in 20 seconds
	if (maxWait < 1) 
		{
			print("Timed out");
			located = false;
			locating = false;
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
	locating = false;
	checkDistance();
	return;
}

//-----------------------------
function stopLocationService()
{
	// Stop service if there is no need to query location updates continously
	iPhoneSettings.StopLocationServiceUpdates();
}

function loadSpecialZones()
{
	specialZonesLoaded = false;
	specialZonesStr = "";
	specialZones.Clear();
	var values : String[];
	var values2 : String[];
	var values3 : String[];
	
	var minLat: float = lat - dimKm;
	var maxLat: float = lat + dimKm;
	var minLon: float = lon - dimKm;
	var maxLon: float = lon + dimKm;

	var param: String = "lat1=" + minLat + "&lat2=" + maxLat + "&lon1=" + minLon + "&lon2=" + maxLon;
	
	var url = Global.server + "/mmo_iphone/check.php?" + param;
	
	var Download : WWW = new WWW (url);	
	yield Download;
	while (Download.error && Download.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			Download  = new WWW (url);	
			yield Download;
		}
	
	specialZonesStr = Download.text;


	values = Regex.Split(specialZonesStr,"<br />");

	var n : int = parseInt(values[0]);
	var i : int;
	var j : int;
	
	for(i=0; i<n;i++)
	{
		var zone : specialZone = new specialZone();
		var nMobs : int = 0;

		values2 = Regex.Split(values[i+1], "!!");
		values3 = Regex.Split(values2[0],",");
		for(j=0; j<values3.length; j++)
			{
				if(values3[j]!="")
					{
						zone.IDs.Push(parseInt(values3[j]));
						checkMob(parseInt(values3[j]));
						nMobs++;
					}
			}
		
		values3 = Regex.Split(values2[1], ",");
		zone.latMin = parseFloat(values3[0]);
		zone.latMax = parseFloat(values3[1]);
		zone.lonMin = parseFloat(values3[2]);
		zone.lonMax = parseFloat(values3[3]);
		zone.tip = 13;
		zone.zoneName = values2[2];
		
		if(nMobs > 0) specialZones.Push(zone);
	}

	specialZonesLoaded = true;
    scriptBattle.intoMap = false;
	ready = true;
}

function checkSpecialZone(zone: mapZone){
	for (var i: int = 0;i<specialZones.length;i++)
		{
			var zn: specialZone = specialZones[i];
			if ((zone.lat>=zn.latMin)&&(zone.lat<=zn.latMax)&&(zone.lon>=zn.lonMin)&&(zone.lon<=zn.lonMax))
				{
					zone.tip = zn.tip;
					//genereaza ID mob pentru "zone", in functie de lista de ID-uri din "zn"
					//aceasta facilitate trebuie implementata (de creat algoritm generare mob)
					//momentan iau primul ID din lista
					zone.mobs = zn.IDs.length;
					zone.IDs = zn.IDs;
					break;
				}
		}
}

//-----------------------------
function loadMap()
{
	startLocationService();	
}
function getNearPlayers()
{

    reloadPlayers = false;
	
	var minLat: float = lat - dimKm;
	var maxLat: float = lat + dimKm;
	var minLon: float = lon - dimKm;
	var maxLon: float = lon + dimKm;
	
	var templat : float;
	var templong : float;
	var values : String[];
	var tempdata : String[];
	
	mapMinX = lat - dimKm;
	mapMaxX = lat + dimKm;
	mapMinY = lon - dimKm;
	mapMaxY = lon + dimKm;
	
	homeLon = 480 - Mathf.Round(480 *(((lon-Global.myChar.home_lon)/(maxLon-minLon)) + 0.5));// - 29;
	homeLat =  320 - Mathf.Round(320 *(((lat-Global.myChar.home_lat)/(maxLat-minLat)) + 0.5));// - 29;

	/*
	goHomebase.transform.position = camera.ScreenToWorldPoint(Vector3(
			homeLon,
			homeLat,
			265 - camera.transform.position.z));
			
	goHomebase.transform.localScale = Vector3(3,0.1,3);
	goHomebase.renderer.material.mainTexture = Resources.Load("Menus/Menu_Homebase/homebase_zone");
	*/
	if(goHomebaseClone)
	 Destroy(goHomebaseClone);
	goHomebaseClone = Instantiate(goHomebase);
	goHomebaseClone.transform.position = camera.ScreenToWorldPoint(Vector3( homeLon, homeLat,265 - camera.transform.position.z));

	var	the_url = Global.server + "/mmo_iphone/position1.php?lat1="+minLat+"&lat2="+maxLat+"&lon1="+minLon+"&lon2="+maxLon+"&user_id="+Global.myChar.id;

	var download : WWW = new WWW(the_url);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			download = new WWW(the_url);
			yield download;
		}

	if(download.error) 
		{
			print( "Error downloading: " + download.error );
		}
	else
		{
		
		}
	players.Clear();
	
	if(nrOfPlayers > 0)
		{
			for(var i= 0; i < nrOfPlayers; i++)
				{
					Destroy(goPlayers[i]);
				}
		}	
	values = Regex.Split(download.text,"<br />");
	nrOfPlayers = parseInt(values[0]);
	playersName = new String[nrOfPlayers];
	if(nrOfPlayers > 0)
		{
			goPlayers = new GameObject[nrOfPlayers];	
		
			for(i = 0; i < nrOfPlayers;i++)
			{
				tempdata = Regex.Split(values[i+1],";");	
				var nearplayer = new Players();
				nearplayer.id = tempdata[0];
				nearplayer.username = tempdata[1];
				nearplayer.avatarid = tempdata[2];
				templat = parseFloat(tempdata[3]);
				templong = parseFloat(tempdata[4]);
		
				if((maxLon-minLon!=0)&&(maxLat-minLat!=0))
					{
						nearplayer.long = 480 - Mathf.Round(480 *(((lon-templong)/(maxLon-minLon)) + 0.5));// + Random.Range (-50, 50);
						nearplayer.lat =  320 - Mathf.Round(320 *(((lat-templat)/(maxLat-minLat)) + 0.5));// + Random.Range (-100, 100);
						//added by Claudiu
			          //  nearplayer.long = parseFloat(tempdata[3]);
			          //  nearplayer.lat = parseFloat(tempdata[4]);
			            nearplayer.nick = tempdata[5];
						nearplayer.level = tempdata[6];
						players.Add(nearplayer);
						playersName[i] = nearplayer.nick;
						displayCount = 0;
									
						goPlayers[i] = Instantiate(goPlayerFacePrefab);
						//z = -maincamera.z + 23(where we need to dispaly the face to be behind any other scene object, but in from of the map)
						goPlayers[i].transform.position = camera.ScreenToWorldPoint(Vector3(nearplayer.long,nearplayer.lat,265 - camera.transform.position.z));
						goPlayers[i].transform.localScale = Vector3(3,3,3);
						goPlayers[i].renderer.material = Resources.Load("Menus/Menu_SelChar/Faces/face_mic_"+nearplayer.avatarid, Material );
						goPlayers[i].renderer.enabled = true;
						goPlayers[i].name = i.ToString();
						if((i == nSelectedPlayer)&&(bSelectedPlayer))
							goPlayers[nSelectedPlayer].renderer.materials[0].color = Color.red;
					}
			}
		}
	else
		{
			displayCount = 0;
		}

}

function updatePlayerPos()
{
	var values1 : String[];
	var values2 : String[];
	var the_url = Global.server + "/mmo_iphone/position.php?lat="+lat+"&lon="+lon+"&id="+Global.myChar.id;

	var download : WWW = new WWW(the_url);
    yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW(the_url);
		    yield download;
		}
	
	if(download.text != "0")
		{
				values1 = Regex.Split(download.text,"<br />");
				values2 = Regex.Split(values1[0],";");
				Global.sZoneName = values2[1];
				Global.sZoneNameToDisplay = values2[1];
		}

}
//-------------------------------
function reLoadMap()
{
	//---------google map

	var url = "http://maps.google.com/maps/api/staticmap?center="+lat+","+lon+"&zoom="+zoom+"&size=480x320&sensor=false";

	
	var download : WWW = new WWW (url);
	yield download; // Wait for download to complete
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW (url);
			yield download; // Wait for download to complete
		}
	

	mapTex=download.texture;
	//ready = true;
	
	//--------zones map
	/*
	incarca mai intai zonele speciale de pe server
	dupa incaracrea acestora, specialZonesLoaded -> true
	iar in update: if(specialZonesLoaded) then genereaza toate patratele care le vad
	indiferent ca acestea sunt intr-o zona speciala sau nu
	adik: - zoneID = getStartZoneID();
		  - detZones();
	momentan acest lucru nu este facut deoarece serverul nu functioneaza, si sunt generate direct zonele random,
	fara a mai tine cont de zonele speciale
	*/
	loadSpecialZones();
	//zoneID = getStartZoneID();
	//detZones();
}

//----det battle zones functions-----------
function getStartZoneID(): int
{
	var ID: int = -1;
	for (var i: int=0;i<degArray.length;i++)
		{
			var act: float = degArray[i];
			if (Mathf.Abs(lat)>=act) ID = i;
			else break;
		}
	if (ID == -1) return -1;
	//----
	var curLat: float = degArray[ID];
	var dimAux : float = dimArray[ID+1] - dimArray[ID];
	var difAux : float = degArray[ID+1] - degArray[ID];
	var nrK : int = 0;
	dimKm = dimArray[ID];
	while (curLat+dimKm<Mathf.Abs(lat))
		{
			nrK++;
			curLat += dimKm;
			var difAct: float = curLat - degArray[ID];
			var dimAct: float = difAct*dimAux/difAux;
			dimKm = dimArray[ID] + dimAct;
		}
	startLat = curLat;
	//-------
	var curLonInt: int = Mathf.Abs(lon);
	var curLon: float = curLonInt;
	var nrK1: int = 0;
	while (curLon + dimKm<Mathf.Abs(lon))
		{
			nrK1++;
			curLon+=dimKm;
		}
	startLon = curLon;
	/*
	var dimTot : float = dimArray[ID+1] - dimArray[ID];
	var difTot : float = degArray[ID+1] - degArray[ID];
	
	var difAct : float = lat - degArray[ID];
	var dimAct : float = difAct*dimTot/difTot;
	
	var dimKm : float = dimArray[ID] + dimAct;
	*/
	return nrK+nrK1;
}

function detZones()
{
	zoneID = zoneID%nrMobs;
	var startID = zoneID;
	
	mapZones.Clear();
	var difLat : float = Mathf.Abs(lat) - startLat;
	var difLon : float = Mathf.Abs(lon) - startLon;
	var pozLat : float = 160 - (240-240*difLat/dimKm) - 240;
	var pozLon : float = 180 - (240-240*difLon/dimKm) - 240;
	
	var curLat: float = startLat + dimKm;
	var curLon: float = startLon - dimKm;
	
	for (var j:int = 0;j<3;j++)
		{
			for (var i:int = 0;i<3;i++)
				{
					var zn: mapZone = new mapZone();
					var zone: Rect = new Rect(pozLon + i*240, pozLat + j*240, 240, 240);
					zn.zone = zone;
					zn.mobs = 1;
					zn.IDs.Add((startID+i)%nrMobs);
					zn.lat = curLat;
					zn.lon = curLon;
					zn.tip = 0;
					
					checkSpecialZone(zn);
					mapZones.Push(zn);
					
					curLon+=dimKm;
				}
			startID = startID-1;
			startID = startID%nrMobs;
			
			curLat = curLat - dimKm;
			curLon = startLon - dimKm;
		}
	//var zone: Rect = new Rect(pozLon,pozLat,240,240);
	//mapZones.Push(zone);
}

function inviteTrade(response : int){
	var postData = new WWWForm();
	postData.AddField("id", nUserID);
	if(!sTo) sTo = "";
	postData.AddField("to", sTo);
	postData.AddField("resp", response);

	var upload : WWW = new WWW(Global.server + "/mmo_iphone/invite_trade.php", postData);
	yield upload;
	while (upload.error && upload.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			upload = new WWW(Global.server + "/mmo_iphone/invite_trade.php", postData);
			yield upload;
		}
}

function getUpdates(){
	var values : String[];
	
	if(Time.timeSinceLevelLoad > lastTime + 5)
	{
		bUpdating = true;
		var download : WWW = new WWW(Global.server + "/mmo_iphone/notification.php?id=" + nUserID);
		yield download;
		while (download.error && download.error.ToString().Contains("Resolving host timed out"))
			{
				download = new WWW(Global.server + "/mmo_iphone/notification.php?id=" + nUserID);
				yield download;
			}
		if(!download.error && download.text.length > 4)
		{
			values = Regex.Split(download.text, ";");
			bNewChat = values[0][3] == "1";
			if(values[1][0]=="1")
				{
					sFrom = values[2];
					if(nTradeState == 4) nTradeState = 1; 
						else
							{
								bNewTrade = true;
			                    bTrade = true;
								nTradeState = 3;
							}
				}
			else if(values[1][0]=="2")
				{
					nTradeState = 2;
					bNewTrade = false;
				}
		}
				
		bUpdating = false;
		lastTime = Time.timeSinceLevelLoad;
	}
}

function Start()
{  // exitFromTrade = false;
    scriptMissions.GoMission = null;
    drawCutScenes = false;
    missionsClicked = false;
    Audio.volume = scriptMainMenu.nMusicVol/100;
    if(scriptMainMenu.bMute) Audio.mute = true;
                else Audio.mute = false;
    reloadPlayers = true;            
	UpdateLoop();
}

function UpdateLoop()
{
	while( !ready ) 
		yield WaitForSeconds(0.5);
	var hits : RaycastHit[];
	hits = Physics.RaycastAll(camera.ScreenPointToRay(Vector3(240,160,0)));
	for(var i=0;i<hits.length;i++)
		{
			var hithomebase: RaycastHit = hits[i];
			if(hithomebase.transform.CompareTag("homebase"))
				{
					Global.sZoneNameToDisplay = "homebase";
					bCanShowBank = false;
					break;
				}
		}
	if(i<hits.length)
		bCanShowBank = true;

	if (specialZonesLoaded) 
		{
			zoneID = getStartZoneID();
			detZones();
			specialZonesLoaded = false;
		}

	updatePlayerPos();
	getNearPlayers();
	
	yield WaitForSeconds(5);	
}
//-------------------------------
function Update(){ 

	blinkXPbar();
  
	if (!Application.isPlaying) 
		{
			stopLocationService();
		}
    if(!Inventory.bInventory &&	!Inventory.bPlayerEq)
        Inventory.bIsSelItemHigh = false;
	if ( iPhoneSettings.locationServiceStatus == LocationServiceStatus.Stopped ) 
		{
			startLocationService();		
		}
	if( !located && !locating )
		startLocationService();
	if(activateCutscenes && time+1<Time.time)
		{
			indexCutscene++;
						  
			if(indexCutscene>=5)
				{
					activateCutscenes=false;
					//sigur vrei asta sa fie casa ta
					homeQuestion = true;
				}		
		}
	if (!located) return;
	
	var newLat: float;
	var newLon: float;
	if (Global.GPS_Flag)
		 {
			newLat = iPhoneInput.lastLocation.latitude;
			newLon = iPhoneInput.lastLocation.longitude;
		 } 
	else 
		{
			newLat = defaultLat;
			newLon = defaultLon;
		}
	if ((newLat!=lat)||(newLon!=lon))
		 {
			lat = newLat;
			lon = newLon;
			hAcc = iPhoneInput.lastLocation.horizontalAccuracy;
			vAcc = iPhoneInput.lastLocation.verticalAccuracy;
	
			checkDistance();
			reLoadMap();			 
		 }
	if( !ready ) return;
	
	
	//TODO: add touch player tooltip
	//only if there is nothig else displayed, like inventory, player stats etc.
	if(bGUI&&(!Inventory.bInventory)&&(!Inventory.bPlayerEq)&&(!Craft.bCraft)&&!bShowInfoScreen)
	{
		//only for single touch
		if (iPhoneInput.touchCount == 1)
    	{
    		var touch = iPhoneInput.GetTouch(0); 
       		if(touch.phase == iPhoneTouchPhase.Began)
        	{
        		if(!buttonFight.Contains(Vector2(touch.position.x,320 - touch.position.y)) 																		&&!frameNearPlayers.Contains(Vector2(touch.position.x,320 - touch.position.y))){

        			var ray = camera.ScreenPointToRay (Vector3(touch.position.x,touch.position.y,0));

					var hit : RaycastHit;
					nSelectedPlayerOld = nSelectedPlayer;
					
					if (Physics.Raycast (ray, hit))
						 {
							if(hit.transform.CompareTag("nearplayer"))
								{
									nSelectedPlayer = parseInt(hit.transform.name);
									if(nSelectedPlayer!=nSelectedPlayerOld)
										{
											bSelectedPlayer = true;
											goPlayers[nSelectedPlayer].renderer.materials[0].color = Color.red;
											goPlayers[nSelectedPlayerOld].renderer.materials[0].color = Color.clear;
											goPlayerFace.renderer.materials[0].color = Color.green;
										}
									else
										{
											bSelectedPlayer = !bSelectedPlayer;
											goPlayers[nSelectedPlayer].renderer.materials[0].color = bSelectedPlayer ? Color.red: Color.clear;
											goPlayerFace.renderer.materials[0].color = bSelectedPlayer ? Color.green : Color.clear;
										}						
								}
							else
								{
									bSelectedPlayer = false;
									nSelectedPlayer = -1;
									goPlayers[nSelectedPlayerOld].renderer.materials[0].color = Color.clear;
									goPlayerFace.renderer.materials[0].color = Color.clear;
								}
						}
        		}
        		else
	        		{}
        	}	
    	}
	}
	if(bShowInfoScreen && iPhoneInput.touchCount > 0)
		{
			touch = iPhoneInput.GetTouch(0); 
			if(touch.phase == iPhoneTouchPhase.Moved)
				{
		    		//only dragging
		    		if(frameNearPlayers.Contains(Vector2(touch.position.x,320 -touch.position.y)))
		    			scrollPosition.y += touch.deltaPosition.y;
				}
	
		}
	getUpdates();

	bCanShowBank = true;
  
}

function shouldGUI() : boolean
{
	return ((!Inventory.bInventory)&&(!Inventory.bPlayerEq)&&(!Craft.bCraft)&&(!scriptAH.bSell)&&(!theMissions.getMissions() )													
		&&(!scriptAH.bBuy)&&(!scriptChat.bChat)&&(!scriptAH.bExpired)&&(!scriptTrade.bInitialized)&&(!bShowInfoScreen)&&(!theBank.bInventory));
}

function OnGUI()
{ 


   
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
    
     GUI.matrix = scaledMatrix;
     if (scriptBattle.getRewarded)
                {
                     GUI.DrawTexture(Rect(120, 40, 230, 170), texGained, ScaleMode.StretchToFill, true, 1); 
                     GUI.Label(Rect(195, 45, 200, 20), "You have gained :"); 
                     var kkt = 0;
//                     while(kkt<scriptMissions.buildingRewardIc.length)
//                     {
//               var      texLootIcon = Resources.Load("Menus/Inventory/Icons/" +scriptMissions.buildingRewardIc[kkt] );                     
//                    GUI.DrawTexture (Rect(130, 80+kkt*25, 22, 22), texLootIcon, ScaleMode.StretchToFill, true, 1);
//                    GUI.Label(Rect(155, 80 + kkt*25, 100, 22), scriptMissions.buildingRewardNames[kkt].ToString()); 
//                  
//                      kkt++;
//                    }
                    if(GUI.Button(Rect(195, 207, 70, 25),"Ok", styleBut))
	                    {
	                        scriptBattle.getRewarded = false;                    
	                    }
                }

      
    if ( scriptMissions.InfoWindowActivated )
	{
		theMissions.setMissions( false );
		GUI.Window(0, Rect (110, 70, 250, 180),MissionInfoWindow,"Mission Information");
	}
    
   /* 
   if(homeQuestion){
   
    	GUI.Window(0,Rect(120,50,270,200),homeFunction,"",styleBaseFrame);
    	
   		 
    }
    */

	//set skin for scroll bars
	//GUI.skin.horizontalScrollbar = newSkin.horizontalScrollbar;
	//GUI.skin.horizontalScrollbarThumb = newSkin.horizontalScrollbarThumb;
	GUI.skin.verticalScrollbar = newSkin.verticalScrollbar;
	GUI.skin.verticalScrollbarThumb = newSkin.verticalScrollbarThumb;
	//GUI.skin = null;
	
	if(bLoadBattle  || scriptBattle.intoMap)
		{
	  /*  if(Global.CES!=0){
	   if(Global.CES == 1) GUI.DrawTexture (Rect(0,0,480,320), texOwen, ScaleMode.StretchToFill, true, 1);
	    else if(Global.CES ==2) GUI.DrawTexture (Rect(0,0,480,320), texDavid, ScaleMode.StretchToFill, true, 1);
	    
	    
	}else 
	*/
	     if(Global.randomNumber <= 0.33)
			GUI.DrawTexture (Rect(0,0,480,320), texLoadBattle1, ScaleMode.StretchToFill, true, 1);
	        else if(Global.randomNumber > 0.33 && Global.randomNumber <= 0.66)
	            GUI.DrawTexture (Rect(0,0,480,320), texLoadBattle2, ScaleMode.StretchToFill, true, 1);
	            else GUI.DrawTexture (Rect(0,0,480,320), texLoadBattle3, ScaleMode.StretchToFill, true, 1);
		//	GUI.DrawTexture(Rect(0,0,480,320),texLoadBattle, ScaleMode.StretchToFill, true, 1);
			return;
		}

	//loadMap(); //RADU.. this starts location services.. whici is also in updates.

	if (!ready && !scriptBattle.intoMap) 
		{
			GUI.DrawTexture(Rect(0,0,480,320), texLoading, ScaleMode.StretchToFill, true, 1);
			return;
		}
	//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
	CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_MAIN );

	if (ready && mapZones.length > 0) 
	{
		// Show the map
		goMap.renderer.material.mainTexture = mapTex;
		var zn: mapZone = mapZones[0];
		//GUI.DrawTexture(Rect(0,0,480,320),mapTex, ScaleMode.StretchToFill, true, 1);
		//if(curZone.IDs.length != 0) goMap.renderer.material.mainTexture = mapTex;
		goGrid.renderer.material.mainTextureOffset = Vector2((1 - ((zn.zone.x + 240) / 240)), ((480 + zn.zone.y)/320));
		mapTex.mipMapBias = -12;
		goMap.renderer.material.mainTexture.mipMapBias = -12;
		//"numbers that might mean something" draw only if inventory is not active
		if(shouldGUI())
		//if(bGUI&&(!Inventory.bInventory)&&(!Inventory.bPlayerEq)&&(!Craft.bCraft))
			{
				for (var i:int = 0;i<mapZones.length;i++)
					{
						zn = mapZones[i];
						var zone: Rect = zn.zone;
						if(zone.Contains(Vector2(240, 160)) && zn.tip == 13)
							{
								curZone = zn;
							}
					}
			}
		//---------- middle screen
		//GUI.DrawTexture(Rect(237,157,6,6),mainScript.tex.texSpecialQuad, ScaleMode.StretchToFill, true, 1);
		// Fight, don't draw if inventory is opened
		if(shouldGUI())
		//if(!scriptTrade.bInitialized && !scriptAH.bSell && !scriptAH.bBuy && !scriptAH.bExpired)
		{  
			Global.CES = 0;
			style.active.background = texFightP;
			style.normal.background = texFight;
			if(GUI.Button(buttonFight, "", style))
				{
			        Inventory.bInventory = false;
					Craft.bCraft = false;
					Inventory.bResetSelItem = true;
					bAH = false;
			        bSO = false;
					bTrade = false;
					scriptTrade.bTrade = false;
					scriptAH.bSell = false;
					scriptAH.bBuy = false;
					scriptAH.bExpired = false;
					theBank.bInventory = false;
					scriptChat.bChat = false;
					bShowInfoScreen = false;
			
					scriptTrade.bInitialized = false;
					scriptTrade.bTrade = false;
					scriptTrade.bGUIFrame = false;
					// bGUI = true;
					theMissions.setMissions( false );
					Global.bDifficultySelected = true;
					bSelectedPlayer = false;
					
				}
		}
	}
	else
		{
			GUI.DrawTexture(Rect(0,0,480,320), texLoading, ScaleMode.StretchToFill, true, 1);
		}
	
	/*if(bTradeWasCanceled){
		showGameObjects();
		bTradeWasCanceled = false;
	}*/

	// Char frame like a button
	style.active.background = texTransparent;
	style.normal.background = texTransparent;
	
	
	if(!scriptTrade.bInitialized && !scriptAH.bSell && !scriptAH.bBuy && !scriptAH.bExpired)
	if(GUI.Button(Rect( 5, 110, 113, 160), "", style))
		{
		
			bCharFrame = !bCharFrame;
			Inventory.bInventory = false;
			Craft.bCraft = false;
			Inventory.bResetSelItem = true;
			bAH = false;
	        bSO = false;
			bTrade = false;
			scriptTrade.bTrade = false;
			scriptAH.bSell = false;
			scriptAH.bBuy = false;
			scriptAH.bExpired = false;
			theBank.bInventory = false;
			scriptChat.bChat = false;
			bShowInfoScreen = false;
	
			scriptTrade.bInitialized = false;
			scriptTrade.bTrade = false;
			scriptTrade.bGUIFrame = false;
			// bGUI = true;
			theMissions.setMissions( false );
	
			Inventory.bPlayerEq = !Inventory.bPlayerEq;
		}
		
    Global.myChar.Nick = PlayerPrefs.GetString("sUsername");
    // name of char 
	if(!scriptTrade.bInitialized && !scriptAH.bSell && !scriptAH.bBuy &&!scriptAH.bExpired)
		{
			GUI.Label(Rect(-5, 230, 120, 40), Global.myChar.Nick, guiCharStyle);
		}
	// money and  level
	if(!scriptTrade.bInitialized)
		{
		//	GUI.BeginGroup(Rect(5 , 279, 100, 35)); // old position
	        GUI.BeginGroup(Rect(10 , 95, 85, 40));  // new position
			GUI.DrawTexture(Rect(0, 0, 100, 55), texMoney, ScaleMode.StretchToFill, true, 1);
			styleLVL.normal.textColor = Color.white;
	        styleLVLBnk.normal.textColor = Color.white;
	        
			GUI.Label(Rect(5, 0, 60, 30), "LEVEL :", styleLVL);
			styleLVL.normal.textColor = Color.green;
			GUI.Label(Rect(55, 0, 60, 30), Global.myChar.LVL+"", styleLVL);
			styleLVL.normal.textColor = Color.white;
			GUI.Label(Rect(5, 15, 60, 30), "BANKROLL :", styleLVLBnk);
			styleLVLBnk.normal.textColor = Color.green;
			//GUI.Label(Rect(45, 15, 50, 20), "$ " + Global.myChar.Money+"", styleLVL);
	        GUI.Label(Rect(55, 15, 60, 30), "$ " + Global.myChar.Money+"", styleLVLBnk);
			GUI.EndGroup();
		}
		


		
	// start fight after difficulty is selected - deprecated
	// TO DO: change bDifficultySelected to bFight to indicate that ths flag will start the fight
	if(Global.bDifficultySelected)
	{

		if (Global.fightTriggered) 
			{
	          // Inventory.ResetSelectedItem();
				bLoadBattle = true;	
				Inventory.bPlayerEq =  false;
				Inventory.bInventory = false;
				if(nrOfPlayers > 0) 
					{
						for(i= 0; i < nrOfPlayers; i++) 
							{
								Destroy(goPlayers[i]);
							}
					}
				Destroy(goPlayerFace);
				Destroy(GameObject.Find("PC"));
				stopLocationService();
				Global.fightTriggered = false;
				bSelectedPlayer = false;
				Global.bDifficultySelected = false;
	            Global.theScene = 5;
	             print("MISSSSSSSSSSSSSSSION!!!!");
	            Global.randomNumber = Random.value;
	          
				Application.LoadLevel("LoadingScene");
			}
			 else
		if((nSelectedPlayer >=0)&&(bSelectedPlayer))
			{
				bLoadBattle = true;	
				Inventory.bPlayerEq =  false;
				Inventory.bInventory = false;
				
				if(nrOfPlayers > 0)
					{
						for(i= 0; i < nrOfPlayers; i++)
							{
									Destroy(goPlayers[i]);
							}
					}
				Destroy(goPlayerFace);
				Destroy(GameObject.Find("PC"));
				stopLocationService();
	            Global.theScene = 4;
	            Global.randomNumber = Random.value;
	        
				Application.LoadLevel("LoadingScene");
	            //Application.LoadLevel("scenePvP");
	
			}
		else
		{
			if(retGetMobToFight != 0)
				{
					bLoadBattle = true;	
					Inventory.bPlayerEq =  false;
					Inventory.bInventory = false;
					if(nrOfPlayers > 0)
						{
							for(i= 0; i < nrOfPlayers; i++)
								{
									Destroy(goPlayers[i]);
								}
						}
					Destroy(goPlayerFace);
					Destroy(GameObject.Find("PC"));
					stopLocationService();
	                Global.theScene = 2;
	               
	                Global.randomNumber = Random.value;
	                
				    Application.LoadLevel("LoadingScene");				
				}
			else
				{
					getMobToFight(lat,lon);
				}
			
		}
	}
	//difficulty frame when pressing fight button
	if(bDifficulty)
	{
		var rangeMob : int;
		GUI.DrawTexture(Rect(145, 20, 196, 282), texDifficultyFrame, ScaleMode.StretchToFill, true, 1);
		// Easy
		style.active.background = texEasyP;
		style.normal.background = texEasy;
		rangeMob = Global.myChar.LVL - 5 > 0? Global.myChar.LVL - 5 : 1;
		MobLvL = "1 - " + rangeMob;
		if(GUI.Button(Rect(150, 100, 160, 50), "", style))
			{
				Global.myChar.Difficulty = 0;
				texDifficulty = texEasyS;
				bDifficulty = false;
				Global.save_stats();
				Global.bDifficultySelected = true;
			}
		GUI.Label(Rect(295, 115, 160, 50),MobLvL);
		MobLvL = "";
		// Medium
		style.active.background = texMediumP;
		style.normal.background = texMedium;
		rangeMob = Global.myChar.LVL - 4 > 0? Global.myChar.LVL - 4 : 1;
		MobLvL = rangeMob + " - " + (Global.myChar.LVL + 4);
		if(GUI.Button(Rect(150, 140, 160, 50), "", style))
			{
				Global.myChar.Difficulty = 1;
				texDifficulty = texMediumS;
				bDifficulty = false;
				Global.save_stats();
				Global.bDifficultySelected = true;
			}
			
		GUI.Label(Rect(295, 155, 160, 50),MobLvL);
		MobLvL = "";
		// Hard
		style.active.background = texHardP;
		style.normal.background = texHard;
		MobLvL = (Global.myChar.LVL + 5) + " - " + (Global.myChar.LVL + 9);
		if(GUI.Button(Rect(150, 180, 160, 50), "", style))
			{
				Global.myChar.Difficulty = 2;
				texDifficulty = texHardS;
				bDifficulty = false;
				Global.save_stats();
				Global.bDifficultySelected = true;
			}
		GUI.Label(Rect(295, 195, 160, 50),MobLvL);
		MobLvL = "";
		// Insane
		style.active.background = texInsaneP;
		style.normal.background = texInsane;
		MobLvL = (Global.myChar.LVL + 10) + " - " + (Global.myChar.LVL + 15);
		if(GUI.Button(Rect(150, 220, 160, 50), "", style))
			{
				Global.myChar.Difficulty = 3;
				texDifficulty = texInsaneS;
				bDifficulty = false;
				Global.save_stats();
				Global.bDifficultySelected = true;
			}
		GUI.Label(Rect(295, 235, 160, 50),MobLvL);
		MobLvL = "";
	}
	
	//inventory and player (eupied ?!?)
	if(!scriptTrade.bInitialized && !scriptAH.bSell && !scriptAH.bBuy && !scriptAH.bExpired )
	{
		if(GUI.Button(Rect(50, 270, 50, 51), "", btnInvStyle))
			{
				bTrade = false;
				bAH = false;
	            bSO = false;
	            Global.bNeedToUpdateInv = true;
				Inventory.bInventory = !Inventory.bInventory;
				Inventory.bPlayerEq = false;
				Craft.bCraft = false;
				Inventory.bResetSelItem = true;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptAH.bExpired = false;
				theBank.bInventory = false;
				scriptChat.bChat = false;
				bShowInfoScreen = false;
				scriptTrade.bInitialized = false;
				scriptTrade.bTrade = false;
				scriptTrade.bGUIFrame = false;
				 theMissions.setMissions( false );
				// bGUI = true;
			}
		
		if(GUI.Button(Rect(5, 270, 50, 51), "", btnPInfoStyle))
			{
				//bCharFrame = !bCharFrame;
				bShowInfoScreen = !bShowInfoScreen;
				bAH = false;
	            bSO = false;
				bTrade = false;
				scriptTrade.bInitialized = false;
				scriptTrade.bTrade = false;
				Inventory.bInventory = false;
				Inventory.bPlayerEq = false;
				Craft.bCraft = false;
				Inventory.bResetSelItem = true;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptAH.bExpired = false;
				theBank.bInventory = false;
				scriptChat.bChat = false;
				scriptTrade.bGUIFrame = false;
				theMissions.setMissions( false );
			}
	}
	
	// Difficulty screen
	if (shouldGUI())
	{
	
		GUI.BeginGroup(Rect(25, 44, 345, 285));
        if ( bDifficultyActive )
	        {
	            if ( GUI.Button(Rect(100, 210, 80, 25),"Difficulty",difficultyStyle))
	                bDifficultyActive = !bDifficultyActive;
	        }
        else
            if ( GUI.Button(Rect(100, 240, 80, 25),"Difficulty",difficultyStyleP))
                bDifficultyActive = !bDifficultyActive;
                		/*if ( GUI.Button(Rect(100, 210, 80, 25),"Difficulty",btnMMStyle))
		{
			bDifficultyActive = !bDifficultyActive;
		} */
		//bDifficultyActive = GUI.Toggle(Rect(100, 210, 80, 25),bDifficultyActive,"Difficulty");
		if ( bDifficultyActive )
		{
			GUI.DrawTexture(Rect(90, 235, 240, 41), texInfoScreenDiff);
			for(i = 0; i<6; i++)
				{
					styleDifficulty = (Global.myChar.Difficulty == i) ?styleDiffP : styleDiff;
					//if(GUI.Button(Rect(213 + ((i%3)*35), 215 + ((i/3)*20),33,27),sDifficultyLevels[i],styleDifficulty)){
					if(GUI.Button(Rect(107 + (i*35), 235, 40, 27),sDifficultyLevels[i],styleDifficulty))
						{				
							if( !Global.premium && i > 1) //1 = 10-19 dificulty
								bPremiumAlert = true;
							else
								{							
									Global.myChar.Difficulty = i;
									Global.save_stats();
								}
						}
				}
		}
		
		GUI.EndGroup();
		
	}
	

	//Info Screen ( district info )
	if(bShowInfoScreen)
	{
		
		//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
		CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_DISTRICT_INFO );
		
		GUI.BeginGroup(Rect(115, 45, 345, 285));
		GUI.DrawTexture(Rect(0,0,345,190), texInfoScreen);
		GUI.DrawTexture(Rect(8,190,165,85), texInfoScreenSearch);
		//close button
		if(GUI.Button(Rect(303, 1, 27, 28), "", styleBtnCloseX))
			{
				//bCharFrame = !bCharFrame;
				bShowInfoScreen = !bShowInfoScreen;
				bAH = false;
	            bSO = false;
				bTrade = false;
				scriptTrade.bInitialized = false;
				scriptTrade.bTrade = false;
				Inventory.bInventory = false;
				Inventory.bPlayerEq = false;
				Craft.bCraft = false;
				Inventory.bResetSelItem = true;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptAH.bExpired = false;
				theBank.bInventory = false;
				scriptChat.bChat = false;		
			}
		
		//draw nearby players list
		//GUI.VerticalScrollbar (Rect (175, 30, 15, 145), scrollPosInfoP, 0, 0, 0);
		
		sSearchNearPlayers = GUI.TextField (Rect (36, 231, 115, 20), sSearchNearPlayers, 22);
		if(sAuxSearchNearPlayers != sSearchNearPlayers)
			{
				sSearchNearPlayers = sSearchNearPlayers.Replace("\n", "").Replace("\r", "");
				sAuxSearchNearPlayers = sSearchNearPlayers;
			}
		
		if(nrOfPlayers > 0)
		{
			scrollPosition = GUI.BeginScrollView (Rect(10, 30, 170, 145), scrollPosition, Rect (0, 0, 160, nrOfPlayers * 27));
			for(i = 0; i<nrOfPlayers; i++)
				{
					styleListNearPlayers = (i == nSelectedPlayer )? styleButNearPlayerP : styleButNearPlayer;
					if(playersName[i].ToLower().IndexOf(sSearchNearPlayers.ToLower()) > -1 || sSearchNearPlayers.length == 0)
						{
							cntListNearPlayers.text = playersName[i];
							cntListNearPlayers.image = goPlayers[i].renderer.material.mainTexture;
							if(GUI.Button(Rect(10, i*27,160,27),cntListNearPlayers,styleListNearPlayers))
								{
									nSelectedPlayer = i;
									bSelectedPlayer = true;
			        				//goPlayers[nSelectedPlayer].renderer.material.color = Color.red;
									//goPlayers[nSelectedPlayerOld].renderer.materials[0].color = Color.clear;
									//goPlayerFace.renderer.materials[0].color = Color.green;
									nSelectedPlayerOld = nSelectedPlayer;
								}
						}
				}
			var bAux;
            GUI.EndScrollView ();
            if(nSelectedPlayer != -1 && bSelectedPlayer)
            {
            	nearPlayer = players[nSelectedPlayer];
				Global.enemyPCid = nearPlayer.id;
				Global.enemyPCUserName = nearPlayer.username;

				styleSelectedNearPlayer.normal.textColor = Color(1, 0.6, 0, 1);
				styleSelectedNearPlayer.alignment = TextAnchor.MiddleCenter;
				
				   // Selectare character flagged or not
				   
				 SelectarePlayer(parseInt(nearPlayer.id));
				 GUI.Label(Rect(190,47,150,20),s, styleSelectedNearPlayer);
				 if (s == "PVP")
					 {
					 		if(GUI.Button(Rect(230, 140, 83,36),"Duel",styleButBlueSmll))
						 		{
									if(bSelectedPlayer)
										Global.bDifficultySelected = true;		
								}
					  }
				GUI.Label(Rect(190,30,150,20),""+nearPlayer.nick, styleSelectedNearPlayer);
				styleSelectedNearPlayer.alignment = TextAnchor.MiddleLeft;
				GUI.Label(Rect(282,66,80,20),""+nearPlayer.level, styleSelectedNearPlayer);
				styleSelectedNearPlayer.normal.textColor = Color(1, 1, 1, 1);
				GUI.Label(Rect(247,66,80,20),"Level: ",styleSelectedNearPlayer);
				styleSelectedNearPlayer.alignment = TextAnchor.MiddleCenter;
				if(GUI.Button(Rect(230, 80, 83,36),"Chat",styleButRedSmll))
				{
					if(scriptChat.Chats.length < scriptChat.MAX_CHATS)
					{
						auxChat = new Chat();
						auxChat.sTo = nearPlayer.nick;
						scriptChat.Chats.Add(auxChat);
							if(scriptChat.nCurChat<0)
								scriptChat.nCurChat = 0;
							else
								scriptChat.nCurChat = scriptChat.Chats.length-1;
							bAux = scriptChat.bChat = !scriptChat.bChat;
						if(bAux)
							{
								scriptMissions.InfoWindowActivated = false;
							
								bTrade = false;
								bAH = false;
								Inventory.bInventory = false;
								Inventory.bPlayerEq = false;
								bShowInfoScreen = false;
								bGUI = true;
								Craft.bCraft = false;
								scriptAH.bSell = false;
								scriptAH.bBuy = false;
								theBank.bInventory = false;
								scriptTrade.bInitialized = false;
								scriptTrade.bTrade = false;
									if(!bGOAreVisible)
										{
											showGameObjects();
										}
							}
						else 
							bGUI = true;
					}
					else
						{
							chatAlertRect = Rect (150, 100, 220, 120);
							bChatAlert = true;
						}
				}
				
				if(GUI.Button(Rect(230, 110, 83,36),"Trade",styleButRedSmll) )
				{
                   tradePressed = true;
					sTo = nearPlayer.nick;
					bAux = bTrade = !bTrade;
                     /* 
                    Removed
					if(bAux){
                      
						bGUI = false;
						bAH = false;
                        bSO = false;
						Inventory.bInventory = false;
						Inventory.bPlayerEq = false;
						bShowInfoScreen = false;
						Craft.bCraft = false;
						scriptAH.bSell = false;
						scriptAH.bBuy = false;
						scriptAH.bExpired =false;
						theBank.bInventory = false;
						scriptChat.bChat = false;
						if(!bGOAreVisible){
							showGameObjects();
						}
					}else{
						bGUI = true;
						scriptTrade.bInitialized = false;
						scriptTrade.bTrade = false;
					}
                    */
		            if(bAux)
						{
							scriptMissions.InfoWindowActivated = false;
						
							bGUI = false;
							bAH = false;
							Inventory.bInventory = false;
							Inventory.bPlayerEq = false;
							bShowInfoScreen = false;
							Craft.bCraft = false;
							scriptAH.bSell = false;
							scriptAH.bBuy = false;
							scriptAH.bExpired =false;
							theBank.bInventory = false;
							scriptChat.bChat = false;
							scriptTrade.bGUIFrame = false;
							if(!bGOAreVisible)
								{
									showGameObjects();
								}
						}
					else
						{
							bGUI = true;
							scriptTrade.bInitialized = false;
							scriptTrade.bTrade = false;
							scriptTrade.bGUIFrame = false;
						}               
				}
            }
		}
		GUI.DrawTexture(Rect(178,190,165,85), texInfoScreenDiff);
		for(i = 0; i<6; i++)
			{
				styleDifficulty = (Global.myChar.Difficulty == i) ?styleDiffP : styleDiff;
				if(GUI.Button(Rect(213 + ((i%3)*35), 215 + ((i/3)*20),33,27),sDifficultyLevels[i],styleDifficulty))
					{
						if( !Global.premium && i > 2) //2 = 20-39 dificulty
							bPremiumAlert = true;
						else
							{
								Global.myChar.Difficulty = i;
								Global.save_stats();
							}
					}
			}
		
		if(bChatAlert)
			{
				chatAlertRect = GUI.Window (idChatAlert, chatAlertRect, DoChatAlert, "", styleErrorFrame);
			}
		
		GUI.EndGroup();
	}
    
   
    
	// Top buttons
	if(bNewChat || bNewTrade || bNewXP)
	{
		if(Time.timeSinceLevelLoad > blinkTime + 0.5)
			{
				bBlink = !bBlink;
				blinkTime = Time.timeSinceLevelLoad;
				if ( bNewXP > 0 )
					{
						bNewXP--;
					}
			}
	}
	
	
	//top buttons shadows
	//Craft
	if(!Craft.bCraft)
	{
		 GUI.DrawTexture(Rect(74, 2, 82, 38), texButtonShadow, ScaleMode.StretchToFill, true, 1);
	}
	//Auction
	if(!bAH || scriptAH.bBuy || scriptAH.bSell || scriptAH.bExpired)
	{
		GUI.DrawTexture(Rect(290, 2, 82, 38), texButtonShadow, ScaleMode.StretchToFill, true, 1);
	}
	//Chat
	if(!scriptChat.bChat)
	{
		GUI.DrawTexture(Rect(222, 2, 82, 38), texButtonShadow, ScaleMode.StretchToFill, true, 1);
	}
	//Trade
	if(!bTrade)
	{
		//GUI.DrawTexture(Rect(204, 2, 82, 38), texButtonShadow, ScaleMode.StretchToFill, true, 1);
	}	
	//bank
	if(!theBank.bInventory && bCanShowBank)
	{
		GUI.DrawTexture(Rect(154, 2, 82, 38), texButtonShadow, ScaleMode.StretchToFill, true, 1);
	}
	//Missions
	if(!theMissions.getMissions())
	    GUI.DrawTexture(Rect(388, 2, 102, 48), texButtonShadow, ScaleMode.StretchToFill, true, 1);
	
	
	//Craft    77, -2, 92, 31
	if(GUI.Button(Rect(359, -4, 132, 41),"Missions", theMissions.getMissions() ? styleButP : styleBut))
		{
			 //exitFromTrade = true;
	        //theMissions.bMissions = !theMissions.bMissions;
	        Global.CES = 0;
	        //missionsClicked = true;
	        theMissions.setMissions( !theMissions.getMissions() );
	 		if( theMissions.getMissions() )
	 			theMissions.GetMissionList();
	 	
	 		scriptMissions.InfoWindowActivated = false;
	        theBank.bInventory = false;
	        bTrade = false;
			bAH = false;
	        bSO = false;
			Inventory.bInventory = false;
			Inventory.bPlayerEq = false;
			bShowInfoScreen = false;
			bGUI = true;
			Craft.bCraft = false;
			scriptAH.bSell = false;
			scriptAH.bBuy = false;
			scriptAH.bExpired =false;
			scriptChat.bChat = false;
			scriptTrade.bInitialized = false;
			scriptTrade.bTrade = false;
			scriptTrade.bGUIFrame = false;
			if(!bGOAreVisible)
				{
					showGameObjects();
				}
			
		}
	//end Craft
	
	//Auction
	if(GUI.Button(Rect(286, -2, 87, 31),"Market", (bAH || scriptAH.bBuy || scriptAH.bSell || scriptAH.bExpired) ? styleButP : styleBut))
	{
		scriptMissions.InfoWindowActivated = false;
		Inventory.bInventory = false;
		Inventory.bPlayerEq = false;
		bGUI = true;
		bTrade = false;
        missionsClicked = false;
        bSO = false;
		theMissions.setMissions( false );
		Craft.bCraft = false;
		bShowInfoScreen = false;
		scriptChat.bChat = false;
		scriptTrade.bInitialized = false;
		scriptTrade.bTrade = false;
		scriptTrade.bGUIFrame = false;
		theBank.bInventory = false;
		if(!bGOAreVisible)
			{
				showGameObjects();
			}
		if(!scriptAH.bBuy && !scriptAH.bSell && !scriptAH.bExpired) 
			{
				bAH = !bAH;
			} 
		else 
			{
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptAH.bExpired = false;
				bAH = false;
				scriptTrade.bGUIFrame = false;
				showGameObjects();
			}
	}
	//end Auction

	//Chat
	if(GUI.Button(Rect(213, -2, 87, 31),"Social",bSO ? styleButP : styleBut))
	{
     missionsClicked = false;
    bAux = bSO = !bSO;
		if(bAux)
			{
				scriptMissions.InfoWindowActivated = false;
			
				bTrade = false;
				theMissions.setMissions( false );
				bAH = false;
				Inventory.bInventory = false;
				Inventory.bPlayerEq = false;
				bShowInfoScreen = false;
				bGUI = true;
				Craft.bCraft = false;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptAH.bExpired =false;
				theBank.bInventory = false;
				scriptTrade.bInitialized = false;
				scriptTrade.bTrade = false;
				scriptTrade.bGUIFrame = false;
				if(!bGOAreVisible)
					{
						showGameObjects();
					}
			}
		else
			{ 
				bGUI = true;
				scriptTrade.bGUIFrame = false;
	            scriptChat.bChat = false;
			}

    
    }
       /*
       if(GUI.Button(Rect(205, 34, 70, 29),"Chat", (scriptChat.bChat || (bNewChat && bBlink)) ? styleButP : styleBut)){
		bAux = scriptChat.bChat = !scriptChat.bChat;
		if(bAux){
			bTrade = false;
			theMissions.setMissions( false );
			bAH = false;
			Inventory.bInventory = false;
			Inventory.bPlayerEq = false;
			bShowInfoScreen = false;
			bGUI = true;
			Craft.bCraft = false;
			scriptAH.bSell = false;
			scriptAH.bBuy = false;
			scriptAH.bExpired =false;
			theBank.bInventory = false;
			scriptTrade.bInitialized = false;
			scriptTrade.bTrade = false;
			scriptTrade.bGUIFrame = false;
			if(!bGOAreVisible){
				showGameObjects();
			}
		}else{ 
			bGUI = true;
			scriptTrade.bGUIFrame = false;
		}
	}
	//end Chat
	*/
	//Trade
	/*if(GUI.Button(Rect(205, -2, 75, 31),"Trade", (bTrade || (bNewTrade && bBlink)) ? styleButP : styleBut) ){
		
		if( !Global.premium )
			bPremiumAlert = true;
		else
		{		
			bAux = bTrade = !bTrade;
			if(bAux)
			{
				bGUI = false;
				bAH = false;
				Inventory.bInventory = false;
				Inventory.bPlayerEq = false;
				bShowInfoScreen = false;
				Craft.bCraft = false;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptAH.bExpired =false;
				theBank.bInventory = false;
				scriptChat.bChat = false;
				scriptTrade.bGUIFrame = false;
				if(!bGOAreVisible)
				{
					showGameObjects();
				}
			}else
			{
				bGUI = true;
				scriptTrade.bInitialized = false;
				scriptTrade.bTrade = false;
				scriptTrade.bGUIFrame = false;
			}
		}
	}
    */
	if(bTradeWasCanceled || bTradeHasFinished || bGUI)
		{
			if(!bGOAreVisible)
				{
					showGameObjects();
				}
			bTradeWasCanceled = false;
			bTradeHasFinished = false;
		}
	//end Trade

	if(bTrade)
	{
		switch(nTradeState)
		{
			case 0:
				//GUI.DrawTexture(Rect(185, 40, 295, 30), texFrame);
				if(!sTo) sTo="";
				sTo = nearPlayer.nick;
                //sTo = GUI.TextField(Rect(195, 45, 200, 20), sTo, 50);
				//if(GUI.Button(Rect(400, 42, 70, 25),"Trade", styleBut)){
					if(tradePressed)
	                    {
		                    inviteTrade(1);
							nTradeState = 4;
		                    tradePressed = false;
	                    }
				//}
			break;
			case 1:
				theTrade.EmptyChat(nUserID);
				//scriptTrade.EmptyChat(nUserID);
				hideGameObjects(); // hide 3d objects
				bAH = false;
                bSO = false;
				Inventory.bInventory = false;
				Inventory.bPlayerEq = false;
				bShowInfoScreen = false;
				Craft.bCraft = false;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptAH.bExpired =false;
				theBank.bInventory = false;
				scriptChat.bChat = false;
				theMissions.setMissions( false );
				scriptMissions.InfoWindowActivated = false;

				scriptTrade.bTrade = true;
				scriptTrade.bInitialized = true;
				bGUI = false;
				scriptTrade.sTo = sTo;
				theTrade.GetTradeItems();
				nTradeState = 0;
				bTrade = false;
				bNewTrade = false;
			break;
			case 2:
				GUI.DrawTexture(Rect(185, 40, 295, 30), texFrame);
				GUI.Label(Rect(195, 45, 200, 20), "Trade cancelled.");
				if(GUI.Button(Rect(400, 42, 70, 25),"Ok", styleBut))
					{
						nTradeState = 0;
						bNewTrade = false;
					}
			break;
			case 3:     // incoming trade
						scriptBank.InboxTrade = true;
			break;
			case 5:
						GUI.DrawTexture(Rect(145, 40, 335, 30), texFrame);
						
						GUI.Label(Rect(155, 45, 240, 20), sFrom + " invited you to trade.");
						if(GUI.Button(Rect(400, 42, 70, 25),"Accept", styleBut))
							{
								sTo = sFrom;
			                    Debug.Log("De la ");
								inviteTrade(1);
								nTradeState = 1;
							}
						if(GUI.Button(Rect(320, 42, 70, 25),"Cancel", styleBut))
							{
								sTo = sFrom;
								inviteTrade(2);
								nTradeState = 0;
								bNewTrade = false;
							}	
			break;
			case 4:
				GUI.DrawTexture(Rect(165, 40, 315, 30), texFrame);
				GUI.Label(Rect(175, 45, 240, 20), "Waiting for an answer from " + sTo + "...");
				if(GUI.Button(Rect(400, 42, 70, 25),"Cancel", styleBut))
					{
						sTo = sFrom;
						inviteTrade(2);
						nTradeState = 0;
						bNewTrade = false;
					}
			break;
		}
	}
	
	
	//Bank
	if(bCanShowBank)
	{
    	//    if(Global.distFromHomebase==0)
		//  {
        	if(GUI.Button(Rect(140, -2, 87, 31), "Storage", IsHome() ? (theBank.bInventory ? styleButP : styleBut) : styleButGray))
        	 {
			//bBank = !bBank;
				ButonStorageApasat = 1;
				if ( IsHome() )
					{
						scriptMissions.InfoWindowActivated = false;
					
						theBank.bInventory = !theBank.bInventory;
			             missionsClicked = false;
						bTrade = false;
						theMissions.setMissions( false );
						bAH = false;
			            bSO = false;
						Inventory.bInventory = false;
						Inventory.bPlayerEq = false;
						bShowInfoScreen = false;
						bGUI = true;
						Craft.bCraft = false;
						scriptAH.bSell = false;
						scriptAH.bBuy = false;
						scriptAH.bExpired =false;
						scriptChat.bChat = false;
						scriptTrade.bInitialized = false;
						scriptTrade.bTrade = false;
						scriptTrade.bGUIFrame = false;
							if(!bGOAreVisible)
								{
									showGameObjects();
								}
					}
        //   else if(GUI.Button(Rect(155, -2, 92, 31), "Storage", theBank.bInventory ? styleButGrayP : styleButGray)){
           
			}
			
			if(!IsHome() )
				{
				  switch (ButonStorageApasat)
				  		{
					case 1:	GUI.Window(0, Rect (150, 90, 220, 130),DoMyWindow,"",styleBaseFrame);
						break;
					case 2	:GUI.Window(0,Rect(120,50,270,200),homeFunction,"",styleBaseFrame);
						break;
					case 3: GUI.Window (1, Rect (150, 100, 220, 120), DoHomeBaseAlert, "", styleErrorFrame);
						break;
						}
				}
			
			//			// TODO: make window: you are not home
	
	}
	
    if(GUI.Button(Rect(67, -2, 87, 31),"Craft",Craft.bCraft ? styleButP : styleBut ) )
    {
    	bAux = Craft.bCraft = !Craft.bCraft;
		if(bAux)
			{
				scriptMissions.InfoWindowActivated = false;
			
	      	  	missionsClicked = false;
				theCraft.ClearCraft();
				Craft.bNeedToUpdateCraft = true;
				bAH = false;
	            bSO = false;
				bTrade = false;
				Inventory.bInventory = false;
				bGUI = false;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptAH.bExpired =false;
				theBank.bInventory = false;
				scriptChat.bChat = false;
				scriptTrade.bInitialized = false;
				scriptTrade.bTrade = false;
				bShowInfoScreen =false;
				theMissions.setMissions( false );
				scriptTrade.bGUIFrame = false;
				if(!bGOAreVisible)
					{
						showGameObjects();
					}
			}
		else
			{
				bGUI = true;
				scriptTrade.bGUIFrame = false;
			}
       
	}
	
	// Main Menu
	GUI.DrawTexture(Rect(-2, 2, 89, 38), texButtonShadow, ScaleMode.StretchToFill, true, 1);
	if(GUI.Button(Rect(-1,-2, 87, 31), "MAIN MENU", btnMMStyle))
	{
		//bLoadBattle = true;
		bMMenu = !bMMenu;
		Inventory.bPlayerEq =  false;
		Inventory.bInventory = false;
		theBank.bInventory = false;
		theBank.bPlayerEq = false;
		if(nrOfPlayers > 0)
			{
				for(i= 0; i < nrOfPlayers; i++)
					{
						Destroy(goPlayers[i]);
					}
			}
		Destroy(goPlayerFace);
		Destroy(GameObject.Find("PC"));
		//Application.LoadLevel("sceneMainMenu");
        scriptBattle.intoMap = false;
		BackgroundManager.LoadLevelSafe( "sceneMainMenu" );
	}	
	
	//Craft
	if(Craft.bCraft)
		{
			GUI.DrawTexture(Rect(79, 5, 87, 45), texButtonShadow, ScaleMode.StretchToFill, true, 1);
		    GUI.DrawTexture(Rect(79, -3, 80, 40), texMenuP, ScaleMode.StretchToFill, true, 1);
		    GUI.Label(Rect(79,0,85,40),"Craft",styleButClear);
				
		}
	//Auction
	if(bAH || scriptAH.bBuy || scriptAH.bSell || scriptAH.bExpired)
		{
			GUI.DrawTexture(Rect(292, 4, 87, 45), texButtonShadow, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(292, -3, 80, 40), texMenuP, ScaleMode.StretchToFill, true, 1);
			GUI.Label(Rect(292,0,80,40),"Market",styleButClear);	
		}
	
	//Chat
	if(bSO )
	{
			GUI.DrawTexture(Rect(220, 4, 87, 45), texButtonShadow, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(220, -3, 80, 40), texMenuP, ScaleMode.StretchToFill, true, 1);
			GUI.Label(Rect(220,0,85,40),"Social",styleButClear);
	        GUI.DrawTexture(Rect(199, 39, 72, 34), texButtonShadow, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(269, 39, 72, 34), texButtonShadow, ScaleMode.StretchToFill, true, 1);
	    // social buttons 
	        if(scriptChat.bChat|| bSO)
	        {
		 if(GUI.Button(Rect(200, 34, 65, 29),"Chat", (scriptChat.bChat || (bNewChat && bBlink)) ? styleButP : styleBut))
			 {
				bAux = scriptChat.bChat = !scriptChat.bChat;
				if(bAux)
					{
						bTrade = false;
						theMissions.setMissions( false );
						bAH = false;
						Inventory.bInventory = false;
						Inventory.bPlayerEq = false;
						bShowInfoScreen = false;
						bGUI = true;
						Craft.bCraft = false;
						scriptAH.bSell = false;
						scriptAH.bBuy = false;
						scriptAH.bExpired =false;
						theBank.bInventory = false;
						scriptTrade.bInitialized = false;
						scriptTrade.bTrade = false;
						scriptTrade.bGUIFrame = false;
							if(!bGOAreVisible)
								{
									showGameObjects();
								}
					}
				else
					{ 
						bGUI = true;
						scriptTrade.bGUIFrame = false;
					}
			}
	    }
		//end Chat
	        if(GUI.Button(Rect(265, 34, 65, 29),"Friends",   styleBut ))
	        {
	 
	        }
	}
	//Trade
	if(bTrade)
		{/*
			GUI.DrawTexture(Rect(200, 4, 92, 45), texButtonShadow, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(200, -3, 85, 40), texMenuP, ScaleMode.StretchToFill, true, 1);
			GUI.Label(Rect(200,0,85,40),"Trade",styleButClear);	*/
		}
	//Bank
	if(bCanShowBank && theBank.bInventory)
		{
			GUI.DrawTexture(Rect(147, 5, 87, 45), texButtonShadow, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(147, -3, 80, 40), texMenuP, ScaleMode.StretchToFill, true, 1);
			GUI.Label(Rect(147,0,80,40),"Storage",styleButClear);
		}
	//end Bank
	
	//Missions
	if (theMissions.getMissions())
		{
		    GUI.DrawTexture(Rect(367, -4, 107, 65), texButtonShadow, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(367, -10, 115, 60), texMenuP, ScaleMode.StretchToFill, true, 1);
			GUI.Label(Rect(362,0,100,60),"Missions",styleButClear); 
		}
	

	//auction options
	if(bAH)
	{
		//shadows
		GUI.DrawTexture(Rect(274, 39, 72, 34), texButtonShadow, ScaleMode.StretchToFill, true, 1);
		GUI.DrawTexture(Rect(344, 39, 72, 34), texButtonShadow, ScaleMode.StretchToFill, true, 1);
		GUI.DrawTexture(Rect(274, 69, 149, 35), texButtonShadow, ScaleMode.StretchToFill, true, 1);
        GUI.DrawTexture(Rect(274, 95, 149, 35), texButtonShadow, ScaleMode.StretchToFill, true, 1);
        
       
		//sell and buy buttons
		if(GUI.Button(Rect(355, 34, 65, 29),"Sell", scriptAH.bSell ? styleButP : styleBut))
		{
			if( !Global.premium )
				{
					bPremiumAlert = true;
				}
			else
				{
					bAux = scriptAH.bSell = !scriptAH.bSell;
					if(bAux)
						{
							scriptAH.bRefreshAHItems = !scriptAH.bRefreshAHItems;
							
							hideGameObjects();
							bAH = false;
							bTrade = false;
							Inventory.bInventory = false;
							Inventory.bPlayerEq = false;
							bShowInfoScreen = false;
							bGUI = false;
							Craft.bCraft = false;
							scriptAH.bBuy = false;
							scriptAH.bExpired = false;
							theBank.bInventory = false;
							scriptChat.bChat = false;
							scriptTrade.bInitialized = false;
							scriptTrade.bTrade = false;
							scriptAH.bAhSellSelected = true;
						}
					else bGUI = true;
				}
		}		
		if(GUI.Button(Rect(285, 34, 65, 29),"Buy", scriptAH.bBuy ? styleButP : styleBut))
			{
				bAux = scriptAH.bBuy = !scriptAH.bBuy;
				if(bAux)
					{
						scriptMissions.InfoWindowActivated = false;
					
						hideGameObjects();
						bTrade = false;
						bAH = false;
						Inventory.bInventory = false;
						Inventory.bPlayerEq = false;
						bShowInfoScreen = false;
						bGUI = false;
						Craft.bCraft = false;
						scriptAH.bSell = false;
						scriptAH.bExpired = false;
						theBank.bInventory = false;
						scriptChat.bChat = false;
						scriptTrade.bInitialized = false;
						scriptTrade.bTrade = false;
						scriptAH.bAhBuySelected = true;
					}
				else bGUI = true;
			}
        if(GUI.Button(Rect(285, 64, 135, 29),"Earn   $$", scriptAH.bBuy ? styleButP : styleBut))
        {	
		}
        if(GUI.Button(Rect(285, 94, 135, 29),"Purchase   $$", scriptAH.bBuy ? styleButP : styleBut))
        {
		}


	/*	if(GUI.Button(Rect(275, 34, 70, 29),"Expired", scriptAH.bExpired ? styleButP : styleBut)){
			bAux = scriptAH.bExpired = !scriptAH.bExpired;
			if(bAux){
				hideGameObjects();
				bTrade = false;
				bAH = false;
				Inventory.bInventory = false;
				Inventory.bPlayerEq = false;
				bShowInfoScreen = false;
				bGUI = false;
				Craft.bCraft = false;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				theBank.bInventory = false;
				scriptChat.bChat = false;
				scriptTrade.bInitialized = false;
				scriptTrade.bTrade = false;
				scriptAH.bAhExpiredSelected = true;
			}else bGUI = true;
		}
        */
	}
    
	//end Auction options
	
	if( bPremiumAlert && !bChatAlert)
		{
			chatAlertRect = Rect (150, 100, 220, 120);
			chatAlertRect = GUI.Window (idChatAlert, chatAlertRect, DoPremiumAlert, "", styleErrorFrame);
		}
	 
	
	if(shouldGUI())
		{
			if(bSelectedPlayer)
				{
					nearPlayer = players[nSelectedPlayer];
					Global.enemyPCid = nearPlayer.id;
					Global.enemyPCUserName = nearPlayer.username;
					GUI.BeginGroup(Rect(nearPlayer.long+10,320 - nearPlayer.lat,70,60));
					GUI.DrawTexture(Rect(0, 0,80,30),texPers_1,ScaleMode.StretchToFill, true, 1);
					GUI.Label(Rect(0,0,80,15),""+nearPlayer.nick, guiStyle);
					GUI.Label(Rect(0,15,80,15),"Level: "+nearPlayer.level, guiStyle);
					GUI.EndGroup();
				}
		}

	if (shouldGUI) 
		{
			GUI.DrawTexture(Rect(0, 318 - xp_bar_height, 480, xp_bar_height + 2), white_pixel, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture(Rect(1, 319 - xp_bar_height, 478, xp_bar_height), black_pixel, ScaleMode.StretchToFill, true, 1);
				
			if (xp_bar_multiplier > 0) 
				if ( bBlink && bNewXP ) 
					{
						GUI.DrawTexture(Rect(1, 319 - xp_bar_height, (buffEXP * xp_bar_multiplier), xp_bar_height), blue_pixel, ScaleMode.StretchToFill, true, 1);
					}
				else
					GUI.DrawTexture(Rect(1, 319 - xp_bar_height, (Global.myChar.EXP * xp_bar_multiplier), xp_bar_height), blue_pixel, ScaleMode.StretchToFill, true, 1);
		}
	if(!theMissions.getMissions())
	 GUI.DrawTexture(Rect(380, 7, 15, 15), texCrosshair, ScaleMode.StretchToFill, true, 1); 
}

static function IsHome()
{
	return ( ( Mathf.Abs(lon - Global.myChar.home_lon) < 0.01f ) && ( Mathf.Abs(lat - Global.myChar.home_lat) < 0.01f) );
}

function DoChatAlert (windowID : int) 
{
	//guiStyle.normal.textColor = Color(1,1,1,1);
	GUI.Label(Rect(20,30,190,40),"To many chats opened", guiStyle);
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleButRedSmll))
		bChatAlert = false;
}

function DoPremiumAlert (windowID : int) 
{
	//guiStyle.normal.textColor = Color(1,1,1,1);
	GUI.Label(Rect(20,30,190,40),"You need a premium account for this feature", guiStyle);
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleButRedSmll))
		bPremiumAlert = false;
}

function hideGameObjects()
{
	if(goHomebaseClone)
		goHomebaseClone.renderer.enabled = false;
	goCharFrame.renderer.enabled = false;
	if(nrOfPlayers > 0)
		for(var i : int = 0;i<nrOfPlayers;i++)
			{
				goPlayers[i].renderer.enabled = false;
			}
	bSelectedPlayer = false;
	goPlayerFace.renderer.enabled = false;
	for( var charRenderer : Renderer in Global.myChar.gameObj.GetComponentsInChildren(Renderer))
		charRenderer.enabled = false;
	bGOAreVisible = false;
}

function showGameObjects()
{
	if(goHomebaseClone)
		goHomebaseClone.renderer.enabled = true;
	goCharFrame.renderer.enabled = true;
	if(nrOfPlayers > 0)
		for(var i : int = 0;i<nrOfPlayers;i++)
			{
				goPlayers[i].renderer.enabled = true;
			}
	bSelectedPlayer = false;	
	goPlayerFace.renderer.enabled = true;
	for( var charRenderer : Renderer in Global.myChar.gameObj.GetComponentsInChildren(Renderer))
		charRenderer.enabled = true;
	bGOAreVisible = true;
}

function distance(lat1:float,lon1:float,lat2:float,lon2:float)
//returns distance in km between 2 points
{
 if (lat2==0 && lon2==0) return 0; // daca homebnase(0,0);
 var R = 6371; 
 var dLat = (lat2-lat1) * Mathf.Deg2Rad;  
 var dLon = (lon2-lon1) * Mathf.Deg2Rad;
lat1 = lat1 * Mathf.Deg2Rad;
lat2 = lat2 * Mathf.Deg2Rad;
 
 var a = Mathf.Sin(dLat/2) * Mathf.Sin(dLat/2) +
         Mathf.Cos(lat1 ) * Mathf.Cos(lat2 ) * 
         Mathf.Sin(dLon/2) * Mathf.Sin(dLon/2); 
 var c = 2 * Mathf.Atan2(Mathf.Sqrt(a), Mathf.Sqrt(1-a)); 
 var d = R * c;
 return d;
}

function checkDistance()
{
	if( lat == 0 || lon == 0 ) return;
	var _dist = distance(lat,lon,Global.myChar.home_lat,Global.myChar.home_lon);
	Global.distFromHomebase = _dist;
	if (_dist==0) return;
	
	
	for (var mission : Mission in Global.missionsArray)
		if ( mission.toDo.ToUpper().Contains("MOVE") )
			{
				if ( _dist >= mission.quant)
					{
						mission.SetQuant(_dist);
						var url = Global.server + "/mmo_iphone/update_player_mission.php?mission_id="+mission.missionId.ToString()+"&player_id="+Global.myChar.id+"&procent=" +  1;
						Debug.Log(url);
						Debug.Log( mission.quant.ToString() );
						var post = new WWW(url);
						yield post; 
						while(post.error && post.error.ToString().Contains("Resolving host timed out"))
							{
								Debug.Log( "Retrying" );
								post = new WWW(url);
								yield post; 
							}
					}
				else
					mission.SetQuant(_dist);
			}
}


function DoMyWindow (windowID : int) 
{
	GUI.Label(Rect(20,30,190,70),"\tYou must return home, and set up your base to access storage.\n\t Are you at home ?");
	if(GUI.Button(Rect(122, 97, 65, 25), "NO"))
		ButonStorageApasat = 0;

	if(GUI.Button(Rect(35, 97, 65, 25), "YES"))
		{
		//  drawCutscene();
			ButonStorageApasat = 2;		
		}
	// Make the windows be draggable.
	//GUI.DragWindow (Rect (0,0,10000,10000));
}
function setHomebase2() 
{
	var login_url = Global.server + "/mmo_iphone/homebase.php?User=" + Global.myChar.Nick +
					"&Lat=" + scriptMainMenu.nLat + "&Lon=" + scriptMainMenu.nLon;
	
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
			alertText = "Error! Could not connect.";
			alertHome =  false;
			MsgHomeData = HOMESRVMSG.ERROR;
		}
	else
	{
		wwwData = download.text;
		MonoBehaviour.print(wwwData);
		if(wwwData.IndexOf("Homebase", 0) > 0)       
	 // wwwData contine Home Updated! daca s-a updatat, daca nu il face int cu secundele de la ultima updatare
			{
				changeHomeToCurrentCoords();
				alertHome = false;
				MsgHomeData = HOMESRVMSG.HOMEBASE_DONE;
				return;
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
				MsgHomeData = HOMESRVMSG.HOMEBASE_ERROR;
			}
		catch(ex)
		{}
	}		
	
}

enum HOMESRVMSG { ERROR = 1, HOMEBASE_DONE = 2, HOMEBASE_ERROR = 3, HOMEBASE_WAIT = 4 }
var MsgHomeData : HOMESRVMSG = HOMESRVMSG.HOMEBASE_WAIT;

function DoHomeBaseAlert (windowID : int) {
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	styleAlertTextBox.normal.textColor  = Color.white;
	GUI.Label(Rect(20,30,190,40), alertText );
	if(GUI.Button(Rect(74, 70, 83, 36), "Close"))
		{
			alertHome = true;
			ButonStorageApasat = 0;
		}
}
function drawCutscene()
{

 // Resources.Load();
 	activateCutscenes = true;
	time =  Time.time;
}
function homeFunction(windowID : int)
{
 var newPrompt = "\tSetting your homebase protects your avatar location while at home\n\tYou MUST actually BE AT HOME to set your homebase! WARNING: You can only move your homebase 1 time every 30 days!\n\tAre you sure you would like to set your homebase?";
 GUI.Label(Rect(20,40,240,160),newPrompt);
 if(GUI.Button(Rect(50, 165, 70, 25),"YES",styleBut))
    	{
    		setHomebase2();
			if(MsgHomeData == HOMESRVMSG.HOMEBASE_ERROR )
			 	{
			 		ButonStorageApasat = 3;
				}
			else if (MsgHomeData == HOMESRVMSG.HOMEBASE_DONE )
				{	
					ButonStorageApasat = 0 ;
					changeHomeToCurrentCoords();
				}
			else if ( MsgHomeData == HOMESRVMSG.ERROR )
				{
					ButonStorageApasat = 3 ;
				}
            drawCutScenes = true;
            ButonStorageApasat = 0 ;
            Global.self.StartFightWithMob( "Zombie" );
			//DrawCutscenes();
    	}
    	if(GUI.Button(Rect(140, 165, 70, 25),"NO",styleBut))
	    	{
	    		homeQuestion = false;
	    		ButonStorageApasat = 0;
	    	}
        
}

function MissionInfoWindow( windowID : int )
{
	GUI.Label(Rect(20,20,240,160),scriptMissions.GoMission.mInfo);
	if ( scriptMissions.GoMission.toDo == "KILL" || scriptMissions.GoMission.toDo == "DROP" )
    if ( scriptMissions.GoMission.done < scriptMissions.GoMission.quant )
	if(GUI.Button(Rect(135, 140, 70, 25),"Go"))    // start mission
		{
			scriptMissions.InfoWindowActivated = !scriptMissions.InfoWindowActivated;
			//Global.self.FightMob( scriptMissions.GoMission.what );
			Global.self.StartMission( scriptMissions.GoMission );
		}
	
	if(GUI.Button(Rect(55, 140, 70, 25),"Back"))    // go back to mission list
		{
			scriptMissions.InfoWindowActivated = false;
		
			theMissions.setMissions( !theMissions.getMissions() );
	 		if( theMissions.getMissions() )
	 			theMissions.GetMissionList();
		}
}

var buffEXP : int;

function blinkXPbar()
{
	if ( Global.oldEXP == -1 )
		Global.oldEXP = Global.myChar.EXP;
	
	
	if ( Global.myChar.EXP - Global.oldEXP > 0 )
		{
			buffEXP = Global.oldEXP;
			Global.oldEXP = Global.myChar.EXP;
			bNewXP = 10;
		}
	else
	if ( Global.myChar.EXP - Global.oldEXP < 0 )
		{
			buffEXP = 0;
			Global.oldEXP = Global.myChar.EXP;
			bNewXP = 10;
		}

}

function SelectarePlayer(ceva: int)
 {
	var values : String[];
	var the_url = Global.server + "/mmo_iphone/get_state.php?req_type=0&id=" + ceva;
	print ("url este " + the_url);
	var download = new WWW( the_url );
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
		download = new WWW( the_url );
		yield download;
	}
	if(download.error) 
		{
			print( "Error downloading: " + download.error );
			return;
		}
	else
		{
			var	wwwDat = download.text;
		} 
		
	values = Regex.Split(wwwDat,"<br />");
	if  (values.Length > 0)
	{	
			if (values[1] != "")
				{
					 if (values[1] == "PVP") 
							{
						 		print ("PVP");
						 		s = "PVP";
						 	}
						 
					 if (values[1] == "Inactive")
							{
						 		print ("Inactive");
						 		s = "Inactive";
						 	}
				}
			else 
				{
					print("Playerul nu este flagat!" + download.text);
					s = "Error";
				} 
	}
	else s = "Error";
 } 
function changeHomeToCurrentCoords()
{
	Global.myChar.home_lon = lon;
	Global.myChar.home_lat = lat;
}
/*function DrawCutscenes()
{
        if(drawCutScenes)
    {
    Debug.Log("INTRAAA AICIAAA");
   // var tex : Texture2D = Resources.Load( "Animations/cutscenes/homebase/introlow", Texture2D );
   // GUI.DrawTexture( Rect( 0, 0, tex.width, tex.height ), tex );
   
    
    if( scriptGUICutScene.HasCutScene( "homebase" ) )
		scriptGUICutScene.ToggleCutScene( true,        scriptGUICutScene.MODE_INTRO );
    drawCutScenes = false;
     Debug.Log("has cut scene "+scriptGUICutScene.HasCutScene( "homebase" ));
      }


}
*/