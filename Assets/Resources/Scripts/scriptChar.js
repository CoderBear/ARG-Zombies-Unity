
class CharBody
{
	var BodyId   : int;
	var Sex      : String;
	var Size     : int;
	
	function Set( bodyid : int)
	{
		BodyId = bodyid;
		Size = bodyid / 4 + 1;
		if ( bodyid <= 16 )
			Sex = "male";
		else
			Sex = "female";
	}
};

class Char{
	var id		: int;				// id in the database
	var Nick	: String;			// Nickname
	var User	: String;			// Username
	var Difficulty : int;			// difficutly (easy, medium, hard, insane)
	
	var name	: String;			// name of the GameObject
	var path	: String;			// path of the Resources for this characater
	
	var gameObj	: GameObject;		// the GameObject
	//static var gameObj	: GameObject;		// the GameObject
	//static var GameObjCreat : boolean = false;
	var renderers : Component[];	// used to hide the animation
	var posH	: Vector3;			// where char is displayed;
	var pos1	: Vector3;			// first position to go to, this is the character's home
	var pos2	: Vector3;			// second position to go to, this is where the character will attack
	var role	: int;				// role of the character, can be: NONE, PC, MOB1, MOB2, MOB3
		
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
	var EXP		: int;				// experience
	
    var RRA     : float;
    
    
	var Money : int;				// the money char has
	
	var Hands	: int;				// item id, armour to be used on hands
	var Helmet	: int;				// item id, armour to be used on the helmet
	var Chest	: int;				// item id, armour to be used on the chest
	var Pants	: int;				// item id, armour to be used on pants
	var Shoes	: int;				// item id, armour to be used on shoes
	var Weapon	: int;				// item id, weapom wielded*/
	
	var WMinD 	: int;
	var WMaxD 	: int;
	var WepType : int;
	
	var AvatarId : String;			// id of avatar to use
	
	var home_lat : float;			// Homebase lattitude
	var home_lon : float;			// Homebase longitude
	
	var SpecialAttacks : SpecialAttacks[];			// special attacks
	var Body     : CharBody;
	var HpVechi     : int;
	var dataVeche : String;
	var dataNoua : String;
	
	function Start()
	{
	}
			
	function Char(){
		Body = new CharBody();
	}
	
	function init(name : String, inPath : String, pos : Vector3, scale : Vector3,
					inPos1 : Vector3, inPos2 : Vector3, inRole : int){
		        print("A rulat scriptChar si a incarcat resursele caracterului!");
		gameObj = start(name, inPath + "/Char", pos, scale);
		renderers = gameObj.GetComponentsInChildren(Renderer);
		gameObj.active = true;
		//var r : Renderer = renderers[2];
		/*
		r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+Global.myChar.AvatarId+"/head");
		r = renderers[0];
		r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+Global.myChar.AvatarId+"/head_1");
		r = renderers[3];
		r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+Global.myChar.AvatarId+"/head_2");
		*/
		//show();
				
		//MonoBehaviour.print(r.name);
				
		
		var sr : Renderer = renderers[5];
		
		// MonoBehaviour.print("SALAM: " + renderers[0]);
				
		for(var i : int = 0; i < sr.materials.Length; i ++){
		//	MonoBehaviour.print("----------->>> " + sr.materials[i].mainTexture.name);
		}
		
		//Global.myChar.Body = 1;
		//	Debug.Log("BODYYYYY: " + Global.myChar.Body + "AVATAR : " + Global.myChar.AvatarId);
		var path_to_body : String = inPath + "/Body/" + Global.myChar.Body.BodyId + "/";
		//var path_to_body : String = "Animations/Character1.5/Body/1/";
		var path_to_faces : String = inPath + "/NewFaces/" + Global.myChar.AvatarId + "/";
		
		sr.materials[0].mainTexture = Resources.Load(path_to_body + "chilot", typeof(Texture2D));// as Texture2D);
		sr.materials[1].mainTexture = Resources.Load(path_to_body + "corp", typeof(Texture2D));
		sr.materials[2].mainTexture = Resources.Load(path_to_faces + "cap1", typeof(Texture2D));
		sr.materials[3].mainTexture = Resources.Load(path_to_body + "pantalon_drept", typeof(Texture2D));
		sr.materials[4].mainTexture = Resources.Load(path_to_body + "pantalon_stang", typeof(Texture2D));
		sr.materials[5].mainTexture = Resources.Load(path_to_body + "picior_drept", typeof(Texture2D));
		sr.materials[6].mainTexture = Resources.Load(path_to_body + "picior_stang", typeof(Texture2D));
		sr.materials[7].mainTexture = Resources.Load(path_to_body + "mana_dreapta", typeof(Texture2D));
		sr.materials[8].mainTexture = Resources.Load(path_to_body + "mana_stanga", typeof(Texture2D));
        
        show();

		
		posH = pos;
		pos1 = inPos1;
		pos2 = inPos2;
		role = inRole;
		path = inPath;
		//init_stats();
        RRA = Random.Range(ATK - (ATK * 0.1) , ATK + (ATK * 0.1)) + Random.Range(WMinD, WMaxD+1);
       
       
	}
	
