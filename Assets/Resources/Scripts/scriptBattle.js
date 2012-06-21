//static var cameraS : Camera;  

var imagineDezactivare : boolean = true;
static var nr : int = 0;
var nextImage : int = 0;
var ceva : Texture2D;
var UrlImagine : String;
var timp : double;
var regenHp : double;
var menuInventory : boolean = false;
var atribute : boolean = false;
var InventoryStyle : GUIStyle;
var AttributeStyle : GUIStyle;

var PC				: GameObject;
var Mob				: GameObject;
static var scriptInventory : Inventory;
var MobsKilled      : int;
var tmpHP           : int;

var Queue			: Array;
var durationQueue 	: Array;
static var buildingGold : int;
static var buildingXP   : int;
var texOwen :Texture2D;
var texDavid :Texture2D;
static var getRewarded : boolean;

var styleErrorFrame	: GUIStyle;
var bLootAlert 		: boolean;
var lootAlertRect 	: Rect; 
var idLootAlert		: int;
var styleButRedSmll : GUIStyle;
var bReLoot			: boolean;

var generalFrame	: GUIStyle;
var guiStyle		: GUIStyle; // font size 20
var guiStyle2		: GUIStyle; // font size 20
var guiStyle3		: GUIStyle; // system font 
var theStyle		: GUIStyle;
var mobLabelStyle	: GUIStyle;
var charLabelStyle	: GUIStyle;
var statsStyle 		: GUIStyle;
var style			: GUIStyle;
var lootStyle 		: GUIStyle;
var lvlUpBtnLeft	: GUIStyle;
var lvlUpBtnRight	: GUIStyle;
var lvlUpLabel		: GUIStyle;
var moveSpeed		: float = 2.5;
var moveDist		: float = 1.75;
var swipeImage		: GameObject;
var swipeParticles	: GameObject;
var swipeParticles2	: GameObject;

var IDLE			: int = 0;
var WALK			: int = 1;
var HIT1			: int = 2;
var HIT2			: int = 3;
var GET_HIT			: int = 4;
var DODGE			: int = 5;
var DIE				: int = 6;
var SAY				: int = 7;
var WIN				: int = 8;
var PLAY			: int = 9;
var SHOOT			: int = 10;
var SPAWN			: int = 69;
var FIRE            : int = 11;
var HIT3            : int = 12;

var changeLoadScreen : float;

var texHPc1			: Texture2D;
var texHPc2			: Texture2D;
var texHPc3			: Texture2D;
var texHPm1			: Texture2D;
var texHPm2			: Texture2D;
var texHPm3			: Texture2D;
var texMana1		: Texture2D;
var texMana2		: Texture2D;
var texMana3		: Texture2D;
var texBottomBar	: Texture2D;
var texNamePlate	: Texture2D;
var texNamePlate2	: Texture2D;
var texTV			: Texture2D;
var texMANA			: Texture2D;
var texBack			: Texture2D;
var texBackP		: Texture2D;
var texLoading1		: Texture2D;
var texLoading2		: Texture2D;
var texLoading3		: Texture2D;
var texLevelUpB		: Texture2D;
var texNewSkill		: Texture2D;

var styleArrowRight	: GUIStyle;
var styleArrowLeft	: GUIStyle;

var bMenu			: boolean;
var bLoading		: boolean = false;
var bAttack			: boolean = false;


var texAttack		: Texture2D;
var texAttackP		: Texture2D;
var texHit			: Texture2D;
var texHitP			: Texture2D;
var texBrace		: Texture2D;
var texBraceP		: Texture2D;
var texConcentrate	: Texture2D;
var texConcentrateP	: Texture2D;
var texRecover		: Texture2D;
var texRecoverP		: Texture2D;
var texSpecial		: Texture2D;
var texSpecialP		: Texture2D;
var texInventory	: Texture2D;
var texInventoryP	: Texture2D;
var texRunAway		: Texture2D;
var texRunAwayP		: Texture2D;
var texNull			: Texture2D;

static var intoMap  :boolean;

var action			: Action;
var cHit			: Hit;
static var cPC				: Char = new Char();
var cMob			: Mob = new Mob();

var goHOME			: boolean = false;
var goATTACK		: boolean = true;

var tRect			: Rect;
var tText			: String;
var tFade			: float;
var tY				: float;
var bLooting		: boolean = false;
var bDeathPenalty	: boolean = false;
var texLootB		: Texture2D;
var texLootIcon		: Texture2D;
var styleOrangeBut	: GUIStyle;
var sLootName		: String;
var nLootGold		: int;
var nLootXP			: int;
var idLootItem		: int;
var bLevelUp		: int; // -1 delevel, 0 no change, +1 levelUp

var nPts			: int;			// points left to spend
var nFORT			: int;			// fortitude for HP
var nBRT			: int;			// brutality for attack
var nACC			: int;			// accuracy for hit
var nDEF			: int;			// defense for evasion
var newSpecialLearned : String;		// name of new special attack learned
var bNewSpecialLearned : int; //-1 lost ability, 0 no change, +1 gained ability
var bShowNewSpecial : int;// same as above
// Text positions
//enum {POS_MID = 0, POS_PC, POS_MOB1, POS_MOB2, POS_MOB3};

var POS_MID			: int = 0;
var POS_PC			: int = 1;
var POS_MOB1		: int = 2;
var POS_MOB2		: int = 3;
var POS_MOB3		: int = 4;

//enum {FLAG_NONE = 0, FLAG_PC, FLAG_MOB1, FLAG_MOB2, FLAG_MOB3};

var FLAG_NONE		: int = 0;
var FLAG_PC			: int = 1;
var FLAG_MOB1		: int = 2;
var FLAG_MOB2		: int = 3;
var FLAG_MOB3		: int = 4;
// timer for special idle animation
var idleAniUpdate : float;
var idleAniUpdateRate : float;

// Temporary HP and ENRG of char
var tempHP : int;
var tempENRG : int;
var tempHit : Hit;
var animToPlay : String;
var bullet : GameObject;
var dt : float;
//var walkOnX : AnimationCurve;

static var bBattle : boolean = false;

var turnQueue	: Array;	// turns that will happen (the main loop)
var nTurn		: int;		// current turn
var act			: Action;
var curTurn		: Turn;
var curDuration	: Duration;
var finHit		: Hit;
var nCurTurn	: int;
var nTurns		: int;
var theSwipe	: Swipe;

var bArmour 	: boolean;
var swipeState 	: String;

var playerHasBrace : int;
var playerHasConcentrate : int;
var playerHasRecover : int;
var playerSpecialAttacks : Array;
var sPlayerSpecialAttacks : String[];
var gridHSpecialAttacks : int;
var selectedSpecialAttack : int;
var doSpecial : boolean;
var specialAttacksGridStyle : GUIStyle;
var swipeToDo : String;

var healthB : int;
var enerB : int;

var DONGETXP_LEVEL_DIFFERENCE : int = 10; //Players should not receive xp if mob is 10 levels or more below their level.

 var BossMusic : AudioClip;
 var MobMusic : AudioClip;
 var Audio : AudioSource;

class Hit{
	
	var HP		: int;				// HP to add
	var ENRG	: int;				// mana to add
	
	var BRT		: int;				// brutality
	var ACC		: int;				// accuracy
	var FORT	: int;				// fortitude
	var DEF 	: int; 				// defnese 
	
	var REGEN	: float;			// extra regen
	var ATK		: float;			// extra damage
	var EVASION	: float;			// extra evasion

	function Hit(){}

	function Hit(inHP : int){ 
		HP = inHP; 
	}
	
	function Hit(inHP : int, inENRG : int, inBRT : int, inACC : int, inFORT : int, inDEF : float, inREGEN : float,
				 inATK : float, inEVASION : float){
		
		HP		= inHP;
		ENRG	= inENRG;
		BRT		= inBRT;
		ACC		= inACC;
		FORT	= inFORT;
		DEF		= inDEF;
		REGEN	= inREGEN;
		ATK		= inATK;
		EVASION	= inEVASION;
	}
}

class Duration
{
	var Character	: Char;			// the character which will receive the effect
	var effect		: Hit;			// what effects will the character get on the duration
	var turnsLeft	: int;			// turns left for the effect
	var repeating	: boolean;		// will the effect repeat each turn?
	var wearOff		: boolean;		// will the effect wear off after the duration?
	var turn		: int;			// turn nr. the duration is in effect
	
	function Duration()
	{
		turn = 0;
	}

	function Duration(inChar : Char, inEffect : Hit, inTurns : int)
	{
		turn = 0;
		effect = inEffect;
		turnsLeft = inTurns;
		Character = inChar;
		repeating = false;
		wearOff = true;
	}
	
	function Duration(inChar : Char, inEffect : Hit, inTurns : int, inRepeating : boolean, inWearOff : boolean)
	{
		turn = 0;
		effect = inEffect;
		turnsLeft = inTurns;
		Character = inChar;
		repeating = inRepeating;
		wearOff = inWearOff;
	}
}

class Action
{
	var owner		: String;			// who does
	var length		: float;			// length of the action in ms
	var lengthP		: float;			// length of the action in % of the animation
	var action		: int;				// type of action, these are predefined
	var goWHERE 	: boolean;			// where to go to
	var fin			: boolean;			// is the action finished?
	var flip		: boolean;			// flip the object horizontally
	var started 	: boolean;			// is the action initialized?
	var hit			: Hit;				// Hit to receive
	var text		: String;			// text to print
	var animation	: String;			// animation
	
	function Action()
	{
		fin = false;
		started = false;
	}
}

class Turn
{
	var action		: Action;			// turn's action
	var finished	: boolean;			// is the action finished?
	var started		: boolean;
	
	function Turn()
	{
		finished = false;
		started = false;
	}
}



// ***********************************************
// -------------------- START --------------------
// =============================================== 
function Awake()
{ 
	 imagineDezactivare  = true;
	 nr  = 0;
	 nextImage = 0;
		timp = Time.time;
	    changeLoadScreen = Random.value;
		MobsKilled = LoadSceneScript.nrOfMobsKilled;
		Init( true );
	    if(scriptMain.drawCutScenes)
	        {
	        if( scriptGUICutScene.HasCutScene("homebase") )
				scriptGUICutScene.ToggleCutScene( true, scriptGUICutScene.MODE_INTRO );
	       
	        }
		if( scriptGUICutScene.HasCutScene( Global.enemyChar.mobname ) )
			scriptGUICutScene.ToggleCutScene( true, scriptGUICutScene.MODE_INTRO );
	    Debug.Log("HI!!! My name is "+Global.enemyChar.mobname + "  And my id: " + Global.enemyChar.id + "   And im special? " + Global.enemyChar.specialMob);
	   getRewarded=  false;

}




function Start()
{	  	
		if (Global.enemyChar.specialMob == 1)
		{
			var Imagine =  Global.enemyChar.photosNames.Split("^"[0]); 
			for (var i:int = nr ; i< Imagine.length-1; i++) 
			{ 
				if ( nextImage == 0)
			 	{  
			      var n = Imagine[i].Replace(" ","%20");
				  UrlImagine = Global.server + "/mmo_iphone/images/" + n; 
			      var www : WWW = new WWW (UrlImagine);
    			  yield www;
  				  ceva = www.texture; 
  				  nextImage = 1; 
  				} 
  			}  	
	  				if(nr == Imagine.length-1) 
			imagineDezactivare = false;	  	   
		}
}


