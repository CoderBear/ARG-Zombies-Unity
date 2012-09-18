class Character{
	var name		:String;
	var ID			:int;
	var pozID		:int;
	
	var gameObj		:GameObject;
	var sChar		: String;
	var sCurAnim	: String;
	
	var LVL			:int;	
	var EXP			:int;
	var HLT			:int;
	var BHLT		:int;
	var ENG			:int;
	var BENG		:int;
	var RGN			:int;
	
	var ATT			:int;
	var AGI			:int;
	var DEF			:int;
	var EVA			:int;
	
	var weapon		:Equip;
	var head		:Equip;
	var chest		:Equip;
	var legs		:Equip;
	var feet		:Equip;
	
	var gold		:int;
	var inventory	:Array;
	
	var skills		:Array;
	var conditions	:Array;
	
	//flags animations
	var isOnTarget	: boolean;
	var dir			: String;
	var homeDir		: String;
	var xHome		: float;
	var yHome		: float;
	var xTarget		: float;
	var yTarget		: float;
	var xStep		: float;
	var yStep		: float;
	var runSteps	: int;
	
	function Character(){
		runSteps = 20;
		isOnTarget = true;
		
		weapon = null;
		head = null;
		chest = null;
		legs = null;
		feet = null;
		
		gold = 0;
		inventory = new Array();
		skills = new Array();
		conditions = new Array();
	}
	function initCharacter(name1:String){
		scriptMain.CSVData.getLineByID(1,scriptMain.CSVData.PCProgression);
		var stats: Array = scriptMain.CSVData.lineByID;
		var str:String;
		
		name = name1;
		ID = 0;
		pozID = 0;
		LVL = 1;
		EXP = 1;
		
		str = stats[2];
		BHLT = parseInt(str);
		HLT = BHLT;
		
		str = stats[3];
		BENG = parseInt(str);
		ENG = BENG;
		
		str = stats[4];
		RGN = parseInt(str);
		
		str = stats[5];
		ATT = parseInt(str);
		
		str = stats[6];
		DEF = parseInt(str);
		
		str = stats[7];
		AGI = parseInt(str);
		
		str = stats[8];
		EVA = parseInt(str);
		
		//---- animations
		homeDir = "right";
		xHome = -3.1;
		yHome = -1;
		sChar = "Animations/Character1/";
		sCurAnim = sChar;
		gameObj = GameObject.Instantiate(Resources.Load("Animations/Character1/Basic/idle"));
		//gameObj.animation["hit01"].speed = 0.7;
		gameObj.transform.position = Vector3(xHome,yHome,-7);
		gameObj.transform.localPosition = Vector3(xHome-0.5,yHome,-7);
		gameObj.transform.localScale = Vector3(3,3,3);
		gameObj.animation.wrapMode = WrapMode.Loop;
		//gameObj.animation.Stop();
	}
	function initMonster(newID: int, newPozID: int){
		scriptMain.CSVData.getLineByID(newID,scriptMain.CSVData.NPCs);
		var stats: Array = scriptMain.CSVData.lineByID;
		var str:String;
		
		//------stats
		ID = newID;
		pozID = newPozID;
		
		str = stats[1];
		name = str;
		
		str = stats[2];
		LVL = parseInt(str);
		
		str = stats[3];
		EXP = parseInt(str);
		
		str = stats[4];
		BHLT = parseInt(str);
		HLT = BHLT;
		
		str = stats[5];
		BENG = parseInt(str);
		ENG = BENG;
		
		str = stats[6];
		RGN = parseInt(str);
		
		str = stats[7];
		ATT = parseInt(str);
		
		str = stats[8];
		DEF = parseInt(str);
		
		str = stats[9];
		AGI = parseInt(str);
		
		str = stats[10];
		EVA = parseInt(str);
		
		//-----echipament
		var newAID: int;
		//weapon
		var newWID: int;
		str = stats[11];
		if (str!="none"){
			newWID= parseInt(str);
			weapon = new Equip();
			weapon.loadEquipWithID(newWID);
		}
		//head
		str = stats[12];
		if (str!="none"){
			newAID = parseInt(str);
			head = new Equip();
			head.loadEquipWithID(newWID);
		}
		//chest
		str = stats[13];
		if (str!="none"){
			newAID = parseInt(str);
			chest = new Equip();
			chest.loadEquipWithID(newWID);
		}
		//legs
		str = stats[14];
		if (str!="none"){
			newAID = parseInt(str);
			legs = new Equip();
			legs.loadEquipWithID(newWID);
		}
		str = stats[15];
		if (str!="none"){
			newAID = parseInt(str);
			feet = new Equip();
			feet.loadEquipWithID(newWID);
		}
		//-------skills
		skills = new Array();
		
		//--------animations
		homeDir = "left";
		xHome = 2.5;
		yHome = -1.15;
		
		sChar = "Animations/Zombie/";
		sCurAnim = sChar;
		gameObj = GameObject.Instantiate(Resources.Load("Animations/Zombie/Basic/idle"));
		//gameObj.animation["hit01"].speed = 0.7;
		gameObj.transform.position = Vector3(xHome,yHome,-7);
		gameObj.transform.localPosition = Vector3(xHome, yHome, -7);
		gameObj.transform.localScale = Vector3(0.7, 0.7, -0.7);
		gameObj.animation.wrapMode = WrapMode.Loop;
		//gameObj.animation.Stop();
	}
	function printStats(){
		print(name+" "+LVL+" "+EXP+" "+HLT+" "+ENG+" "+RGN+" "+ATT+" "+DEF+" "+AGI+" "+EVA);
	}
	function totalAGI():int{
		var t:float = AGI;
		var tw:float = 0;
		var th:float = 0;
		var tc:float = 0;
		var tl:float = 0;
		var tf:float = 0;
		
		if (weapon != null) tw = weapon.multAGI;
		if (head != null) th = head.multAGI;
		if (chest != null) tc = chest.multAGI;
		if (legs != null) tl = legs.multAGI;
		if (feet != null) tf = feet.multAGI;
		
		var ret: float = t+tw+th+tc+tl+tf;
		return Mathf.RoundToInt(ret);
	}
	function totalATT():int{
		var t:float = ATT;
		if (weapon != null){
			Random.seed = Time.time;
			t += Random.Range(weapon.val,weapon.valMAX);
		}
		var tw:float = 0;
		var th:float = 0;
		var tc:float = 0;
		var tl:float = 0;
		var tf:float = 0;
		
		if (weapon != null) tw = weapon.multATT;
		if (head != null) th = head.multATT;
		if (chest != null) tc = chest.multATT;
		if (legs != null) tl = legs.multATT;
		if (feet != null) tf = feet.multATT;
		
		var ret: float = t+tw+th+tc+tl+tf;
		return Mathf.RoundToInt(ret);
	}
	function totalDEF():int{
		var t:float = DEF;
		var tw:float = 0;
		var th:float = 0;
		var tc:float = 0;
		var tl:float = 0;
		var tf:float = 0;
		
		if (weapon != null) tw = weapon.multDEF;
		if (head != null) th = head.multDEF;
		if (chest != null) tc = chest.multDEF;
		if (legs != null) tl = legs.multDEF;
		if (feet != null) tf = feet.multDEF;
		
		var ret: float = t+tw+th+tc+tl+tf;
		return Mathf.RoundToInt(ret);
	}
	function totalEVA():int{
		var t:float = EVA;
		var tw:float = 0;
		var th:float = 0;
		var tc:float = 0;
		var tl:float = 0;
		var tf:float = 0;
		
		if (weapon != null) tw = weapon.multEVA;
		if (head != null) th = head.multEVA;
		if (chest != null) tc = chest.multEVA;
		if (legs != null) tl = legs.multEVA;
		if (feet != null) tf = feet.multEVA;
		
		var ret: float = t+tw+th+tc+tl+tf;
		return Mathf.RoundToInt(ret);
	}
	function computeTurn(): int{
		var t1:float = totalAGI();
		
		return Mathf.RoundToInt(64-t1);
	}
	function hitChance(player2:Character): boolean {
		var hit: float = 80 + ((totalAGI() - player2.totalEVA()));
		
		print("- hitChance: "+hit);
		
		Random.seed = Time.time;
		var hitRand: float = Random.Range(0,100);
		
		print("- hit: "+hitRand);
		
		if (hitRand>hit) return false;
		else return true;
	}
	function endTurn(){
		//check conditions
		
	}
	function removeAllConditions(){
		
	}
	//-----anim functions
	
	function animate(animation : String){
		sCurAnim = animation;
		var sAnim : String = sChar + animation;
		var vPos : Vector3 = gameObj.transform.position;
		var vLocalPos : Vector3 = gameObj.transform.localPosition;
		var vLocalScale : Vector3 = gameObj.transform.localScale;
		
		GameObject.Destroy(gameObj);
		gameObj = GameObject.Instantiate(Resources.Load(sAnim));
		gameObj.animation.Play();
		gameObj.transform.Translate(vPos, Space.World);
		gameObj.transform.localPosition = vLocalPos;
		gameObj.transform.localScale = vLocalScale;
	}
	
	function goNearCharacter(target: Character){
		isOnTarget = false;
		Log.add("isOnTarget = false");
		print("goNear, gameObj - " + gameObj.transform.position.x);
		print("goNear, target - " + target.gameObj.transform.position.x);
		if (gameObj.transform.position.x<target.gameObj.transform.position.x){
			dir = "right";
			xTarget = target.gameObj.transform.position.x - 2.7;
		}else{
			dir = "left";
			xTarget = target.gameObj.transform.position.x + 2.7;
		}
		var difX: float = target.gameObj.transform.position.x - gameObj.transform.position.x;
		var difY: float = target.gameObj.transform.position.y - gameObj.transform.position.y;
		xStep = difX/runSteps;
		yStep = difY/runSteps;
		
		yTarget = target.gameObj.transform.position.y;
		
		animate("Basic/walk");
		//gameObj.animation.Play("run");
	}
	function goHome(){
		isOnTarget = false;
		if (gameObj.transform.position.x<xHome){
			dir = "right";
		}else{
			dir = "left";
		}
		print("goHome, gameObj - " + gameObj.transform.position.x);
		print("goHome, home - " + xHome);
		var difX: float = xHome - gameObj.transform.position.x;
		var difY: float = yHome - gameObj.transform.position.y;
		xStep = difX/runSteps;
		yStep = difY/runSteps;
		
		xTarget = xHome;
		yTarget = yHome;
		
		gameObj.transform.localScale.z = -gameObj.transform.localScale.z;
		//gameObj.animation.Play("run");
		animate("Basic/walk");
		gameObj.animation.wrapMode = WrapMode.Loop;
	}
	function render(){
		if(!isOnTarget){
			gameObj.transform.position.x += xStep*Time.deltaTime*20;
			gameObj.transform.position.y += yStep*Time.deltaTime*20;

			print("moving, gameObjX - " + gameObj.transform.position.x);
			print("moving, gameObjY - " + gameObj.transform.position.y);
			
			if (xTarget == xHome){
				if ((gameObj.transform.localPosition.x > xTarget-0.2)&&(gameObj.transform.localPosition.x < xTarget+0.2)){
					isOnTarget = true;
					Log.add("isOnTarget = true. We're HOME.");
					if (dir == "left") gameObj.transform.localPosition = Vector3(xHome-0.5,yHome,-7);
					else gameObj.transform.localPosition = Vector3(xHome+0.5,yHome,-7);
					gameObj.transform.localScale.z = -gameObj.transform.localScale.z;
				}
			} else {
				if ((gameObj.transform.position.x > xTarget-0.2)&&(gameObj.transform.position.x < xTarget+0.2))
					isOnTarget = true;
					Log.add("isOnTarget = true. We're there.");
			}
		}
	}
};