	function ChangeToAngryFace()
	{
		renderers = gameObj.GetComponentsInChildren(Renderer);
		
		var sr : Renderer = renderers[5];
		var path_to_faces : String = "Animations/Character1.5/NewFaces/" + Global.myChar.AvatarId + "/";
		sr.materials[2].mainTexture = Resources.Load(path_to_faces + "cap2", typeof(Texture2D));
	}
	
	function ChangeToNormalFace()
	{
		renderers = gameObj.GetComponentsInChildren(Renderer);
		
		var sr : Renderer = renderers[5];
		var path_to_faces : String = "Animations/Character1.5/NewFaces/" + Global.myChar.AvatarId + "/";
		sr.materials[2].mainTexture = Resources.Load(path_to_faces + "cap1", typeof(Texture2D));
	}
	
		
	function equipItem(item : Item){
	//	Debug.Log("Equiped item: ID="+item.id+"; Slot="+item.slot+"; Quantity="+item.quantity+"; weapon_type="+item.weapon_type+"; equipped="+item.equipped);
		switch(item.slot){
			case 1:
				Log.add("equip hands");
				//equipHands(item.id,gameObj);
				WepType = 1;
				equipWeapon(item.id,gameObj);
				Global.myChar.Weapon = item.id;
				WMinD = item.weapon_dmg_min;
				WMaxD = item.weapon_dmg_max;
				
				break;
			case 2:
				Log.add("equip head");
				equipHelmet(item.id,gameObj);
				break;
			case 3:
				Log.add("equip chest");
				equipChest(item.id,gameObj);
				break;
			case 4:
				Log.add("equip pants");
				equipPants(item.id,gameObj);
				break;
			case 5:
				Log.add("equip shoes");
				equipShoes(item.id,gameObj);
				break;
			case 6:
				Log.add("equip weapon");
				if(item.weapon_type == "R")
					WepType = 3;
				else
					WepType = 2;
					
				equipWeapon(item.id,gameObj);
				Global.myChar.Weapon = item.id;//S
				WMinD = item.weapon_dmg_min;
				WMaxD = item.weapon_dmg_max;
				if( item.id == 0 )
					print("Item id este 0");
			
				break;
			default:
				break;
		}
		
					
	}
	