function Init( FirstInit : boolean )
{

	if ( !FirstInit )
		Destroy( cMob.gameObj );
		
	var finDuration = new Duration();
	lootAlertRect = Rect (150, 100, 220, 120);
	nPts = 4;
    if(scriptMainMenu.bMute) Audio.mute = true;
                else Audio.mute = false;

    Audio.volume = scriptMainMenu.nMusicVol/100;
	bLevelUp = 0;
	Global.cameraS = camera;
	bLoading = true;
	idleAniUpdate = 0.0;
 	idleAniUpdateRate = 15.0;
	
	//if(Global.sZoneName != "" && Resources.Load("Menus/SpecialZones_BkGnds/"+Global.sZoneName)){
		//GameObject.Find("Plane").renderer.material.mainTexture = Resources.Load("Menus/SpecialZones_BkGnds/"+Global.sZoneName);
	//}
     
	var sceneNr = Random.Range( 1, 5 );
	
	if ( FirstInit )
	{
	    if(scriptMissions.clearingBuildings)
	               {
	                    if(scriptMissions.buildingPlan==1)             
								GameObject.Find( "Plane" ).renderer.material.mainTexture = Resources.Load( "Menus/BACKGROUND" );
			
	           			else
								GameObject.Find( "Plane" ).renderer.material.mainTexture = Resources.Load( "Menus/BACKGROUND2");
	                 } 
	   else
	   {
	                   
	    if(Global.CES==0)
	    	if( sceneNr == 1 )
				GameObject.Find( "Plane" ).renderer.material.mainTexture = Resources.Load( "Menus/BACKGROUND3" );
	        else
				 GameObject.Find( "Plane" ).renderer.material.mainTexture = Resources.Load( "Menus/BACKGROUND" + sceneNr );
	   		else GameObject.Find( "Plane" ).renderer.material.mainTexture = Resources.Load( "Menus/BACKGROUNDCES" );
		}
	}
	
    bMenu = true;
	bBattle = true;
	theStyle = guiStyle;
	Queue = new Array();
	turnQueue = new Array();
	durationQueue = new Array();
	playerSpecialAttacks = new Array();
	nCurTurn = 0;
	nTurns = 0;
	//add char
	if( FirstInit )
		{
			Global.myChar.init("PC", "Animations/Character1.5", Vector3(-3, 0, -7), Vector3(3, 3, 3), Vector3(-3, 0, -7), Vector3(2.1, 0, -7), FLAG_PC);
		}
	
	cPC = Global.myChar;
	yield StartCoroutine( cPC.getUserSpecials() );
			
	tempHP = Global.myChar.HP;
	tempENRG = Global.myChar.ENRG;
	tempHit = new Hit();
	healthB = Global.myChar.HP;
	enerB = Global.myChar.ENRG;
	
	if ( !FirstInit )
		cPC.HP = tmpHP;
	
	if (Global.Hp_incercare > 1)
	Global.myChar.HP = Global.Hp_incercare;

	
   // Debug.Log("cPC.WepType e "+cPC.WepType);
	
	
	//add mob
	//Global.enemyChar.mobname = "Behemoth";
	//to be added to case
	//cMob.init("Mob", "Animations/Mobs1.5/Alien", Vector3(3, 0, -7), Vector3(1, 1.3, -1.3), Vector3(3.3, 0, -7), Vector3(-2.1, 0, -7), FLAG_MOB1);
	
	//TODO: to be added when the new animations are ready
	
	//Global.enemyChar.mobname = "Balrogh";
	//print( Global.enemyChar.mobname );
	switch(Global.enemyChar.mobModel){
		case "Zombie":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Zombie", Vector3(2.7, 0, -7), Vector3(0.65, 0.65, -0.65), Vector3(3.7, 0, -7), Vector3(-3, 0, -7), 							FLAG_MOB1);
		break;
		case "ZombieBrown":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/ZombieBrown", Vector3(2.7, 0, -7), Vector3(0.65, 0.65, -0.65), Vector3(3.7, 0, -7), Vector3(-3, 0, -7), 							FLAG_MOB1);
		break;
		case "ZombieRed":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/ZombieRed", Vector3(2.7, 0, -7), Vector3(0.65, 0.65, -0.65), Vector3(3.7, 0, -7), Vector3(-3, 0, -7), 							FLAG_MOB1);
		break;
		case "Fatman":
            Debug.Log("ASDS");
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Fatman", Vector3(2.7, 0, -7), Vector3(1.3, 1.3, -1.3), Vector3(3.5, 0, -7), Vector3(-2.5, 0, -7), 							FLAG_MOB1);
		break;
		case "Android":
			Global.mobIsRanged = true;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/Android", Vector3(2.9, 0, -7), Vector3(2.4, 2.4, -2.4), Vector3(3.2, 0, -7), Vector3(-2.2, 0, -7), 							FLAG_MOB1);
		break;
		case "AndroidBlue":
			Global.mobIsRanged = true;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/AndroidBlue", Vector3(2.9, 0, -7), Vector3(2.4, 2.4, -2.4), Vector3(3.2, 0, -7), Vector3(-2.2, 0, -7), FLAG_MOB1);
		break;
		case "AndroidRed":
			Global.mobIsRanged = true;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/AndroidRed", Vector3(2.9, 0, -7), Vector3(2.4, 2.4, -2.4), Vector3(3.2, 0, -7), Vector3(-2.2, 0, -7), FLAG_MOB1);
		break;
		case "Punker":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Punker", Vector3(3, 0, -7), Vector3(3, 3, -3), Vector3(3, 0, -7), Vector3(-2, 0, -7), FLAG_MOB1);
		break;
		case "PunkerBlue":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Punker", Vector3(3, 0, -7), Vector3(3, 3, -3), Vector3(3, 0, -7), Vector3(-2, 0, -7), FLAG_MOB1);
		break;
		case "PunkerRed":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Punker", Vector3(3, 0, -7), Vector3(3, 3, -3), Vector3(3, 0, -7), Vector3(-2, 0, -7), FLAG_MOB1);
		break;
		case "Alien":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = true;		
			cMob.init("Mob","Animations/Mobs1.5/Alien", Vector3(2.3, 0, -7), Vector3(1.3, 1.3, -1.3), Vector3(3.3, 0, -7), Vector3(-2.3, 0, -7), 							FLAG_MOB1);
		break;
		case "AlienBlue":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = true;		
			cMob.init("Mob","Animations/Mobs1.5/AlienBlue", Vector3(2.3, 0, -7), Vector3(1.3, 1.3, -1.3), Vector3(3.3, 0, -7), Vector3(-2.3, 0, -7), 							FLAG_MOB1);
		break;
		case "AlienRed":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = true;		
			cMob.init("Mob","Animations/Mobs1.5/AlienRed", Vector3(2.3, 0, -7), Vector3(1.3, 1.3, -1.3), Vector3(3.3, 0, -7), Vector3(-2.3, 0, -7), 							FLAG_MOB1);
		break;
		case "Robot":
			Global.mobIsRanged = true;
			Global.mobSpecialIsRanged = true;		
			cMob.init("Mob","Animations/Mobs1.5/Robot", Vector3(3.2, 0, -7), Vector3(3, 3, -3), Vector3(3.3, 0, -7), Vector3(-1.5, 0, -7), FLAG_MOB1);
		break;
		case "TickMan":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/TickMan", Vector3(2.9, 0, -7), Vector3(3.5, 3.5, -3.5), Vector3(3, 0, -7), Vector3(-2, 0, -7), FLAG_MOB1);
		break;
		case "Hilljack":
			Global.mobIsRanged = true;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/Hilljack", Vector3(2.5, 1, -7), Vector3(3, 3, -3), Vector3(2.5, 1, -7), Vector3(-2.5, 1, -7), FLAG_MOB1);
		break;
		case "HilljackBlue":
			Global.mobIsRanged = true;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/HilljackBlue", Vector3(2.5, 1, -7), Vector3(3, 3, -3), Vector3(2.5, 1, -7), Vector3(-2.5, 1, -7), FLAG_MOB1);
		break;
		case "HilljackGreen":
			Global.mobIsRanged = true;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/HilljackGreen", Vector3(2.5, 1, -7), Vector3(3, 3, -3), Vector3(2.5, 1, -7), Vector3(-2.5, 1, -7), FLAG_MOB1);
		break;
		case "Behemoth":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Behemoth", Vector3(2.5, 1, -7), Vector3(3, 3, -3), Vector3(2.5, 1, -7), Vector3(-2.3, 1, -7), FLAG_MOB1);
		break;
		case "BehemothGreen":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/BehemothGreen", Vector3(2.5, 1, -7), Vector3(3, 3, -3), Vector3(2.5, 1, -7), Vector3(-2.3, 1, -7), FLAG_MOB1);
		break;
		case "BehemothRed":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/BehemothRed", Vector3(2.5, 1, -7), Vector3(3, 3, -3), Vector3(2.5, 1, -7), Vector3(-2.3, 1, -7), FLAG_MOB1);
		break;
		case "Clown":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/Clown", Vector3(2.5, 0, -7), Vector3(3, 3, -3), Vector3(2.5, 0, -7), Vector3(-2, 0, -7), FLAG_MOB1);
		break;
		case "ClownBlue":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/ClownBlue", Vector3(2.5, 0, -7), Vector3(3, 3, -3), Vector3(2.5, 0, -7), Vector3(-2, 0, -7), FLAG_MOB1);
		break;
		case "ClownGreen":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = true;
			cMob.init("Mob","Animations/Mobs1.5/ClownGreen", Vector3(2.5, 0, -7), Vector3(3, 3, -3), Vector3(2.5, 0, -7), Vector3(-2, 0, -7), FLAG_MOB1);
		break;
		case "Balrogh":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Balrogh", Vector3(2.7, 0, -7), Vector3(0.65, 0.65, -0.65), Vector3(3.7, 0, -7), Vector3(-2, 0, -7), 							FLAG_MOB1);		
		break;
		case "Preacherman":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Preacherman", Vector3(2.7, -0.01, -7), Vector3(2.8, 2.8, -2.8), Vector3(2.7, 0, -7), Vector3(-3, 0, -7), 							FLAG_MOB1);
		break;
        case "ZombieOwen":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Zombie", Vector3(2.7, 0, -7), Vector3(0.65, 0.65, -0.65), Vector3(3.7, 0, -7), Vector3(-3, 0, -7), 							FLAG_MOB1);
		break;
        case "ZombieOwen":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Zombie", Vector3(2.7, 0, -7), Vector3(0.65, 0.65, -0.65), Vector3(3.7, 0, -7), Vector3(-3, 0, -7), 							FLAG_MOB1);
		break;
        case "ZombieDavid":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
            Debug.Log("ZOMBI DAVI");
			cMob.init("Mob","Animations/Mobs1.5/Fatman", Vector3(2.7, 0, -7), Vector3(1.3, 1.3, -1.3), Vector3(3.5, 0, -7), Vector3(-2.5, 0, -7), 							FLAG_MOB1);
        break;
		case "Werewolf":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/werewolf", Vector3(2.7, 0, -7), Vector3(0.65, 0.65, -0.65), Vector3(3.7, 0, -7), Vector3(-3, 0, -7), 							FLAG_MOB1);

		break;
		case "Redwoman":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/redwoman", Vector3(2.7, 0, -7), Vector3(0.65, 0.65, -0.65), Vector3(3.7, 0, -7), Vector3(-3, 0, -7), 							FLAG_MOB1);
		break;
		case "Dog":
			Global.mobIsRanged = false;
			Global.mobSpecialIsRanged = false;
			cMob.init("Mob","Animations/Mobs1.5/Dog", Vector3(3.8, -0.01, -7), Vector3(0.65, 0.65, -0.65), Vector3(2.8, 0, -7), Vector3(-2, 0, -7), 							FLAG_MOB1);
		break;
	}
	
	Global.mobSpecialCoolDown = Random.Range(0,cMob.SpecialCD+1); //set after how many turns the mob executes special attack 	
	act = new Action();
	act.fin = true;
	act.started = true;
	statsStyle.normal.textColor = Color.white;
	statsStyle.alignment = TextAnchor.UpperCenter;
	playerHasBrace = -1;
	playerHasConcentrate = -1;
	playerHasRecover = -1;
	if(cPC.SpecialAttacks.length > 0)
	{
		for(var i : int = 0; i<cPC.SpecialAttacks.length; i++)
		{
			switch(cPC.SpecialAttacks[i].attackname)
			{
				case "Brace":
					playerHasBrace = i;
				break;
				case "Concentrate":
					playerHasConcentrate = i;
				break;
				case "Recover":
					playerHasRecover = i;
				break;
				default:
					playerSpecialAttacks.Add(i);
				break;
			}
		}
		sPlayerSpecialAttacks = new String[playerSpecialAttacks.length];
		for(i = 0; i< playerSpecialAttacks.length;i++)
			{
				sPlayerSpecialAttacks[i] = cPC.SpecialAttacks[playerSpecialAttacks[i]].attackname;
			}
	}
	if(playerSpecialAttacks.length < 5)
		gridHSpecialAttacks = 30;
	else	
		gridHSpecialAttacks = (playerSpecialAttacks.length / 5) * 30;
	selectedSpecialAttack = -1;
	doSpecial = false;
	if ( scriptInventory == null )
		scriptInventory = GetComponent(Inventory);
	scriptInventory.init_battle();
	if( Global.FightType == 1) //boss battle
	{   
        Audio.clip = BossMusic;
		MusicManager.PlayFile( MusicManager.MUSIC_BOSS );
        Debug.Log("BOSS");
		Global.FightType = 0;
	}
    else Audio.clip = MobMusic;
    Audio.Play();
	bLoading = false;
}

