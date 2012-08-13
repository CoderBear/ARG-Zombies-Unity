var mixToolkit2 : UIToolkit;	//mix3
mixToolkit2 = GameObject.Find("UI").transform.FindChild("UIToolKit2").GetComponent(UIToolkit); //mix 3

var mixToolkit : UIToolkit;	//mix3
mixToolkit = GameObject.Find("UI").transform.FindChild("UIToolKit").GetComponent(UIToolkit); //mix 3

var mixToolkit3 : UIToolkit;	//mix3
mixToolkit3 = GameObject.Find("UI").transform.FindChild("UIToolKit3").GetComponent(UIToolkit); //mix 3

var mixToolkit4 : UIToolkit;	//mix3
mixToolkit4 = GameObject.Find("UI").transform.FindChild("UIToolKit4").GetComponent(UIToolkit); //mix 3

//var texLeftPanel : Texture2D;
var leftPanelDown : boolean = true;
var mainMenuDown : boolean = true;
var craftDown	 : boolean = true;
var storageDown	 : boolean = true;
var socialDown	 : boolean = true;
var marketJos	 : boolean = true;
var missionsJos  : boolean = true;
static var alertJos 	 : boolean = true; 
var friendJos	 : boolean = true;
var infoDown	 : boolean = true;
var invDown		 : boolean = true;
var statOn 		 : boolean = true;
static var butDown : boolean;
var duelbutStyle : GUIStyle;
var buyDown : boolean = false;
var sendDown : boolean = false;
var versusDown : boolean = false;
var str : String;
var styletext : GUIStyle;
var x : boolean;
var y : boolean;


var marketTexDown : boolean = false;
static var FlagStateCheck: String;
var HpRegenerat : int;
static var firstLog : int = 0;
static var s: String; 
var d : String;
var checkDown : boolean = false;
static var drawCutScenes : boolean;
var activateCutscenes : boolean;
var newSkin : GUISkin;
//var difficultyStyle : GUIStyle;
//var difficultyStyleP : GUIStyle;
var theCraft : Craft; 
var cutscenes : Texture2D[];
var indexCutscene : short = 0;
var time : double;
static var bGUI	: boolean = true;
static var bTradeWasCanceled : boolean;
static var bTradeHasFinished : boolean;
static var missionsClicked : boolean;
var goBankPrefab : GameObject;
static var chatDown : boolean = false;
static var theBank		: scriptBank;
static var theInventory	: Inventory;
static var theMissions  : scriptMissions;
var goBank				: GameObject;
var tradePressed        : boolean;
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
var friendID : int;
var friendIDD : int;
static var bAH	: boolean;
static var bSO  : boolean;
static var bCanShowBank : boolean;
var friendDown : boolean;
var texFrame	: Texture2D;
var texLoading	: Texture2D;
var texPers_1	: Texture2D;
var texFight	: Texture2D;
var texFightP	: Texture2D;
var texMoney	: Texture2D;
var texMenuP	: Texture2D;
//var texButtonShadow : Texture2D;
var texGained    : Texture2D;
var stri : String = "lalala";
//var btnMMStyle 	: GUIStyle;
//var btnInvStyle : GUIStyle;
//var btnPInfoStyle : GUIStyle;
// textureToDisplay : Texture2D;
var styleSelectedNearPlayer : GUIStyle;
var styleListNearPlayers : GUIStyle;
var styleButNearPlayer	: GUIStyle;
var styleButNearPlayerP	: GUIStyle;
var styleDifficulty		: GUIStyle;
var styleDiffP			: GUIStyle;
var styleDiff			: GUIStyle;
//var ids					:String[];
var cntListNearPlayers : GUIContent;
var sSearchNearPlayers	: String;
var sAuxSearchNearPlayers : String;
var styleChatBut : GUIStyle;
var styleButBlueSmll : GUIStyle;
var bGOAreVisible : boolean;
var bShowInfoScreen : boolean;
var sDifficultyLevels : String[];
var texTransparent	: Texture2D;
var goHomebase	: GameObject;
var goHomebaseClone : GameObject;
static var emailAici : boolean  = false;
//var friendx 		: Array;
//var SendButStyle : GUIStyle;
static var itemToSend : int;
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
//var MarketTexture : Texture2D;
//var styleFriendBut	:GUIStyle;
//var styleChatButton	:GUIStyle;

//var styleEarnBut	: GUIStyle;
//var styleRedeemBut	: GUIStyle;

var pvp : boolean = false;

var texDifficulty : Texture2D;
var texDifficultyFrame : Texture2D;
var bDifficulty	: boolean;
var bDifficultyActive : boolean = false;

var goChar		: GameObject;
var goCharFrame	: GameObject;

static var bCharFrame	: boolean = false;
var guiStyle	: GUIStyle;
var guiCharStyle : GUIStyle;
var texLoadBattle1	: Texture2D;
var texLoadBattle2	: Texture2D;
var texLoadBattle3	: Texture2D;
//var texFriendFrame  : Texture2D;
//var texReqFriendFrame : Texture2D; 
//var texQrCode : Texture2D;
var CheckButStyle : GUIStyle;
var scanstyle : GUIStyle;

var newbackStyle : GUIStyle;
var newbackStyle2 : GUIStyle;
var newReqStyle : GUIStyle;
var windowRect : Rect = Rect (20, 20, 200, 200);



var bLoadBattle		: boolean = false;
var goMap		: GameObject;
var goGrid		: GameObject;
var wwwData		: String;
var homeLon		: float;
var homeLat		: float;

var locating : boolean;
var mRequestedMob : boolean = false;
var ButonStorageApasat : int = 0;
var	alertText		: String;
static var CSVData: CSV = new CSV();

var defaultLat : float;
var defaultLon : float;

//---------------battle zones variables
var dimArray: float[] = new float[6];
var degArray: float[] = new float[6];

var mapZones:	Array = new Array();
var style : GUIStyle;

var dimKm : float = 0;
var startLat : float = 0;
var startLon : float = 0;
var zoneID : int = 0;

var styleBut	: GUIStyle;
var styleButP	: GUIStyle;
var styleLVL 	: GUIStyle;
var styleLVLBnk : GUIStyle;
var versusStyle : GUIStyle; 
var chatStyle	: GUIStyle;
var emailStyle  : GUIStyle;
static var marketDown : boolean = false;
var ceva : Texture2D;
var inventoryDown : boolean = false;


//var styleAlertBut1		: GUIStyle;
//var styleAlertBut2		: GUIStyle;

//var alertScreenTex		: Texture2D;
//var monsterFinderTex	: Texture2D;

//var styleDiffic : GUIStyle[];
var www : WWW;

var isPvp : boolean = false;
//var styleDiff1 			: GUIStyle;
//var styleDiff2 			: GUIStyle;
//var styleDiff3 			: GUIStyle;
//var styleDiff4   		: GUIStyle;
//var styleDiff5			: GUIStyle;
//var styleDiff6 			: GUIStyle;
var friendString 		: String[];

var friendUserID		: int;			
var friendUsername		: String;

//var styleBuyButton			: GUIStyle;


var alertDown : boolean = false;
var nrMobs: int = 20;
var Audio : AudioSource;

var friendId			: String;

var friendUsernames		: int[];

//Character renderer texture
public var RenderedCharacter : RenderTexture;
//public var RendererCamera : Camera;

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
var fightDown : boolean = true;
var curZone : mapZone;

