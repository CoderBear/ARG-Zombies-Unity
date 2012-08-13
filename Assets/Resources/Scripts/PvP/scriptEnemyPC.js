var id		: int;				// id in the database
public var Nick	: String;			// Nickname
var User	: String;			// Username
var Difficulty : int;			// difficutly (easy, medium, hard, insane)
	
public var posH	: Vector3;			// where char is displayed;
public var pos1	: Vector3;			// first position to go to, this is the character's home
public var pos2	: Vector3;			// second position to go to, this is where the character will attack
public var role	: int;				// role of the character, can be: NONE, PC, MOB1, MOB2, MOB3
var inPath : String;
		
public var BRT		: int;				// brutatlity
public var ACC		: int;				// accuracy
public var FORT	: int;				// fortidude
public var ATK		: float;			// attack
public var DEF		: int;				// defense
public var HP		: int;				// life of the character
public var ENRG	: int;				// mana/energy of the character
	
public var REGEN	: float;			// extra regen
public var DMG		: float;			// extra damage
public var CTH		: float;			// chance to hit the mob
public var EVASION	: float;			// extra evasion
public var LVL		: int;				// level
public var EXP		: int;				// experience
	
public var Money : int;				// the money char has
	
var Hands	: int;				// item id, armour to be used on hands
var Helmet	: int;				// item id, armour to be used on the helmet
var Chest	: int;				// item id, armour to be used on the chest
var Pants	: int;				// item id, armour to be used on pants
var Shoes	: int;				// item id, armour to be used on shoes
var Weapon	: int;				// item id, weapom wielded*/
	
var WMinD 	: int;
var WMaxD 	: int;
var WepType : int;
	
var AvatarId : String;							//id of avatar to use
var Body    : int;

public var SpecialAttacks : SpecialAttacks[];			// special attacks

function getUserData(){
	
	if ( Global.enemyPCUserName == "" )
		return;

	var values : String[];
	var the_url = Global.server + "/mmo_iphone/user_desc.php?username=" + Global.enemyPCUserName;
	var download = new WWW( the_url );
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
    	Debug.Log( "Retrying" );
    	download = new WWW( the_url );
    	yield download;
	}
 	
	if(download.error) {
		print( "Error downloading: " + download.error );
	}else{
	var	wwwData = download.text;
	}

	if(wwwData.IndexOf("Invalid", 0) > 0){
		print(download.text);
	}
	else
	{
	print(download.text);
		values = Regex.Split(wwwData,"<br />");
		
		BRT		= parseInt(values[0]);
		ACC		= parseInt(values[1]);
		ENRG	= parseInt(values[2]);
		DEF		= parseInt(values[3]);
		FORT	= parseInt(values[4]);
		HP		= parseInt(values[5]);
		EVASION	= parseFloat(values[6]);
		ATK		= parseFloat(values[7]);
		LVL		= parseInt(values[8]);
		EXP		= parseInt(values[9]);
		REGEN	= parseFloat(values[10]);
		
		Nick	= values[11];
		id		= parseInt(values[12]);

		Hands	= parseInt(values[13]);
		Helmet	= parseInt(values[14]);
		Chest	= parseInt(values[15]);
		Pants	= parseInt(values[16]);
		Shoes	= parseInt(values[17]);
		Weapon	= parseInt(values[18]);
		
		Difficulty = parseInt(values[19]);

		Money = parseInt(values[20]);
		AvatarId = values[21];
		Body = parseInt(values[24]);
		Log_stats();
		
	}
}

function Log_stats()
{
	Debug.Log("ENEMY:   BRT: " + BRT + " ACC: " + ACC + " ENRG: " + ENRG + " DEF: " + DEF +
		" FORT: " + FORT + " HP: " + HP + " EVASION: " + EVASION + " ATK: " + ATK + " LVL: " +
		LVL + " EXP: " + EXP + " REGEN: " + REGEN + "Helmet " + Helmet);
}