function LoadMap()
{   
	LoadSceneScript.MoreMobsToFight = false;
	
	Inventory.ResetSelectedItem();
	yield StartCoroutine( Global.save_stats() );
	bBattle = false;
	bLoading = true;

	while( scriptGUICutScene.cutSceneActive ) 
		yield WaitForSeconds( 0.3 );
    Global.theScene = 3; // from battlescene to mapscene  
    intoMap = true;  
    if(scriptMissions.clearingBuildings)
                    LoadSceneScript.nrOfMobs++;
	Application.LoadLevel("LoadingScene");
}

function spawnTick()
{
	Global.spawnInPosition = false;
	var renderers = cMob.gameObj.GetComponentsInChildren(Renderer);
	var r : Renderer = renderers[0];
	r.materials[0].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[1].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[2].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[6].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[7].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[8].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[9].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[10].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[11].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	r.materials[17].mainTexture = Resources.Load("Animations/Character1.5/Armour/Basic/helmet");
	
	Global.enemyChar.mobname = "Tick";
	cMob.init("Mob", "Animations/Mobs1.5/Tick", Vector3(0.4,0,-7), Vector3(3,3,-3), Vector3(2.8, 0, -7), Vector3(-2.5, 0, -7), FLAG_MOB1);
	tempHit = Hit(0);
	print("tick has spawned");
	Global.mobSpecialCoolDown = -1;
	addAction("cMob", WALK, goHOME, true);
	addAction("cMob", IDLE, true);
}

function walk(gameObj : GameObject, toPos : Vector3) : boolean
{
	var vec = gameObj.transform.position - toPos; 
	var dist = vec.magnitude;
	
	if(dist > moveDist)
		{
			vec.Normalize();
			gameObj.transform.position = gameObj.transform.position - vec*Time.deltaTime*moveSpeed;
			return false;
		}
	else
		{
			return true;
		}
}


function addDuration(inDuration : Duration){
	curDuration = inDuration;
	
	//health points refresh
	if(curDuration.Character.HP+curDuration.effect.HP < healthB)
		curDuration.Character.HP += curDuration.effect.HP;
	else
		curDuration.Character.HP = healthB;
	
	//energy refresh	
	if(curDuration.Character.ENRG + curDuration.effect.ENRG < enerB)
		curDuration.Character.ENRG += curDuration.effect.ENRG;
	else
		curDuration.Character.ENRG = enerB;			
		
	if( curDuration.effect.HP > 0 || curDuration.effect.ENRG > 0 ) //don't wear off hp and energy durations
		curDuration.wearOff = false;
	
	curDuration.Character.BRT += curDuration.effect.BRT;
	curDuration.Character.ACC += curDuration.effect.ACC;
	curDuration.Character.FORT += curDuration.effect.FORT;
	curDuration.Character.DEF += curDuration.effect.DEF;
	
	curDuration.Character.REGEN += curDuration.effect.REGEN;
	curDuration.Character.ATK += curDuration.effect.ATK;
	curDuration.Character.EVASION += curDuration.effect.EVASION + (curDuration.effect.DEF/2);

	finHit.HP += curDuration.effect.HP;
	finHit.ENRG += curDuration.effect.ENRG;
	finHit.BRT += curDuration.effect.BRT;
	finHit.ACC += curDuration.effect.ACC;
	finHit.FORT += curDuration.effect.FORT;
	finHit.DEF += curDuration.effect.DEF;
	finHit.REGEN += curDuration.effect.REGEN;
	finHit.ATK += curDuration.effect.ATK;
	finHit.EVASION += curDuration.effect.EVASION + (curDuration.effect.DEF/2);
	durationQueue.Add(inDuration);
}

function addDuration(kHP : int, kENRG : int, kBRT : int, kACC : int, kFORT : int, kDEF : int, kREGEN : int, kATK : int, kEVASION : int, k_turns)
{
	addDuration(Duration(cPC,
						 Hit(kHP, kENRG, kBRT, kACC, kFORT, kDEF, kREGEN, kATK, kEVASION),
						 k_turns));
}

function computeDurations()
{
	var i : int;
	for(i = 0; i<durationQueue.length; i++)
	{
		curDuration = durationQueue[i];
		if(curDuration.repeating == true)
		{
			
			curDuration.Character.HP += curDuration.effect.HP;
			curDuration.Character.ENRG += curDuration.effect.ENRG;

			curDuration.Character.BRT += curDuration.effect.BRT;
			curDuration.Character.ACC += curDuration.effect.ACC;
			curDuration.Character.FORT += curDuration.effect.FORT;
			curDuration.Character.DEF += curDuration.effect.DEF;
	
			curDuration.Character.REGEN += curDuration.effect.REGEN;
			curDuration.Character.ATK += curDuration.effect.ATK;
			curDuration.Character.EVASION += curDuration.effect.EVASION + (curDuration.effect.DEF/2);		

			finHit.HP += curDuration.effect.HP;
			finHit.ENRG += curDuration.effect.ENRG;
			finHit.BRT += curDuration.effect.BRT;
			finHit.ACC += curDuration.effect.ACC;
			finHit.FORT += curDuration.effect.FORT;
			finHit.DEF += curDuration.effect.DEF;
			finHit.REGEN += curDuration.effect.REGEN;
			finHit.ATK += curDuration.effect.ATK;
			finHit.EVASION += curDuration.effect.EVASION + (curDuration.effect.DEF/2);
		}
		//why do they substract effect * turn?
		if(curDuration.turnsLeft==0)
		{
			if(curDuration.wearOff)
			{
				//razvan 04.10
				curDuration.Character.HP = curDuration.Character.HP - curDuration.effect.HP * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.ENRG = curDuration.Character.ENRG - curDuration.effect.ENRG * (curDuration.repeating ? curDuration.turn : 1);

				curDuration.Character.BRT = curDuration.Character.BRT - curDuration.effect.BRT * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.ACC = curDuration.Character.ACC - curDuration.effect.ACC * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.FORT = curDuration.Character.FORT - curDuration.effect.FORT * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.DEF = curDuration.Character.DEF - curDuration.effect.DEF*(curDuration.repeating ? curDuration.turn : 1);
				
				curDuration.Character.REGEN = curDuration.Character.REGEN - curDuration.effect.REGEN * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.ATK = curDuration.Character.ATK - curDuration.effect.ATK * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.EVASION = curDuration.Character.EVASION - curDuration.effect.EVASION*(curDuration.repeating ? curDuration.turn : 1) -
												((curDuration.effect.DEF*(curDuration.repeating ? curDuration.turn : 1))/2);

				finHit.HP -= curDuration.effect.HP * (curDuration.repeating ? curDuration.turn : 1);
				finHit.ENRG -= curDuration.effect.ENRG * (curDuration.repeating ? curDuration.turn : 1);
				finHit.BRT -= curDuration.effect.BRT * (curDuration.repeating ? curDuration.turn : 1);
				finHit.ACC -= curDuration.effect.ACC * (curDuration.repeating ? curDuration.turn : 1);
				finHit.FORT -= curDuration.effect.FORT * (curDuration.repeating ? curDuration.turn : 1);
				finHit.DEF -= curDuration.effect.DEF*(curDuration.repeating ? curDuration.turn : 1);
				finHit.REGEN -= curDuration.effect.REGEN * (curDuration.repeating ? curDuration.turn : 1);
				finHit.ATK -= curDuration.effect.ATK * (curDuration.repeating ? curDuration.turn : 1);
				finHit.EVASION -= curDuration.effect.EVASION*(curDuration.repeating ? curDuration.turn : 1) -
								 ((curDuration.effect.DEF*(curDuration.repeating ? curDuration.turn : 1))/2);
			}
			durationQueue.RemoveAt(i);
		}
		curDuration.turn++;
		curDuration.turnsLeft = curDuration.turnsLeft>0 ? curDuration.turnsLeft-1 : 0;
	}
}


function addQueue(who : String, inAction : int, goWHERE : boolean, inFlip : boolean, inLengthP : float, inHit : Hit, inText : String, inAnimation : String)
{
	action = new Action();
	action.owner = who;
	action.action = inAction;
	action.goWHERE = goWHERE;
	action.flip = inFlip;
	action.lengthP = inLengthP;
	action.text = inText;
	action.animation = inAnimation;
	
	// Make the damage calculus here
	action.hit = inHit;
	if(action.owner ==	"cPC")
		{
			action.hit.HP = cPC.hit_get(inHit);
		}
	if(action.owner == "cMob")
		{
			action.hit.HP = cMob.hit_get(inHit);
		}
	Queue.Add(action);
}

