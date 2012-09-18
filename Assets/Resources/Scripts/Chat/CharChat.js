var Hands 	: int;
var Helmet 	: int;
var Chest 	: int;
var Pants 	: int;
var Shoes 	: int;
var Weapon	: int;
var AvatarId : String;
var inPath : String;

function getUserData(){
	var the_url = Global.server + "/mmo_iphone/user_desc.php?username=" + Global.chatUser;
	var download = new WWW( the_url );
   var	wwwData ;
	yield download;
	//while(!download.isDone)	{	}
 var values : String[];
	if(download.error) {
		print( "Error downloading: " + download.error );
		//wwwData = "Error! Could not connect.";
	}else{
		wwwData = download.text;
	}
   var s : String;
   s = wwwData;
	if(s.IndexOf("Invalid", 0) > 0){
		print("Invalid user ID. script CharChat");
	}
	else
	{
		values = Regex.Split(wwwData,"<br />");
		
		/*Global.myChar.BRT		= parseInt(values[0]);
		Global.myChar.ACC		= parseInt(values[1]);
		Global.myChar.ENRG		= parseInt(values[2]);
		Global.myChar.DEF		= parseInt(values[3]);
		Global.myChar.FORT		= parseInt(values[4]);
		Global.myChar.HP		= parseInt(values[5]);
		Global.myChar.EVASION	= parseFloat(values[6]);
		Global.myChar.ATK		= parseFloat(values[7]);
		Global.myChar.LVL		= parseInt(values[8]);
		Global.myChar.EXP		= parseInt(values[9]);
		Global.myChar.REGEN		= parseFloat(values[10]);
		
		Global.myChar.Nick		= values[11];
		Global.myChar.id		= parseInt(values[12]);*/

		Hands	= parseInt(values[13]);
		Helmet	= parseInt(values[14]);
		Chest	= parseInt(values[15]);
		Pants	= parseInt(values[16]);
		Shoes	= parseInt(values[17]);
		Weapon	= parseInt(values[18]);
		
		/*Global.myChar.Difficulty = parseInt(values[19]);

		Global.myChar.Money = parseInt(values[20]);*/
		AvatarId = values[21];

	}
}

function Start (){
print("A incarcat texturile caracterului!");
	inPath = "Animations/Character1.5";
	transform.eulerAngles = Vector3(0,90,0);
	yield StartCoroutine( getUserData() );
var	renderers = gameObject.GetComponentsInChildren(Renderer);
	//set tex for head
	var r : Renderer = renderers[2];
	r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+AvatarId+"/head");
	r = renderers[0];
	r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+AvatarId+"/head_1");
	r = renderers[3];
	r.materials[0].mainTexture = Resources.Load(inPath + "/Faces/"+AvatarId+"/head_2");
	//set tex for hands
	r = renderers[5];
	if(Hands!=0){
		r.materials[2].mainTexture = Resources.Load(inPath + "/Armour/" + Hands + "/"+ Hands +"_left");
		r.materials[7].mainTexture = Resources.Load(inPath + "/Armour/" + Hands + "/"+ Hands + "_right");
	}
	else{
		r.materials[2].mainTexture = Resources.Load(inPath + "/Armour/Basic/hand_left");
		r.materials[7].mainTexture = Resources.Load(inPath + "/Armour/Basic/hand_right");
	}
	//set tex helmet
	r = renderers[1];
	if(Helmet!=0){
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/" + Helmet + "/"+ Helmet);
	}
	else{
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/Basic/helmet");
	}
	//set tex chest
	r = renderers[5];
	if(Chest!=0){
		r.materials[1].mainTexture = Resources.Load(inPath + "/Armour/" + Chest + "/" + Chest);
	}
	else{
		r.materials[1].mainTexture = Resources.Load(inPath + "/Armour/Basic/chest");
	}
	//set tex pants
	if(Pants!=0){
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/" + Pants + "/" + Pants);
		r.materials[3].mainTexture = Resources.Load(inPath + "/Armour/" + Pants + "/" + Pants + "_right");
		r.materials[4].mainTexture = Resources.Load(inPath + "/Armour/" + Pants + "/" + Pants + "_left");
	}
	else{
		r.materials[0].mainTexture = Resources.Load(inPath + "/Armour/Basic/pants");
		r.materials[3].mainTexture = Resources.Load(inPath + "/Armour/Basic/pant_right");
		r.materials[4].mainTexture = Resources.Load(inPath + "/Armour/Basic/pant_left");
	}
	//set tex shoes
	if(Shoes!=0){
		r.materials[6].mainTexture = Resources.Load(inPath + "/Armour/" + Shoes + "/" + Shoes + "_left");
		r.materials[5].mainTexture = Resources.Load(inPath + "/Armour/" + Shoes + "/" + Shoes + "_right");
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
}	

function Update () {
}