	function equipHands(itemid: int, inChar : GameObject) {
		/*
		Global.myChar.Hands = itemid;
		renderers = inChar.GetComponentsInChildren(Renderer);
		var r : Renderer = renderers[5];
		if(itemid !=0)
		{
			equipWeapon(0,gameObj);
			r.materials[2].mainTexture = Resources.Load(path + "/Armour/" + itemid + "_left");
			r.materials[7].mainTexture = Resources.Load(path + "/Armour/" + itemid + "_right");
		}
		else
		{
			r.materials[2].mainTexture = Resources.Load(path + "/Armour/Basic/hand_left");
			r.materials[7].mainTexture = Resources.Load(path + "/Armour/Basic/hand_right");
		}
		*/
		//Global.myChar.Weapon = itemid;

	
		renderers = inChar.GetComponentsInChildren(Renderer);
		var r : Renderer = renderers[1];
		if(itemid!=0)
		{
			equipHands(0,gameObj);
			r.materials[0].mainTexture = Resources.Load(path + "/Weapon/" + itemid);
		}
		else
		{
			Global.myChar.WepType = 0;
			r.materials[0].mainTexture = Resources.Load(path + "/Weapon/0");
		}
	}
	
	function equipHelmet(itemid: int, inChar : GameObject){
		Global.myChar.Helmet = itemid;
		renderers = inChar.GetComponentsInChildren(Renderer);
		var r : Renderer = renderers[0];
		if(itemid != 0)
		{
			
			r.materials[0].mainTexture = Resources.Load(path + "/Armour/" + itemid);
		}
		else
		{	
			r.materials[0].mainTexture = Resources.Load(path + "/Armour/Basic/helmet");
		}
	}
	
	function equipChest(itemid: int, inChar : GameObject){
		Global.myChar.Chest = itemid;
		renderers = inChar.GetComponentsInChildren(Renderer);
		var r : Renderer = renderers[2];
		if(itemid!=0)
		{
			r.materials[0].mainTexture = Resources.Load(path + "/items/chest/ID/" + Global.myChar.Body.Size);
		}
		else
		{
			//r.materials[1].mainTexture = Resources.Load(path + "/Armour/Basic/chest");
			r.materials[0].mainTexture = Resources.Load(path + "/items/others/alfa");
		}
	}
	
	function equipPants(itemid: int, inChar : GameObject){
		Global.myChar.Pants = itemid;
		renderers = inChar.GetComponentsInChildren(Renderer);
		var r : Renderer = renderers[5];
		if(itemid!=0)
		{
			//r.materials[0].mainTexture = Resources.Load(path + "/Armour/" + itemid);
			//r.materials[3].mainTexture = Resources.Load(path + "/Armour/" + itemid + "_right");
			//r.materials[4].mainTexture = Resources.Load(path + "/Armour/" + itemid + "_left");
		}
		else
		{
			//r.materials[0].mainTexture = Resources.Load(path + "/Armour/Basic/pants");
			//r.materials[3].mainTexture = Resources.Load(path + "/Armour/Basic/pant_right");
			//r.materials[4].mainTexture = Resources.Load(path + "/Armour/Basic/pant_left");
		}
	}
	
	function equipShoes(itemid: int, inChar : GameObject){
		Global.myChar.Shoes = itemid;
		renderers = inChar.GetComponentsInChildren(Renderer);
		var r : Renderer;
		
		if(itemid!=0)
		{
			r = renderers[3];
			r.materials[0].mainTexture = Resources.Load(path + "/items/boots/1/" + Global.myChar.Body.Sex + "/right/" + Global.myChar.Body.Size);
			//r.materials[5].mainTexture = Resources.Load(path + "/Armour/" + itemid + "_right");
			
			r = renderers[4];
			r.materials[0].mainTexture = Resources.Load(path + "/items/boots/1/" + Global.myChar.Body.Sex + "/left/" + Global.myChar.Body.Size);
		}
		else
		{
			r = renderers[3];
			r.materials[0].mainTexture = Resources.Load(path + "/items/others/alfa");
			
			r = renderers[4];
			r.materials[0].mainTexture = Resources.Load(path + "/items/others/alfa");
		}
	}
	