function addAction(who : String, inAction : int)
{
	addQueue(who, inAction, false, false, 0, Hit(0), "", "");
}

function addAction(who : String, inAction : int, goWHERE : String)
{
	addQueue(who, inAction, goWHERE == "home" ? goHOME : goATTACK, false, 0, Hit(0), "", "");
}

function addAction(who : String, inAction : int, inFlip : boolean)
{
	addQueue(who, inAction, false, inFlip, 0, Hit(0), "", "");
}

function addAction(who : String, inAction : int, inLengthP : float)
{
	addQueue(who, inAction, false, false, inLengthP, Hit(0), "", "");
}

function addAction(who : String, inAction : int, goWHERE : boolean, inFlip : boolean)
{
	addQueue(who, inAction, goWHERE, inFlip, 0, Hit(0), "", "");
}

function addAction(who : String, inAction : int, inLengthP : float, inHit : Hit)
{
	addQueue(who, inAction, false, false, inLengthP, inHit, "", "");
}

function addAction(who : String, inAnimation : String, inLengthP : float, inFlip : boolean)
{
	addQueue(who, PLAY, false, inFlip, inLengthP, Hit(0), "", inAnimation);
}

function addText(who : String, inText : String)
{
	addQueue(who, SAY, false, false, 0, Hit(0), inText, "");
}


function addText(inText : String)
{
	addQueue("cPC", SAY, false, false, 0, Hit(0), inText, "");
}

function printText(rect : Rect, theText : String)
{
	tFade = 1;
	tY = 0;
	tText = theText;
	tRect = rect;
}

function printText(position : int, theText : String)
{
	switch(position)
	{
		case POS_MID:
			theStyle = guiStyle3;
			printText(Rect(0, 100, 480, 100), theText);
			break;
		case POS_PC:
			theStyle = guiStyle2;
			printText(Rect(0, 100, 240, 100), theText);
			break;
		case POS_MOB1:
			theStyle = guiStyle2;
			printText(Rect(240, 100, 240, 100), theText);
			break;
	}
	switch(theText)
	{
		case "Victory!":
			//wait to finish the aninamtion
			//then go to loot screen and continue from there
			//Debug.Log("Victory: mission: " + scriptMissions.GoMission.toDo);
			if ( scriptMissions.GoMission != null )
				CheckMissions(scriptMissions.GoMission.toDo,cMob.mobname);
			else
				CheckMissions("KILL",cMob.mobname);
			Global.Hp_incercare = Global.myChar.HP;
			endFight();
			
			break;
		case "Defeat":
			//wait to finish the animation
			//go to end of fight
			yield WaitForSeconds(3);
			//endFight2();
			endFightDeath();
			break;
	}
}

function printText(theText : String)
{
	printText(Rect(200, 100, 80, 100), theText);
}

function mobsRevenge()
{
	// Revenge of the Mob
	cMob.ATK = Random.Range(cMob.ATKMIN,cMob.ATKMAX+1);
	if(cMob.HP  - tempHit.HP > 0)
	{
		if(Global.mobIsRanged)
		{
			if(Global.mobSpecialCoolDown == 0)
				{
					cMob.ATK = cMob.ATKMAX;
					addAction("cMob","special",70, false);
					Global.mobSpecialCoolDown = cMob.SpecialCD; 
				}
			else
				{
					addAction("cMob", HIT2, 10);
				}
			tempHit = Hit(cMob.hit_do(cPC));
			if(tempHit.HP == 0)
				{
					addAction("cPC", DODGE, 70, tempHit );
				}
			else
				{
					addAction("cPC", GET_HIT, 70, tempHit );
				}
			if(cPC.HP - tempHit.HP  > 0) 
				addAction("cPC", IDLE); 
			else 
				{
					addAction("cPC", DIE, 10);
					addText("Defeat");
				}
			addAction("cMob", IDLE, false);
		}
		else
		{	
			if(Global.mobSpecialCoolDown == 0)
			{
				if(Global.mobSpecialIsRanged)
				{
					cMob.ATK = cMob.ATKMAX;
					addAction("cMob","special2",70, false);
					Global.mobSpecialCoolDown = cMob.SpecialCD;
					tempHit = Hit(cMob.hit_do(cPC));
					if(tempHit.HP == 0)
						{
							addAction("cPC", DODGE, 70, tempHit );
						}
					else
						{
							addAction("cPC", GET_HIT, 70, tempHit );
						}
					if(cPC.HP - tempHit.HP  > 0) 
						addAction("cPC", IDLE); 
					else
						{
							addAction("cPC", DIE, 10);
							addText("Defeat");
						}
					addAction("cMob", IDLE, false);
				}
				if(!Global.mobSpecialIsRanged)
				{
					cMob.ATK = cMob.ATKMAX;
					addAction("cMob", WALK, "attack");
					addAction("cMob","special",70, false);
					Global.mobSpecialCoolDown = cMob.SpecialCD;
					tempHit = Hit(cMob.hit_do(cPC));
					if(tempHit.HP == 0)
						{
							addAction("cPC", DODGE, 70, tempHit );
						}
					else
						{
							addAction("cPC", GET_HIT, 70, tempHit );
						}
					if(cPC.HP - tempHit.HP  > 0) 
						addAction("cPC", IDLE); 
					else
						{
							addAction("cPC", DIE, 10);
							addText("Defeat");
						}
					addAction("cMob", WALK, goHOME, true);
					addAction("cMob", IDLE, true);
				}
			}
			else
			{
				addAction("cMob", WALK, "attack"); // go to the player character
				addAction("cMob", HIT1, 10);
				tempHit = Hit(cMob.hit_do(cPC));
				if(tempHit.HP == 0)
					{
						addAction("cPC", DODGE, 70, tempHit );
					}
				else
					{
						addAction("cPC", GET_HIT, 70, tempHit );
					}
				if(cPC.HP - tempHit.HP  > 0) 
					addAction("cPC", IDLE); 
				else
					{
						addAction("cPC", DIE, 10);
						addText("Defeat");
					}
				addAction("cMob", WALK, goHOME, true);
				addAction("cMob", IDLE, true);
			}
		}
	}
}

function endFight()
{   
	if(cMob.mobname=="PREACHERMAN") Debug.Log("Here");
	yield StartCoroutine( Global.getUserData() );
	var values : String[];
	// Looting
	var login_url = Global.server + "/mmo_iphone/moblut.php?id_mob=" + Global.enemyChar.id + "&id_user=" + Global.myChar.id;
	
	var download = new WWW( login_url );
	yield download;

	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW( login_url );
			yield download;
		}
	if(download.error) 
		{
			print( "Error downloading: " + download.error );
			var wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			//print(wwwData);
			wwwData = download.text;
		}
	bLooting = true;
	bLootAlert = false;
	if(wwwData.IndexOf("No",0) > 0)
		{
			sLootName = "No loot";
			nLootGold = 0;
			nLootXP = 0;
		}
	else
	{
		values = Regex.Split(wwwData, "<br />");
		idLootItem = parseInt(values[0]);
       // scriptMissions.buildingReward = 
		texLootIcon = Resources.Load("Menus/Inventory/Icons/" + idLootItem);
		sLootName = values[1];
		nLootGold = parseInt(values[2]);
	    var nLootXp : int;			
		//RADU: Don't get Xp if mob is 10 levels or more lower
		if( cMob.LVL <= Global.myChar.LVL - DONGETXP_LEVEL_DIFFERENCE || ( Global.myChar.LVL >= 10 && !Global.premium ) )
			nLootXp = 0;
		else
			nLootXP = parseInt(values[3]);
        if(scriptMissions.clearingBuildings)
	        {    
		            buildingGold +=   nLootGold;
		            buildingXP +=   nLootXp;
            }	
        
        //yield scriptInventory.GetInventoryItems();

		/*
        if(!scriptInventory.LootItems(idLootItem, scriptMissions.GoMission.drop_special_item_id)){
					bLootAlert = true;
					bLooting = false;
	        	}
	    */
        
        if ( scriptMissions.GoMission != null )
        {
        	if ( scriptMissions.GoMission.toDo == "DROP" )
        	{
	        	var tmp;
	        	tmp = scriptInventory.find_index_to_loot_item(idLootItem);
	        	if ( tmp != -1 && scriptInventory.find_index_to_loot_item(scriptMissions.GoMission.drop_special_item_id, tmp) != -1 )
		        		scriptInventory.LootItems(idLootItem, scriptMissions.GoMission.drop_special_item_id, true, 5);
		        else
			        {
						bLootAlert = true;
						bLooting = false;
			        }
        	}
        	else
        		if(!scriptInventory.LootItem(idLootItem))
	        		{
						bLootAlert = true;
						bLooting = false;
					}
        }
        else
		if(!scriptInventory.LootItem(idLootItem))
			{
				bLootAlert = true;
				bLooting = false;
			}
		
	}
	Global.save_stats();
}

function finalize_durations() 
{
	scriptInventory.in_battle = false;
	//while (durationQueue.length > 0) computeDurations();

	Global.myChar.HP -= finHit.HP;
	Global.myChar.ENRG -= finHit.ENRG;

	Global.myChar.BRT -= finHit.BRT;
	Global.myChar.ACC -= finHit.ACC;
	Global.myChar.FORT -= finHit.FORT;
	Global.myChar.DEF -= finHit.DEF;

	Global.myChar.REGEN -= finHit.REGEN;
    //Criticala si damage randomizat
	Global.myChar.ATK -= finHit.ATK;
	Global.myChar.EVASION -= finHit.EVASION;
	
	//Global.save_stats();
}

//functia mea de end fight //functia cui?
function endFightClub()
{
    print("endFightClub");
	finalize_durations();
	//endFight2();
	bLoading = true;
	bBattle = false;
	LoadSceneScript.MoreMobsToFight = false;
	
	while( scriptGUICutScene.cutSceneActive ) 
		yield WaitForSeconds( 0.3 );
	Application.LoadLevel("sceneMap");
}

function endFightDeath()
{
    print("endFightDeath");
	bDeathPenalty = true;
	nLootGold = -20; //must have formula for lost gold and xp
	//nLootXP = -40;	
	
	//get xp to level up
	var the_url : String = Global.server + "/mmo_iphone/level_xp.php?id=" + Global.myChar.id;
	
	var download = new WWW( the_url );
	yield download;
	
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying");
			download = new WWW( the_url );
			yield download;
		}

	if(download.error)
		{
			print( "Error downloading: " + download.error );
			var wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			wwwData = download.text;
		}
	var xpToLvL : int;
	var	values = Regex.Split(wwwData,":");
	if(values[0].length > 3)
		xpToLvL = parseInt(values[0]);
	else
		xpToLvL = 0;
	
	nLootXP = xpToLvL * (-0.15); //15% of xp to level up
}

