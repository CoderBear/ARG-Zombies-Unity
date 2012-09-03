static var server : String = "http://www.b-0.info";
//static var server : String = "http://86.121.60.145:21/x-2_info";]
//static var server : String = "http://argzombies.com/app/"; 
//static var server : String = "http://192.168.1.135/";

var regenHp : double;
var timp : double; 

static var test : boolean = true;
static var debugMode : boolean = false;
static var CES : int;
static var nMobs : int = 1;
//static var nMob1 : int = Random.Range(1, 5);
//static var nMob2 : int;
//static var nMob3 : int;
static var GPS_Flag : boolean = false;
static var sZoneName : String;
static var sZoneNameToDisplay : String;
//static var myChar		: CharData = new CharData();
//static var enemyChar1	: CharData = new CharData();
//static var enemyChar2	: CharData = new CharData();
//static var enemyChar3	: CharData = new CharData();
//static var cPC			: Char = new Char();
static var myChar : Char = new Char();
static var myLog : Char = new Char();
static var oldEXP : int = -1;

static var theScene : int = 0;
static var randomNumber : float = 0.0;

static var enemyChar : Mob = new Mob();
static var mobs : Array = new Array();
static var BaseHP : int = 100;
static var BaseENRG : int = 50;
static var BaseRGEN : int = 10;
static var spawnInPosition : boolean;
static var mobIsRanged : boolean;
static var mobSpecialIsRanged : boolean;
static var mobSpecialCoolDown : int;
static var chatUser : String;
 
static var enemyPCid : String;
static var enemyPCUserName : String;

static var SwipeName : String;
static var SwipePath : String;
static var cameraS : Camera;

static var bNeedToUpdateInv : boolean;

static var UserName : String;
static var Password	: String;

static var premium : boolean;


//type of fight.. used for music (boss battles : 1, normal battles : 2, pvp battles : 3)
static var FightType : int = 0;

static var missionsArray : Array = null;
static var missionsUpdateQueue : Array = null;

static var fightTriggered : boolean;
static var bDifficultySelected : boolean;

static var self : Global;
static var distFromHomebase : float;

static var cancelTrade : boolean;
static var Hp_incercare : int = 0;
static var theTime : String;
static var theDate : String;
static var theMonth : String;
static var theDay : String;



function Start()
{
	timp = Time.time;
	self = this;
    debugMode = Application.platform != RuntimePlatform.IPhonePlayer;
   
}

function Update()
{
    regenHp = Time.time;
	if ( regenHp-timp > 4 && Global.myChar.HP > Global.Hp_incercare && Global.Hp_incercare > 1)
		{
			Global.Hp_incercare = Global.Hp_incercare + 1;
			timp = Time.time; 
			print("HP regenerat:"+ Global.Hp_incercare);
		} 
}
static function save_stats()
{
	var the_url = Global.server + "/mmo_iphone/user_update.php";
	var postData : WWWForm = new WWWForm();
	Inventory.self.RemoveItemStats();	
	postData.AddField("id", Global.myChar.id);
	postData.AddField("brutality",Global.myChar.BRT+"");
	postData.AddField("accuracy", Global.myChar.ACC+"");
	postData.AddField("energy", Global.myChar.ENRG+"");
	postData.AddField("defense",Global.myChar.DEF+"");
	postData.AddField("fortitude",Global.myChar.FORT+"");
	postData.AddField("hp", Global.myChar.HP+"");
	postData.AddField("evasion", Global.myChar.EVASION+"");
	postData.AddField("attack", Global.myChar.ATK+"");
	postData.AddField("level", Global.myChar.LVL+"");
	postData.AddField("experience", Global.myChar.EXP+"");
	postData.AddField("regen", Global.myChar.REGEN+"");

	postData.AddField("hands", Global.myChar.Hands+"");
	
	postData.AddField("helmet", Global.myChar.Helmet+"");
	postData.AddField("chest", Global.myChar.Chest+"");
	postData.AddField("pants", Global.myChar.Pants+"");
	postData.AddField("shoes", Global.myChar.Shoes+"");
	postData.AddField("weapon", Global.myChar.Weapon+"");
	postData.AddField("difficulty", Global.myChar.Difficulty);
	postData.AddField("money", Global.myChar.Money);
	Inventory.self.AddItemStats();	

	var upload : WWW = new WWW(the_url,postData);
	yield upload;
	while( upload.error && upload.error.ToString().Contains("Resolving host timed out") )
		{
			upload = new WWW(the_url,postData);
			yield upload;
		}
	if(upload.error) 
		{
			print( "Error downloading: " + upload.error );
		}
	else
		{}
}

static function getUserData()
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
		//	wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			var	wwwData = download.text;
		}

	if(wwwData.IndexOf("Invalid", 0) > 0)
		{
			print("Invalid user ID.");
		}
	else
	{
		values = Regex.Split(wwwData,"<br />");

		Global.myChar.BRT		= parseInt(values[0]);
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
		Global.myChar.id		= parseInt(values[12]);

		Global.myChar.Hands		= parseInt(values[13]);
		
		Global.myChar.Helmet	= parseInt(values[14]);
		Global.myChar.Chest		= parseInt(values[15]);
		Global.myChar.Pants		= parseInt(values[16]);
		Global.myChar.Shoes		= parseInt(values[17]);
		Global.myChar.Weapon	= parseInt(values[18]);
		Global.myChar.Difficulty = parseInt(values[19]);
         
		Global.myChar.Money = parseInt(values[20]);
		Global.myChar.AvatarId = values[21];
		Global.myChar.CalculateHybridStats();
        
		if ( values.Length > 22 && values[22].Length > 0 ) Global.myChar.home_lat = parseFloat(values[22]);
		if ( values.Length > 23 && values[23].Length > 0 ) Global.myChar.home_lon = parseFloat(values[23]);	
		if ( values.Length > 24 && values[24].Length > 0 ) Global.myChar.Body.Set(parseInt(values[24]));
		
		if ( Inventory.self != null )
			Inventory.self.AddItemStats();	
	}
}