class Friends
{
	var id 			: String;
	var username	: String;
	var level 		: String;
}
var nrOfFriends 	: int;
var Friends			: Array = new Array();
var goFriends		: GameObject[];

class Players
{
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

var nSelectedPlayer : int;
var nSelectedPlayerOld : int;
var bSelectedPlayer : boolean;
var buttonFight : Rect;
var frameNearPlayers : Rect;
var valuesx : String[];

var MobLvL : String; 
var scrollPosition = Vector2.zero;
var scrollPosition2 = Vector2.zero;
var xp_to_level : int;
var black_pixel : Texture2D;
var blue_pixel : Texture2D;
var white_pixel : Texture2D;

var xp_bar_height : int;
var xp_bar_multiplier : float;
var retGetMobToFight : int = 0;




var bAux : boolean;








 
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

	if(download.error) 
		{
			print( "Error downloading: " + download.error );
			wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
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
		if (values[10] != "")
		{
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

function checkMob(id : int)
{
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
//var WWWResult		: String;
//var bUpdating		: boolean;
//var sNick			: String;

var lastTime		: float;
var nUserID			: int;
var bNewChat		: boolean;
var bNewTrade		: boolean;
var bNewXP          : int;
var sTo				: String;
var values			: String[];

static var sFrom	: String;
static var nTradeState		: int;
static var bTrade			: boolean;

var blinkTime		: float;
var bBlink			: boolean;
//var texCrosshair 			: Texture2D;

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

	defaultLat = 44.411172;
 	defaultLon = 26.070458;
 	activateCutscenes = false;
 	Global.myChar.init("PC", "Animations/Character1.5", Vector3(-24.5, -7.2, 20), Vector3(16, 16, 16), Vector3(-21, -3, 15), Vector3(-21, -3, 15), 1);

     
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

	goPlayerFace = Instantiate( goPlayerFacePrefab );
	
	
	var tempX = 480 * 0.5;
	var tempY = 320 * 0.5;
	goPlayerFace.transform.position = camera.ScreenToWorldPoint(Vector3( tempX, tempY,265 - camera.transform.position.z));
	goPlayerFace.transform.localScale = Vector3( 3, 3, 3);

	goPlayerFace.renderer.material = Resources.Load("Menus/Menu_SelChar/Faces/face_mic_"+Global.myChar.AvatarId, Material);
	goPlayerFace.renderer.enabled = true;
	goPlayerFace.name = "-1";
	nSelectedPlayer = -1;
	nSelectedPlayerOld = -1;
	
	bSelectedPlayer = false;
	buttonFight = Rect(310, 240, 66, 51);
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
	//sNick = Global.myChar.Nick;
	bNewChat = false;
	bNewTrade = false;
	nUserID = Global.myChar.id;
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
		if(nMobs > 0) 
			specialZones.Push(zone);
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



function getNearPlayers()
{
   
	
	var minLat: float = lat - dimKm;
	var maxLat: float = lat + dimKm;
	var minLon: float = lon - dimKm;
	var maxLon: float = lon + dimKm;

	var templat : float;
	var templong : float;
	var values : String[];
	var tempdata : String[];
	
	homeLon = 480 - Mathf.Round(480 *(((lon-Global.myChar.home_lon)/(maxLon-minLon)) + 0.5));// - 29;
	homeLat =  320 - Mathf.Round(320 *(((lat-Global.myChar.home_lat)/(maxLat-minLat)) + 0.5));// - 29;


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
					
					
			            nearplayer.nick = tempdata[5];
						nearplayer.level = tempdata[6];
						players.Add(nearplayer);
						playersName[i] = nearplayer.nick;
			
						goPlayers[i] = Instantiate(goPlayerFacePrefab);
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
	var url = "http://maps.google.com/maps/api/staticmap?center="+lat+","+lon+"&zoom="+zoom+"&size=480x480&sensor=false";
	var download : WWW = new WWW (url);
	 // Wait for download to complete
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW (url);
			yield download;
		}
	
			
	mapTex = download.texture;
	download = null;	
	loadSpecialZones();
	
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
	if (ID == -1) 
			return -1;
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
	var curLonInt: int = Mathf.Abs(lon);
	var curLon: float = curLonInt;
	var nrK1: int = 0;
	
	while (curLon + dimKm<Mathf.Abs(lon))
		{
			nrK1++;
			curLon+=dimKm;
		}
	startLon = curLon;
	

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

function inviteTrade(response : int)
{
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

function getUpdates()
{
	var values : String[];
	
	if(Time.timeSinceLevelLoad > lastTime + 5)
		{
			//bUpdating = true;
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
			//bUpdating = false;
			lastTime = Time.timeSinceLevelLoad;
		}
}

function Start()
{  
	// exitFromTrade = false;
	//reloadPlayers = true;
	
    scriptMissions.GoMission = null;
    drawCutScenes = false;
    missionsClicked = false;
    Audio.volume = scriptMainMenu.nMusicVol/100;
    if(scriptMainMenu.bMute) 
    		Audio.mute = true;
    else Audio.mute = false;
    
	friendDown = false ;              
                                     
	UpdateLoop();
	print("Id-ul meste urmatorul : "+Global.myChar.id);

//Draw QR Code for friend Request												
		var	wwwData;
				var postData : WWWForm = new WWWForm();
				postData.AddField("id", Global.myChar.id);
			
				var login_url = Global.server + "/mmo_iphone/add_friend_request.php";
				
				var download = new WWW(login_url, postData);
				
				yield download;
				
				while (download.error && download.error.ToString().Contains("Resolving host timed out"))
					{
						
						download = new WWW(login_url, postData);
						yield download;
						
					}
					
				while (download.error && download.error.ToString().Contains("Resolving host timed out"));
			
				if(download.error) 
					{
						
						print( "Error downloading: " + download.error );
						wwwData = "Error! Could not connect.";
						return;
					}
				else
					{
						wwwData = download.text;
						print (download.text);
					}
			
			
			www = new WWW (wwwData);
			yield www;
			ceva = www.texture;
	
	
	//add a friend after qr scan
				var	wwwData1;
				var postData1 : WWWForm = new WWWForm();
				postData1.AddField("id", str);
			
				var login_url1 = Global.server + "/mmo_iphone/add_friend.php";
				
				var download1 = new WWW(login_url1, postData1);
				
				yield download1;
				
				while (download1.error && download1.error.ToString().Contains("Resolving host timed out"))
					{
						
						download1 = new WWW(login_url1, postData1);
						yield download1;
						
					}
					
				while (download1.error && download1.error.ToString().Contains("Resolving host timed out"));
			
				if(download1.error) 
					{
						
						print( "Error downloading: " + download1.error );
						wwwData1 = "Error! Could not connect.";
						return;
					}
				else
					{
						wwwData1 = download1.text;
						print ("A mers!" + Global.myChar.id + " " + download1.text);
					}				
	
	
	//get friends for friend list:
		

	var	wwwData2;
	var postData2 : WWWForm = new WWWForm();
	postData2.AddField("id", Global.myChar.id);
	

	var login_url2 = Global.server + "/mmo_iphone/get_friends_list.php";
	
	var download2 = new WWW(login_url2, postData2);
	
	yield download2;
	
	while (download2.error && download2.error.ToString().Contains("Resolving host timed out"))
		{
			
			download2 = new WWW(login_url2, postData2);
			yield download2;
			
		}
		
	while (download2.error && download2.error.ToString().Contains("Resolving host timed out"));

	if(download2.error) 
		{
			
			print( "Error downloading: " + download2.error );
			wwwData2 = "Error! Could not connect.";
			return;
		}
	else
		{
			wwwData2 = download2.text;
			print ("A mers!" + Global.myChar.id + " " + download2.text);
		}
						






	
	var the_url3 = Global.server + "/mmo_iphone/get_friends_list.php";
	var download3 = new WWW( the_url3 );
	yield download3;
	while( download3.error && download3.error.ToString().Contains("Resolving host timed out") )
		{
			download3 = new WWW( the_url3 );
			yield download3;
		}
	if(download3.error)
		{
			wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			var	wwwData3 = download3.text;
		}

	
			friendString = Regex.Split(wwwData3,"-");
		
			


	
	
	//send an item to a friend
	
	var	wwwData4;
	var postData4 : WWWForm = new WWWForm();
	postData4.AddField("id", Global.myChar.id);
	postData4.AddField("id_friend", friendID);
	postData4.AddField("item", itemToSend);

	var login_url4 = Global.server + "/mmo_iphone/send_item.php";
	
	var download4 = new WWW(login_url4, postData4);
	
	yield download4;
	
	while (download4.error && download4.error.ToString().Contains("Resolving host timed out"))
		{
			
			download4 = new WWW(login_url4, postData4);
			yield download4;
			
		}
		
	while (download4.error && download4.error.ToString().Contains("Resolving host timed out"));

	if(download4.error) 
		{
			
			print( "Error downloading: " + download4.error );
			wwwData4 = "Error! Could not connect.";
			
			return;
		}
	else
		{
			wwwData4 = download4.text;
			print("Aici se intampla transferu!!!!!!!!!!!!!!!!!!!	");
			print ("A mers!" + Global.myChar.id + " " + download4.text);
		}
	
	assignAllSprites();					
	assignAllButtons();
	GameObject.Find("PC").transform.position = Vector3(-250,400,0);
	//RendererCamera = GameObject.Find("CharacterRenderingCam").camera;
	 //RenderedCharacter = RendererCamera.targetTexture as Texture;
	
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

function Update()
{ 
	//Debug.Log(System.Convert.ToInt32(7/3));
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
					//homeQuestion = true;
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
        		if(!buttonFight.Contains(Vector2(touch.position.x,320 - touch.position.y)) && !frameNearPlayers.Contains(Vector2(touch.position.x,320 - touch.position.y)))
	        		{
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
	if (Global.Hp_incercare > 1 && redLeftSprite) {				
		redLeftSprite.setSize(System.Convert.ToInt32(((System.Convert.ToDouble(Global.Hp_incercare)/System.Convert.ToDouble(Global.myChar.HP))*85)),10);			
	}

}


////////////////////////////////////////////////////
//----------DELEGATE FUNCTIONS--------------------//
//////////////////////////////////////////////////// 



function mainMenuDelegate(sender : UIToggleButton, val : boolean)
{
	marketDown = false;
	Inventory.bPlayerEq =  false;
	Inventory.bInventory = false;
	theBank.bInventory = false;
	theBank.bPlayerEq = false;
	
	if(nrOfPlayers > 0)
		{
			for(var i: int = 0; i < nrOfPlayers; i++)
				{
					Destroy(goPlayers[i]);
				}
		}
	Destroy(goPlayerFace);
	Destroy(GameObject.Find("PC"));
    scriptBattle.intoMap = false;
	BackgroundManager.LoadLevelSafe( "sceneMainMenu" );
}


function CraftDelegate(sender : UIToggleButton, val : boolean)
{
	bAux = Craft.bCraft = !Craft.bCraft;
	if(bAux)
		{
			alertButton.hidden = !alertButton.hidden;
		marketDown = false;
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

function StorageDelegate(sender : UIToggleButton, val : boolean)
{
	ButonStorageApasat = 1;
	//scriptBank = !scriptBank;
		if ( IsHome() )
		{
			
			alertButton.hidden = !alertButton.hidden;
			//if(scriptBank.alertSus)
			//	alertButton.hidden = false;
			
			
			//alertDown = !alertDown;
			marketDown = false;
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
}

function SocialDelegate(sender : UIToggleButton, val : boolean)
{
	 missionsClicked = false;
     bAux = bSO = !bSO;
		if(bAux)
			{
				marketDown = false;
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
			
			chatButton.hidden = !chatButton.hidden;
			friendsButton.hidden = !friendsButton.hidden;
			buyButton.hidden = true;		
			earnButton.hidden = true;
			redeemButton.hidden = true;
}

function MarketDelegate(sender : UIToggleButton, val : boolean)
{
	   //butDown = true;
		//marketDown = !marketDown;
	//	alertJos = false;
		//bAux = scriptMarket.bMarket = !scriptMarket.bMarket;
		//if(bAux)
		//	{
				//bTrade = false;
				//theMissions.setMissions( false );
				//bAH = false;
				//Inventory.bInventory = false;
				//Inventory.bPlayerEq = false;
				//bShowInfoScreen = false;
				//bGUI = true;
				//Craft.bCraft = false;
				
				//scriptAH.bSell = false;
				//scriptAH.bBuy = false;
				//scriptAH.bExpired =false;
				//theBank.bInventory = false;
				//scriptTrade.bInitialized = false;
				//scriptTrade.bTrade = false;
				//scriptTrade.bGUIFrame = false;
				
				//if(!bGOAreVisible)
				////	{
				//		showGameObjects();
					//}
			//}
		//else
		//	{ 
				
			//	bGUI = true;
				//scriptTrade.bGUIFrame = false;
			//}
	
			buyButton.hidden = !buyButton.hidden; 		
			earnButton.hidden = !earnButton.hidden;
			redeemButton.hidden = !redeemButton.hidden;
			
}

function MissionsDelegate(sender : UIToggleButton, val : boolean)
{
	alertButton.hidden = !alertButton.hidden;
	marketDown = false;
    Global.CES = 0;
    theMissions.setMissions( !theMissions.getMissions() );
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

function BackpackDelegate(sender : UIToggleButton, val : boolean)
{
	//bCharFrame = !bCharFrame;
	bShowInfoScreen = !bShowInfoScreen;
	bAH = false;
    bSO = false;
	bTrade = false;
	districtInformationFrameSprite.hidden = !districtInformationFrameSprite.hidden;
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

function DistrictInfoDelegate(sender : UIToggleButton, val : boolean)
{
	inventoryDown = !inventoryDown;
	alertButton.hidden = !alertButton.hidden;
	
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

function fightButtonDelegate(sender : UIButton)
{
	    fightDown = true;
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
		print("Selectarea dificultatii");
		Global.bDifficultySelected = true;
		bSelectedPlayer = false;
}

function diffButton1Delegate()
{
	
			Global.myChar.Difficulty = 0;
			Global.save_stats();
		
}

function diffButton2Delegate()
{
	
			Global.myChar.Difficulty = 1;
			Global.save_stats();
		
}

function diffButton3Delegate()
{
	
			Global.myChar.Difficulty = 2;
			Global.save_stats();
		
}

function diffButton4Delegate()
{
			Global.myChar.Difficulty = 3;
			Global.save_stats();
		
}

function diffButton5Delegate()
{

			Global.myChar.Difficulty = 4;
			Global.save_stats();
		
}

function diffButton6Delegate()
{
	
			Global.myChar.Difficulty = 5;
			Global.save_stats();
		
}

function alertButtonDelegate(sender : UIToggleButton, val : boolean)
{	
	print("Fight Button");
	fightButton.hidden = !fightButton.hidden;
	alertScreen.hidden = !alertScreen.hidden;
	monsterFinderScreen.hidden = !monsterFinderScreen.hidden;	
	diffButton1.hidden = !diffButton1.hidden;
	diffButton2.hidden = !diffButton2.hidden;
	diffButton3.hidden = !diffButton3.hidden;
	diffButton4.hidden = !diffButton4.hidden;
	diffButton5.hidden = !diffButton5.hidden;
	diffButton6.hidden = !diffButton6.hidden;		
				
}


function buyButtonDelegate(sender : UIButton)
{
	scriptMarket.bMarket = !scriptMarket.bMarket;
	scriptMarket.redeemDown = true;
	redeemButton.hidden = !redeemButton.hidden;
	earnButton.hidden = !earnButton.hidden;
	buyButton.hidden = !buyButton.hidden;
}

function earnButtonDelegate(sender : UIButton)
{
	
}

function redeemButtonDelegate(sender : UIButton)
{
	scriptMarket.bMarket = !scriptMarket.bMarket;
	scriptMarket.buyDown = true;
	redeemButton.hidden = true;
	earnButton.hidden = !earnButton.hidden;
	buyButton.hidden = !buyButton.hidden;
	
}
function checkButtonDelegate(sender : UIButton)
{
	    alertJos = true;
	    mainMenuDown = true;
	    craftDown = true;
	    storageDown = true;
	    socialDown = true;
	    marketJos = true;
	    missionsJos = true;
	    friendJos = true;
	    infoDown = true;
	    invDown = true;
	    leftPanelDown = true;
	    statOn = true;
	    fightDown = true;
	    x = false;
	    checkButton.hidden = !checkButton.hidden;
	    requestFrameSprite.hidden = !requestFrameSprite.hidden;
	    alertButton.hidden = false;
}

function chatButtonDelegate(sender : UIButton)
{
	bAux = scriptChat.bChat = !scriptChat.bChat;
	chatButton.hidden = true;
	friendsButton.hidden = true;
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

/*
function versusButtonDelegate(sender : UIButton)
{
	for(var ii = 0;ii<friendString.Length ; ii++)
		{
		 if(ii%2==1)
		 {
						 //versusDown = !versusDown;
						 friendIDD = parseInt(friendString[ii-1]);
						 print (friendIDD);
						 Global.enemyPCid = friendString[ii-1];
						 print("Global.enemyPCid" + Global.enemyPCid);
						 Global.enemyPCUserName = friendString[ii];	
						 print("Global.enemyPCUserName" + Global.enemyPCUserName);
	 	 }
}
}

function emailButtonDelegate(sender : UIButton)
{
	
	
	for(var ii = 0;ii<friendString.Length ; ii++)
		{
		 if(ii%2==1)
		 {	
		 emailAici = true;
						friendDown = false;
						fightDown = !fightDown;
						friendID = parseInt(friendString[ii-1]);
						print("Aici e id-ul prietenului " + friendID);
						
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
					}
		 }	
		 	

}

function chatSquareButtonDelegate(sender : UIButton)
{
	for(var ii = 0;ii<friendString.Length ; ii++)
		{
		 if(ii%2==1)
		 {
		 				friendDown = false;
						chatDown = true;
						//friendID = parseInt(friendString[ii-1]);
						//chatDown = !chatDown;
						 	marketDown = false;
						 	print("aicicdc");
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
}
*/
function friendsButtonDelegate(sender : UIButton)
{	
	
	print("aici face apasare pe friend");
	friendDown = !friendDown;
	print(friendDown);
	/*versusButton.hidden = false;*/
	
	friendFrameSprite.hidden = !friendFrameSprite.hidden;
	/*versusButton.hidden = false;
	chatSquareButton.hidden = false;
	emailButton.hidden = false;
	//scrollable.hidden = false;*/
	/*//Meniul scrolabil de prieteni		
	scrollPosition2 = GUI.BeginScrollView (Rect(125, 70, 340, 195), scrollPosition2, Rect (125, 0, 320, friendString.Length/2+1* 50));
	VAR CONT = 0;
	for(var ii = 0;ii<friendString.Length ; ii++)
		{
		 if(ii%2==1)
		 {
			GUI.Label(Rect(145,50*(cont)+10,40,100),friendString[ii]);
				 	
			GUI.Box(Rect(135,50*cont,325,50),"");

			 //Versus Button
			 
			 versusButton.hidden = false;
			 
			 
			 
			 	if(GUI.Button(Rect(306,50*cont,50,50), "", versusStyle))
			 	{
					
					 
				}
									 			 				 			 				 	
				//Chat Button			 				 			 				 			 				 			 				 			 				 	
					if(GUI.Button(Rect(358,50*cont,50,50), "", chatStyle))
					{
						friendDown = false;
						chatDown = true;
						//friendID = parseInt(friendString[ii-1]);
						//chatDown = !chatDown;
						 	marketDown = false;
						 	print("aicicdc");
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
		
		      //Email Button
					if(GUI.Button(Rect(410,50*cont,50,50), "", emailStyle))
					{
						emailAici = true;
						friendDown = false;
						fightDown = !fightDown;
						friendID = parseInt(friendString[ii-1]);
						print("Aici e id-ul prietenului " + friendID);
						
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
					}
		
					cont++;
				}			
		}		
			            GUI.EndScrollView ();
				
			if(versusDown)
		  	//if(GUI.Button(Rect(220, 270, 69,30),"Duel",duelbutStyle))
			 		{
			 		 	 
						SelectarePlayer(friendIDD);
						print (friendIDD + "Asta e id-ul prietenului");
						GUI.Label(Rect(190,47,150,20),s, styleSelectedNearPlayer);
	
			 		if (s == "PVP")
					 {
						Global.bDifficultySelected = true;	
						isPvp = true;	
					 }
			}

 	if(GUI.Button(Rect(135,265,61,27),"", newbackStyle))
		 	{
		 	 	friendDown = !friendDown;
		 	 	fightDown = true;
		 	 	//x = true;
		 	}
		 	
		 	
		 	
		 	
	if(GUI.Button(Rect(320,265,61,27),"", newbackStyle2))
		 	{
		 	 	friendDown = !friendDown;
		 	 	y = true;
		 	 	
			marketDown = false;
	        Global.CES = 0;
	        theMissions.setMissions( !theMissions.getMissions() );
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
				str = scriptMissions.Stringx;

			if(scriptMissions.backdown)
			{
				fightDown = true;
			}
		}
		 	
	
	// Request Button	 	
 	if(GUI.Button(Rect(390,265,61,27),"", newReqStyle))
		 	{
		 	 	friendDown = !friendDown;
		 	 	x= true;
						 	 	
		 	 	
		 	 }   
	
	}		
						
									
												
		*/																
				
					
						
							
								
									
											
} 

var scrollable 					: UIScrollableVerticalLayout;

var mainMenuButton				: UIToggleButton;
var craftButton					: UIToggleButton;
var storageButton				: UIToggleButton;
var socialButton				: UIToggleButton;	
var marketButton				: UIToggleButton;
var missionsButton				: UIToggleButton;
var districtInfoButton			: UIToggleButton;
var invButton					: UIToggleButton;
var alertButton					: UIToggleButton;

var fightButton					: UIButton;
var buyButton					: UIButton;
var earnButton					: UIButton;
var redeemButton				: UIButton;
var versusButton				: UIButton;
var chatSquareButton			: UIButton;
var emailButton					: UIButton;
var chatButton					: UIButton;
var friendsButton				: UIButton;
//var alertButton					: UIButton;
var diffButton1					: UIButton;
var diffButton2					: UIButton;
var diffButton3					: UIButton;
var diffButton4					: UIButton;
var diffButton5					: UIButton;
var diffButton6					: UIButton;
var checkButton					: UIButton;

var mainButWidth			: int = 89;			
var mainButHeight			: int = 39;				
var ButWidth				: int = 69;
var ButHeight				: int = 30;			
var missButWidth			: int = 114;			
var missButHeight			: int = 61;				
var squareButWidth			: int = 40;				
var squareButHeight			: int = 40;				

var alertScreen							: UISprite;
var monsterFinderScreen					: UISprite;
var leftPanelSprite						: UISprite;
var friendFrameSprite					: UISprite;
var requestFrameSprite					: UISprite;
var districtInformationFrameSprite		: UISprite;
var redLeftSprite						: UISprite;
var blueLeftSprite						: UISprite;
function assignAllButtons()
{

	Debug.Log("Cream Butoane.. ");
	  
	scrollable  = new UIScrollableVerticalLayout( 10 );
	scrollable.position = new Vector3(125, -70,0);
	scrollable.setSize(340, 195); 
	scrollable.hidden = true;
	
	fightButton = UIButton.create(mixToolkit, "FIGHT.png","FIGHT.png",0,0);
	fightButton.setSize(66, 51); 
	fightButton.position = Vector3(310, -240,-1);
	fightButton.onTouchDown += fightButtonDelegate;
	fightButton.hidden = true;
	
	diffButton1 = UIButton.create(mixToolkit, "1-9.png","DOWN.png",0,0);
	diffButton1.setSize(41,17); 
	diffButton1.position = Vector3(135, -250);
	diffButton1.onTouchDown += diffButton1Delegate;
	diffButton1.hidden = true;
	
	diffButton2 = UIButton.create(mixToolkit, "10S.png","DOWN.png",0,0);
	diffButton2.setSize(41,17); 
	diffButton2.position = Vector3(180, -250);
	diffButton2.onTouchDown += diffButton2Delegate;
	diffButton2.hidden = true;
	
	diffButton3 = UIButton.create(mixToolkit, "20S.png","DOWN.png",0,0);
	diffButton3.setSize(41,17); 
	diffButton3.position = Vector3(135, -270);
	diffButton3.onTouchDown += diffButton3Delegate;
	diffButton3.hidden = true;
	
	diffButton4 = UIButton.create(mixToolkit, "30S.png","DOWN.png",0,0);
	diffButton4.setSize(41,17); 
	diffButton4.position = Vector3(180, -270);
	diffButton4.onTouchDown += diffButton4Delegate;
	diffButton4.hidden = true;
	
	diffButton5 = UIButton.create(mixToolkit, "40S.png","DOWN.png",0,0);
	diffButton5.setSize(41,17); 
	diffButton5.position = Vector3(135, -290);
	diffButton5.onTouchDown += diffButton5Delegate;
	diffButton5.hidden = true;
	
	diffButton6 = UIButton.create(mixToolkit, "50S.png","DOWN.png",0,0);
	diffButton6.setSize(41,17); 
	diffButton6.position = Vector3(180, -290);
	diffButton6.onTouchDown += diffButton6Delegate;
	diffButton6.hidden = true;
	
	
	
	
	alertButton = UIToggleButton.create(mixToolkit, "butonALERTxta.png","butonALERTa.png","butonALERTa.png",0,0);
	alertButton.setSize(100, 50); 
	alertButton.position = Vector3(380, -270);
	alertButton.onToggle += alertButtonDelegate; 
	alertButton.hidden = false;
	
	
	
	
	mainMenuButton = UIToggleButton.create(mixToolkit, "mainmenu.png","mainmenu.png","mainmenu.png",0,0);
	mainMenuButton.setSize(mainButWidth, mainButHeight); 
	mainMenuButton.position = Vector3(0, 0);
	mainMenuButton.onToggle += mainMenuDelegate;
	mainMenuButton.hidden = false; 
	
	craftButton = UIToggleButton.create(mixToolkit, "crafttopbar.png","craftopen.png","craftopen.png",0,0);
	craftButton.setSize(ButWidth, ButHeight); 
	craftButton.position = Vector3(88, -1);
	craftButton.onToggle += CraftDelegate; 
	craftButton.hidden = false;
	
	storageButton = UIToggleButton.create(mixToolkit, "storage.png","storageopen.png","storageopen.png",0,0);
	storageButton.setSize(ButWidth, ButHeight); 
	storageButton.position = Vector3(157, -1);
	storageButton.onToggle += StorageDelegate; 
	storageButton.hidden = false;
	
	socialButton = UIToggleButton.create(mixToolkit, "social.png","socialopen.png","socialopen.png",0,0);
	socialButton.setSize(ButWidth, ButHeight); 
	socialButton.position = Vector3(226, -1);
	socialButton.onToggle += SocialDelegate; 
	socialButton.hidden = false;
	
	marketButton = UIToggleButton.create(mixToolkit, "market.png","marketopen.png","marketopen.png",0,0);
	marketButton.setSize(ButWidth, ButHeight); 
	marketButton.position = Vector3(295, -1);
	marketButton.onToggle += MarketDelegate; 
	marketButton.hidden = false;
	
	missionsButton = UIToggleButton.create(mixToolkit, "mission.png","missionsopen.png","missionsopen.png",0,0);
	missionsButton.setSize(missButWidth, missButHeight); 
	missionsButton.position = Vector3(364, 8);
	missionsButton.onToggle += MissionsDelegate; 
	missionsButton.hidden = false;
	
	districtInfoButton = UIToggleButton.create(mixToolkit, "backpack.png","DOWN.png","DOWN.png",0,0);
	districtInfoButton.setSize(41,41); 
	districtInfoButton.position = Vector3(55,-280);
	districtInfoButton.onToggle += DistrictInfoDelegate;
	districtInfoButton.hidden = false;
	
	invButton = UIToggleButton.create(mixToolkit, "districtinfo.png","DOWN.png","DOWN.png",0,0);
	invButton.setSize(41,41); 
	invButton.position = Vector3(5,-280);
	invButton.onToggle += BackpackDelegate;
	invButton.hidden = false;
	
	buyButton = UIButton.create(mixToolkit, "BuyTaba.png","BuyTaba.png",0,0);
	buyButton.setSize(ButWidth, ButHeight); 
	buyButton.position = Vector3(295,-31);
	buyButton.onTouchDown += buyButtonDelegate;
	buyButton.hidden = true;
	
	earnButton = UIButton.create(mixToolkit, "EarnTaba.png","EarnTaba.png",0,0);
	earnButton.setSize(ButWidth, ButHeight); 
	earnButton.position = Vector3(295,-61);
	earnButton.onTouchDown += earnButtonDelegate;
	earnButton.hidden = true;
	
	redeemButton = UIButton.create(mixToolkit, "RedeemTaba.png","RedeemTaba.png",0,0);
	redeemButton.setSize(ButWidth, ButHeight); 
	redeemButton.position = Vector3(295,-91);
	redeemButton.onTouchDown += redeemButtonDelegate;
	redeemButton.hidden = true;
	
	chatButton = UIButton.create(mixToolkit, "ChatTaba.png","ChatTaba.png",0,0);
	chatButton.setSize(ButWidth, ButHeight); 
	chatButton.position = Vector3(226, -31);
	chatButton.onTouchDown += chatButtonDelegate;
	chatButton.hidden = true;
	
	friendsButton = UIButton.create(mixToolkit, "FriendsTaba.png","FriendsTaba.png",0,0);
	friendsButton.setSize(ButWidth, ButHeight); 
	friendsButton.position = Vector3(226, -61);
	friendsButton.onTouchDown += friendsButtonDelegate;
	friendsButton.hidden = true;
	
/*	var cont = 0;
	for (var ii : int = 0; ii < friendString.Length; ii++)
	{	
		
		versusButton = UIButton.create(mixToolkit, "vs.png","DOWN.png",0,0);
		versusButton.setSize(50,50); 
		versusButton.position = Vector3(306,-50*cont);
		versusButton.onTouchDown += versusButtonDelegate;
		versusButton.hidden = true;
	
		chatSquareButton = UIButton.create(mixToolkit, "chat.png","DOWN.png",0,0);
		chatSquareButton.setSize(50,50); 
		chatSquareButton.position = Vector3(358,-50*cont);
		chatSquareButton.onTouchDown += chatSquareButtonDelegate;
		chatSquareButton.hidden = true;
		
		emailButton = UIButton.create(mixToolkit, "mail.png","DOWN.png",0,0);
		emailButton.setSize(50,50); 
		emailButton.position = Vector3(410,-50*cont);
		emailButton.onTouchDown += emailButtonDelegate;
		emailButton.hidden = true;
		cont++;
	}*/
	
	checkButton = UIButton.create(mixToolkit4, "check.png","checkd.png",0,0);
	checkButton.setSize(40,40); 
	checkButton.position = Vector3(225,-250);
	checkButton.onTouchDown += checkButtonDelegate;
	checkButton.hidden = true;
}


function assignAllSprites()
{ 
	alertScreen = mixToolkit2.addSprite("ALERT.png",0,0,5);
	alertScreen.setSize (331, 181);
	alertScreen.position = Vector3(125, -45);
	alertScreen.hidden = true;
	
	
	monsterFinderScreen = mixToolkit2.addSprite("monsterfinder.png",0,0,5);
	monsterFinderScreen.setSize (256, 90);
	monsterFinderScreen.position = Vector3(125, -225);
	monsterFinderScreen.hidden = true;
	
	redLeftSprite = mixToolkit.addSprite("sidepanelhealthfull.png",0,0,5);
	redLeftSprite.setSize (85,10);
	redLeftSprite.position = Vector3(8,-252,-1);
	redLeftSprite.hidden = false;
	
	
	blueLeftSprite = mixToolkit.addSprite("sidepanelenergyfull.png",0,0,5);
	blueLeftSprite.setSize (85,10);
	blueLeftSprite.position = Vector3(8,-266,-1);
	blueLeftSprite.hidden = false;
	
	leftPanelSprite = mixToolkit2.addSprite("leftpanel.png",0,0,5);
	leftPanelSprite.setSize (100,290);
	leftPanelSprite.position = Vector3(0,-35);
	leftPanelSprite.hidden = false;
	
	
	friendFrameSprite = mixToolkit3.addSprite("friends.png",0,0,5);
	friendFrameSprite.setSize (340, 265);
	friendFrameSprite.position = Vector3(125, -45);
	friendFrameSprite.hidden = true;
	
	
	requestFrameSprite = mixToolkit3.addSprite("friendscan.png",0,0,5);
	requestFrameSprite.setSize (196, 251);
	requestFrameSprite.position = Vector3(150, -45);
	requestFrameSprite.hidden = true;
	
	
	districtInformationFrameSprite = mixToolkit2.addSprite("districtinformation.png",0,0,5);
	districtInformationFrameSprite.setSize (345,190);
	districtInformationFrameSprite.position = Vector3(120,-45);
	districtInformationFrameSprite.hidden = true;
	
	
	
	
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
    
    //GUI.depth = 10;
    //GUI.DrawTexture(Rect(15, 15, 30, 30), Resources.Load("Textures/CharacterrenderTexture"), ScaleMode.StretchToFill);
    
    //GUI.depth = 0;
    
    if (scriptBattle.getRewarded)
    {
        GUI.DrawTexture(Rect(120, 40, 230, 170), texGained, ScaleMode.StretchToFill, true, 1);
        GUI.Label(Rect(195, 45, 200, 20), "You have gained :");
        
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
    
    if(Inventory.butDown)
    	{alertButton.hidden = false;
    	Inventory.butDown = false;
    	}
    	
   	if(scriptMissions.backdown)
   	{
   		alertButton.hidden = false;
   		scriptMissions.backdown = false;
   	}
    	
    if(Craft.butDown)
    {
    	alertButton.hidden = false;
   		Craft.butDown = false;
    }
    GUI.skin.verticalScrollbar = newSkin.verticalScrollbar;
    GUI.skin.verticalScrollbarThumb = newSkin.verticalScrollbarThumb;
    if(bLoadBattle  || scriptBattle.intoMap)
    {
        
        if(Global.randomNumber <= 0.33)
            GUI.DrawTexture (Rect(0,0,480,320), texLoadBattle1, ScaleMode.StretchToFill, true, 1);
        else if(Global.randomNumber > 0.33 && Global.randomNumber <= 0.66)
            GUI.DrawTexture (Rect(0,0,480,320), texLoadBattle2, ScaleMode.StretchToFill, true, 1);
        else GUI.DrawTexture (Rect(0,0,480,320), texLoadBattle3, ScaleMode.StretchToFill, true, 1);
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
        
        goMap.renderer.material.mainTexture = mapTex;
        goMap.renderer.material.mainTextureScale = Vector2(1,0.66);
        goMap.renderer.material.mainTextureOffset = Vector2(0,80);
        
        var zn: mapZone = mapZones[0];
        
        goGrid.renderer.material.mainTextureOffset = Vector2((1 - ((zn.zone.x + 240) / 240)), ((480 + zn.zone.y)/320));
        mapTex.mipMapBias = -12;
        goMap.renderer.material.mainTexture.mipMapBias = -12;
        
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
        
        
        
        if(shouldGUI())
            //if(!scriptTrade.bInitialized && !scriptAH.bSell && !scriptAH.bBuy && !scriptAH.bExpired)
        {  
            Global.CES = 0;
            style.active.background = texFightP;
            style.normal.background = texFight;
        }
        
        
        
        
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
        if(statOn)
        {
        	if(!scriptTrade.bInitialized && !scriptAH.bSell && !scriptAH.bBuy &&!scriptAH.bExpired)
        	{
            	GUI.Label(Rect(-5, 114, 120, 40), Global.myChar.Nick, guiCharStyle);
        	}
            
            // money and  level
            if(!scriptTrade.bInitialized)
            {
                //  GUI.BeginGroup(Rect(5 , 279, 100, 35)); // old position
                //GUI.Label(Rect(45, 15, 50, 20), "$ " + Global.myChar.Money+"", styleLVL);
                GUI.BeginGroup(Rect(8 , 88, 85, 40));  // new position
                GUI.DrawTexture(Rect(0, 0, 100, 55), texMoney, ScaleMode.StretchToFill, true, 1);
                styleLVL.normal.textColor = Color.white;
                styleLVLBnk.normal.textColor = Color.white;
                GUI.Label(Rect(5, 0, 60, 30), "LEVEL :", styleLVL);
                styleLVL.normal.textColor = Color.green;
                GUI.Label(Rect(55, 0, 60, 30), Global.myChar.LVL+"", styleLVL);
                styleLVL.normal.textColor = Color.white;
                GUI.Label(Rect(5, 15, 60, 30), "BANKROLL :", styleLVLBnk);
                styleLVLBnk.normal.textColor = Color.green;
                GUI.Label(Rect(55, 15, 60, 30), "$ " + Global.myChar.Money+"", styleLVLBnk);
                GUI.EndGroup();
            }
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
                Global.theScene = 2;
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
                    if(isPvp)
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
        
        
         if(!IsHome() )
             {
             switch (ButonStorageApasat)
             {
             case 1: GUI.Window(0, Rect (150, 90, 220, 130),DoMyWindow,"",styleErrorFrame);
             break;
             case 2  :GUI.Window(0,Rect(120,50,270,200),homeFunction,"",styleErrorFrame);
             break;
             case 3: GUI.Window (1, Rect (150, 100, 220, 120), DoHomeBaseAlert, "", styleErrorFrame);
             break;
             }
             }
        if(!scriptTrade.bInitialized && !scriptAH.bSell && !scriptAH.bBuy && !scriptAH.bExpired )
        {
            /*  if(invDown)
             if(GUI.Button(Rect(50, 273, 46, 46), "", btnInvStyle))
             {
             
             inventoryDown = !inventoryDown;
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
             }*/
            /*if(infoDown)
             if(GUI.Button(Rect(2, 273, 46, 46), "", btnPInfoStyle))
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
             }*/
        }
        
        
        
        //Info Screen ( district info )
        if(friendDown)
          { 	friendsButton.hidden = true;
            	chatButton.hidden = true; 
            	alertButton.hidden = true;
               // GUI.DrawTexture(Rect(0,0,200,200), texFight, ScaleMode.StretchToFill);
                fightDown = false;
                marketDown = false;
                //alertJos = false;
                //GUI.DrawTexture(Rect(100, 25, 380, 320), texFriendFrame);
              //  GUI.DrawTexture(Rect(Screen.width*0.3, Screen.height*0.3, 340, 265), texFight);
                
                //Meniul scrolabil de prieteni   
                
             if(friendFrameSprite.hidden == false)         
               { 
               
               //	alertButton.hidden = true;
               	scrollPosition2 = GUI.BeginScrollView (Rect(125, 70, 340, 195), scrollPosition2, Rect (125, 0, 320, friendString.Length/2+1* 50));
                
                var cont = 0;
                for(var ii = 0;ii<friendString.Length ; ii++)
                {              
                    if(ii%2==1)
                    {
                        GUI.Label(Rect(145,50*(cont)+10,40,100),friendString[ii]);
                        
                        GUI.Box(Rect(135,50*cont,325,50),"");
                        
                     
                        //Versus Button
                        if(GUI.Button(Rect(306,50*cont,50,50), "", versusStyle))
                        {
                            versusDown = !versusDown;
                            friendIDD = parseInt(friendString[ii-1]);
                            print (friendIDD);
                            Global.enemyPCid = friendString[ii-1];
                            print("Global.enemyPCid" + Global.enemyPCid);
                            Global.enemyPCUserName = friendString[ii];
                            print("Global.enemyPCUserName" + Global.enemyPCUserName);
                            
                        }
                        
                        //Chat Button                                                                                                                                              
                        if(GUI.Button(Rect(358,50*cont,50,50), "", chatStyle))
                        {
                            friendFrameSprite.hidden = true;
                           // friendDown = false;
                            chatDown = true;
                            //friendID = parseInt(friendString[ii-1]);
                            //chatDown = !chatDown;
                            marketDown = false;
                            print("aicicdc");
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
                        
                        //Email Button
                        if(GUI.Button(Rect(410,50*cont,50,50), "", emailStyle))
                        {	friendFrameSprite.hidden = true;
                            emailAici = true;
                            //friendDown = false;
                            fightDown = !fightDown;
                            friendID = parseInt(friendString[ii-1]);
                            print("Aici e id-ul prietenului " + friendID);
                            
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
                        }
                        
                        cont++;
                    }          
                }      
                GUI.EndScrollView ();
                if(versusDown)
                    //if(GUI.Button(Rect(220, 270, 69,30),"Duel",duelbutStyle))
                {
                    
                    SelectarePlayer(friendIDD);
                    print (friendIDD + "Asta e id-ul prietenului");
                    GUI.Label(Rect(190,47,150,20),s, styleSelectedNearPlayer);
                    
                    if (s == "PVP")
                    {
                        Global.bDifficultySelected = true; 
                        isPvp = true;  
                    }
                }
                
                if(GUI.Button(Rect(135,265,61,27),"", newbackStyle))
                {
                    friendDown = !friendDown;
                    fightDown = true;
                    friendFrameSprite.hidden= !friendFrameSprite.hidden;
                    alertButton.hidden = false;
                    //x = true;
                }
                
                
                
                
                if(GUI.Button(Rect(320,265,61,27),"", newbackStyle2))
                {
                    friendDown = !friendDown;
                    y = true;
                    
                    marketDown = false;
                    Global.CES = 0;
                    theMissions.setMissions( !theMissions.getMissions() );
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
                    str = scriptMissions.Stringx;
                    
                    if(scriptMissions.backdown)
                    {
                        fightDown = true;
                    }
                }
                
                
                // Request Button      
                if(GUI.Button(Rect(390,265,61,27),"", newReqStyle))
                {
                    friendDown = !friendDown;
                    x= true;
                    
                    
                }  
                
                 if(x)
            {   
            	friendFrameSprite.hidden= true;
            	mainMenuDown = false;
                craftDown = false;
                storageDown = false;
                socialDown = false;
                marketJos = false;
                missionsJos = false;
                friendJos = false; 
                infoDown = false;
                invDown = false;  
                statOn = false;
                leftPanelDown = false;
                requestFrameSprite.hidden = !requestFrameSprite.hidden;
//                GUI.DrawTexture(Rect(125, 45, 237, 301), texReqFriendFrame);
                GUI.DrawTexture(Rect(181, 130, 126, 123), ceva);
              
                
             checkButton.hidden = false;
                
            }
          
            }
            }
        if(bShowInfoScreen)
        {		 districtInformationFrameSprite.hidden = false;
            //RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
            //CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_DISTRICT_INFO );
            GUI.BeginGroup(Rect(115, 45, 345, 285));
           // GUI.DrawTexture(Rect(0,0,345,190), texInfoScreen);
          	 //districtInformationFrameSprite.hidden = !districtInformationFrameSprite.hidden;
            GUI.DrawTexture(Rect(8,190,165,85), texInfoScreenSearch);
            
            //close button
            if(GUI.Button(Rect(303, -2, 27, 28), "", styleBtnCloseX))
            {
                	
                bShowInfoScreen = !bShowInfoScreen;
                districtInformationFrameSprite.hidden = true;
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
                    
                    /*  if(GUI.Button(Rect(230, 80, 83,36),"",styleChatBut))
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
                     }*/
                    
                    /*  if(GUI.Button(Rect(230, 110, 83,36),"Trade",styleChatBut) )
                     {
                     tradePressed = true;
                     sTo = nearPlayer.nick;
                     bAux = bTrade = !bTrade;
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
                     }*/
                    
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
                
                
                
                /*if(missionsJos)
                 if(GUI.Button(Rect(362, -10, 114, 61),"", theMissions.getMissions() ? styleMissionsBut2 : styleMissionsBut1))
                 {
                 
                 marketDown = false;
                 Global.CES = 0;
                 theMissions.setMissions( !theMissions.getMissions() );
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
                 }*/
                //end Craft
                
                //Auction
                /*if(marketJos)
                 
                 if(GUI.Button(Rect(286, -2, 89, 39),"", (bAH || scriptAH.bBuy || scriptAH.bSell || scriptAH.bExpired) ? styleMarketBut2 : styleMarketBut1))
                 {
                 butDown = true;
                 marketDown = !marketDown;
                 //  alertJos = false;
                 bAux = scriptMarket.bMarket = !scriptMarket.bMarket;
                 if(bAux)
                 {
                 //bTrade = false;
                 //theMissions.setMissions( false );
                 //bAH = false;
                 //Inventory.bInventory = false;
                 //Inventory.bPlayerEq = false;
                 //bShowInfoScreen = false;
                 bGUI = true;
                 //Craft.bCraft = false;
                 
                 //scriptAH.bSell = false;
                 //scriptAH.bBuy = false;
                 //scriptAH.bExpired =false;
                 //theBank.bInventory = false;
                 //scriptTrade.bInitialized = false;
                 //scriptTrade.bTrade = false;
                 //scriptTrade.bGUIFrame = false;
                 
                 //if(!bGOAreVisible)
                 ////    {
                 //      showGameObjects();
                 //}
                 }
                 else
                 {
                 
                 bGUI = true;
                 //scriptTrade.bGUIFrame = false;
                 }
                 
                 
                 }
                 */
                
                
                //if(marketDown)
                //{
                ////
                // 
                
                //end Auction
                
                //Chat
                /*if(socialDown)
                 
                 if(GUI.Button(Rect(213, -2, 89, 38),"",bSO ? styleSocialBut2: styleSocialBut1))
                 {
                 missionsClicked = false;
                 bAux = bSO = !bSO;
                 if(bAux)
                 {
                 marketDown = false;
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
                 
                 */
                /*  if(GUI.Button(Rect(205, 34, 70, 29),"Chat", (scriptChat.bChat || (bNewChat && bBlink)) ? styleButP : styleBut))
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
                 if(!bGOAreVisible){
                 showGameObjects();
                 }
                 }
                 else
                 {
                 bGUI = true;
                 scriptTrade.bGUIFrame = false;
                 }
                 }*/
            }
            
            
            
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
                        
                        if(!sTo)
                            sTo="";
                        sTo = nearPlayer.nick;
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
                    case 3:    
                        // incoming trade
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
            /*if(bCanShowBank)
             {
             if(storageDown)
             if(GUI.Button(Rect(145, -2, 87, 38), "", IsHome() ? (theBank.bInventory ? styleStorageBut2 : styleStorageBut1) : styleButGray))
             {
             //bBank = !bBank;
             ButonStorageApasat = 1;
             if ( IsHome() )
             {
             
             //alertDown = !alertDown;
             marketDown = false;
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
             }
             
           
             // TODO: make window: you are not home
             }*/
            
            
            
            
            
            //Chat
            /*if(bSO )
             {
             
             // social buttons
             if(scriptChat.bChat|| bSO)
             {
             if(GUI.Button(Rect(220, 62, 85, 37),"", styleChatButton/*(scriptChat.bChat || (bNewChat && bBlink)) ? styleButP : styleBut*///))
            /* {   
             
             bSO = false;
             chatDown = !chatDown;
             marketDown = false;
             print("aicicdc");
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
             
             
             */
            
            
            
            
            
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
                        GUI.DrawTexture(Rect(1, 319 - xp_bar_height, System.Convert.ToInt32(Global.myChar.EXP * xp_bar_multiplier), xp_bar_height), blue_pixel, ScaleMode.StretchToFill, true, 1);
            }
            
            //  if(!theMissions.getMissions())
            //{ GUI.DrawTexture(Rect(380, 7, 15, 15), texCrosshair, ScaleMode.StretchToFill, true, 1); }
            
            //GUI.DrawTexture(Rect(Screen.width*0.3, Screen.height*0.3, 340, 265), texFight);
            //Daca butonul de FRIEND e apasat
            
                
                
                
            }
            
            
            //Request Frame
               
            
            
        }   
    //if(RenderedCharacter){
    //	Debug.Log("working...");
   //		GUI.DrawTexture(Rect(11, 160, 80, 80), RenderedCharacter, ScaleMode.StretchToFill);
   //	}           
        
}


     




 
 //Aici se termina on gui

static function IsHome()
{
	return ( ( Mathf.Abs(lon - Global.myChar.home_lon) < 0.01f ) && ( Mathf.Abs(lat - Global.myChar.home_lat) < 0.01f) );
}

function DoChatAlert (windowID : int) 
{
	//guiStyle.normal.textColor = Color(1,1,1,1);
	GUI.Label(Rect(20,30,190,40),"To many chats opened", guiStyle);
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleChatBut))
			bChatAlert = false;
} 

function DoPremiumAlert (windowID : int) 
{
	//guiStyle.normal.textColor = Color(1,1,1,1);
	GUI.Label(Rect(20,30,190,40),"You need a premium account for this feature", guiStyle);
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleChatBut))
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
	 if (lat2==0 && lon2==0) 
	 		return 0; // daca homebnase(0,0);
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
	if( lat == 0 || lon == 0 ) 
			return;
	var _dist = distance(lat,lon,Global.myChar.home_lat,Global.myChar.home_lon);
	Global.distFromHomebase = _dist;
	if (_dist==0) 
			return;
	for (var mission : Mission in Global.missionsArray)
		if ( mission.toDo.ToUpper().Contains("MOVE") )
			{
				if ( _dist >= mission.quant)
					{
						mission.SetQuant(_dist);
						var url = Global.server + "/mmo_iphone/update_player_mission.php?mission_id="+mission.missionId.ToString()+"&player_id="+Global.myChar.id+"&procent=" +  1;
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
			//alertHome =  false;
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
				//alertHome = false;
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
				
				if( days !=0 ) 
						nextHomeSet += days + " days, ";
				if( hours != 0 ) 
						nextHomeSet += hours + " hours, ";
				if( minutes != 0 ) 
						nextHomeSet += minutes + " minutes";	
				alertText = nextHomeSet;	
				//alertHome = true;
				MsgHomeData = HOMESRVMSG.HOMEBASE_ERROR;
			}
		catch(ex)
		{}
	}		
	
}

enum HOMESRVMSG { ERROR = 1, HOMEBASE_DONE = 2, HOMEBASE_ERROR = 3, HOMEBASE_WAIT = 4 }
var MsgHomeData : HOMESRVMSG = HOMESRVMSG.HOMEBASE_WAIT;

function DoHomeBaseAlert (windowID : int) 
{
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	//styleAlertTextBox.normal.textColor  = Color.white;
	GUI.Label(Rect(20,30,190,40), alertText );
	if(GUI.Button(Rect(74, 70, 83, 36), "Close"))
		{
			//alertHome = true;
			ButonStorageApasat = 0;
		}
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
    		//homeQuestion = false;
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
//	 		if( theMissions.getMissions() )
//	 			theMissions.GetMissionList();
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