function endFight2()
{
	var values : String[];
	var xpToLvL : int;

	yield StartCoroutine( Global.getUserData() ); //Added by Radu. If you died, your life got stuck at 0. This should prevent that.
	Global.myChar.EXP += nLootXP;
	Global.myChar.Money += nLootGold;
	MobsKilled++;
	

	var the_url = Global.server + "/mmo_iphone/level_xp.php?id=" + Global.myChar.id;
	
	if( Global.myChar.EXP < 0 )
		the_url += "&delevel=1";
	var	download = new WWW( the_url );
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW( the_url );
			yield download;
		}
	var	wwwData = download.text;
		
	values = Regex.Split(wwwData,":");
	if(values[0].length > 3)
	{
		xpToLvL = parseInt(values[0]);
	
		if(Global.myChar.EXP >= xpToLvL )
		{
			Global.myChar.EXP = Global.myChar.EXP - xpToLvL;
			Global.myChar.LVL++;
			newSpecialLearned = values[1];
			if(newSpecialLearned.length > 0)
				bNewSpecialLearned = 1;
			//print("New special: "+	newSpecialLearned + " bool is " +bNewSpecialLearned);
			scriptInventory.RemoveItemStats();
			nBRT = Global.myChar.BRT;
			nACC = Global.myChar.ACC;
			nFORT = Global.myChar.FORT;
			nDEF = Global.myChar.DEF;
			Global.myChar.BRT = parseInt(values[2]);
			Global.myChar.ACC = parseInt(values[3]);
			Global.myChar.FORT = parseInt(values[4]);
			Global.myChar.DEF = parseInt(values[5]);
			scriptInventory.AddItemStats();
			yield StartCoroutine( Global.save_stats() );
			
			bLevelUp = 1;
		}
		else if( Global.myChar.EXP < 0 )
		{
			Global.myChar.EXP += xpToLvL;
			Global.myChar.LVL--;
			if( Global.myChar.LVL < 1 )
				{
					Global.myChar.LVL = 1;
					Global.myChar.EXP = 0;
					
					bLoading = true;
					bBattle = false;
	
					LoadMap();
					return;
				}
			newSpecialLearned = values[1];
			if(newSpecialLearned.length > 0)
				bNewSpecialLearned = -1;
			
			scriptInventory.RemoveItemStats();
			nBRT = Global.myChar.BRT;
			nACC = Global.myChar.ACC;
			nFORT = Global.myChar.FORT;
			nDEF = Global.myChar.DEF;
			Global.myChar.BRT = parseInt(values[2]);
			Global.myChar.ACC = parseInt(values[3]);
			Global.myChar.FORT = parseInt(values[4]);
			Global.myChar.DEF = parseInt(values[5]);
			scriptInventory.AddItemStats();
			yield StartCoroutine( Global.save_stats() );
			scriptInventory.AddItemStats();
			bLevelUp = -1;		
		}
		else
		{
			//finalize_durations();
			Debug.Log("KILL: " + MobsKilled + "    FROM: " + LoadSceneScript.nrOfMobs);
			if ( MobsKilled < LoadSceneScript.nrOfMobs && LoadSceneScript.MoreMobsToFight )
				{
					Init( false );
				}
			else
				{
					bLoading = true;
					bBattle = false;
					
					LoadMap();
				}
		}
	}
	else
	{
		//finalize_durations();
		Debug.Log("KILL: " + MobsKilled + "    FROM: " + LoadSceneScript.nrOfMobs);
		if ( MobsKilled < LoadSceneScript.nrOfMobs && LoadSceneScript.MoreMobsToFight )
			{
				Init( false );
			}
		else
			{
				bLoading = true;
				bBattle = false;
				LoadMap();
			}
	}
}

