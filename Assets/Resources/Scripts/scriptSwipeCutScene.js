var itemsToAdd : Array; 
var justRegistered : boolean;

var obj1 : GameObject;
var obj2 : GameObject;
var subtitle : GUIText;
//var swipeText : GUIText;
//var color : Color;
var textures : Texture2D[];
var Subtitles : String[]; 
var swipeToContinue : GUIText;
var styles : GUIStyle[];


var x:Vector3;
var next: boolean;
var transitionSpeed : float;
var i : byte;

var initialPos :Vector3;

var fadeIn:boolean;
var fadeOut:boolean;
var goBackToMenu : boolean;

var poz1 : Vector2;
var poz2 : Vector2;


var selectedItem : float = -1; 
	
	var nextStyle : GUIStyle;

//var xpos : float = 0;
//var ypos : float = 0;
//var xsize : float = 96;
//var ysize : float = 96;
 
	function SetObjectsActive(act:boolean)
	{
		obj1.SetActiveRecursively(act);
		obj2.SetActiveRecursively(act);
		subtitle.gameObject.SetActiveRecursively(act);
       swipeToContinue.gameObject.SetActiveRecursively(act);
	} 
	
 
	function Start()
	{  
      //  color = Color.white;
       //yield FadeOutAfterTime(3);
		justRegistered = false;
		selectedItem = -1; 
		goBackToMenu = false;
		SetObjectsActive(true);
		x = new Vector2(-100,-100);
		transitionSpeed = 10000;
        
		i=2;//first tex is not the right size
		obj1.renderer.material.mainTexture = textures[0];
		obj2.renderer.material.mainTexture = textures[1];
		subtitle.text = Subtitles[0];
        swipeToContinue.text = "Swipe to continue";
       // swipeText.text = "Swipe to continue";
		fadeOut = true;
		fadeIn = false;
		initialPos = obj1.transform.position;
        Debug.Log(" Initial x "+obj1.transform.position.x);
        
		nextStyle = new GUIStyle();
		nextStyle.normal.background = Resources.Load("Menus/Menu_General/forward_p", Texture2D );
		nextStyle.active.background = Resources.Load("Menus/Menu_General/forward", Texture2D);
	} 

function OnGUI()
{
     var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix; 
     
     if ( i == Subtitles.Length + 1 )
      {  
      swipeToContinue.gameObject.SetActiveRecursively(false);
     	 if(GUI.Button(Rect(280, 148, 96, 74), "", styles[0])) 
     	 {
     	 	selectedItem = 0; //BB GUN
     	 	styles[0].normal.background = Resources.Load("Menus/CutScene/GUIItems/bibi_gun"); 
     	 	styles[1].normal.background = Resources.Load("Menus/CutScene/GUIItems/gloves_facemask_u" );
     	 	styles[2].normal.background = Resources.Load("Menus/CutScene/GUIItems/sharp_stick_u" );
     	 }
    	 if(GUI.Button(Rect(64, 100, 128, 160), "", styles[1])) 
    	 {
    	 	styles[0].normal.background = Resources.Load("Menus/CutScene/GUIItems/bibi_gun_u");
     	 	styles[1].normal.background = Resources.Load("Menus/CutScene/GUIItems/gloves_facemask" );
     	 	styles[2].normal.background = Resources.Load("Menus/CutScene/GUIItems/sharp_stick_u" );
    	 	selectedItem = 1; //Gloves & facemask
    	 }
     	 if(GUI.Button(Rect(160, 205, 196, 64), "", styles[2])) 
     	 {
     	 	styles[0].normal.background = Resources.Load("Menus/CutScene/GUIItems/bibi_gun_u");
     	 	styles[1].normal.background = Resources.Load("Menus/CutScene/GUIItems/gloves_facemask_u" );
     	 	styles[2].normal.background = Resources.Load("Menus/CutScene/GUIItems/sharp_stick" );
     	 	selectedItem = 2; //sharp stick 
     	 }
     	 var width : int = nextStyle.normal.background.width;
     	 var height : int= nextStyle.normal.background.height;
     	
     	 var rec : Rect =  Rect( Screen.width * 0.8, Screen.height * 0.8, width, height);
     	 if( selectedItem >= 0 )
     	 if( GUI.Button( rec, "", nextStyle ) )
     	 {
     	 	//goBackToMenu = true;
     	 	LoadFightScene();
     	 } 
           	 
      }    
}