//overkill to get weapon dmg and type for the enemy player
function GetInventoryItems()
{
	var the_url : String = "";
 	var numberOfItems : int = 0;
 	var i : int = 0;
	var slot : int;
	var values : String[];
	var itemstats : String[];
	var wepdmg : String[];
	
	the_url = Global.server + "/mmo_iphone/items-on.php?id=" + Global.enemyPCid;			
		
	var download : WWW = new WWW(the_url);
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
    	Debug.Log( "Retrying" );
   		download = new WWW(the_url);
		yield download;
	}
    	
	if(download.error) {
		print( "Error downloading: " + download.error );
	}else{
	}
	
	values = Regex.Split(download.text,"<br />");
	numberOfItems = parseInt(values[0]);
	i = 1;
	while(i<=numberOfItems)
	{
		itemstats = Regex.Split(values[i],":");
		if(parseInt(itemstats[2]) == 1)
		{
			slot = parseInt(itemstats[12]);
			if(slot == 1)
			{
				wepdmg = Regex.Split(itemstats[15],"-");			
				WMinD 	= parseInt(wepdmg[0]);			
				WMaxD 	= parseInt(wepdmg[1]);
				WepType = 1;
			}
			else{
				if(slot == 6){
					wepdmg = Regex.Split(itemstats[15],"-");
					WMinD 	= parseInt(wepdmg[0]);
					WMaxD 	= parseInt(wepdmg[1]);
					if (wepdmg.length > 2) {
						if(wepdmg[2] == "R")
							WepType = 3;
						else
							WepType = 2;
					} else {
						WepType = 2;
					}
				}
			}
			
			var temp_item = new Item(itemstats);
			CalcNewStats(temp_item);
			//Log_stats();
			
		}
		i=i+1;
	}
}

function CalcNewStats(itemAdd : Item) 
{
	
	BRT 	+= itemAdd.brutality;
	ACC 	+= itemAdd.accuracy;
	FORT 	+= itemAdd.fortitude;
	DEF 	+= itemAdd.defense;

	CalculateHybridStats();
	
	ATK += itemAdd.attack;
	HP += itemAdd.health;
	REGEN += itemAdd.regen;
	ENRG += itemAdd.energ;
	
}

function CalculateHybridStats()
{
	switch( WepType )
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

function getUserSpecials(){
	var the_url : String = "";
 	var numberOfAttacks : int = 0;
 	var values : String[];
	var i : int;
	var spattack : String[];
	the_url = Global.server + "/mmo_iphone/special.php?id=" + Global.enemyPCid + "&weapon=" + WepType;

	var download : WWW = new WWW(the_url);
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
    	Debug.Log( "Retrying" );
   		download = new WWW(the_url);
		yield download;
	}
	//while(!download.isDone){	}
	if(download.error) {
		print( "Error downloading: " + download.error );
	}else{
	}
	values = Regex.Split(download.text,"<br />");
	if (parseInt(values[0])) numberOfAttacks = parseInt(values[0]);
		else numberOfAttacks = 0;
	SpecialAttacks = new SpecialAttacks[numberOfAttacks];
	for(i = 0; i< numberOfAttacks;i++)
	{
		spattack = Regex.Split(values[i+1],":");
		SpecialAttacks[i] = new SpecialAttacks(spattack);
	}
}

public function hit_get(inHit : Hit) : int{

	return inHit.HP > 0 ? inHit.HP : 0;
}

public function hit_do(inChar : Char) : int{
		DMG = (ATK + Random.Range(WMinD, WMaxD+1))*(1 - inChar.DEF/100.0);
		//TO DO: add LVL difference between mob and char in the equation, [(currentCTH)*2* LVL/(LVL+mob.LVL))]
		//diablo like chance to hit 
		CTH = (100 * ACC)/(ACC + inChar.DEF) * 2 * LVL/(LVL + inChar.LVL + 0.0);
		
		return CTH > inChar.EVASION ? DMG : 0;
}

function Awake()
{
	Init();	
}

