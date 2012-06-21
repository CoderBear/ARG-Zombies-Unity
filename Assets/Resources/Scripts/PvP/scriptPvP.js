var userPCPrefab : GameObject;
var enemyPCPrefab : GameObject;
var scriptInventory : Inventory;
var Audio : AudioSource;
var userPC : GameObject;
var enemyPC : GameObject;
var enemyPCScript : scriptEnemyPC;
var eChar : EnemyChar;
var needToRegen : boolean;
var bullet : GameObject;
var wwwData : String;

var idleAniUpdate : float;
var idleAniUpdateRate : float;

var styleErrorFrame	: GUIStyle;
var bLootAlert 		: boolean;
var lootAlertRect 	: Rect; 
var idLootAlert		: int;
var styleButRedSmll : GUIStyle;
var bReLoot			: boolean;
var finHit		: Hit;

var guiStyle		: GUIStyle; // font size 20
var guiStyle2		: GUIStyle; // font size 20
var guiStyle3		: GUIStyle; // system font

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
var swipeImage		: GameObject;
var swipeParticles	: GameObject;
var swipeParticles2	: GameObject;

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

var texNamePlate	: Texture2D;
var texNamePlate2	: Texture2D;
var texTV			: Texture2D;

var texLoading1		: Texture2D;
var texLoading2		: Texture2D;
var texLoading3		: Texture2D;

var btnStyle		: GUIStyle;
var textLabelStyle	: GUIStyle;
var statsStyle 		: GUIStyle;
var floatingTextStyle: GUIStyle;

var bMenu			: boolean;
var bLoading		: boolean = false;
var bAttack			: boolean = false;

var action			: ActionPvP;
var cHit			: Hit;
var cPC				: Char = new Char();

var goHOME			: boolean = false;
var goATTACK		: boolean = true;

var tRect			: Rect;
var tText			: String;
var tFade			: float;
var tY				: float;
var bLooting		: boolean = false;
var texLootB		: Texture2D;
var texLootIcon		: Texture2D;
var styleOrangeBut	: GUIStyle;
var sLootName		: String;
var nLootGold		: int;
var nLootXP			: int;
var idLootItem		: int;
var lootStyle 		: GUIStyle;

var POS_MID			: int = 0;
var POS_PC			: int = 1;
var POS_MOB1		: int = 2;

var FLAG_NONE		: int = 0;
var FLAG_PC			: int = 1;
var FLAG_MOB1		: int = 2;

var Queue			: Array;
var durationQueue 	: Array;
var eDurationQueue  : Array; 
var moveDist		: float = 1.75;
var moveSpeed		: float = 2.5;

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
var HIT3            : int = 11;
var FIRE            : int = 12;

var tempHP : int;
var tempENRG : int;
var tempHit : Hit;
var animToPlay : String;
//var walkOnX : AnimationCurve;

var turnQueue	: Array;	// turns that will happen (the main loop)
var nTurn		: int;		// current turn
var act			: ActionPvP;
var curTurn		: Turn;
var curDuration	: Duration;
var curEDuration : EDuration;
var nCurTurn	: int;
var nTurns		: int;
var theSwipe	: Swipe;

var bArmour 	: boolean;
var swipeState 	: String;
var enemyIsRanged : boolean;
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


//adaugata de me sol temp pt health diminuat
var healthBack : int;
var enerBack : int;

function Awake()
{
	Init();
    if(scriptMainMenu.bMute) Audio.mute = true;
                else Audio.mute = false;

    Audio.volume = scriptMainMenu.nMusicVol/100;
}