	function equipWeapon(itemid: int, inChar : GameObject){
		Global.myChar.Weapon = itemid;
		renderers = inChar.GetComponentsInChildren(Renderer);
		
		var r : Renderer = renderers[1];
		
		//MonoBehaviour.print( Global.myChar.WepType );
		if( Global.myChar.WepType == 1 ) //( if weapon is gloves they must be rendered over the arm )
			r.transform.localPosition.z = 0.010;			
		else
			r.transform.localPosition.z = 0.00145;
			
		if(itemid!=0)
		{
			//equipHands(0,gameObj);
			r.materials[0].mainTexture = Resources.Load(path + "/Weapon/" + itemid);
		}
		else
		{
			Global.myChar.WepType = 0;
			r.materials[0].mainTexture = Resources.Load(path + "/Weapon/0");
		}		
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
		/*if(Random.Range(0, 100) > AGI + 5 + EVASION){
			dmg = inHit.HP;
			
			dmg = dmg - ((dmg/100)*ARMOUR) - (STR/3);

			return dmg > 0 ? dmg : 0;
			
			/*
			// Old hit
			HP += inHit.HP;
			MANA += inHit.MANA;

			STR += inHit.STR;
			AGI += inHit.AGI;
			INT += inHit.INT;

			REGEN += inHit.REGEN;
			ARMOUR += inHit.ARMOUR;
			DMG += inHit.DMG;
			EVASION += inHit.EVASION;
			
		}else return 0;*/
		return inHit.HP > 0 ? inHit.HP : 0;
	}
	
	function hit_do(inMob : Mob) : int
	{
        var CritChance : float ;
      DMG = Random.Range(ATK - (ATK * 0.1) , ATK + (ATK * 0.1)) + Random.Range(WMinD, WMaxD+1)*(1 - inMob.DEF/100.0);
        switch(Global.myChar.WepType)
        {			
			case 2: 
                    if(LVL/3==0) CritChance = (10 + (ACC / ( LVL%3))) * 1 ;
                    else CritChance = (10 + (ACC / ( LVL/3))) * 1 ;
            break;
            case 3:
                    if(LVL/3==0) CritChance = (10 + (ACC / ( LVL%3))) * 0.5 ;
                    else CritChance = (10 + (ACC / ( LVL/3))) * 0.5 ;
            break;
            default:
                    if(LVL/3==0) CritChance = (10 + (ACC / ( LVL%3))) * 1.25 ;
                    else CritChance = (10 + (ACC / ( LVL/3))) * 1.25 ;
            break;
        }
        //Debug.Log("CritChance "+CritChance); 
       
		//DMG = (ATK + Random.Range(WMinD, WMaxD+1))*(1 - inMob.DEF/100.0);		    Debug.Log("DMG = "+DMG+"ATK = "+ATK);
		//diablo like chance to hit 
        
        if( Random.value*100<=CritChance )
                    {
                       Debug.Log("CRITICAL = "+Global.myChar.ATK);
                       DMG = DMG * 2;
                    }
        	
		CTH = (100 * ACC)/(ACC + inMob.DEF + 0.1f) * 2 * LVL/(LVL + inMob.LVL + 0.1f);	   // crek e un bug pe la DMG
		return CTH > inMob.EVASION ? DMG : 0;
	}
	
	function hit_do(inEChar : EnemyChar) : int{
		print( "damage: " + WMinD + " " + WMaxD );
		  DMG = Random.Range(ATK - (ATK * 0.1) , ATK + (ATK * 0.1)) + Random.Range(WMinD, WMaxD+1)*(1 - inEChar.DEF/100.0);       
        //DMG = (ATK + Random.Range(WMinD, WMaxD+1))*(1 - inEChar.DEF/100.0);
		//TO DO: add LVL difference between mob and char in the equation, [(currentCTH)*2* LVL/(LVL+mob.LVL))]
		//diablo like chance to hit 
		CTH = (100 * ACC)/(ACC + inEChar.DEF) * 2 * LVL/(LVL + inEChar.LVL + 0.0);
		
		return CTH > inEChar.EVASION ? DMG : 0;
	}

