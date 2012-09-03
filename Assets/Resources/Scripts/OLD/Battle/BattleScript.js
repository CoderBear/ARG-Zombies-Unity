//var battle:Battle = new Battle();
//battle.initBattle();

static var zH: int = 0;
static var zT: int = 0;

//class Battle{
//-----------FLAGS--------------------
var FLAG_UPDATE_SCENE_VIEW	: String = "0";
var FLAG_REORDER_QUEUE		: String = "1";
var FLAG_COMPUTE_TURN		: String = "2";
var FLAG_CLOSE_BATTLE		: String = "3";
var FLAG_END_TURN			: String = "4";
var FLAG_SHOW_MENU			: String = "5";
var FLAG_SHOW_START_BUTTONS	: String = "6";
var FLAG_SHOW_VICTORY		: String = "7";
var FLAG_SHOW_DEFEATED		: String = "8";
var FLAG_SHOW_END_MENU		: String = "9";
var FLAG_PLAY_SOUND			: String = "10";
//-----------MEDIA_QUEUE_ELEM_TYPES---------
var TYPE_ANIMATION: 	int = 0;
var TYPE_SOUND:			int = 1;
var TYPE_FLAG: 			int = 2;
//----------TEXTURI-----------------
var texWin: Texture2D;
var texLose: Texture2D;
	
	var turnQueue:		BattleQueue;
	var mediaQueue:		Array;
	var animations:		BattleAnimations;
	var PC:				Character;
	var NPCs:			Array;
	
	var showStart:		boolean;
	var showMenu:		boolean;
	var showVictory:	boolean;
	var showDefeated:	boolean;
	var showAttack:		boolean;
	var showSpecial:	boolean;
	var showInventory:	boolean;
	
	var curSpecial:		SpecialAttack;
	
	function Battle(){
	}
	function Start(){
		//-------------
		mediaQueue = new Array();
		showMenu = false;
		showStart = true;
		showVictory = false;
		showDefeated = false;
		showAttack = false;
		showSpecial = false;
		showInventory = false;
		
		//----------------------------init characters
		PC = new Character();
		PC.initCharacter("PC1");
		//PC.printStats();
		//print(PC.computeTurn());
		var enemy: Character = new Character();
		enemy.initMonster(1,1);
		NPCs = new Array();
		NPCs[0] = enemy;
		
		turnQueue.setCharacters(PC,NPCs);
		initStatsBars();
		//--------------------------
	}
	function initStatsBars(){
		animations.bar1l1 = PC.HLT*220/PC.BHLT;
		animations.bar1l2 = PC.ENG*220/PC.BENG;
		var enemy: Character = NPCs[0];
		animations.bar2l1 = enemy.HLT*220/enemy.BHLT;
		animations.bar2l2 = enemy.ENG*220/enemy.BENG;
	}
	//------------- render functions ----------
	function Update(){
		if (mediaQueue!=null){
			if (mediaQueue.length != 0){
				var elem: BattleMediaQueueElem = mediaQueue[0];
				if (elem.running) elem.render();
				else if (elem.started){
					 mediaQueue.RemoveAt(0);
				} else {
					elem.startPlaying();
					for (var i: int = 0;i<elem.queue.length;i++){
						var aux: BattleMediaElem = elem.queue[i];
						
						var tip: int = aux.actionType;
						var action: String = aux.action;
						switch (tip){
							case TYPE_ANIMATION:
								animations.action(aux.ATT,aux.TAR,action,aux.result);
								break;
							case TYPE_SOUND:
								break;
							case TYPE_FLAG:
								if (action == FLAG_REORDER_QUEUE)
									turnQueue.reOrderQueue();
								else if (action == FLAG_COMPUTE_TURN)
									computeTurn();
								else if (action == FLAG_CLOSE_BATTLE);
								else if (action == FLAG_END_TURN)
									endTurn();
								else if (action == FLAG_SHOW_MENU)
									showMenu = true;
								else if (action == FLAG_SHOW_START_BUTTONS)
									showStart = true;
								else if (action == FLAG_SHOW_VICTORY)
									showVictory = true;
								else if (action == FLAG_SHOW_DEFEATED)
									showDefeated = true;
								else if (action == FLAG_SHOW_END_MENU);
								break;
						}
					}
				}
			}
		}
		//------------------
		animations.render();
		//------------------
		if (showSpecial){
			if(curSpecial.isRunning) curSpecial.render();
		}
	}
	function OnGUI () {
		//GUI.Button(Rect(0,0,480,320),"");
		///-----stats bars
		var b1l: int;
		var b1l1: int;
		var enemy: Character;
		var b2l: int;
		var b2l1: int;

		if(PC != null){
			if(PC.BHLT != 0)
				b1l = PC.HLT*220/PC.BHLT;
			if(PC.BENG != 0)
				b1l1 = PC.ENG*220/PC.BENG;
		}

		if(NPCs != null)
			enemy = NPCs[0];

		if(enemy != null){
			if(enemy.BHLT != 0)
				b2l = enemy.HLT*220/enemy.BHLT;
			if(enemy.BENG != 0)
				b2l1 = enemy.ENG*220/enemy.BENG;
		}
			
		animations.setNewBars(b1l,b1l1,b2l,b2l1);
		//-------------------
		animations.OnGUI();
		//-------------------
		if (showStart){
			if(GUI.Button(Rect(165,160,150,30),"Start Battle")){
				showStart = false;
				computeTurn();
			}
		}
		if (showMenu){
			if (!showAttack){
				if(GUI.Button(Rect(30,270,80,30),"ATTACK")){
					showAttack = true;
				}
			}
			if(GUI.Button(Rect(140,270,80,30),"SPECIAL")){
				showAttack = false;
				showMenu = false;
				showSpecial = true;
				curSpecial = new SpecialAttack();
				curSpecial.loadSpecialByID(1);
				curSpecial.start();
			}
			if(GUI.Button(Rect(250,270,80,30),"INVENTORY")){
				showAttack = false;
			}
			if(GUI.Button(Rect(360,270,80,30),"RUN")){
				showAttack = false;
				Application.LoadLevel(0);
			}
		}
		if (showAttack){
			if(GUI.Button(Rect(20,270,100,30),"RECOVER")){
				
			}
			if(GUI.Button(Rect(20,240,100,30),"CONCENTRATE")){
				
			}
			if(GUI.Button(Rect(20,210,100,30),"BRACE")){
				
			}
			if(GUI.Button(Rect(20,180,100,30),"HIT")){
				if (NPCs.length == 1){
					attack(PC,NPCs[0],"Basic/hit_1");
					showMenu = false;
					showAttack = false;
				}
			}
		}
		if (showSpecial){
			if(curSpecial.isRunning){
				curSpecial.OnGUI();
				//GUI.Button(Rect(0,0,480,320),"");
				if(GUI.Button(Rect(400,290,80,30),"CANCEL")){
					showMenu = true;
					showSpecial = false;
				}
			} else {
				showMenu = true;
				showSpecial = false;
			}
		}
		if (showVictory){
			GUI.DrawTexture(Rect(40, 30, 143.8, 40),texWin, ScaleMode.StretchToFill, true, 1);
		}
		if (showDefeated){
			GUI.DrawTexture(Rect(45, 30, 125.7, 40),texLose, ScaleMode.StretchToFill, true, 1);
		}
		//--------------------
		GUI.Label (Rect (0, 0, 100, 20), BattleScript.zH+"/"+BattleScript.zT);
		Log.OnGUI();
	}
	//-------------battle funtions-------------
	function computeTurn(){
		var ok1: boolean = true;
		for (var i: int = 0;i < NPCs.length;i++){
			var e: Character = NPCs[i];
			if (e.HLT != 0) ok1 = false;
		}
		var ok2: boolean = true;
		if (PC.HLT != 0) ok2 = false;
		
		if (ok1 == true){
			playerWon();
		} else if (ok2 == true){
			playerLose();
		} else {
			continueBattle();
		}
	}
	function endTurn(){
		var elem:BattleQueueElem = turnQueue.queue[0];
		elem.character.endTurn();
		if (PC.HLT == 0) PC.removeAllConditions();
		for (var i:int = 0;i<NPCs.length;i++){
			var e:Character = NPCs[i];
			if (e.HLT == 0) e.removeAllConditions();
		}
	}
	function continueBattle(){
		var e: BattleQueueElem = turnQueue.queue[0];
		var c: Character = e.character;
		while (c.HLT == 0){
			turnQueue.reOrderQueue();
		}
		selectActionForCharacter(c);
	}
	function playerWon(){
		var elem: BattleMediaQueueElem = new BattleMediaQueueElem();
		elem.init();
		elem.addAction(TYPE_FLAG,FLAG_SHOW_VICTORY);
		mediaQueue.Push(elem);
	}
	function playerLose(){
		var elem: BattleMediaQueueElem = new BattleMediaQueueElem();
		elem.init();
		elem.addAction(TYPE_FLAG,FLAG_SHOW_DEFEATED);
		mediaQueue.Push(elem);
	}
	//-----------atack functions------------
	function selectActionForCharacter(player1: Character){
		if (player1 == null) return;
		if (player1 == PC){
			//action for player character
			showMenu = true;
		} else {
			//action for mob
			var minCost: int = 10000;
			for (var i:int = 0;i<player1.skills.length;i++){
				var s:Skill = player1.skills[i];
				if (s.cost<minCost) minCost = s.cost;
			}
			var wAttack: int = 100;
			var wSkill: int = 50;
			if ((player1.skills.length == 0)||(player1.ENG < minCost)) wSkill = 0;
			
			Random.seed = Time.time;
			var action: int = Random.Range(0,wAttack+wSkill);
			if (action<wAttack) attack(player1, PC,"Basic/hit_1");
			else; //skill....
		}
	}
	function attack(player1: Character, player2: Character, anim: String){
		if (player1==PC) print("--------- PC");
		else print("--------- mob"+player1.pozID);
		
		var ok : boolean = player1.hitChance(player2);
		animations.DMG = 0;
		var result: String = "Basic/get_hit";//take damage animation
		if (ok){
			//hit
			var hit = player1.totalATT() - player2.totalDEF();
			if (hit<=0){
				hit = 0;
				result = "Basic/dodge";//no damage animation
			}
			print("- DMG: "+ hit); 
			player2.HLT = player2.HLT-hit;
			if (player2.HLT < 0){
				player2.HLT = 0;
				result = "Basic/death";//die animation
			}
			animations.DMG = -hit;
		}else{
			//miss
			print("- miss");
			result = "Basic/dodge";//miss attack animation
		}
		//play animation
		var elem3: BattleMediaQueueElem = new BattleMediaQueueElem();
		elem3.init();
		elem3.addAnimation(player1, player2, anim,result);
		mediaQueue.Push(elem3);
		//-----------
		var elem: BattleMediaQueueElem = new BattleMediaQueueElem();
		elem.init();
		elem.addAction(TYPE_FLAG,FLAG_END_TURN);
		mediaQueue.Push(elem);
		
		var elem1: BattleMediaQueueElem = new BattleMediaQueueElem();
		elem1.init();
		elem1.addAction(TYPE_FLAG,FLAG_REORDER_QUEUE);
		mediaQueue.Push(elem1);
		
		var elem2: BattleMediaQueueElem = new BattleMediaQueueElem();
		elem2.init();
		elem2.addAction(TYPE_FLAG,FLAG_COMPUTE_TURN);
		mediaQueue.Push(elem2);
	}
//}