static function ServerRequest( the_url : String )
{
	var request : WWW = new WWW(the_url);
	yield request;	
	while (request.error && request.error.ToString().Contains("Resolving host timed out"))
		{
			request = new WWW(the_url);
			yield request;
		}
}

static var lastTouchPosition : Vector2;

static function Scroll(scrollVector : Vector2, rec : Rect) : Vector2
{
	if( Input.touchCount > 0 && ( Input.GetTouch(0).phase == TouchPhase.Began || Input.GetTouch(0).phase == TouchPhase.Moved ) )
	{
		var touch : Vector2 = Input.GetTouch(0).position;
		if(touch.x < rec.x) return scrollVector;
		if(Screen.height - touch.y < rec.y) return scrollVector;
		if(touch.x > rec.x+rec.width) return scrollVector;
		if(Screen.width - touch.y > rec.y+rec.height) return scrollVector;	
	}
			
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)
		lastTouchPosition = Input.GetTouch(0).position;
	
	if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved) 
	{
		var touchPosition : Vector2 = Input.GetTouch(0).position;
		var aux : int = touchPosition.y - lastTouchPosition.y;

		scrollVector.y += aux;
		lastTouchPosition = touchPosition;		
	}
	return scrollVector;
}

function StartMission( mission : Mission )
{
	if ( mission.toDo.ToUpper() == "KILL" )
		{
			FightMob( mission.what, mission.quant - mission.done );
		}
	else
		{
			FightMob( mission.what, 1 );
		}
}

function SetMobs( numbers: int )
{
	if ( numbers > 1 )
		{
			LoadSceneScript.nrOfMobsKilled = 0;
			LoadSceneScript.nrOfMobs = numbers;
			LoadSceneScript.MoreMobsToFight = true;
		}
	else
		LoadSceneScript.MoreMobsToFight = false;
}

function FightMob( mob : String, numbers : int  )
{
	SetMobs(numbers);
	mob = WWW.EscapeURL( mob );

	var download : WWW = new WWW(server + "/mmo_iphone/mobs.php?id=" + mob );
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW(server + "/mmo_iphone/mobs.php?id=" + mob );
			yield download;
		}
	var values = Regex.Split(download.text,"<br />");

	var tmp = Regex.Split(values[0],"\n");
	if (!download.error)
	if (values[2].length > 0)
	{
		enemyChar.mobname = tmp[1];
		enemyChar.HP		= parseInt(values[1]);
		enemyChar.ENRG		= parseInt(values[2]);
		enemyChar.REGEN		= parseInt(values[3]);
		enemyChar.DEF		= parseInt(values[4]);
		enemyChar.ATKMIN	= parseInt(values[5]);
		enemyChar.ATKMAX	= parseInt(values[6]);
		enemyChar.ATK		= Random.Range(enemyChar.ATKMIN, enemyChar.ATKMAX + 1);
		enemyChar.EVASION	= parseFloat(values[7]);
		enemyChar.SpecialCD	= values[8].length > 0 ? parseInt(values[8]) : 1;
		enemyChar.LVL		= parseInt(values[9]);		
		enemyChar.id 		= parseInt( values[10] );
		enemyChar.mobModel 	= values[11];
		if (values[12] != "")
			{
				Global.enemyChar.specialMob	= parseInt(values[12]);
				if (parseInt(values[12]) == 1)
					{
						Global.enemyChar.photosNames = values[13];
					}
			}
		else Global.enemyChar.specialMob = 0;
	}
	// Fight!
	fightTriggered = true;
	FightType = 1;
	bDifficultySelected = true;
}

function StartFightWithMob( mob : String )
{
	yield FightMob( mob,1 );
	Inventory.ResetSelectedItem();
	var retGetMobToFight = 1;
		
	Inventory.bPlayerEq =  false;
	Inventory.bInventory = false;
	Application.LoadLevel("sceneBattle");	
}


//static function UserToNick (kUser : String) : String
//{
//	var the_url = Global.server + "/mmo_iphone/user_to_nick.php";
//	var postData: WWWForm = new WWWForm();
//	postData.AddField("opt", 2);  // Username to nick
//	postData.AddField("user", kUser);
//	var upload: WWW = new WWW(the_url, postData);
//	yield upload;
//	//while( !upload.isDone ) {}
//	if (upload.error) {
//		return "";
//	} else {
//		return upload.text;
//	}
//}

//static function NickToUser (kNick: String) : String {
//	var the_url = Global.server + "/mmo_iphone/user_to_nick.php";
//	var postData: WWWForm = new WWWForm();
//	postData.AddField("opt", 1);  // Nick to username
//	postData.AddField("user", kNick);
//	var upload: WWW = new WWW(the_url, postData);
//	//while (!upload.isDone) {}
//	yield upload;
//	if (upload.error) {
//		return "";
//	} else {
//		return upload.text;
//	}
//}