	/*function hit_do(inMob : Mob) : Mob{
		DMG = ATK + Random.Range(WMinD, WMaxD+1) - inMob.DEF;
		//TO DO: add LVL difference between mob and char in the equation, [(currentCTH)*2* LVL/(LVL+mob.LVL))]
		//diablo like chance to hit 
		CTH = (100 * ACC)/(ACC + inMob.DEF) * 2 * LVL/(LVL + inMob.LVL + 0.0);
		if(CTH > inMob.EVASION)
			inMob.HP -= DMG;
		//return CTH > inMob.EVASION ? DMG : 0;
		return inMob;
	}*/
	
	function calc_stats(){
		/*armour = AGI*0.3 + STR*0.1 + LVL + ARMOUR;
		if(HP>0) HP += (STR/10) + REGEN;
		MANA += (INT/10);
		resHP = HP;*/
	}
	
	function CalculateHybridStats()
	{
		switch( Global.myChar.WepType )
		{			
			case 2:
				ATK = LVL + BRT * 2;  //melee (swords)
			break;
			case 3:
				ATK = LVL + ACC * 2; //Range
			break;
			default:
				ATK = LVL + ACC + BRT; //gloves and no weapon?
			break;
		}
		//MonoBehaviour.print( "Weapon type " + Global.myChar.WepType + " ATK: " + ATK + " ACC: " + ACC + " LVL: " + LVL);
		HP = Global.BaseHP + ( FORT - 10 ) * 5 + ( LVL - 1 ) * 10;
		ENRG = Global.BaseENRG + ( LVL - 1 ) * 5;
		EVASION = LVL / 10.0 + DEF / 2.0;
		REGEN = Global.BaseRGEN;

	}
	
	function init_stats(){

		 id	= Global.myChar.id;				
		 Nick = Global.myChar.Nick;
		 User = Global.myChar.User;			
		 Difficulty = Global.myChar.Difficulty;
		 BRT = Global.myChar.BRT;
		 ACC = Global.myChar.ACC;
		 FORT = Global.myChar.FORT;			
		 ATK = Global.myChar.ATK;	
		 DEF = Global.myChar.DEF;		
		 HP	= Global.myChar.HP;		
		 ENRG = Global.myChar.ENRG;		
	
		 REGEN = Global.myChar.REGEN;	
		 DMG = Global.myChar.DMG;		
		 CTH = Global.myChar.CTH;		
		 EVASION = Global.myChar.EVASION;		
		 LVL = Global.myChar.LVL;		
		 EXP = Global.myChar.EXP;			
	
		 Money = Global.myChar.Money;			
	
		 Hands = 0;//Global.myChar.Hands;	
		 Debug.Log("scriptChar:function initStats():Hands="+Hands);
		 Helmet	= Global.myChar.Helmet;		
		 Chest = Global.myChar.Chest;			
		 Pants = Global.myChar.Pants;		
		 Shoes = Global.myChar.Shoes;		
		 Weapon	= Global.myChar.Weapon;		
	
		 WMinD 	= Global.myChar.WMinD;
		 WMaxD 	= Global.myChar.WMaxD;
		
	}
	
	function getUserSpecials(){
		var the_url : String = "";
 		var numberOfAttacks : int = 0;
 		var values : String[];
		var i : int;
		var spattack : String[];
		the_url = Global.server + "/mmo_iphone/special.php?id=" + Global.myChar.id + "&weapon=" + WepType;
		print("Script char intrare!");
		
		var download : WWW = new WWW(the_url);
		yield download;
		while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
    		Debug.Log( "Retrying" );
			download = new WWW(the_url);
			yield download;
		}
		//Debug.Log(download.text);
		
		
		values = Regex.Split(download.text,"<br />");
		numberOfAttacks = parseInt(values[0]);
		SpecialAttacks = new SpecialAttacks[numberOfAttacks];
		for(i = 0; i< numberOfAttacks;i++)
		{
			spattack = Regex.Split(values[i+1],":");
			SpecialAttacks[i] = new SpecialAttacks(spattack);
		}
	}
}

class SpecialAnim{
	var gObj : GameObject;
	var name : String;
	
	function SpecialAnim(){}
}
