class Mob{

	var specialMob : int;
	var photosNames : String;

	var name	: String;			// name of the GameObject
	var path	: String;			// path of the Resources for this characater
					//is the mob special an has intro images?

	var id		: int;				// id of mob
	var mobname	: String;			// name of mob
	var mobModel: String;			// model of the mob
	var HP		: int;				// life of the character
	var ENRG	: int;				// mana/energy of the character
	var DEF		: int;				// extra armour
	
	var REGEN	: float;			// extra regen
	var ATK		: float;
	var ATKMIN	: int;			// extra damage
	var ATKMAX	: int;			// extra damage
	var EVASION	: float;			// extra evasion
	var LVL		: int;				// level
	var SpecialCD		: int;				// experience

   

	var gameObj	: GameObject;		// the GameObject
	/*var idle	: GameObject;		// idle animation
	var walk	: GameObject;		// walk animation
	var hit_1	: GameObject;		// hit_1 animation
	var hit_2	: GameObject;		// hit_2 animation
	var gethit	: GameObject;		// get_hit animation
	var dodge	: GameObject;		// dodge animation
	var death	: GameObject;		// death animation
	var win		: GameObject;		// victory animation
	var animations : Array;			// array of the special animations*/

	var renderers : Component[];	// used to hide the animation
	var posH		: Vector3;			// where the char is first displayed
	var pos1	: Vector3;			// first position to go to, this is the character's home
	var pos2	: Vector3;			// second position to go to, this is where the character will attack
	var role	: int;				// role of the character, can be: NONE, PC, MOB1, MOB2, MOB3
	

	function Mob(){
	}
	/*
	function init(name : String, inPath : String, pos : Vector3, scale : Vector3,
					inPos1 : Vector3, inPos2 : Vector3, inRole : int){
		walk = start(name + "_walk", inPath + "/Basic/walk", pos, scale);
		hit_1 = start(name + "_hit_1", inPath + "/Basic/hit_1", pos, scale);
		hit_2 = start(name + "_hit_2", inPath + "/Basic/hit_2", pos, scale);
		gethit = start(name + "_get_hit", inPath + "/Basic/get_hit", pos, scale);
		dodge = start(name + "_dodge", inPath + "/Basic/dodge", pos, scale);
		death = start(name + "_death", inPath + "/Basic/death", pos, scale);
		idle = start(name + "_idle", inPath + "/Basic/idle", pos, scale);
		print(inPath+"/Basic/idle");
		Log.add(inPath+"/Basic/idle");
		if(inRole == 1){
			win = start(name + "_win", inPath + "/Basic/win", pos, scale);
		}
		gameObj = idle; idle.active = true; show();
		
		pos1 = inPos1;
		pos2 = inPos2;
		role = inRole;
		animations = new Array();
		path = inPath;
		
		init_stats();
	}
	*/
	function init(name : String, inPath : String, pos : Vector3, scale : Vector3,
					inPos1 : Vector3, inPos2 : Vector3, inRole : int){

		gameObj = start(name, inPath, pos, scale);		
		gameObj.active = true; 
		show();
		posH = pos;
		pos1 = inPos1;
		pos2 = inPos2;
		role = inRole;
		//animations = new Array();
		path = inPath;
		
		init_stats();
	}

	
	function load(name : String, animation : String, position : Vector3, localScale : Vector3) : GameObject{
		// Loads an animation with positiom and scale
		var gObj : GameObject = GameObject.Instantiate(Resources.Load(animation));
		gObj.animation.Play();
		gObj.transform.position = position;
		gObj.transform.localScale = localScale;
		gObj.name = name;
		return gObj;
	}
	
	/*function findAnimation(name : String) : GameObject{
		var i : int;
		var spAnim : SpecialAnim;
		for(i = 0; i < animations.length; i++){
			spAnim = animations[i];
			if(spAnim.name == name) return spAnim.gObj;
		}
		return null;
	}*/
	
	function play(name : String, animation : String){
	/*	// Plays a "special" animation, loaded in real-time
		var gObj : GameObject = findAnimation(name);
		//var gObj : GameObject = GameObject.Find(name);
		if(gameObj!=gObj){
			Log.add("different");
			if(gObj == null){
				gObj = GameObject.Instantiate(Resources.Load(animation));
				var spAnim : SpecialAnim = new SpecialAnim();
				spAnim.name = name;
				spAnim.gObj = gObj;
				animations.Add(spAnim);
			}
			gObj.active = true;
			gObj.animation.Play();
			gObj.transform.position = gameObj.transform.position;
			gObj.transform.localScale = gameObj.transform.localScale;
			gObj.name = name;
			hide();
			renderers = gObj.GetComponentsInChildren(Renderer);
			for (var r : Renderer in renderers) {
				r.enabled = true;
			}
			gameObj = gObj;
		}*/
	}
	
	function hide(){
    	renderers = gameObj.GetComponentsInChildren(Renderer);
	    for (var r : Renderer in renderers) {
			r.enabled = false;
		}
		gameObj.active = false;
	}
	
	function hide(gObj : GameObject){
    	renderers = gObj.GetComponentsInChildren(Renderer);
	    for (var r : Renderer in renderers) {
			r.enabled = false;
		}
		gObj.active = false;
	}

	function show(gObj : GameObject){
		if(gameObj!=gObj){
			gObj.active = true;
			gObj.transform.position = gameObj.transform.position;
			gObj.transform.localScale = gameObj.transform.localScale;
			hide();
    		renderers = gObj.GetComponentsInChildren(Renderer);
		    for (var r : Renderer in renderers) {
				r.enabled = true;
			}
			gameObj = gObj;
		}
	}

	function show(){
		gameObj.active = true;
    	renderers = gameObj.GetComponentsInChildren(Renderer);
	    for (var r : Renderer in renderers) {
			r.enabled = true;
		}
	}
	
	function start(name : String, animation : String, pos : Vector3, scale : Vector3) : GameObject{
		var gObj : GameObject = load(name, animation, pos, scale);
		hide(gObj);
		gObj.active = false;
		return gObj;
	}

	function hit_get(inHit : Hit) : int{
		return inHit.HP > 0 ? inHit.HP : 0;
	}
	
	function hit_do(inChar : Char) : int{
       // if(Random.value >0.20 && Random.value<0.70){
      //  Debug.Log("MOB CRITICAL"+Mathf.Round(ATK *(1 - inChar.DEF/100.0)));
	//	return Random.Range(1,100) > inChar.EVASION ? 1.5* Mathf.Round(ATK *(1 - inChar.DEF/100.0)) : 0;
    //    }
       // else
         return Random.Range(1,100) > inChar.EVASION ? Mathf.Round(ATK *(1 - inChar.DEF/100.0)) : 0;
	}
	
	function calc_stats(){
	}
	
		
	function init_stats(){
		
		id		= Global.enemyChar.id;
		mobname	= Global.enemyChar.mobname;
		HP		= Global.enemyChar.HP;
		ENRG	= Global.enemyChar.ENRG;
		DEF		= Global.enemyChar.DEF;
	
		REGEN	= Global.enemyChar.REGEN;
		ATK		= Global.enemyChar.ATK;
		ATKMIN 	= Global.enemyChar.ATKMIN;
		ATKMAX 	= Global.enemyChar.ATKMAX;
		EVASION	= Global.enemyChar.EVASION;
		
		LVL 	= Global.enemyChar.LVL;
		SpecialCD = Global.enemyChar.SpecialCD;
		
	}
}