function updateItemsOnServer()
{
	Debug.Log( "Adding items in inventory: " + itemsToAdd.length );
	var url = Global.server + "/mmo_iphone/update_inventory.php";
	var postData : WWWForm = new WWWForm();
	postData.AddField("user_id", Global.myChar.id);
	postData.AddField("number", itemsToAdd.length);

	for (var k:int=0;k<itemsToAdd.length;k++)
	{
		postData.AddField("" + k + "_item_id",""+itemsToAdd[k]);
		postData.AddField("" + k + "_quantity", 1 );
		postData.AddField("" + k + "_active", 1 );
	}

	var upload : WWW = new WWW(url,postData);
	yield upload;
	while (upload.error && upload.error.ToString().Contains("Resolving host timed out"))
	{
		upload = new WWW(url,postData);
		yield upload;
	}
} 
   
function giveBackBehaviouralControl()
{   
      
     if (selectedItem<0) return; 
     print(Global.myChar.id);
     var comp1 : scriptMainMenu = GetComponent(scriptMainMenu);
     var comp2 : scriptSwipeCutScene = transform.GetComponent(scriptSwipeCutScene);
     comp1.enabled = true;
     itemsToAdd = new Array();
     switch(selectedItem)
     {
	     case 0:
	    	//BB GUN
	     	itemsToAdd.Add(48);
	     break;
	     case 1:
	        //Gloves
	        itemsToAdd.Add(46);
	        //TOOD : Add Facemask in database and in game
	        // itemsToAdd.Add(238);
	     break;
	     case 2 : 
	        //Sharp Stick
	        itemsToAdd.Add(47);       
	     break;
	     default:	
	     	
	     break;
     }
     justRegistered = true;
     updateItemsOnServer();
     comp2.enabled = false;
} 


function LoadFightScene()
{
  if (selectedItem<0) return; 
     print(Global.myChar.id);
     itemsToAdd = new Array();
     switch(selectedItem)
     {
	     case 0:
	     	//BB GUN
	     	itemsToAdd.Add(48);
	     break;
	     case 1:
		      //Gloves
	        itemsToAdd.Add(46);
	        //TOOD : Add Facemask in database and in game
	        itemsToAdd.Add(238);
	     break;
	     case 2 : 
	       //Sharp Stick
	        itemsToAdd.Add(47);        
	     break;
	     default:	
	     	
	     break;
     }
     justRegistered = true;
     updateItemsOnServer();
     Global.oldEXP = 0;
     Global.self.StartFightWithMob( "Zombie" );
     //getMobToFight(23,44); //todo : get lat and long
     //Application.LoadLevel("sceneBattle");
}
 
function Update () {
  
	if (goBackToMenu) 
	{ 
		SetObjectsActive(false);
		//LoadFightScene();
		giveBackBehaviouralControl();	
	}
     
	if (Input.GetMouseButton(0) && !next)  //implemented for mouse,will work with ios touch
	{
        
		var mousePos : Vector2 = new Vector2( Input.mousePosition.x, Input.mousePosition.y );
		if ( x.x < 0 ) 
			x = mousePos;  //implement touch began
		else 
			if( x.x > mousePos.x && Vector2.Distance( mousePos , x ) > 100 )
				if( i < textures.Length )
				{ 
					next = true; 
					subtitle.material.color.a = 0;
                    swipeToContinue.material.color.a = 0.25;
					fadeOut = false;
				}
	}
	else 
		x = new Vector2( -100, -100 );
    //Debug.Log("Mouse Position "+ Input.mousePosition.x);
    if( next )
    {
     poz1.x = mousePos.x - Input.mousePosition.x;
     poz1.y = mousePos.y - Input.mousePosition.y;
    // Debug.Log("poz1 = "+poz1);
    }
     if ( next )
      
	if (obj1.transform.position.x > -500){
  //  obj1.transform.position.x = obj1.transform.position.x+poz1.x;
                            if(Input.mousePosition.x<70)
                                obj1.transform.position = Vector3.MoveTowards(obj1.transform.position,Vector3(obj1.transform.position.x-400,0,obj1.transform.position.z),transitionSpeed*Time.deltaTime);
                            else obj1.transform.position = Vector3.MoveTowards(obj1.transform.position,Vector3(0,0,966),transitionSpeed*Time.deltaTime);
                    }
        else if ( obj2.transform.position.y > 0 ) 
			obj2.transform.position = Vector3.MoveTowards(obj2.transform.position,Vector3(0,0,966),transitionSpeed*Time.deltaTime);
		else 
		{
			fadeOut = true;
			next = false;
			obj1.transform.position = Vector3( 0, 1000, 966 );
			if( i < textures.Length ) 
				obj1.renderer.material.mainTexture = textures[i];
				 
			subtitle.text = Subtitles[i-1]; 
            swipeToContinue.text = "Swipe to continue";
//			if( i > 7 ) 
//				i = 7;
//			else 
				i++;
			var aux = obj1;
			obj1 = obj2;
			obj2 = aux;
		}
	    fade(); 
      
   
  }