function Update()
{
//regenerate 1 hp every 4 secs in battle
	regenHp = Time.time;
	if ( regenHp-timp > 4 && tempHP > Global.myChar.HP && Global.myChar.HP >1)
		{
			Global.myChar.HP = Global.myChar.HP + 1;
			timp = Time.time;
		}
		

if(!bLoading)
{
	if(Queue.length > 0){
		if(act.fin)
			{
				act = Queue[0];
				Queue.Shift();
			}
		if(!act.started)
		{
			if(act.lengthP == 0) act.lengthP = 90;
			if(act.flip)
			{
				if(act.owner == "cPC")
					{
						cPC.gameObj.transform.localScale.z = -cPC.gameObj.transform.localScale.z;
						cPC.gameObj.transform.position.x = cPC.gameObj.transform.position.x - cPC.gameObj.transform.localScale.z/2;
					}
				if(act.owner == "cMob")
				{
					cMob.gameObj.transform.localScale.z = -cMob.gameObj.transform.localScale.z;
					//TODO: trebuiesc modificate pozitiile la toti mobsii sa foloseasca noul sistem de flip
					//vechiul flip sucks. (flipul se face cu scale.z cu -/+ )
					if( Global.enemyChar.mobname == "Dog" )
						{
							var renderers = cMob.gameObj.GetComponentsInChildren( Renderer );
							if( cMob.gameObj.transform.localScale.z < 0 )
								cMob.gameObj.transform.position.x += ( renderers[0] as Renderer ).bounds.size.x;
							else
								cMob.gameObj.transform.position.x -= ( renderers[0] as Renderer ).bounds.size.x;
						}
					else
						cMob.gameObj.transform.position.x = cMob.gameObj.transform.position.x - cMob.gameObj.transform.localScale.z/2;
				}
			}
			//razvan 04.10
			
			switch(act.action)
			{
				case WALK:
					if(act.owner == "cPC")
						{
							animToPlay = "walk";
							cPC.ChangeToNormalFace();
							//cPC.gameObj.animation[animToPlay].speed = 1.5;
							cPC.gameObj.animation.CrossFade(animToPlay);
						}
					if(act.owner == "cMob")
						{
							animToPlay = "walk";
							//cMob.gameObj.animation[animToPlay].speed = 1.5;
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
				case HIT1:
					if(act.owner == "cPC")
						{
							animToPlay = "hit_1";
	                       // cPC.gameObj.animation[animToPlay].speed = 0.75;
	                      // cPC.ChangeToAngryFace();
	                       
							cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
	                        
							cPC.gameObj.animation.CrossFade(animToPlay);
						}
					if(act.owner == "cMob")
						{
							animToPlay = "hit_1";
							cMob.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
				case HIT2:
					if(act.owner == "cPC")
						{
							animToPlay = "hit_2";
							//cPC.ChangeToAngryFace();
							
							cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cPC.gameObj.animation.CrossFade(animToPlay);
	                    }
					
					if(act.owner == "cMob")
						{
							animToPlay = "hit_2";
							cMob.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
                case HIT3:
                    if(act.owner == "cPC")
	                    {
							animToPlay = "hit_3";
							//cPC.ChangeToAngryFace();
							
							cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cPC.gameObj.animation.CrossFade(animToPlay);
	                    }
                
                    break;
				case SHOOT:
					if(act.owner == "cPC")
						{
							animToPlay = "CoveringFire";
							//cPC.ChangeToAngryFace();
							
							cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cPC.gameObj.animation.CrossFade(animToPlay);
						}
					if(act.owner == "cMob")
						{
							animToPlay = "hit_3";
							cMob.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
				case DODGE:
					if(act.owner == "cPC")
						{
							printText(cPC.role, "-miss");
							animToPlay = "duck_and_weave";
							cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cPC.gameObj.animation.CrossFade(animToPlay);
						}
					if(act.owner == "cMob")
						{
							printText(cMob.role, "-miss");
							animToPlay = "dodge";
							cMob.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
				case DIE:
					if(act.owner == "cPC")
						{
							animToPlay = "death";
							cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cPC.gameObj.animation.CrossFade(animToPlay);
						}
					if(act.owner == "cMob")
						{
							animToPlay = "death";
							cMob.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
				case GET_HIT:
					if(act.owner == "cPC")
						{
							printText(cPC.role, "-" + (act.hit.HP > 0 ? act.hit.HP : "miss"));
							animToPlay = "get_hit";
							cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cPC.gameObj.animation.CrossFade(animToPlay);
						}
					if(act.owner == "cMob")
						{
							printText(cMob.role, "-" + (act.hit.HP > 0 ? act.hit.HP : "miss"));
							animToPlay = "get_hit";
							cMob.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
				case IDLE:
					if(act.owner == "cPC")
						{
							animToPlay = "idle";
							cPC.ChangeToNormalFace();
							
							cPC.gameObj.animation.CrossFade(animToPlay);
						}
					if(act.owner == "cMob")
						{
							if(Global.enemyChar.mobname == "TickMan")
								{
									animToPlay = "idle_1";
									idleAniUpdate = Time.time + idleAniUpdateRate;
								}
							else
								{
									animToPlay = "idle";
								}
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
				case SAY:
					if(act.owner == "cPC")
						{
							printText(cPC.role, act.text);
						}
					if(act.owner == "cMob")
						{
							printText(cMob.role, act.text);
						}
					act.fin = true;
					break;
				case WIN:
					Debug.Log("PLAYER: " + cPC.HP);
					tmpHP = cPC.HP;	
					SaveStats();
					animToPlay = "win";
					cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
					cPC.gameObj.animation.CrossFade(animToPlay);
					break;
				case PLAY:
				
					animToPlay = act.animation;
                    Debug.Log("act.animation E "+act.animation);
					if(act.owner == "cPC")
						{
							cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cPC.gameObj.animation.CrossFade(animToPlay);
						}
					if(act.owner == "cMob")
						{
							cMob.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
							cMob.gameObj.animation.CrossFade(animToPlay);
						}
					break;
				case SPAWN:
					spawnTick();
					act.fin = true;
					break;	
				case FIRE:
					act.fin  = true;
					break;
			}
			act.started = true;
		}
		if(	act.action == HIT1 || act.action == HIT2 || act.action == DODGE ||
			act.action == GET_HIT || act.action == DIE || act.action == WIN || act.action == PLAY){
				var c: float;
				if(act.owner == "cPC")
					{
							//c = cPC.gameObj.animation[animToPlay].time / cPC.gameObj.animation[animToPlay].length*100;
							c = cPC.gameObj.animation[animToPlay].normalizedTime * 100;
					}
				if(act.owner == "cMob")
					{
							//c = cMob.gameObj.animation[animToPlay].time / cMob.gameObj.animation[animToPlay].length*100;
							c = cMob.gameObj.animation[animToPlay].normalizedTime * 100;
					}
				if(c > act.lengthP) act.fin = true;
		}
		else
		switch(act.action)
		{
			case WALK:
				if(act.owner == "cPC")
					{
						if(act.goWHERE == goHOME)
							{
								if(walk(cPC.gameObj, cPC.pos1)) act.fin = true;
							}
						else
							{
								if(walk(cPC.gameObj, cPC.pos2)) act.fin = true;
							}
					}
				if(act.owner == "cMob")
					{
						if(act.goWHERE == goHOME)
							{
								if(walk(cMob.gameObj, cMob.pos1)) act.fin = true;
							}
						else
							{
								if(walk(cMob.gameObj, cMob.pos2)) act.fin = true;
							}
					}
				break;
			case SHOOT:
				if(act.owner == "cPC")
				{
					if(act.goWHERE == goHOME)
						{
							if(walk(cPC.gameObj, cPC.pos1)) act.fin = true;
						}
					else
						{
							if(walk(cPC.gameObj, cPC.pos2)) act.fin = true;
						}
				}
				if(act.owner == "cMob")
					{
						if(act.goWHERE == goHOME)
							{
								if(walk(cMob.gameObj, cMob.pos1)) act.fin = true;
							}
						else
							{
								if(walk(cMob.gameObj, cMob.pos2)) act.fin = true;
							}
					}
				break;	
			case IDLE:
				act.fin = true;
				break;
		}
		if(act.fin){
			if(act.owner =="cPC")
			{
				cPC.HP 		-= act.hit.HP;
				cPC.ENRG 	-= act.hit.ENRG;
				cPC.BRT 	-= act.hit.BRT;
				cPC.ACC 	-= act.hit.ACC;
				cPC.FORT 	-= act.hit.FORT;
				cPC.DEF		-= act.hit.DEF;
				cPC.REGEN 	-= act.hit.REGEN;
				cPC.ATK 	-= act.hit.ATK;
				cPC.EVASION -= act.hit.EVASION;
			}
			if(act.owner =="cMob")
			{
				cMob.HP 	-= act.hit.HP;
				cMob.ENRG 	-= act.hit.ENRG;
				cMob.DEF	-= act.hit.DEF;
				cMob.REGEN 	-= act.hit.REGEN;
				cMob.ATK 	-= act.hit.ATK;
				cMob.EVASION -= act.hit.EVASION;
			}
			
		}
		
	}
}
}

function SaveStats()
{
	StartCoroutine( Global.save_stats() );
}

var special : int;

function OnGUI()
{
	
		if (atribute)
		{
		GUI.Box(Rect(165, 30, 150, 240), "");
		GUI.BeginGroup(Rect(165, 15, 180, 250)); 
					GUI.Label(Rect(10, 5 + 10, 190, 20), Global.myChar.Nick + " Level:" + Global.myChar.LVL);
					
					GUI.Label(Rect(10, 5 + 40, 190, 20), Global.myChar.BRT + " Brutality");
					
					GUI.Label(Rect(10 , 5 + 60, 190, 20), Global.myChar.ACC + " Accuracy");
					
					GUI.Label(Rect(10 , 5 + 80, 190, 20), Global.myChar.FORT + " Fortitude");
					
					GUI.Label(Rect(10 , 5 + 100, 190, 20), Global.myChar.DEF + " Defense");
					
					GUI.Label(Rect(10 , 5 + 120, 190, 20), Global.myChar.HP + " Health");
						
					GUI.Label(Rect(10 , 5 + 140, 190, 20), Global.myChar.ENRG + " Energy");
					
					GUI.Label(Rect(10 , 5 + 160, 190, 20), Global.myChar.ATK + " attack power");
						
					GUI.Label(Rect(10 , 5 + 180, 190, 20), Global.myChar.EVASION + "% chance to dodge");
					if(GUI.Button(Rect(10 , 220, 130, 20), "Close"))
						{
							atribute = false;
						}
		GUI.EndGroup();
		}
		
		if (menuInventory == false)
		{
				if(GUI.Button(Rect(254, 247, 82, 36), "", InventoryStyle))
					{
							if (bLootAlert) 
							{
								bLootAlert = false;
								bReLoot = true;
							}
							Inventory.bInventory = true;
							Inventory.bPlayerEq = false;
							Craft.bCraft = false;
							Inventory.bResetSelItem = true;
							menuInventory = true;
					}
				if(GUI.Button(Rect(344, 247, 82, 36), "", AttributeStyle))
					{
						atribute = true;
						menuInventory = true;
					}
		}
		else {}
		
		
		
		
//Debug.Log("scriptBattle: OnGui****"+cPC.WepType);
//cPC.WepType=Global.myChar.WepType;
	if( scriptGUICutScene.cutSceneActive ) return;
	
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	if(bLoading)
	{
    if(Global.randomNumber <= 0.33)
		GUI.DrawTexture (Rect(0,0,480,320), texLoading1, ScaleMode.StretchToFill, true, 1);
        else if(Global.randomNumber > 0.33 && Global.randomNumber <= 0.66)
            GUI.DrawTexture (Rect(0,0,480,320), texLoading2, ScaleMode.StretchToFill, true, 1);
            else GUI.DrawTexture (Rect(0,0,480,320), texLoading3, ScaleMode.StretchToFill, true, 1);
		return;
	}
	//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
	CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_FIGHT_NORMAL );
	
	if(bLevelUp != 0)
	{
		GUI.BeginGroup(Rect(107,16,266,289));
		
		guiStyle.normal.textColor = Color(1, 1, 1, 1);
		if( bLevelUp == 1 ) //level up
			GUI.DrawTexture (Rect(0, 0, 266, 289), texLevelUpB, ScaleMode.StretchToFill, true, 1);
		else
		{
			GUI.Label( Rect( 0, 0, 266, 289 ), "" , generalFrame );
			GUI.Label( Rect( 50, 4, 200, 25 ), "Level Down", guiStyle );
		}
		
		guiStyle.normal.textColor = Color(1, 1, 1, 1);

		GUI.Label(Rect(25, 101, 150, 20), "Brutality", lvlUpLabel);
		GUI.Label(Rect(25, 134, 150, 20), "Accuracy", lvlUpLabel);
		GUI.Label(Rect(25, 166, 150, 20), "Fortitude", lvlUpLabel);
		GUI.Label(Rect(25, 198, 150, 20), "Defense", lvlUpLabel);
		scriptInventory.RemoveItemStats();
		GUI.Label(Rect(155,  96, 40, 30), ((Global.myChar.BRT - nBRT) > 0 ? "+" : "") + (Global.myChar.BRT - nBRT), guiStyle3);
		GUI.Label(Rect(155, 128, 40, 30), ((Global.myChar.ACC - nACC) > 0 ? "+" : "") + (Global.myChar.ACC - nACC), guiStyle3);
		GUI.Label(Rect(155, 162, 40, 30), ((Global.myChar.FORT - nFORT) > 0 ? "+" : "") + (Global.myChar.FORT - nFORT), guiStyle3);
		GUI.Label(Rect(155, 193, 40, 30), ((Global.myChar.DEF - nDEF) > 0 ? "+" : "") + (Global.myChar.DEF - nDEF), guiStyle3);
		scriptInventory.AddItemStats();
		if( GUI.Button( Rect( 100, 230, 83, 33 ), "Continue", styleOrangeBut ) )
		{
			scriptInventory.RemoveItemStats();
			Global.myChar.HP += (Global.myChar.FORT - nFORT)*5 + 10;
			Global.myChar.ATK += (Global.myChar.BRT - nBRT)*2 + 1;
            Global.myChar.EVASION = (Global.myChar.DEF/2.0) + (Global.myChar.LVL/10.0);
			scriptInventory.AddItemStats();
			Global.Hp_incercare = Global.myChar.HP;
			//Unlock Mission
			//AddMissionToCharacter();
			if( bNewSpecialLearned != 0 )
			{
				bShowNewSpecial = bNewSpecialLearned;
				bLevelUp = 0;
			}
			else
			{ 
				//finalize_durations();
				LoadMap();
			}
		}
		GUI.EndGroup();
	}
	
	if(bShowNewSpecial != 0)
	{
		//TODO: make modifications for( losed a skill )
		GUI.BeginGroup(Rect(107,16,266,289));
		if( bShowNewSpecial == -1 )
			GUI.Label( Rect( 0, 0, 266, 289 ), "", generalFrame );
		else
			GUI.DrawTexture(Rect(0, 0, 266, 289), texNewSkill, ScaleMode.StretchToFill, true, 1);
		lvlUpLabel.normal.textColor = Color.white;
		lvlUpLabel.alignment = TextAnchor.MiddleCenter;
		if( bShowNewSpecial == 1 )
		{
			GUI.Label(Rect(5, 30, 261, 50), "Congratulations!", lvlUpLabel);
			GUI.Label(Rect(5, 60, 261, 50), "You learned a new skill:", lvlUpLabel);
		}
		else
		{
			GUI.Label(Rect(5, 30, 261, 50), "Sorry!", lvlUpLabel);
			GUI.Label(Rect(5, 60, 261, 50), "You lost a skill:", lvlUpLabel);
		}
		
		lvlUpLabel.normal.textColor = Color.green;
		GUI.Label(Rect(5, 100, 261, 50), newSpecialLearned, lvlUpLabel);
		if(GUI.Button(Rect(100, 230, 83, 33), "Continue", styleOrangeBut)){
			//finalize_durations();
			LoadMap();
		}
		GUI.EndGroup();
	}
    
		if(bLooting )
		{                                                                                                                                                                                                                                       
			GUI.DrawTexture (Rect(112, 57, 256, 206), texLootB, ScaleMode.StretchToFill, true, 1);
			GUI.DrawTexture (Rect(210, 100, 18, 18), texLootIcon, ScaleMode.StretchToFill, true, 1);
			guiStyle.normal.textColor = Color(1, 1, 1, 1);
			GUI.Label(Rect(150, 98, 120, 100), "Loot", guiStyle);
			GUI.Label(Rect(235, 98, 130, 100), sLootName, lootStyle);
			GUI.Label(Rect(150, 130, 300, 100), "$", guiStyle);
			GUI.Label(Rect(210, 130, 300, 100), "" + nLootGold, lootStyle);
			GUI.Label(Rect(150, 164, 300, 100), "XP", guiStyle);
			GUI.Label(Rect(210, 164, 300, 100), "" + nLootXP, lootStyle);
	        //PREACHERMAN animation begins
			if(GUI.Button(Rect(199, 200, 83, 33), "Continue", styleOrangeBut))
			{
				if( scriptGUICutScene.HasCutScene( Global.enemyChar.mobname ) )
					scriptGUICutScene.ToggleCutScene( true, scriptGUICutScene.MODE_CUTSCENES );
				bLooting = false;
				CheckMissions("FIND",sLootName);
				endFight2();
			}
	}
	
	if( bDeathPenalty )
	{
		//GUI.DrawTexture (Rect(112, 57, 256, 206), texLootB, ScaleMode.StretchToFill, true, 1);
		//GUI.DrawTexture (Rect(210, 100, 18, 18), texLootIcon, ScaleMode.StretchToFill, true, 1);
		//i need drawlabel to be able to use a guistyle ( guistyle has border and doesn't stretch the margins of the texture )
		
		GUI.Label( Rect(112, 57, 256, 206), "", generalFrame );
		GUI.Label( Rect( 158, 60, 200, 30 ), "Defeat!", guiStyle );
		guiStyle.normal.textColor = Color(1, 1, 1, 1);
		GUI.Label(Rect(150, 98, 200, 100), "Choose your death penalty!", guiStyle);
		GUI.Label(Rect(235, 98, 130, 100), sLootName, lootStyle);
		GUI.Label(Rect(150, 130, 300, 100), "$", guiStyle);
		GUI.Label(Rect(210, 130, 300, 100), "" + nLootGold, lootStyle);
		GUI.Label(Rect(150, 164, 300, 100), "XP", guiStyle);
		GUI.Label(Rect(210, 164, 300, 100), "" + nLootXP, lootStyle);
		if( GUI.Button( Rect( 160, 210, 60, 28 ), "XP", styleOrangeBut ) )
		{
			bDeathPenalty = false;
			nLootGold = 0;
			LoadSceneScript.MoreMobsToFight = false;
			endFight2();
		}
		if( Global.myChar.Money + nLootGold >= 0 )
		if( GUI.Button( Rect( 255, 210, 60, 28 ), "$", styleOrangeBut ) )
		{
			bDeathPenalty = false;
			nLootXP = 0;
			LoadSceneScript.MoreMobsToFight = false;
			endFight2();
		}
	}

	if(nCurTurn < nTurns && Queue.length == 0)
	{
		nCurTurn++;
		tempHit = new Hit();
		computeDurations();
		cPC.calc_stats(); //bassically this does nothing. ( RADU )
		cMob.calc_stats();
		if(Global.mobSpecialCoolDown > 0)
			{
				Global.mobSpecialCoolDown = Global.mobSpecialCoolDown-1;
			}
		if(tempENRG > cPC.ENRG)
			{
				cPC.ENRG = (tempENRG > (cPC.ENRG + cPC.REGEN)) ? (cPC.ENRG + cPC.REGEN) : tempENRG;
			}
	}
	
	if(!bMenu) return;
	if( !bLooting && bLevelUp==0 && bShowNewSpecial == 0 && !bDeathPenalty )
	{
	// *** Draw the GUI ***
	// HP char
	GUI.DrawTexture(Rect(5, 3, 2, 15), texHPc1, ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(7, 3, ((cPC.HP+0.0)/tempHP)*200, 15), texHPc2, ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(7+((cPC.HP+0.0)/tempHP)*200, 3, 2, 15), texHPc3, ScaleMode.StretchToFill, true, 1);
	GUI.Label(Rect(5,4,210,20),cPC.HP+"/" +tempHP, statsStyle);
	// Mana char
	GUI.DrawTexture(Rect(5, 20, 3, 13), texMana1, ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(8, 20, ((cPC.ENRG+0.0)/tempENRG)*100, 13), texMana2, ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(8+((cPC.ENRG+0.0)/tempENRG)*100, 20, 3, 13), texMana3, ScaleMode.StretchToFill, true, 1);
	GUI.Label(Rect(5, 20, 110,20),cPC.ENRG+"/"+tempENRG, statsStyle);
	// HP mob
	GUI.DrawTexture(Rect(473, 3, 2, 15), texHPm3, ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(473-((cMob.HP+0.0)/Global.enemyChar.HP)*200, 3, ((cMob.HP+0.0)/Global.enemyChar.HP)*200, 15), texHPm2, 										ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(471-((cMob.HP+0.0)/Global.enemyChar.HP)*200, 3, 2, 15), texHPm1, ScaleMode.StretchToFill, true, 1);
	GUI.Label(Rect(271,4,210,20),cMob.HP+"/"+Global.enemyChar.HP, statsStyle);
	// Mana mob
	GUI.DrawTexture(Rect(472, 20, 3, 13), texMana3, ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(472-((cMob.ENRG+0.0)/Global.enemyChar.ENRG)*100, 20, ((cMob.ENRG+0.0)/Global.enemyChar.ENRG)*100, 13), texMana2, 								ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(469-((cMob.ENRG+0.0)/Global.enemyChar.ENRG)*100, 20, 3, 13), texMana1, ScaleMode.StretchToFill, true, 1);
	GUI.Label(Rect(372, 20, 110,20),cMob.ENRG+"/"+Global.enemyChar.ENRG, statsStyle);
	// Interface
	//GUI.DrawTexture(Rect(215, 5, 51, 39), texTV, ScaleMode.StretchToFill, true, 1);
	GUI.Label(Rect(245, 35, 230, 24), Global.enemyChar.mobname, mobLabelStyle);
	GUI.Label(Rect(5, 35, 230, 24), Global.myChar.Nick, charLabelStyle);

	guiStyle.normal.textColor = Color(1, 1, 1, 1);
	GUI.Label(Rect(5, 60, 100, 24), "" + Global.myChar.LVL, charLabelStyle);
	GUI.Label(Rect(375, 60, 100, 24), "" + cMob.LVL, mobLabelStyle);
	}
	//draw bottom-bar if inventory not opened
	if(!Inventory.bInventory && !bLooting && bLevelUp==0 && bShowNewSpecial == 0 && !bDeathPenalty)
	{
		GUI.DrawTexture(Rect(0, 277, 480, 43), texBottomBar, ScaleMode.StretchToFill, true, 1);
		// Attack
		style.active.background = bAttack ? texAttackP : texAttack;
		style.normal.background = bAttack ? texAttack : texAttackP;
		if(GUI.Button(Rect(42, 287, 82, 36), "", style))
		{
			bAttack = !bAttack;
			doSpecial = false;
			menuInventory = true;
			atribute = false;
		}
	
		if(cPC.HP<0) cPC.HP = 0;
		if(cMob.HP<0) cMob.HP = 0;
		if(cPC.ENRG<0) cPC.ENRG = 0;
		if(cMob.ENRG<0) cMob.ENRG = 0;
	
		if(bAttack && Queue.length == 0 && cPC.HP > 0 && cMob.HP > 0)
		{
			// Hit
			style.active.background = texHit;
			style.normal.background = texHitP;
			if(GUI.Button(Rect(42, 75, 83, 37), "", style) && (Queue.length == 0))
			{				
				bAttack = false;
				if(cPC.WepType == 3)
				{
					//range wepon, shoot it
					Debug.Log("Inventory: weapon type Inventoryaaaa" + Inventory.itemsEquiped[Inventory.temp_slot].weapon_type + "  IDUL : " + Inventory.itemsEquiped[Inventory.temp_slot].id);
					
					if(Inventory.itemsEquiped[Inventory.temp_slot].id == 226)
							{
							
								addAction("cPC", SHOOT, 50);
								tempHit = Hit(cPC.hit_do(cMob));
								if(tempHit.HP == 0)
									{
										addAction("cMob", DODGE, 70, tempHit);
									}
								else
									{
										addAction("cMob", GET_HIT, 70, tempHit);
									}
//								bullet = GameObject.Instantiate(Resources.Load("Animations/Booms/Bullet"));
//								bullet.active = true;
			
								if(cMob.HP - tempHit.HP> 0) 
									addAction("cMob", IDLE);
								else 
									addAction("cMob", DIE, 10);
								//addAction("cPC", WALK, goHOME, true);
								addAction("cPC", IDLE, false);
							}
						else
						{
							addAction("cPC", SHOOT, 50);
							tempHit = Hit(cPC.hit_do(cMob));
							if(tempHit.HP == 0)
								{
									addAction("cMob", DODGE, 70, tempHit);
								}
							else
								{
									addAction("cMob", GET_HIT, 70, tempHit);
								}
//							bullet = GameObject.Instantiate(Resources.Load("Animations/Booms/Bullet"));
//							bullet.active = true;
		
							if(cMob.HP - tempHit.HP> 0) 
								addAction("cMob", IDLE);
							else 
								addAction("cMob", DIE, 10);
							//addAction("cPC", WALK, goHOME, true);
							addAction("cPC", IDLE, false);
					}
					
				}
				else
				{	
					addAction("cPC", WALK, "attack"); // go to the mob
                    if ( cPC.WepType == 2 )
                        addAction("cPC", HIT2, 5);
                    else
                        addAction("cPC", HIT1, 5);
					tempHit = Hit(cPC.hit_do(cMob));
					if(tempHit.HP == 0)
						{
							addAction("cMob", DODGE, 70, tempHit);
						}
					else
						{
							addAction("cMob", GET_HIT, 70, tempHit);
						}
					if(cMob.HP - tempHit.HP> 0) 
						addAction("cMob", IDLE); 
					else 
						addAction("cMob", DIE, 10);
					addAction("cPC", WALK, goHOME, true);
					addAction("cPC", IDLE, true);
				}
				if(cMob.HP - tempHit.HP <= 0){
					if(Global.enemyChar.mobname == "TickMan")
					{
						addText("cMob","The tick lives!");
						Global.enemyChar.mobname = "Tick";
						addAction("cMob", SPAWN);
					}
					else
					{
						addText("Victory!");
						addAction("cPC", WIN);
						addAction("cPC", IDLE);
					}
				}
				else
				{
					mobsRevenge();
					nTurns++;
				}
			}
			
			// Brace
			if(playerHasBrace > -1){
				style.active.background = texBrace;
				style.normal.background = texBraceP;
				if(GUI.Button(Rect(42, 125, 83, 37), "", style) && (Queue.length == 0))
				{
					if(cPC.SpecialAttacks[playerHasBrace].energcost <= cPC.ENRG)
					{
						cPC.ENRG = cPC.ENRG - cPC.SpecialAttacks[playerHasBrace].energcost;
						addAction("cPC", cPC.SpecialAttacks[playerHasBrace].attackanimation, 70, false);
						addAction("cPC", IDLE);
						bAttack = false;
						var def : int = Random.Range(cPC.SpecialAttacks[playerHasBrace].min_damage,cPC.SpecialAttacks[playerHasBrace].max_damage);
						addDuration(Duration(cPC, Hit(0, 0, 0, 0, 0, def, 0, 0, 0), 3));
						printText(FLAG_PC, "+"+def+" Defense");
						mobsRevenge();
						nTurns++;
					}
					else
					{
						printText(FLAG_NONE, "Not enough energy!");
					}
				}
			}
			// Concentrate
			if(playerHasConcentrate > -1){
				style.active.background = texConcentrate;
				style.normal.background = texConcentrateP;
				if(GUI.Button(Rect(42, 175, 83, 37), "", style) && (Queue.length == 0))
				{
					if(cPC.SpecialAttacks[playerHasConcentrate].energcost <= cPC.ENRG)
					{
						cPC.ENRG = cPC.ENRG - cPC.SpecialAttacks[playerHasConcentrate].energcost;
						addAction("cPC", cPC.SpecialAttacks[playerHasConcentrate].attackanimation, 70, false);
						addAction("cPC", IDLE);
						bAttack = false;
						var atk : int  = Random.Range(cPC.SpecialAttacks[playerHasConcentrate].min_damage,cPC.SpecialAttacks[playerHasConcentrate].max_damage);
						addDuration(Duration(cPC, Hit(0, 0, 0, 0, 0, 0, 0, atk, 0), 1));
						printText(FLAG_PC, "+" +atk+" Attack");
	
						mobsRevenge();
						nTurns++;
					}
					else
					{
						printText(FLAG_NONE, "Not enough energy!");
					}
				}
			}
			// Recover
			if(playerHasRecover > -1){
				style.active.background = texRecover;
				style.normal.background = texRecoverP;
				if(GUI.Button(Rect(42, 225, 83, 37), "", style) && (Queue.length == 0))
				{
					addAction("cPC", cPC.SpecialAttacks[playerHasRecover].attackanimation, 70, false);
					addAction("cPC", IDLE);
					bAttack = false;
					var rec : int = Random.Range(cPC.SpecialAttacks[playerHasRecover].min_damage,cPC.SpecialAttacks[playerHasRecover].max_damage); 
					cPC.ENRG = tempENRG - cPC.ENRG > rec? cPC.ENRG + rec : tempENRG;
					printText(FLAG_PC, "+"+rec+" Energy");

					mobsRevenge();
					nTurns++;		
				}
			}
			
			// Special attack
			//index is stored in playerSpecialAttacks array
            var SpecialCriticalChance : float;
          
			if(theSwipe.result == 1){
				theSwipe.result = 3;
				addText(theSwipe.name);
				addText(theSwipe.accuracy + "%");
                Debug.Log("RESULT "+theSwipe.accuracy+'%');
				bAttack = false;
                   switch(cPC.WepType)
        {			
			case 2: 
                     SpecialCriticalChance = (20 + (cPC.ACC/(cPC.LVL/3)) + (theSwipe.accuracy/1000.0))*1;
            break;
            case 3:
                     SpecialCriticalChance = (20 + (cPC.ACC/(cPC.LVL/3)) + (theSwipe.accuracy/1000.0))*0.5;
            break;
            default:
                     SpecialCriticalChance = (20 + (cPC.ACC/(cPC.LVL/3)) + (theSwipe.accuracy/1000.0))*1.25;
            break;
        }
				cPC.ENRG = cPC.ENRG - cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].energcost;
				if(cPC.WepType!=3)
				{
					addAction("cPC", WALK, "attack"); // go to the mob
					//addAction("cPC", FIRE);
                   // addAction("cPC", "brace", 70, false);
					addAction("cPC", cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].attackanimation, 70, false);
					
					tempHit = Hit(cPC.hit_do(cMob));
					if(tempHit.HP == 0)
						{
							addAction("cMob", DODGE, 70, tempHit);
						}
					else
						{
	                    	tempHit.HP += (cPC.RRA + Random.Range(cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].min_damage,cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].max_damage)*(1-cMob.DEF)*(2*theSwipe.accuracy/100.0));
	                        
	                        if(theSwipe.accuracy==1) tempHit.HP*=1/3;
	                        if(Random.value*100 <= SpecialCriticalChance)
	                            tempHit.HP *= 2;
							addAction("cMob", GET_HIT, 70, tempHit);
						}
					if(cMob.HP - tempHit.HP > 0) 
						addAction("cMob", IDLE); 
					else 
					addAction("cMob", DIE, 10);
					addAction("cPC", WALK, goHOME, true);
					addAction("cPC", IDLE, true);
				}
				else
				{	
					addAction("cPC", cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].attackanimation, 70, false);
					tempHit = Hit(cPC.hit_do(cMob));
					if(tempHit.HP == 0)
						{
							addAction("cMob", DODGE, 70, tempHit);
						}
					else
						{
							tempHit.HP += (cPC.RRA + Random.Range(cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].min_damage,cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].max_damage)*(1-cMob.DEF)*(2*theSwipe.accuracy/100.0));
	                         if(Random.value*100 <= SpecialCriticalChance)
	                            tempHit.HP *= 2;
							addAction("cMob", GET_HIT, 70, tempHit);
						}
					if(cMob.HP - tempHit.HP > 0) 
						addAction("cMob", IDLE); 
					else 
						addAction("cMob", DIE, 10);
						addAction("cPC", IDLE);
				}

				if(cMob.HP  - tempHit.HP <= 0)
					{
						addText("Victory!");
						addAction("cPC", WIN);
						addAction("cPC", IDLE);
					}
				else
					{
						mobsRevenge();
						nTurns++;
					}
				theSwipe.accuracy = 0;
			}
		}

		// Special
		style.active.background = texSpecial;
		style.normal.background = texSpecialP;
		if(GUI.Button(Rect(143, 287, 82, 36), "", style))
			{
				selectedSpecialAttack = -1;
				doSpecial = !doSpecial;	
				bAttack = false;
				menuInventory = true;
				atribute = false;
			}
		if(doSpecial && Queue.length == 0 && cPC.HP > 0 && cMob.HP > 0)
		{
			//selectedSpecialAttack = GUI.SelectionGrid(Rect(140, 75, 82, playerSpecialAttacks.length * gridHSpecialAttacks), selectedSpecialAttack, sPlayerSpecialAttacks, 1, specialAttacksGridStyle);
			for( var i = 0; i < playerSpecialAttacks.length; i++ )
				if( GUI.Button( Rect( 140, 60 + gridHSpecialAttacks * 1.1 * i, 120, gridHSpecialAttacks ), 
				( " ( " + sPlayerSpecialAttacks[ i ] + " ) - " + cPC.SpecialAttacks[playerSpecialAttacks[i]].energcost  ), 
				specialAttacksGridStyle ) )
					{
						selectedSpecialAttack = i;
					}
		}

		if((selectedSpecialAttack >-1)&&(doSpecial))
		{
			if(cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].energcost > cPC.ENRG)
				{	
					
					selectedSpecialAttack = -1;
					printText(FLAG_NONE, "Not enough energy! " );
				}
			else
			{
				//theSwipe = new Swipe(cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].attackname,swipeImage, 							swipeParticles,	swipeParticles2);
				
				theSwipe = new Swipe(cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].attackname,
									 swipeImage,
									 swipeParticles,
									 cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].max_score_time,
									 cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].score_lost_per_sec);
				
				
				swipeToDo = "Files/Swipes/"+cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].attackanimation;
				StartCoroutine(theSwipe.init(swipeToDo));
		
			}
			doSpecial = false;
		}
		if(theSwipe.isInit)
		{
			theSwipe.Update();
			//theSwipe.UpdateClue();
		}
		// Inventory
		style.active.background = texInventory;
		style.normal.background = texInventoryP;
		
		// buton de inventory
		if(GUI.Button(Rect(254, 287, 82, 36), "", style))
		{
				if (menuInventory == true)
					{
						atribute = false;
						menuInventory = false;
					}
				else 
					{
						menuInventory = true;
						atribute = false;
					}
				bAttack = !bAttack;
				doSpecial = false;
				bAttack = false;
		}

		// Run away!
		style.active.background = texRunAway;
		style.normal.background = texRunAwayP;
		if(GUI.Button(Rect(363, 287, 82, 36), "", style)){
			if(  Queue.length == 0 )
			{
				Global.Hp_incercare = Global.myChar.HP;
				RunAway();    
			}
		}
	
		// Draw the text
		if(tFade > 0)
		{
			tFade -= 0.25*Time.deltaTime;
			tY += 15*Time.deltaTime;
			theStyle.normal.textColor = Color(1,1,1,tFade);
			GUI.Label(Rect(tRect.x, tRect.y - tY, tRect.width, tRect.height), tText, theStyle);
		}
	}//end if inventory opened
	if(theSwipe.result == 1)
	{
		bAttack = true;
	}

	if (theSwipe.result == 2) 
	{
		addText("Fail");
		theSwipe.result = 3;
		theSwipe.accuracy = 1;
		mobsRevenge();
		nTurns++;
	}
	
	if((Time.time > idleAniUpdate) && (Global.enemyChar.mobname == "TickMan") && (act.fin))
	{
		idleAniUpdate = Time.time + idleAniUpdateRate;
		addAction("cMob", "idle_2", 70, false);
		addAction("cMob", IDLE);	
	}
	if(bLootAlert)
	{
		lootAlertRect = GUI.Window (idLootAlert, lootAlertRect, DoLootAlert, "", styleErrorFrame);
		GUI.FocusWindow(idLootAlert);
	}
	if(bReLoot && !bLootAlert && !scriptInventory.bInventory)
	{
		if(GUI.Button(Rect(199, 200, 83, 33), "Loot", styleOrangeBut))
		{
			bReLoot = false;
			if(!scriptInventory.LootItem(idLootItem))
				{
					bLootAlert = true;
					bLooting = false; 
				}
			else
				{
					bLooting = true;
				}
		}
	}
	
	if (Global.enemyChar.specialMob == 1)
	{ 
	if ( imagineDezactivare == true)
		{
		
			if (GUI.Button(Rect(0,0, Screen.width,Screen.height),ceva, ""))
				{
					print("nr = " + nr);
					nextImage = 0; 
					 nr++; 
					Start(); 
				}
		 }
	}
}