function Init() {

	inPath = "Animations/Character1.5";
	transform.eulerAngles = Vector3(0,90,0);
	yield StartCoroutine( getUserData() );
	yield StartCoroutine( GetInventoryItems() );	
	yield StartCoroutine( getUserSpecials() );
	
	var renderers = gameObject.GetComponentsInChildren(Renderer);
	//set tex for head
	var r : Renderer = renderers[2];
	
	var path_to_faces : String = inPath + "/NewFaces/" + AvatarId + "/";
	var path_to_body : String = inPath + "/Body/" + Body + "/";
		

	r.materials[0].mainTexture = Resources.Load(path_to_body + "chilot", typeof(Texture2D));// as Texture2D);
	r.materials[1].mainTexture = Resources.Load(path_to_body + "corp", typeof(Texture2D));
	r.materials[2].mainTexture = Resources.Load(path_to_faces + "cap1", typeof(Texture2D));
	r.materials[3].mainTexture = Resources.Load(path_to_body + "pantalon_drept", typeof(Texture2D));
	r.materials[4].mainTexture = Resources.Load(path_to_body + "pantalon_stang", typeof(Texture2D));
	r.materials[5].mainTexture = Resources.Load(path_to_body + "picior_drept", typeof(Texture2D));
	r.materials[6].mainTexture = Resources.Load(path_to_body + "picior_stang", typeof(Texture2D));
	r.materials[7].mainTexture = Resources.Load(path_to_body + "mana_dreapta", typeof(Texture2D));
	r.materials[8].mainTexture = Resources.Load(path_to_body + "mana_stanga", typeof(Texture2D));
	
	if(Weapon!=0)
	{
	print ("ahaaa, are arma!!");
		r = renderers[1];
		r.materials[0].mainTexture = Resources.Load(inPath + "/Weapon/" + Weapon);
	}
	else 
	{
		r = renderers[1];
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/Basic/helmet");
	}
	if ( Helmet != 0)
	{
	print ("ahaaa, are helmet!!");
		r = renderers[0];
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/" + Helmet);
	}
	else 
	{
		r = renderers[0];
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/Basic/helmet");
	}
	/*
	r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+AvatarId+"/head");
	r = renderers[0];
	r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+AvatarId+"/head_1");
	r = renderers[3];
	r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+AvatarId+"/head_2");
	//set tex for hands
	
	
	r = renderers[5];
	if(Hands!=0){
		//r.materials[2].mainTexture = Resources.Load(inPath + "/Armour/" + Hands + "/"+ Hands +"_left");
		//r.materials[7].mainTexture = Resources.Load(inPath + "/Armour/" + Hands + "/"+ Hands + "_right");
		r.materials[2].mainTexture = Resources.Load(inPath + "/Armour/" + Hands +"_left");
		r.materials[7].mainTexture = Resources.Load(inPath + "/Armour/" + Hands + "_right");
	}
	else{
		r.materials[2].mainTexture = Resources.Load(inPath + "/Armour/Basic/hand_left");
		r.materials[7].mainTexture = Resources.Load(inPath + "/Armour/Basic/hand_right");
	}
	//set tex helmet
	r = renderers[1];
	if(Helmet!=0){
		//r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/" + Helmet + "/"+ Helmet);
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/" + Helmet);
	}
	else{
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/Basic/helmet");
	}
	//set tex chest
	r = renderers[5];
	if(Chest!=0){
		//r.materials[1].mainTexture = Resources.Load(inPath + "/Armour/" + Chest + "/" + Chest);
		r.materials[1].mainTexture = Resources.Load(inPath + "/Armour/" + Chest);
	}
	else{
		r.materials[1].mainTexture = Resources.Load(inPath + "/Armour/Basic/chest");
	}
	//set tex pants
	if(Pants!=0){
		//r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/" + Pants + "/" + Pants);
		//r.materials[3].mainTexture = Resources.Load(inPath + "/Armour/" + Pants + "/" + Pants + "_right");
		//r.materials[4].mainTexture = Resources.Load(inPath + "/Armour/" + Pants + "/" + Pants + "_left");
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/" + Pants );
		r.materials[3].mainTexture = Resources.Load(inPath + "/Armour/" + Pants + "_right");
		r.materials[4].mainTexture = Resources.Load(inPath + "/Armour/" + Pants + "_left");
	}
	else{
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/Basic/pants");
		r.materials[3].mainTexture = Resources.Load(inPath + "/Armour/Basic/pant_right");
		r.materials[4].mainTexture = Resources.Load(inPath + "/Armour/Basic/pant_left");
	}
	//set tex shoes
	if(Shoes!=0){
		//r.materials[6].mainTexture = Resources.Load(inPath + "/Armour/" + Shoes + "/" + Shoes + "_left");
		//r.materials[5].mainTexture = Resources.Load(inPath + "/Armour/" + Shoes + "/" + Shoes + "_right");
		r.materials[6].mainTexture = Resources.Load(inPath + "/Armour/" + Shoes + "_left");
		r.materials[5].mainTexture = Resources.Load(inPath + "/Armour/" + Shoes + "_right");
	}
	else{
		r.materials[6].mainTexture = Resources.Load(inPath + "/Armour/Basic/shoe_left");
		r.materials[5].mainTexture = Resources.Load(inPath + "/Armour/Basic/shoe_right");
	}
	//set tex weapon
	r = renderers[4];
	if(Weapon!=0){
		r.materials[0].mainTexture = Resources.Load(inPath + "/Weapon/" + Weapon);
	}
	else{
		r.materials[0].mainTexture = Resources.Load(inPath + "/Weapon/0");
	}
	*/
}

function Update () {
}