function Init() {
	
	
	idleAniUpdate = 0.0;
 	idleAniUpdateRate = 15.0;
 	
	//userPC = Instantiate(userPCPrefab, Vector3(-3,0,-6), Quaternion.identity);
	lootAlertRect = Rect (150, 100, 220, 120);
	bLoading = true;
	Global.cameraS = camera;
	Global.mobSpecialCoolDown = -1;
	enemyPC = Instantiate(enemyPCPrefab, Vector3(3,0,-7), Quaternion.identity);
	
	bMenu = true;
	var bBattle = true;
	
	Queue = new Array();
	turnQueue = new Array();
	durationQueue = new Array();
	eDurationQueue= new Array();
	playerSpecialAttacks = new Array();
	nCurTurn = 0;
	nTurns = 0;

	//add char
	Global.myChar.init("PC", "Animations/Character1.5", Vector3(-3, 0, -7), Vector3(3, 3, 3), Vector3(-3, 0, -7), Vector3(2.1, 0, -7), FLAG_PC);
	cPC = Global.myChar;
	
	yield StartCoroutine( cPC.getUserSpecials() );
	
	tempHP = Global.myChar.HP;
	tempENRG = Global.myChar.ENRG;
	tempHit = new Hit();
	
	act = new ActionPvP();
	act.fin = true;
	act.started = true;
	
	//to preserve the life for future battles
	healthBack = Global.myChar.HP;
	enerBack = Global.myChar.ENRG;
	
	yield WaitForSeconds(2);
	enemyPCScript = enemyPC.GetComponent(scriptEnemyPC);
	eChar = new EnemyChar();
	eChar.BRT = enemyPCScript.BRT;
	eChar.ACC = enemyPCScript.ACC;
	eChar.FORT = enemyPCScript.FORT;
	eChar.ATK = enemyPCScript.ATK;
	eChar.DEF = enemyPCScript.DEF;
	eChar.HP = enemyPCScript.HP;
	eChar.ENRG = enemyPCScript.ENRG;
	eChar.REGEN = enemyPCScript.REGEN;
	eChar.EVASION = enemyPCScript.EVASION;
	eChar.LVL = enemyPCScript.LVL;
	
	if(enemyPCScript.WepType == 3){
		enemyIsRanged = true;
	}
	else{
		enemyIsRanged = false;
	}
	eChar.pos1 = Vector3(3, 0, -7);
	eChar.pos2 = Vector3(-2.1, 0, -7);
	eChar.role = FLAG_MOB1;
	Global.mobSpecialCoolDown = Random.Range(0,4);
	statsStyle.normal.textColor = Color.white;
	statsStyle.alignment = TextAnchor.UpperCenter;
	needToRegen = false;
	playerHasBrace = -1;
	playerHasConcentrate = -1;
	playerHasRecover = -1;
	if(cPC.SpecialAttacks.length > 0){
		for(var i : int = 0; i<cPC.SpecialAttacks.length; i++){
			switch(cPC.SpecialAttacks[i].attackname){
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
		for(i = 0; i< playerSpecialAttacks.length;i++){
			sPlayerSpecialAttacks[i] = cPC.SpecialAttacks[playerSpecialAttacks[i]].attackname;
		}
	}
	if(playerSpecialAttacks.length < 5)
		gridHSpecialAttacks = 30;
	else	
		gridHSpecialAttacks = (playerSpecialAttacks.length / 5) * 30;
	selectedSpecialAttack = -1;
	doSpecial = false;
	bLoading = false;
	scriptInventory = GetComponent(Inventory);	
	scriptInventory.init_pvp();
}

function Update () {
if(!bLoading){	
	
	if((Time.time > idleAniUpdate) && (Global.enemyChar.mobname == "TickMan") && (act.fin)){
		idleAniUpdate = Time.time + idleAniUpdateRate;
		addAction("cMob", "idle_2", 70, false);
		addAction("cMob", IDLE);	
	}


	if(Queue.length > 0){
		if(act.fin){
			act = Queue[0];
			Queue.Shift();
		}
		if(!act.started){
			if(act.lengthP == 0) act.lengthP = 90;
			if(act.flip){
				if(act.owner == "cPC"){
					cPC.gameObj.transform.localScale.z = -cPC.gameObj.transform.localScale.z;
					cPC.gameObj.transform.position.x = cPC.gameObj.transform.position.x - cPC.gameObj.transform.localScale.z/2;
				}
				if(act.owner == "cMob"){
					enemyPC.transform.localScale.z = -enemyPC.transform.localScale.z;
					enemyPC.transform.position.x = enemyPC.transform.position.x - enemyPC.transform.localScale.z/2;
				}
			}
			//razvan 04.10 enemyPC
			
			
			switch(act.action){
				case WALK:
					if(act.owner == "cPC"){
						animToPlay = "walk";
						//cPC.gameObj.animation[animToPlay].speed = 1.5;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						animToPlay = "walk";
						//cMob.gameObj.animation[animToPlay].speed = 1.5;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case HIT1:
					if(act.owner == "cPC"){
						animToPlay = "hit_1";
                       // cPC.gameObj.animation[animToPlay].speed = 0.75;
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						animToPlay = "hit_1";
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case HIT2:
					if(act.owner == "cPC"){
						animToPlay = "hit_2";
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
                    }
					
					if(act.owner == "cMob"){
						animToPlay = "hit_2";
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
                case HIT3:
                    if(act.owner == "cPC"){
						animToPlay = "hit_3";
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
                    }
                
                    break;
				case SHOOT:
					if(act.owner == "cPC"){
						animToPlay = "hit_3";
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						animToPlay = "hit_3";
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case DODGE:
					if(act.owner == "cPC"){
						printText(cPC.role, "-miss");
						animToPlay = "duck_and_weave";
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						printText(eChar.role, "-miss");
						animToPlay = "dodge";
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case DIE:
					if(act.owner == "cPC"){
						animToPlay = "death";
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						animToPlay = "death";
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case GET_HIT:
					if(act.owner == "cPC"){
						printText(cPC.role, "-" + (act.hit.HP > 0 ? act.hit.HP : "miss"));
						animToPlay = "get_hit";
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						printText(eChar.role, "-" + (act.hit.HP > 0 ? act.hit.HP : "miss"));
						animToPlay = "get_hit";
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case IDLE:
					if(act.owner == "cPC"){
						animToPlay = "idle";
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						if(Global.enemyChar.mobname == "TickMan"){
							animToPlay = "idle_1";
							idleAniUpdate = Time.time + idleAniUpdateRate;
						}
						else{
							animToPlay = "idle";
						}
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case SAY:
					if(act.owner == "cPC"){
						printText(cPC.role, act.text);
					}
					if(act.owner == "cMob"){
						printText(eChar.role, act.text);
					}
					act.fin = true;
					break;
				case WIN:
					animToPlay = "win";
					cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
					cPC.gameObj.animation.CrossFade(animToPlay);
					break;
				case PLAY:
					animToPlay = act.animation;
                    Debug.Log("act.animation E "+act.animation);
					if(act.owner == "cPC"){
                    
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						print( animToPlay );
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				//case SPAWN:
				//	spawnTick();
				//	act.fin = true;
				//	break;	
				case FIRE:
					Debug.Log("FIRE");
                    	//cMob.gameObj.animation["brace"].wrapMode = WrapMode.Once;
						//cMob.gameObj.animation.CrossFade("brace");

					act.fin  = true;
					break;
			}
			act.started = true;
		}
			 /*
			switch(act.action){
				case WALK:
					animToPlay = "walk";
					if(act.owner == "cPC"){
						cPC.gameObj.animation[animToPlay].speed = 1.5;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						enemyPC.animation[animToPlay].speed = 1.5;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case HIT1:
					animToPlay = "hit_1";
					if(act.owner == "cPC"){
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case HIT2:
					animToPlay = "hit_2";				
					if(act.owner == "cPC"){
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case SHOOT:
					animToPlay = "hit_2";
					if(act.owner == "cPC"){
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case DODGE:
					animToPlay = "duck_and_weave";
					if(act.owner == "cPC"){
						printText(cPC.role, "-miss");
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						printText(eChar.role, "-miss");
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case DIE:
					animToPlay = "death";
					if(act.owner == "cPC"){
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case GET_HIT:
					animToPlay = "get_hit";
					if(act.owner == "cPC"){
						printText(cPC.role, "-" + (act.hit.HP > 0 ? act.hit.HP : "miss"));
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						printText(eChar.role, "-" + (act.hit.HP > 0 ? act.hit.HP : "miss"));
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case IDLE:
					animToPlay = "idle";
					if(act.owner == "cPC"){
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case SAY:
					if(act.owner == "cPC"){
						printText(cPC.role, act.text);
					}
					if(act.owner == "cMob"){
						printText(eChar.role, act.text);
					}
					act.fin = true;
					break;
				case WIN:
					animToPlay = "win";
					if(act.owner == "cPC"){
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
				case PLAY:
					animToPlay = act.animation;
					Debug.Log( animToPlay );
					if(act.owner == "cPC"){
						cPC.gameObj.animation[animToPlay].wrapMode = WrapMode.Once;
						cPC.gameObj.animation.CrossFade(animToPlay);
					}
					if(act.owner == "cMob"){
						enemyPC.animation[animToPlay].wrapMode = WrapMode.Once;
						enemyPC.animation.CrossFade(animToPlay);
					}
					break;
			}
			act.started = true;
		}
		 */
		if(	act.action == HIT1 || act.action == HIT2 || act.action == DODGE ||
			act.action == GET_HIT || act.action == DIE || act.action == WIN || act.action == PLAY){
				var c: float;
				if(act.owner == "cPC"){
						c = cPC.gameObj.animation[animToPlay].time / cPC.gameObj.animation[animToPlay].length*100;
				}
				if(act.owner == "cMob"){
						c = enemyPC.animation[animToPlay].time / enemyPC.animation[animToPlay].length*100;
				}
				if(c > act.lengthP) act.fin = true;
		}else
		switch(act.action){
			case WALK:
				if(act.owner == "cPC"){
					if(act.goWHERE == goHOME){
						if(walk(cPC.gameObj, cPC.pos1)) act.fin = true;
					}else{
						if(walk(cPC.gameObj, cPC.pos2)) act.fin = true;
					}
				}
				if(act.owner == "cMob"){
					if(act.goWHERE == goHOME){
						if(walk(enemyPC, eChar.pos1)) act.fin = true;
					}else{
						if(walk(enemyPC, eChar.pos2)) act.fin = true;
					}
				}
				break;
			case SHOOT:
				if(act.owner == "cPC"){
					if(act.goWHERE == goHOME){
						if(walk(cPC.gameObj, cPC.pos1)) act.fin = true;
					}else{
						if(walk(cPC.gameObj, cPC.pos2)) act.fin = true;
					}
				}
				if(act.owner == "cMob"){
					if(act.goWHERE == goHOME){
						if(walk(enemyPC, eChar.pos1)) act.fin = true;
					}else{
						if(walk(enemyPC, eChar.pos2)) act.fin = true;
					}
				}
				break;	
			case IDLE:
				act.fin = true;
				break;
		}
		if(act.fin){
			if(act.owner =="cPC"){
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
			if(act.owner =="cMob"){
				eChar.HP 	-= act.hit.HP;
				eChar.ENRG 	-= act.hit.ENRG;
				eChar.DEF	-= act.hit.DEF;
				eChar.REGEN -= act.hit.REGEN;
				eChar.ATK 	-= act.hit.ATK;
				eChar.EVASION -= act.hit.EVASION;
			}
		}
	}
}
}

function OnGUI (){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	if(bLoading){
    if(Global.randomNumber <= 0.33)
		GUI.DrawTexture (Rect(0,0,480,320), texLoading1, ScaleMode.StretchToFill, true, 1);
        else if(Global.randomNumber > 0.33 && Global.randomNumber <= 0.66)
            GUI.DrawTexture (Rect(0,0,480,320), texLoading2, ScaleMode.StretchToFill, true, 1);
            else GUI.DrawTexture (Rect(0,0,480,320), texLoading3, ScaleMode.StretchToFill, true, 1);
	//	GUI.DrawTexture (Rect(0,0,480,320), texLoading, ScaleMode.StretchToFill, true, 1);
		return;
	}
	
	//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
	CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_FIGHT_PVP );
	
	if(bLooting){
	
		GUI.DrawTexture (Rect(112, 57, 256, 206), texLootB, ScaleMode.StretchToFill, true, 1);
		GUI.DrawTexture (Rect(210, 100, 18, 18), texLootIcon, ScaleMode.StretchToFill, true, 1);
		guiStyle.normal.textColor = Color(1, 1, 1, 1);
		GUI.Label(Rect(150, 98, 120, 100), "Loot", guiStyle);
		GUI.Label(Rect(235, 98, 130, 100), sLootName, lootStyle);
		GUI.Label(Rect(150, 130, 300, 100), "$", guiStyle);
		GUI.Label(Rect(210, 130, 300, 100), "" + nLootGold, lootStyle);
		GUI.Label(Rect(150, 164, 300, 100), "XP", guiStyle);
		GUI.Label(Rect(210, 164, 300, 100), "" + nLootXP, lootStyle);
		if(GUI.Button(Rect(199, 200, 83, 33), "Continue", styleOrangeBut)){
			bLooting = false;
			endFight();
		}
	}
	
	if(nCurTurn < nTurns && Queue.length == 0){
		nCurTurn++;
		tempHit = new Hit();
		computeDurations();
		computeEDurations();
		//cPC.calc_stats();
		//eChar.calc_stats();
		if(Global.mobSpecialCoolDown > 0){
			Global.mobSpecialCoolDown = Global.mobSpecialCoolDown-1;
		}
		//eChar.ENRG = enemyPCScript.ENRG - eChar.ENRG > 20? eChar.ENRG + 20 : enemyPCScript.ENRG;
		if(enemyPCScript.ENRG > eChar.ENRG){
			eChar.ENRG = (enemyPCScript.ENRG > (eChar.ENRG + eChar.REGEN)) ? (eChar.ENRG+eChar.REGEN):enemyPCScript.ENRG;
		}
		if(tempENRG > cPC.ENRG){
			cPC.ENRG = (tempENRG > (cPC.ENRG + cPC.REGEN)) ? (cPC.ENRG + cPC.REGEN) : tempENRG;
		}

	}
	
	if(!bMenu) return;
	
	// *** Draw the GUI ***
	//add 0.0 to convert to float
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
	GUI.DrawTexture(Rect(473-((eChar.HP+0.0)/enemyPCScript.HP)*200, 3, ((eChar.HP+0.0)/enemyPCScript.HP)*200, 15), texHPm2, 										ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(471-((eChar.HP+0.0)/enemyPCScript.HP)*200, 3, 2, 15), texHPm1, ScaleMode.StretchToFill, true, 1);
	GUI.Label(Rect(271,4,210,20),eChar.HP+"/"+enemyPCScript.HP, statsStyle);
	
	// Mana mob
	GUI.DrawTexture(Rect(472, 20, 3, 13), texMana3, ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(472-((eChar.ENRG+0.0)/enemyPCScript.ENRG)*100, 20, ((eChar.ENRG+0.0)/enemyPCScript.ENRG)*100, 13), texMana2, 								ScaleMode.StretchToFill, true, 1);
	GUI.DrawTexture(Rect(469-((eChar.ENRG+0.0)/enemyPCScript.ENRG)*100, 20, 3, 13), texMana1, ScaleMode.StretchToFill, true, 1);
	GUI.Label(Rect(372, 20, 110,20),eChar.ENRG+"/"+enemyPCScript.ENRG, statsStyle);
	
	// Interface
	//GUI.DrawTexture(Rect(215, 5, 51, 39), texTV, ScaleMode.StretchToFill, true, 1);
	textLabelStyle.alignment = TextAnchor.UpperRight;
	GUI.Label(Rect(395, 35, 80, 24), enemyPCScript.Nick, textLabelStyle);
	textLabelStyle.alignment = TextAnchor.UpperLeft;
	GUI.Label(Rect(5, 35, 80, 24), Global.myChar.Nick, textLabelStyle);
	
	//draw bottom-bar if inventory not opened
	if(!Inventory.bInventory)
	{
		GUI.DrawTexture(Rect(0, 277, 480, 43), texBottomBar, ScaleMode.StretchToFill, true, 1);
		// Attack
		btnStyle.active.background = bAttack ? texAttackP : texAttack;
		btnStyle.normal.background = bAttack ? texAttack : texAttackP;
		if(GUI.Button(Rect(42, 287, 82, 36), "", btnStyle)){
			bAttack = !bAttack;
			doSpecial = false;
		}
	
		if(cPC.HP<0) cPC.HP = 0;
		if(eChar.HP<0) eChar.HP = 0;
		if(cPC.ENRG<0) cPC.ENRG = 0;
		if(eChar.ENRG<0) eChar.ENRG = 0;
	
		if(bAttack && Queue.length == 0 && cPC.HP > 0 && eChar.HP > 0){
			// Hit
			btnStyle.active.background = texHit;
			btnStyle.normal.background = texHitP;
			if(GUI.Button(Rect(42, 75, 83, 37), "", btnStyle) && (Queue.length == 0)){				
				bAttack = false;
				if(cPC.WepType != 3)
				{
					addAction("cPC", WALK, "attack"); // go to the mob
					addAction("cPC", HIT1, 5);
					tempHit = Hit(cPC.hit_do(eChar));
					addAction("cMob", GET_HIT, 70, tempHit);
					if(eChar.HP - tempHit.HP> 0) 
						addAction("cMob", IDLE); 
					else 
						addAction("cMob", DIE, 10);
					addAction("cPC", WALK, goHOME, true);
					addAction("cPC", IDLE, true);
				}
				else
				{	
					//range wepon, shoot it
					//addAction("cPC", WALK, "attack"); // go to the mob
					addAction("cPC", SHOOT, 50);
					tempHit = Hit(cPC.hit_do(eChar));
					addAction("cMob", GET_HIT, 70, tempHit);
					bullet = GameObject.Instantiate(Resources.Load("Animations/Booms/Bullet"));
					bullet.active = true;

					if(eChar.HP - tempHit.HP> 0) 
						addAction("cMob", IDLE); 
					else 
						addAction("cMob", DIE, 10);
					//addAction("cPC", WALK, goHOME, true);
					addAction("cPC", IDLE, false);
				}
				if(eChar.HP - tempHit.HP <= 0){
					addText("Victory!");
					addAction("cPC", WIN);
					addAction("cPC", IDLE);
				}
				else{
					mobsRevenge();
					nTurns++;
				}

			}
			// Brace
			if(playerHasBrace > -1){
				btnStyle.active.background = texBrace;
				btnStyle.normal.background = texBraceP;
				if(GUI.Button(Rect(42, 125, 83, 37), "", btnStyle) && (Queue.length == 0)){
					if(cPC.SpecialAttacks[playerHasBrace].energcost <= cPC.ENRG){
					cPC.ENRG = cPC.ENRG - cPC.SpecialAttacks[playerHasBrace].energcost;
					addAction("cPC", cPC.SpecialAttacks[playerHasBrace].attackanimation, 70, false);
					addAction("cPC", IDLE);
					bAttack = false;
					var def : int = Random.Range(cPC.SpecialAttacks[playerHasBrace].min_damage,cPC.SpecialAttacks[playerHasBrace].max_damage);
		/*
		Duration(inChar : Char, inEffect : Hit, inTurns : int)
		old Hit (inHP : int, inMANA : int, inSTR : int, inAGI : int, inINT : int,inREGEN : float, inARMOUR : float, inDMG : float, inEVASION : float)
		new Hit (inHP : int, inENRG : int, inBRT : int, inACC : int, inFORT : int, inDEF : float, inREGEN : float, inATK : float, inEVASION : float)
		*/
					addDuration(Duration(cPC, Hit(0, 0, 0, 0, 0, def, 0, 0, 0), 3));
					printText(FLAG_PC, "+"+def+" Defense");
				
					mobsRevenge();
					nTurns++;
					}
					else{
						printText(FLAG_NONE, "Not enough energy!");
					}
				}
			}
			// Concentrate
			if(playerHasConcentrate > -1){
				btnStyle.active.background = texConcentrate;
				btnStyle.normal.background = texConcentrateP;
				if(GUI.Button(Rect(42, 175, 83, 37), "", btnStyle) && (Queue.length == 0)){
					if(cPC.SpecialAttacks[playerHasConcentrate].energcost <= cPC.ENRG){
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
					else{
						printText(FLAG_NONE, "Not enough energy!");
					}
				}
			}
			// Recover
			if(playerHasRecover > -1){
				btnStyle.active.background = texRecover;
				btnStyle.normal.background = texRecoverP;
				if(GUI.Button(Rect(42, 225, 83, 37), "", btnStyle) && (Queue.length == 0)){
					addAction("cPC", cPC.SpecialAttacks[playerSpecialAttacks[playerHasRecover]].attackanimation, 70, false);
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
			if(theSwipe.result == 1){
				theSwipe.result = 3;
				addText(theSwipe.name);
				addText(theSwipe.accuracy + "%");
				bAttack = false;
				cPC.ENRG = cPC.ENRG - cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].energcost;
				if(cPC.WepType!=3){
					addAction("cPC", WALK, "attack"); // go to the mob
					addAction("cPC", cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].attackanimation, 70, false);
					tempHit = Hit(cPC.hit_do(eChar));
					if(tempHit.HP == 0){
						addAction("cMob", DODGE, 70, tempHit);
					}else{
						tempHit.HP += ((theSwipe.accuracy/100.0) * Random.Range(cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].min_damage,cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].max_damage));
						addAction("cMob", GET_HIT, 70, tempHit);
					}
					if(eChar.HP - tempHit.HP > 0) 
						addAction("cMob", IDLE); 
					else 
						addAction("cMob", DIE, 10);
					addAction("cPC", WALK, goHOME, true);
					addAction("cPC", IDLE, true);
				}
				else{	
					addAction("cPC", cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].attackanimation, 70, false);
					tempHit = Hit(cPC.hit_do(eChar));
					if(tempHit.HP == 0){
						addAction("cMob", DODGE, 70, tempHit);
					}else{
						tempHit.HP += ((theSwipe.accuracy/100.0) * Random.Range(cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].min_damage,cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].max_damage));
						addAction("cMob", GET_HIT, 70, tempHit);
					}
					if(eChar.HP - tempHit.HP > 0) 
						addAction("cMob", IDLE); 
					else 
						addAction("cMob", DIE, 10);
					addAction("cPC", IDLE);
				}

				if(eChar.HP  - tempHit.HP <= 0){
					addText("Victory!");
					addAction("cPC", WIN);
					addAction("cPC", IDLE);
				}
				else{
					mobsRevenge();
					nTurns++;
				}
				theSwipe.accuracy = 0;
			}
		}

		// Special
		btnStyle.active.background = texSpecial;
		btnStyle.normal.background = texSpecialP;
		if(GUI.Button(Rect(143, 287, 82, 36), "", btnStyle)){
			selectedSpecialAttack = -1;
			doSpecial = !doSpecial;	
			bAttack = false;
		}
			if(doSpecial && Queue.length == 0 && cPC.HP > 0 && eChar.HP > 0){
			//selectedSpecialAttack = GUI.SelectionGrid(Rect(140, 75, 82, playerSpecialAttacks.length * gridHSpecialAttacks), selectedSpecialAttack, sPlayerSpecialAttacks, 1, specialAttacksGridStyle);
			for(var i = 0; i < playerSpecialAttacks.length; i++ )
				if( GUI.Button( Rect( 140, 60 + gridHSpecialAttacks * 1.1 * i, 120, gridHSpecialAttacks ), 
				( " ( " + sPlayerSpecialAttacks[ i ] + " ) - " + cPC.SpecialAttacks[playerSpecialAttacks[i]].energcost   ), 
				specialAttacksGridStyle ) )
				{
					selectedSpecialAttack = i;
				}
		}

		if((selectedSpecialAttack >-1)&&(doSpecial)){
			if(cPC.SpecialAttacks[playerSpecialAttacks[selectedSpecialAttack]].energcost > cPC.ENRG){
				selectedSpecialAttack = -1;
				printText(FLAG_NONE, "Not enough energy!");
			}
			else{
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
		if(theSwipe.isInit){
			theSwipe.Update();
			//theSwipe.UpdateClue();
		}
		// Inventory
		btnStyle.active.background = texInventory;
		btnStyle.normal.background = texInventoryP;
		if(GUI.Button(Rect(254, 287, 82, 36), "", btnStyle)){
			if (bLootAlert) {
				bLootAlert = false;
				bReLoot = true;
			}
			Inventory.bInventory = true;
			Inventory.bPlayerEq = false;
			Craft.bCraft = false;
			Inventory.bResetSelItem = true;
		}
		var bBattle;
		// Run away!
		btnStyle.active.background = texRunAway;
		btnStyle.normal.background = texRunAwayP;
		if(GUI.Button(Rect(363, 287, 82, 36), "", btnStyle)){
			if(  Queue.length == 0 )
			{
				endFight();
				bLoading = true;
				bBattle = false;
			}
			//Application.LoadLevel("sceneMap");
		}
	
		// Draw the text
		if(tFade > 0){
			tFade -= 0.25*Time.deltaTime;
			tY += 15*Time.deltaTime;
			floatingTextStyle.normal.textColor = Color(1,1,1,tFade);
			GUI.Label(Rect(tRect.x, tRect.y - tY, tRect.width, tRect.height), tText, floatingTextStyle);
		}
	}//end if inventory opened
	Log.OnGUI();

	/*
	if(theSwipe.result == 0 && theSwipe.img)
	GUI.DrawTexture(Rect(0, 0, 480, 320), theSwipe.img, ScaleMode.StretchToFill, true, 1);
	*/
	if(theSwipe.result == 1){
		bAttack = true;
	}
	
	if (theSwipe.result == 2) {
		addText("Fail");
		theSwipe.result = 3;
		theSwipe.accuracy = 0;
		mobsRevenge();
		nTurns++;
	}
	
	if(bLootAlert){
		lootAlertRect = GUI.Window (3, lootAlertRect, DoLootAlert, "", styleErrorFrame);
		GUI.FocusWindow(3);
	}

	textLabelStyle.alignment = TextAnchor.UpperLeft;
	GUI.Label(Rect(10, 60, 20, 20), "" + Global.myChar.LVL, textLabelStyle);
	textLabelStyle.alignment = TextAnchor.UpperRight;
	GUI.Label(Rect(450, 60, 20, 20), "" + eChar.LVL, textLabelStyle);
}

function walk(gameObj : GameObject, toPos : Vector3) : boolean{

	var vec = gameObj.transform.position - toPos;
	var dist = vec.magnitude;
	
	if(dist > moveDist){
		vec.Normalize();
		gameObj.transform.position = gameObj.transform.position - vec*Time.deltaTime*moveSpeed;
		return false;
	}else{
		return true;
	}
}

function addDuration(inDuration : Duration){
	curDuration = inDuration;
	
		//health points refresh
	if(curDuration.Character.HP+curDuration.effect.HP < healthBack)
		curDuration.Character.HP += curDuration.effect.HP;
	else
		curDuration.Character.HP = healthBack;
	
	//energy refresh	
	if(curDuration.Character.ENRG + curDuration.effect.ENRG < enerBack)
		curDuration.Character.ENRG += curDuration.effect.ENRG;
	else
		curDuration.Character.ENRG = enerBack;
	

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

function computeDurations(){
	var i : int;
	for(i = 0; i<durationQueue.length; i++){
		curDuration = durationQueue[i];
		if(curDuration.repeating == true){
			
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

		if(curDuration.turnsLeft==0){
			if(curDuration.wearOff){
				//razvan 04.10
				curDuration.Character.HP = curDuration.Character.HP - curDuration.effect.HP * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.ENRG = curDuration.Character.ENRG - curDuration.effect.ENRG * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.BRT = curDuration.Character.BRT - curDuration.effect.BRT * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.ACC = curDuration.Character.ACC - curDuration.effect.ACC * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.FORT = curDuration.Character.FORT - curDuration.effect.FORT * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.DEF = curDuration.Character.DEF - curDuration.effect.DEF*(curDuration.repeating ? curDuration.turn : 1);
				
				curDuration.Character.REGEN = curDuration.Character.REGEN - curDuration.effect.REGEN * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.ATK = curDuration.Character.ATK - curDuration.effect.ATK * (curDuration.repeating ? curDuration.turn : 1);
				curDuration.Character.EVASION = curDuration.Character.EVASION - curDuration.effect.EVASION*(curDuration.repeating ? curDuration.turn : 1) - ((curDuration.effect.DEF*(curDuration.repeating ? curDuration.turn : 1))/2);

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

function addEDuration(inDuration : EDuration){
	curEDuration = inDuration;
	curEDuration.Character.HP += curEDuration.effect.HP;
	curEDuration.Character.ENRG += curEDuration.effect.ENRG;

	curEDuration.Character.BRT += curEDuration.effect.BRT;
	curEDuration.Character.ACC += curEDuration.effect.ACC;
	curEDuration.Character.FORT += curEDuration.effect.FORT;
	curEDuration.Character.DEF += curEDuration.effect.DEF;
	
	curEDuration.Character.REGEN += curEDuration.effect.REGEN;
	curEDuration.Character.ATK += curEDuration.effect.ATK;
	curEDuration.Character.EVASION += curEDuration.effect.EVASION + (curEDuration.effect.DEF/2);
	eDurationQueue.Add(inDuration);
}

function addDuration(kHP : int, kENRG : int, kBRT : int, kACC : int, kFORT : int, kDEF : int, kREGEN : int, kATK : int, kEVASION : int, k_turns){
	addDuration(Duration(cPC,
						 Hit(kHP, kENRG, kBRT, kACC, kFORT, kDEF, kREGEN, kATK, kEVASION),
						 k_turns));
}

function computeEDurations(){
	var i : int;
	for(i = 0; i<eDurationQueue.length; i++){
		curEDuration = eDurationQueue[i];
		if(curEDuration.repeating == true){
			
			curEDuration.Character.HP += curEDuration.effect.HP;
			curEDuration.Character.ENRG += curEDuration.effect.ENRG;

			curEDuration.Character.BRT += curEDuration.effect.BRT;
			curEDuration.Character.ACC += curEDuration.effect.ACC;
			curEDuration.Character.FORT += curEDuration.effect.FORT;
			curEDuration.Character.DEF += curEDuration.effect.DEF;
	
			curEDuration.Character.REGEN += curEDuration.effect.REGEN;
			curEDuration.Character.ATK += curEDuration.effect.ATK;
			curEDuration.Character.EVASION += curEDuration.effect.EVASION + (curEDuration.effect.DEF/2);		
		}

		if(curEDuration.turnsLeft==0){
			if(curEDuration.wearOff){
				//razvan 04.10
				curEDuration.Character.HP = curEDuration.Character.HP - curEDuration.effect.HP * (curEDuration.repeating ? curEDuration.turn : 1);
				curEDuration.Character.ENRG = curEDuration.Character.ENRG - curEDuration.effect.ENRG * (curEDuration.repeating ? curEDuration.turn : 1);
				curEDuration.Character.BRT = curEDuration.Character.BRT - curEDuration.effect.BRT * (curEDuration.repeating ? curEDuration.turn : 1);
				curEDuration.Character.ACC = curEDuration.Character.ACC - curEDuration.effect.ACC * (curEDuration.repeating ? curEDuration.turn : 1);
				curEDuration.Character.FORT = curEDuration.Character.FORT - curEDuration.effect.FORT * (curEDuration.repeating ? curEDuration.turn : 1);
				curEDuration.Character.DEF = curEDuration.Character.DEF - curEDuration.effect.DEF*(curEDuration.repeating ? curEDuration.turn : 1);
				
				curEDuration.Character.REGEN = curEDuration.Character.REGEN - curEDuration.effect.REGEN * (curEDuration.repeating ? curEDuration.turn : 1);
				curEDuration.Character.ATK = curEDuration.Character.ATK - curEDuration.effect.ATK * (curEDuration.repeating ? curEDuration.turn : 1);
				curEDuration.Character.EVASION = curEDuration.Character.EVASION - curEDuration.effect.EVASION*(curEDuration.repeating ? curEDuration.turn : 1) - ((curEDuration.effect.DEF*(curEDuration.repeating ? curEDuration.turn : 1))/2);
			}
			eDurationQueue.RemoveAt(i);
		}
		curEDuration.turn++;
		curEDuration.turnsLeft = curEDuration.turnsLeft>0 ? curEDuration.turnsLeft-1 : 0;
	}
}


function addQueue(who : String, inAction : int, goWHERE : boolean, inFlip : boolean, inLengthP : float, 															inHit : Hit, inText : String, inAnimation : String){
	
	action = new ActionPvP();
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
		action.hit.HP = enemyPCScript.hit_get(inHit);
	}
	Queue.Add(action);
}

function addAction(who : String, inAction : int){
	addQueue(who, inAction, false, false, 0, Hit(0), "", "");
}

function addAction(who : String, inAction : int, goWHERE : String){
	addQueue(who, inAction, goWHERE == "home" ? goHOME : goATTACK, false, 0, Hit(0), "", "");
}

function addAction(who : String, inAction : int, inFlip : boolean){
	addQueue(who, inAction, false, inFlip, 0, Hit(0), "", "");
}

function addAction(who : String, inAction : int, inLengthP : float){
	addQueue(who, inAction, false, false, inLengthP, Hit(0), "", "");
}

function addAction(who : String, inAction : int, goWHERE : boolean, inFlip : boolean){
	addQueue(who, inAction, goWHERE, inFlip, 0, Hit(0), "", "");
}

function addAction(who : String, inAction : int, inLengthP : float, inHit : Hit){
	addQueue(who, inAction, false, false, inLengthP, inHit, "", "");
}

function addAction(who : String, inAnimation : String, inLengthP : float, inFlip : boolean){
	Debug.Log( "inanimation: " + inAnimation );
	addQueue(who, PLAY, false, inFlip, inLengthP, Hit(0), "", inAnimation);
}

function addText(who : String, inText : String){
	addQueue(who, SAY, false, false, 0, Hit(0), inText, "");
}


function addText(inText : String){
	addQueue("cPC", SAY, false, false, 0, Hit(0), inText, "");
}

function printText(rect : Rect, theText : String){
	tFade = 1;
	tY = 0;
	tText = theText;
	tRect = rect;
}

function endFight2(){
	yield StartCoroutine( Global.getUserData() );
	bLooting = true;
	bLootAlert = false;
	
	//find out if we have looted a souldfragment withing 24 hours;	
	var login_url = Global.server + "/mmo_iphone/soulfragment.php?User=" + Global.myChar.Nick;
	var download = new WWW( login_url );
    yield download;
   	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
    	Debug.Log( "Retrying" );
   		download = new WWW( login_url );
	    yield download;
	}
    
	if(download.error) {
		print( "Error downloading: " + download.error );
		wwwData = "Error! Could not connect.";
		return;
	}else{		
		wwwData = download.text;
		print(wwwData);
	}
	
	if(wwwData.IndexOf("success", 0) > 0) 
	{	
		//soul loot depending on the level of the enemy character
		if(eChar.LVL<10){
			idLootItem = 232;
			texLootIcon = Resources.Load("Menus/Inventory/Icons/232");
			sLootName = "Soul fragment I";
		}	
		
		if((eChar.LVL>=10)&&(eChar.LVL<20)){
			idLootItem = 233;
			texLootIcon = Resources.Load("Menus/Inventory/Icons/233");
			sLootName = "Soul fragment II";
		}	
		
		if((eChar.LVL>=20)&&(eChar.LVL<30)){
			idLootItem = 234;
			texLootIcon = Resources.Load("Menus/Inventory/Icons/234");
			sLootName = "Soul fragment III";
		}	
		
		if((eChar.LVL>=30)&&(eChar.LVL<40)){
			idLootItem = 235;
			texLootIcon = Resources.Load("Menus/Inventory/Icons/235");
			sLootName = "Soul fragment IV";
		}	
		
		if((eChar.LVL>=40)&&(eChar.LVL<50)){
			idLootItem = 236;
			texLootIcon = Resources.Load("Menus/Inventory/Icons/236");
			sLootName = "Soul fragment V";
		}
		
		if(eChar.LVL>=50){
			idLootItem = 237;
			texLootIcon = Resources.Load("Menus/Inventory/Icons/237");
			sLootName = "Soul fragment VI";
		}
		
		CheckMissions(sLootName);
	}
	else
		idLootItem = -1;
		
	//end of level dependance looting
		nLootGold = 0;
		Global.myChar.Money += nLootGold;
		nLootXP = 0;
		
		if( idLootItem != -1 )
		if( !scriptInventory.LootItem( idLootItem ) )
		{
			bLootAlert = true;
			bLooting = false;
		}
	Global.save_stats();
}
var	theStyle ;
function printText(position : int, theText : String){
	switch(position){
		case POS_MID:
		var	theStyle = guiStyle3;
			printText(Rect(190, 100, 100, 100), theText);
			break;
		case POS_PC:
			theStyle = guiStyle2;
			printText(Rect(80, 100, 80, 100), theText);
			break;
		case POS_MOB1:
			theStyle = guiStyle2;
			printText(Rect(400, 100, 80, 100), theText);
			break;
	}
	switch(theText){
		case "Victory!":
			//wait to finish the aninamtion
			//then go to loot screen and continue from there
			yield WaitForSeconds(4);
			endFight2();
			break;
		case "Defeat":
			//wait to finish the animation
			//go to end of fight
			yield WaitForSeconds(3);
			endFight();
			break;
	}
}

function printText(theText : String){
	printText(Rect(200, 100, 80, 100), theText);
}

function mobsRevenge(){
	var spattack : String;
	var result : int;
	var plusdmg : int;
	var flip : boolean = false;
	var target : int = 0;
	needToRegen = false;
	//choose a special attack
	if((Global.mobSpecialCoolDown == 0)&&(enemyPCScript.SpecialAttacks.length>0)){
		
		result = Random.Range(0,enemyPCScript.SpecialAttacks.length);
		if(enemyPCScript.SpecialAttacks[result].energcost <= eChar.ENRG){
			spattack = enemyPCScript.SpecialAttacks[result].attackanimation;
			switch(enemyPCScript.SpecialAttacks[result].attackname){
				case "Brace":
				plusdmg = Random.Range(enemyPCScript.SpecialAttacks[result].min_damage,enemyPCScript.SpecialAttacks[result].max_damage);
				addText("cMob", "+" + plusdmg +" Defense");
				addAction("cMob",spattack,70, false);
				addAction("cMob", IDLE);
				addEDuration(EDuration(eChar, Hit(0, 0, 0, 0, 0, plusdmg, 0, 0, 0), 3));
				eChar.ENRG = eChar.ENRG - enemyPCScript.SpecialAttacks[result].energcost;
				Global.mobSpecialCoolDown = 4;
				plusdmg = 0;
				break;
				case "Concentrate":
				plusdmg = Random.Range(enemyPCScript.SpecialAttacks[result].min_damage,enemyPCScript.SpecialAttacks[result].max_damage);
				addText("cMob", "+" + plusdmg + " Attack");
				addAction("cMob",spattack,70, false);
				addAction("cMob", IDLE);
				addEDuration(EDuration(eChar, Hit(0, 0, 0, 0, 0, 0, 0, plusdmg, 0), 1));
				eChar.ENRG  = eChar.ENRG - enemyPCScript.SpecialAttacks[result].energcost;
				Global.mobSpecialCoolDown = 4;
				plusdmg = 0;
				break;
				case "Recover":
				plusdmg = Random.Range(enemyPCScript.SpecialAttacks[result].min_damage,enemyPCScript.SpecialAttacks[result].max_damage);
				addText("cMob", "+" + plusdmg +" Energy");
				addAction("cMob",spattack,70, false);
				addAction("cMob", IDLE);
				eChar.ENRG  = eChar.ENRG - enemyPCScript.SpecialAttacks[result].energcost;
				eChar.ENRG = enemyPCScript.ENRG - eChar.ENRG > plusdmg? eChar.ENRG + plusdmg : enemyPCScript.ENRG;				
				Global.mobSpecialCoolDown = 4;
				plusdmg = 0;
				break;
				default:
				plusdmg = Random.Range(enemyPCScript.SpecialAttacks[result].min_damage,enemyPCScript.SpecialAttacks[result].max_damage);
				break;
			}
			target = enemyPCScript.SpecialAttacks[result].target;
		//plusdmg = Random.Range(enemyPCScript.SpecialAttacks[result].min_damage,enemyPCScript.SpecialAttacks[result].max_damage);
		}
		else{
			needToRegen = true;
		}
	}
	else{
		plusdmg = 0;
	}
	// Revenge of the Mob
	if(target == 0){
		if(eChar.HP  - tempHit.HP > 0){
			if(!enemyIsRanged){
				addAction("cMob", WALK, "attack");
			}
			//TODO: Radu: this caused a crash.. and it should have.. must be fixed in the future
//			if((Global.mobSpecialCoolDown == 0)&&(!needToRegen)){
//				addAction("cMob",spattack,70, false);
//				eChar.ENRG = eChar.ENRG - enemyPCScript.SpecialAttacks[result].energcost;
//				Global.mobSpecialCoolDown = 4; 
//			}
//			else{
				addAction("cMob", HIT1, 10);
//			}
			tempHit = Hit(enemyPCScript.hit_do(cPC));
			if(tempHit.HP == 0){
				addAction("cPC", DODGE, 70, tempHit );
			}
			else{
				tempHit.HP += plusdmg;
				addAction("cPC", GET_HIT, 70, tempHit );
			}
			if(!enemyIsRanged){
				addAction("cMob", WALK, goHOME, true);
				flip = true;
			}
			addAction("cMob", IDLE, flip);
			if(cPC.HP - tempHit.HP  > 0) 
				addAction("cPC", IDLE); 
			else
			{
				addAction("cPC", DIE, 10);
				addText("Defeat");
				addAction("cMob", WIN);
			}
		}
	}
}

function finalize_durations() {
	scriptInventory.in_pvp = false;
	scriptInventory.in_battle = false;

	Global.myChar.HP = healthBack;
	Global.myChar.ENRG = enerBack;

	Global.myChar.BRT -= finHit.BRT;
	Global.myChar.ACC -= finHit.ACC;
	Global.myChar.FORT -= finHit.FORT;
	Global.myChar.DEF -= finHit.DEF;

	Global.myChar.REGEN -= finHit.REGEN;
	Global.myChar.ATK -= finHit.ATK;
	Global.myChar.EVASION -= finHit.EVASION;
	
	Global.save_stats();
}

function endFight(){
	//reset stats first
	//finalize_durations();

	yield StartCoroutine( Global.getUserData() );
	Application.LoadLevel("sceneMap");
}

class EDuration{
	var Character	: EnemyChar;			// the character which will receive the effect
	var effect		: Hit;			// what effects will the character get on the duration
	var turnsLeft	: int;			// turns left for the effect
	var repeating	: boolean;		// will the effect repeat each turn?
	var wearOff		: boolean;		// will the effect wear off after the duration?
	var turn		: int;			// turn nr. the duration is in effect
	
	function EDuration(){
		turn = 0;
	}
	function EDuration(inChar : EnemyChar, inEffect : Hit, inTurns : int){
		turn = 0;
		effect = inEffect;
		turnsLeft = inTurns;
		Character = inChar;
		repeating = false;
		wearOff = true;
	}
	function EDuration(inChar : EnemyChar, inEffect : Hit, inTurns : int, inRepeating : boolean, inWearOff : boolean){
		turn = 0;
		effect = inEffect;
		turnsLeft = inTurns;
		Character = inChar;
		repeating = inRepeating;
		wearOff = inWearOff;
	}
}

function DoLootAlert (windowID : int) {
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	GUI.Label(Rect(20,30,190,40),"Not enough free slots.\nPlease remove some items.");
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", scriptInventory.styleButSmll))
		bLootAlert = false;
		bReLoot = true;
}

class ActionPvP{
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
	
	function ActionPvP(){
		fin = false;
		started = false;
	}
}

class EnemyChar{

	var BRT		: int;				// brutatlity
	var ACC		: int;				// accuracy
	var FORT	: int;				// fortidude
	var ATK		: float;			// attack
	var DEF		: int;				// defense
	var HP		: int;				// life of the character
	var ENRG	: int;				// mana/energy of the character
	
	var REGEN	: float;			// extra regen
	var DMG		: float;			// extra damage
	var CTH		: float;			// chance to hit the mob
	var EVASION	: float;			// extra evasion
	var LVL		: int;				// level

	var pos1	: Vector3;			// first position to go to, this is the character's home
	var pos2	: Vector3;			// second position to go to, this is where the character will attack
	var role	: int;				// role of the character, can be: NONE, PC, MOB1, MOB2, MOB3
}


function CheckMissions(sf:String) //FIND / SoulFragment
{
  for (var i:int =0;i< Global.missionsArray.length;i++)
  {
  	  var t : Mission;
  	  t = Global.missionsArray[i];
      if (t.toDo.ToUpper() =="FIND" && t.done<t.quant) 
      {
       if(sf.ToUpper()==t.what.ToUpper()) { //&&!mission.toDo.ToUpper().Contains("MOVE")
       t.UpdateMission(1);
       var url = Global.server + "/mmo_iphone/update_player_mission.php?mission_id="+t.missionId.ToString()+"&player_id="+Global.myChar.id+"&procent=" + t.done.ToString();
       var post = new WWW(url);
       yield post; 
       	while( post.error && post.error.ToString().Contains("Resolving host timed out") )
		{
    		Debug.Log( "Retrying" );
    		post = new WWW(url);
	        yield post; 
		}
       
      }
      
    }  
    }
}