function RunAway()
{
	finalize_durations();
	bLoading = true;
	bBattle = false;
    changeLoadScreen = Random.value ;
    Global.theScene = 3;
    Global.randomNumber = Random.value;
    intoMap = true ;
    scriptMissions.clearingBuildings = false;
                
    LoadSceneScript.MoreMobsToFight = false;
                
    Inventory.ResetSelectedItem();
	yield StartCoroutine( Global.save_stats() );
	Application.LoadLevel("LoadingScene");

}

function DoLootAlert (windowID : int) {
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	GUI.Label(Rect(20,30,190,40),"Not enough free slots.\nPlease remove some items.");
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", scriptInventory.styleButSmll))
		bLootAlert = false;
	bReLoot = true;
}


function AddMissionToCharacter() //This will retire and will not be used anymore
{
	 var url : String = Global.server + "/mmo_iphone/add_player_mission.php?player_id="+Global.myChar.id+"&level=" + Global.myChar.LVL;
	 var req : WWW = new WWW(url);
	 yield req;
	 while (req.error && req.error.ToString().Contains("Resolving host timed out"))
		 { 
			  Debug.Log( "Retrying" );
			  req = new WWW(url);
			  yield req;
		 }
	
	 while(req.error);
}

function CheckMissions( missionType : String, elem : String)
{
	if( missionType == "KILL" )
	{
		if ( Global.missionsArray != null )
			for( var i : int = 0; i < Global.missionsArray.length; i++ )
			{  
				 var t : Mission ;
			     t = Global.missionsArray[i];
				if( t.toDo.ToUpper() == missionType && t.done < t.quant ) 
				{
					if(elem.ToUpper().Contains(t.what.ToUpper())) 
						{
							t.UpdateMission(1);
							var url = Global.server + "/mmo_iphone/update_player_mission.php?mission_id=" + t.missionId.ToString() + "&player_id=" + Global.myChar.id + "&procent=" + t.done.ToString();
							var post = new WWW(url);
							yield(post);
							while (post.error && post.error.ToString().Contains("Resolving host timed out"))
								{ 
									Debug.Log( "Retrying" );
									post = new WWW(url);
									yield(post);
								}
						}
				}
			}
	}
	if ( missionType == "DROP" )
	{
		// do nothing
	}
}

function UpdateMissions() //RADU: this doesn't seems to be used anywhere, why is it still here? and who uses spaces instead of tabs anyway?
 {
	 for (var i:int=0;i<Global.missionsUpdateQueue.length;i++)
		  {
			  var t : Mission ;
			  t = Global.missionsArray[Global.missionsUpdateQueue[i]];
			  var url = Global.server + "/mmo_iphone/update_player_mission.php?mission_id="+t.missionId.ToString()+"&player_id="+Global.myChar.id+"&procent=" +t.done.ToString();
			  var post = new WWW(url);
			  yield(post); 
			  while (post.error && post.error.ToString().Contains("Resolving host timed out"))
				 	{ 
					  	post = new WWW(url);
					    yield(post); 
				 	}
		  }
 Global.missionsUpdateQueue = new Array(); 
 }