var fadeAmount : float = 0.02f;

function fade()
{
 if (fadeIn)
  if (subtitle.material.color.a > 0 ) 
        {
        subtitle.material.color.a-=fadeAmount;
        swipeToContinue.material.color.a-=fadeAmount-0.15;
        }
    else {fadeIn = false;subtitle.material.color.a = 0;swipeToContinue.material.color.a=0.25;} 
 if (fadeOut)
  if (subtitle.material.color.a<1)
  { subtitle.material.color.a+=fadeAmount;
    swipeToContinue.material.color.a+=fadeAmount-0.15;
  }
    else {fadeOut = false;subtitle.material.color.a = 1;swipeToContinue.material.color.a = 0.5;}  
   
}

function getMobToFight(charLat: float, charLong : float) 
{
	var tempMobLvlMin : int;
	var tempMobLvlMax : int;
	var values : String[];
	
	tempMobLvlMin = 0;
	tempMobLvlMax = 1;

	var postData : WWWForm = new WWWForm();
	print( charLat + " " + charLong );
	postData.AddField("id", Global.myChar.id);
	postData.AddField("lat", charLat+"");
	postData.AddField("lon", charLong+"");
	postData.AddField("moblvlmin", tempMobLvlMin+"");
	postData.AddField("moblvlmax", tempMobLvlMax+"");	
	var login_url = Global.server + "/mmo_iphone/check_mobs.php";
	//print(login_url);
	var download = new WWW(login_url, postData);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		download = new WWW(login_url, postData);
		yield download;
	}
	
	//while(!download.isDone){}
    
	if(download.error) {
		print( "Error downloading: " + download.error );
	var	wwwData = "Error! Could not connect.";
	var	mRequestedMob = false;
		return;
	}else{
		wwwData = download.text;
		print("Data is:"+wwwData);
		mRequestedMob = false;
	}
	var	retGetMobToFight;
	if(wwwData.IndexOf("No mobs", 0) > 0) {
		retGetMobToFight = 0; 
	}
	else{
		//mob = new Mob();
		values = Regex.Split(wwwData,"<br />");
		if (values[2].length == 0) retGetMobToFight = 0;
		Global.enemyChar.id			= parseInt(values[0]);
		Global.enemyChar.mobname 	= values[1];
		Global.enemyChar.mobModel	= values[2];
		Global.enemyChar.HP			= parseInt(values[3]);
		Global.enemyChar.ENRG		= parseInt(values[4]);
		Global.enemyChar.REGEN		= parseInt(values[5]);
		Global.enemyChar.DEF		= parseInt(values[6]);
		
		if(values[7].length-1 > values[7].IndexOf("-") && values[7].IndexOf("-") > 0){
			Global.enemyChar.ATKMIN = parseInt(Regex.Split(values[7], "-")[0]);
			Global.enemyChar.ATKMAX = parseInt(Regex.Split(values[7], "-")[1]);
			Global.enemyChar.ATK = Random.Range(Global.enemyChar.ATKMIN,Global.enemyChar.ATKMAX+1);
		}
		else{
			Global.enemyChar.ATK		= parseInt(Regex.Split(values[7], "-")[0]);
			Global.enemyChar.ATKMIN =  Global.enemyChar.ATKMAX = Global.enemyChar.ATK;
		}
		// TODO: Range
		//Global.enemyChar.ATK		= parseInt(values[6]);
		Global.enemyChar.EVASION	= parseFloat(values[8]);
		Global.enemyChar.SpecialCD	= values[9].length > 0 ?parseInt(values[9]):1;
		Global.enemyChar.LVL		= parseInt(values[10]);
		retGetMobToFight = 1;
			
		Inventory.bPlayerEq =  false;
		Inventory.bInventory = false;
		Application.LoadLevel("sceneBattle");			
	}
	
		
}
//added by Claudiu
