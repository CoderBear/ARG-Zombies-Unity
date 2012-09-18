//http://www.b-0.info/mmo_iphone/get_missions.php?level=&player_id=
//http://www.b-0.info/mmo_iphone/get_active_missions.php?player_id=
//http://www.b-0.info/mmo_iphone/complete_quest.php?mission_id=&player_id=
//http://www.b-0.info/mmo_iphone/activate_mission.php?player_id=&mission_id=
//qr codes
//http://www.b-0.info/mmo_iphone/activate_reward.php?player_id=&qr_code=

// mission info
static var InfoWindowActivated : boolean = false;
static var InfoText : String;
static var GoMission : Mission = null;
// end mission info
static var missionsBack : boolean = false;
var lvlUpLabel : GUIStyle;
var guiStyle3 : GUIStyle;
var styleOrangeBut : GUIStyle;
var styleRedBut : GUIStyle;
var styleRederBut : GUIStyle;
static var backdown :boolean = false;;
//static 
//static var buildingRewardIc : Array;
//static var buildingRewardNames : Array;
//var texElementBackgroundBlue    : Texture2D;	  
//var downloaded           : boolean;
//var texElementBackgroundBlack   : Texture2D;
//var texElementBackgroundOrange  : Texture2D;
//var winStyle			 : GUIStyle;
//var killLength    : int ;
//var moveLength    : int ;
//var craftLength   : int ;
//static var killMissionsArray : Array = null;
//static var moveMissionsArray : Array = null;
//static var craftMissionsArray : Array = null;
//var startPos 			 : Vector2;
static var Stringx : String;
static var buildingPlan   : short;
public var qrCam : Camera;
private var texture : Texture2D;
public var target : GameObject;
public var cameraActive : boolean;
static var clearingBuildings : boolean;
public var qrRewards : Hashtable;
private var mMissions : boolean;
var chooseMission        : String;

function getMissions() : boolean
	{
		return mMissions;
	}

function setMissions( val : boolean )
	{
		mMissions = val;       // mMissions activeaza fereastra de misiuni
		levelUp = null;
	}

var texMissionsWindow    : Texture2D;
var texElementBackgroundRed     : Texture2D;
var texElementBgSelRed          : Texture2D;
var texElementBgSelBlack        : Texture2D;
var texElementBgSelBlue         : Texture2D;
var texElementBgSelOrange       : Texture2D;


var styleScanBut				: GUIStyle;
var styleClear					: GUIStyle;
var styleBack					: GUIStyle;
static var decodedString				: String;




var texDoneInactive		 : Texture2D;
var bar_green            : Texture2D;
var bar_grey             : Texture2D;
var blackText 			 : GUIStyle;
var whiteText            : GUIStyle;
var white2Text            : GUIStyle;
var blueText			 : GUIStyle;
var doneStyle            : GUIStyle;
var fractionStyle1       : GUIStyle;
var fractionStyle2       : GUIStyle;
var windowRect			 : Rect;
var scrollPosition       : Vector2;
var levelUp : Array; //LEVEL, BRT, ACC, FORT, DEF, SPECIAL;
var currentScreen : short = -1;	
var buildingArray : Array;
var getBuildings : boolean;

static var SCREEN_GAINED : short = 0;
static var SCREEN_LEVELUP : short = 1;
static var SCREEN_MISSION : short = 2;
static var SCREEN_BOSS : short = 3;
static var SCREEN_FAILED: short = 4;
static var SCREEN_INVALID : short = 5;
static var SCREEN_COOLDOWN: short = 6;
static var SCREEN_PAYEDMISSION : short = 7;

function Start()
{   
	//var leveUp = null;
	//scriptMain.exitFromTrade = true;
	if ( scriptBattle.scriptInventory == null )
		scriptBattle.scriptInventory = GetComponent(Inventory);
		
	mMissions = false;
    chooseMission = "KILL";
    clearingBuildings = false;
    buildingArray = new Array();
     
	windowRect = new Rect(Global.screenW * 0.2395 ,Global.screenH * 0.125,Global.screenW * 0.7916 ,Global.screenH * 0.8968);
	scrollPosition = Vector2.zero;
	
	//Global.CES = 0;
	//winStyle.normal.background = texMissionsWindow;
	//startPos = new Vector2(165,60);
	
	GetMissionList();
    getBuildings = false;
	lvlUpLabel  = new GUIStyle();
	guiStyle3 = new GUIStyle();
	styleOrangeBut = new GUIStyle();
	
	InitStyles();
	qrRewards = null;
    
    /*for( var i : int = 0; i < Global.missionsArray.length; i++ )
           if( Global.missionsArray[i].toDo.ToUpper().Contains("CRAFT") )
        {
            craftMissionsArray[craftLength] = Global.missionsArray[i];
            craftLength++;
        }
            else if( Global.missionsArray[i].toDo.ToUpper().Contains("KILL") )
        {
            killMissionsArray[killLength] = Global.missionsArray[i];
            killLength++;
        }
            else if( Global.missionsArray[i].toDo.ToUpper().Contains("MOVE") )
        {   
            Debug.Log("Global missions array [i] "+Global.missionsArray[i]);
            if(moveMissionsArray[moveLength]!=null){
            moveMissionsArray[moveLength] = Global.missionsArray[i];
            moveLength++;   
            }
        }*/
}

function InitStyles()
{
	lvlUpLabel.font = Resources.Load( "Fonts/BEBASNEUE_20", Font );
	guiStyle3.font = Resources.Load( "Fonts/BEBASNEUE_25", Font );
	guiStyle3.normal.textColor = Color.white;
	styleOrangeBut.font = Resources.Load( "Fonts/BEBASNEUE_14", Font );
	styleOrangeBut.normal.background = Resources.Load( "Menus/Menu_Battle/button_orange", Texture2D );
	styleOrangeBut.active.background = Resources.Load( "Menus/Menu_Battle/button_orange_p", Texture2D );
	styleOrangeBut.alignment = TextAnchor.MiddleCenter;	
}

var gettingMissions : boolean = false;

function GetMissionList()
{
	if( gettingMissions ) 
			return;
	gettingMissions = true;
	yield StartCoroutine( GetMissions( true ) );
	yield StartCoroutine( GetMissions( false ) );
	gettingMissions = false;
}

function update_data_mission( misiune : Mission )
{
	if ( misiune.toDo == "DROP" )
		{
			var i : int;
			misiune.done = 0;
			yield StartCoroutine( scriptBattle.scriptInventory.GetInventoryItems() );
			
			//if ( Global.itemsInInventory != null )
			for(i=0;i<scriptBattle.scriptInventory.itemsInInventory.length;i++)
				{
					if ( scriptBattle.scriptInventory.itemsInInventory[i].id == misiune.drop_special_item_id )//misiune.drop_special_item_id )   // poti seta itemul aici ptr misiune
						misiune.done = scriptBattle.scriptInventory.itemsInInventory[i].quantity;
				}
		}
}

private function GetMissions( missionsActive : boolean )
{
	if (Global.myChar.id)
		{
			var url : String;
			if( missionsActive )
				url = Global.server + "/mmo_iphone/get_active_missions.php?player_id=" + Global.myChar.id;	
			else
				url = Global.server + "/mmo_iphone/get_missions.php?level="+Global.myChar.LVL+"&player_id=" + Global.myChar.id;
				
			var download : WWW = new WWW(url);
			yield download;
			
			while (download.error && download.error.ToString().Contains("Resolving host timed out"))
				{
					Debug.Log( "Retrying" );
					download = new WWW(url);
					yield download;
				}		
	
			//var	retGetMobToFight;
			//var missionsUpdateQueue;
			if( missionsActive )
				{
					Global.missionsArray = new Array();
					//missionsUpdateQueue = new Array();
				}
			 
			var regex = "<br />";
			var missions = Regex.Split(download.text,regex);
			missions[0] = missions[0].Trim(); 
			var missionDetails : String[];
			
			for (var i:int=0;i<missions.length-1;i++)
				{
					missionDetails = Regex.Split(missions[i],"-");
					var M : Mission;
					
			        if ( missionDetails.Length < 10 )
			            	return;
			            
					if( missionsActive)
							M = new Mission(parseInt(missionDetails[0]),missionDetails[1],parseInt(missionDetails[4]),missionDetails[2],parseFloat(missionDetails[3]),missionDetails[5],parseInt(missionDetails[6]), parseFloat( missionDetails[7] ), true, 0, missionDetails[8], parseInt( missionDetails[9] ) );					
					else
							M = new Mission( parseInt(missionDetails[0]) ,missionDetails[1],parseInt(missionDetails[4]),missionDetails[2],parseFloat(missionDetails[3]),missionDetails[5],parseInt(missionDetails[6]), parseInt( missionDetails[7] ) , false, 0, missionDetails[8], parseInt( missionDetails[9] )  );
					
					update_data_mission(M);			
					Global.missionsArray.Add(M);
				}			
	    }
}

function CompleteMission( nr : int )
{
	var mission : Mission = Global.missionsArray[ nr ];
	var the_url = Global.server + "/mmo_iphone/complete_quest.php?mission_id=" + mission.missionId + "&player_id=" + Global.myChar.id;
	print("mission.missionId" + mission.missionId);
	print("Global.myChar.id" + Global.myChar.id);
	Debug.Log("lala: " + mission.missionId + "    " + Global.myChar.id);
	var request : WWW = new WWW( the_url );
	yield request;
	while( request.error && request.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying" );
		request = new WWW( the_url );
		yield request;
	}
	
	Debug.Log( request.text );
	Global.missionsArray.RemoveAt( nr );
	var response = Regex.Split(request.text,"<br />");		
	response = Regex.Split(response[0].Trim(), "-");

	Debug.Log( "length: " + response.length.ToString() );
	
	if( response.length == 1 ) 
			return;
	
	Debug.Log( "response[0]: " + response[0] );

	if( response[0] == "XP" )
		{	print("response.length     " +response.length);
			if( response.length > 2 ) //level up
				{
					Debug.Log( "showing level up" );
					ShowLevelUp( response );
				}
			else
				{
					Debug.Log( "Increasing XP" );
					Debug.Log( parseInt( response[ 1 ] ).ToString() );
					Global.myChar.EXP += parseInt( response[ 1 ] );
				}
		}
	else if( response[0] == "Cash" )
		{
			Global.myChar.Money += parseInt( response[ 1 ] );
		}
	else if( response[0] == "Loot" )
		{
			var scriptInventory : Inventory = GetComponent(Inventory);
			scriptInventory.UpdateEqInvItems();
		}
	GetMissionList();
	
}

function ShowLevelUp( resp : Array )
{
	levelUp = new Array();
	levelUp.Add( Global.myChar.LVL + 1 );
	levelUp.Add( resp[2] ); //BRT
	levelUp.Add( resp[3] ); //ACC
	levelUp.Add( resp[4] ); //FORT
	levelUp.Add( resp[5] ); //DEF
	levelUp.Add( resp[6] ); //SPECIAL
	
	Global.myChar.LVL +=  1;
	Global.myChar.BRT +=  parseInt(  resp[2].ToString() );
	Global.myChar.ACC += parseInt(  resp[3].ToString() );
	Global.myChar.FORT += parseInt( resp[4].ToString() );
	Global.myChar.DEF += parseInt( resp[5].ToString() );
	Global.myChar.EXP = parseInt( resp[1].ToString() );
	Global.myChar.CalculateHybridStats();
}

	
function ActivateMission( mission : Mission )
{ 
	if ( mission.mActive )
		return;
	if( mission.mCost > 0 )
		{
			qrRewards = new Hashtable();
			qrRewards.Add( "MISSION", mission );
			var txt : String = "It will cost " + mission.mCost + "$ to activate this mission.";
			qrRewards.Add( "COST", txt );
			
			if( mission.mCost > Global.myChar.Money )
					qrRewards.Add( "NOMONEY", "You don't have enough money" );			 
			currentScreen = SCREEN_PAYEDMISSION;			
			return;
		}
	
	var the_url = Global.server + "/mmo_iphone/activate_mission.php?player_id=" + Global.myChar.id + "&mission_id=" + mission.missionId;
	Debug.Log("Activate Mission: " + the_url);
	var request : WWW = new WWW( the_url );
	yield request;
	
	while( request.error && request.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			request = new WWW( the_url );
			yield request;
		}
	mission.mActive = false;
	
	if( mission.toDo == "KILL" || mission.toDo == "DROP" )
		{
			//Global.self.FightMob( mission.what );
			scriptMissions.GoMission = mission;
			Global.self.StartMission( mission );
		}
    
}

/*
function drawAllSprites()
{
	missionWindow
}*/


function OnGUI()
{
	if( !mMissions && cameraActive )
		{
			StopCamera();
			return;
		}
	
	//var screenScale: float = Screen.width / 480.0;
	//var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
	//GUI.matrix = scaledMatrix;
    
	if (mMissions)      // window misiuni
	{
		if( cameraActive )
			{
				//scan qr code button;
				
				
				if( GUI.Button( Rect( Global.screenW * 0.75 ,Global.screenH * 0.8593,Global.screenW * 0.16666 ,Global.screenH * 0.078125), "", styleScanBut ) )
					{
						ScanQR();
					}
				return;
			}
		GUI.DrawTexture(Rect(Global.screenW * 0.2395 ,Global.screenH * 0.125,Global.screenW * 0.75 ,Global.screenH * 0.84375), texMissionsWindow);
		
		if( qrRewards != null )
			{
				DrawExtraScreens();
				return;
			}
		if( levelUp != null ) 
			{
				DrawLevelUp();
				return;
			}
        if( GUI.Button( Rect( Global.screenW * 0.491 ,Global.screenH * 0.129,Global.screenW * 0.15 ,Global.screenH * 0.076 ), "SURVIVAL",chooseMission=="KILL" ? styleRedBut:styleRederBut ) )
			{
				chooseMission = "KILL" ;
	            getBuildings = false;
			}
        if( GUI.Button( Rect( Global.screenW * 0.624 ,Global.screenH * 0.129,Global.screenW * 0.14	 ,Global.screenH * 0.076), "Exploration", chooseMission=="MOVE" ? styleRedBut:styleRederBut ) )
			{
				chooseMission = "MOVE" ;
	            getBuildings = false;
			}
       /* if( GUI.Button( Rect( 370, 27, 70, 55 ), "Craft", chooseMission=="Craft" ? styleRedBut:styleRederBut ) )
			{
				chooseMission = "Craft" ;
	            getBuildings = false;
			}	*/
		if( GUI.Button( Rect( Global.screenW * 0.375 ,Global.screenH * 0.8281,Global.screenW * 0.14375 ,Global.screenH * 0.1 ), "", styleScanBut ) )
			{
				StartCamera();
				
			}
		if( GUI.Button( Rect(Global.screenW * 0.5625 ,Global.screenH * 0.8281,Global.screenW * 0.14375 ,Global.screenH * 0.1 ), "", styleClear ) )
			{
				ClearBuilding();
			}
		if( GUI.Button( Rect(Global.screenW * 0.75 ,Global.screenH * 0.8281,Global.screenW * 0.14375 ,Global.screenH * 0.1 ), "", styleBack ) )
			{
				missionsBack = true;
				scriptMain.bCharFrame = true;
				scriptMain.makeActiveOrInactive = true;
				ExitMissions();
				backdown = true;
				//butDown = true;
			}		
        var j = 0;
        var k = 0;
        var l = 0;
		
		if( Global.missionsArray == null )
				 return;
		
		var scrollRect : Rect = Rect( Global.screenW * 0.2916 ,Global.screenH * 0.2187,Global.screenW * 0.6708 ,Global.screenH * 0.59375 );
		
		if( iPhoneInput.touchCount > 0)
			{
				var touch = iPhoneInput.GetTouch(0); 
				if(touch.phase == iPhoneTouchPhase.Moved)
					{	    		
			    		if(scrollRect.Contains(Vector2(touch.position.x,320 -touch.position.y)))
			    			scrollPosition.y += touch.deltaPosition.y/2;
					}
			}
		
		 var realMissionLength=0;
         if(!getBuildings)  							
		         scrollPosition = GUI.BeginScrollView( scrollRect, scrollPosition, new Rect( 0, 0, Global.screenW * 0.6458, Global.missionsArray.length * Global.screenH * 0.2031 ) );
         else scrollPosition = GUI.BeginScrollView( scrollRect, scrollPosition, new Rect( 0, 0, Global.screenW * 0.6458, buildingArray.length * Global.screenH * 0.2031 ) );
		
		if(!getBuildings) 
	        for( var i : int = 0; i < Global.missionsArray.length; i++ )
		        { 
		        	var V : int[] = PutMissionInWindow(Global.missionsArray[i],i,j,k,l,realMissionLength);
		        	j = V[0];
		        	k = V[1];
		        	l = V[2];
				}
		else 
			{
				var contor : short;
				for( contor = 0 ; contor<buildingArray.length; contor++)
		            {	
						GUI.DrawTexture(new Rect(0,Global.screenH * 0.2031*contor,Global.screenW * 0.65625 ,Global.screenH * 0.1875), texElementBackgroundRed , ScaleMode.StretchToFill);
		               	GUI.Label(new Rect(15, Global.screenH * 0.2031*contor+Global.screenH * 0.09375,Global.screenW * 0.4166 ,Global.screenH * 0.1093),buildingArray[contor].ToString(),blackText);
		               
	               		if( GUI.Button( Rect( 0, Global.screenH * 0.2031 * contor + Global.screenH * 0.0406, Global.screenW * 0.4583 ,Global.screenH * 0.1875 ), "", GUIStyle.none ) )
			               	{
			             	  	ExitMissions();
			               		Global.self.FightMob("Zombie", buildingArray.length);
			               		print("A inceput fightingul buildingului!");
			               		scriptMissions.clearingBuildings = true;
			               		break;
			               		/*
			                   	ExitMissions();
			                   	clearingBuildings = true;
			                   	LoadSceneScript.nrOfMobs = 0 ;
			                   	scriptMissions.GoMission = null;
			                   	Global.self.FightMob("Zombie", 1);	
			                   	buildingRewardIc = new Array();
			                   	buildingRewardNames = new Array();
			                   	buildingPlan = Random.Range( 1, 5 );
			                   	scriptBattle.buildingXP = 0;
			                   	scriptBattle.buildingGold = 0;
			                   	*/
			               	}
				   	}
	        }  
        
		GUI.EndScrollView();
	}
}

function StartCamera()
{
	print ("aicicicicicic");
	cameraActive = true;
	qrCam.active = true;
	texture = ARBinding.startCameraCapture( false, ARQuality.High);
	target.renderer.sharedMaterial.mainTexture = texture;
	ARBinding.updateMaterialUVScaleForTexture( target.renderer.sharedMaterial, texture );
	ARBinding.setFocusMode( 2 ); //ARFocusMode.ContinuousAutoFocus
}

function StopCamera()
{
	cameraActive = false;
	ARBinding.stopCameraCapture();
	Destroy( texture );
	texture = null;	
	qrCam.active = false;
}

function ScanQR()
{
	if( Global.debugMode )
		{		
			//ActivateQRReward( "25-15-27-300-56" );
			//ActivateQRReward( "ntmnv4th3ZAMnb1sn8py" );
		    //ActivateQRReward("bGBo0hS5tAq5MuxPu02J");
		    // ActivateQRReward("FIZwH2f2rIFwS3zRvqE");
	        ActivateQRReward("9woPGf2ATGJew7ZCu6QV");
			return;
		}
		
	var test : Rect = qrCam.rect;
	qrCam.rect = Rect( 0, 0, 1, 1 );
	var rt : RenderTexture = new RenderTexture( Global.screenW, Global.screenH, 24);
	qrCam.targetTexture = rt;			
	var gui_texture = new Texture2D(Global.screenW, Global.screenH, TextureFormat.RGB24, false);
	qrCam.Render();
	RenderTexture.active = rt;
	gui_texture.ReadPixels( new Rect(0, 0, Global.screenW, Global.screenH), 0, 0 );
	qrCam.targetTexture = null;
	RenderTexture.active = null;
	Destroy( rt );
	
	gui_texture.Apply();
	qrCam.rect = test;
	target.renderer.material.mainTexture = gui_texture;	
	StopCamera();
	
	var decodedString : String = "";
	
	try
		{
			decodedString = QRDecoder.GetQRCode( gui_texture );//QRCodeProcessor.Decode( gui_texture ).Text;
		}
	catch( ex )
		{
			Debug.Log( "Scan failed" );
			ActivateQRReward( "" ); //failed scan
		}	
	
	target.renderer.material.mainTexture = null;
	Destroy( gui_texture );
	Debug.Log("aICI E STRINGUL DECODAT" +  decodedString );	
	ActivateQRReward( decodedString );
	Stringx = decodedString;
}


function ExitMissions()
{   //disableGUI = false;	
	if( cameraActive )
			StopCamera();
	setMissions( false );
	
}

function DrawLevelUp()
{	
	
	GUI.BeginGroup(Rect(Global.screenW * 0.2645 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09));

	lvlUpLabel.normal.textColor = Color.white;
	GUI.Label( Rect(Global.screenW * 0.052 ,Global.screenH * 0.175,Global.screenW * 0.3125 ,Global.screenH * 0.09375), "Level up", guiStyle3 );
	//LEVEL, BRT, ACC, FORT, DEF, SPECIAL;
	GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3125,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "Brutality", lvlUpLabel);
	GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3906,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "Accuracy", lvlUpLabel);
	GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.4687,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "Fortitude", lvlUpLabel);
	GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.5468,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "Defense", lvlUpLabel);
	GUI.Label(Rect(Global.screenW * 0.3229 ,Global.screenH * 0.3125,Global.screenW * 0.125 ,Global.screenH * 0.0625), "+" + levelUp[1], lvlUpLabel);
	GUI.Label(Rect(Global.screenW * 0.3229 ,Global.screenH * 0.3906,Global.screenW * 0.125 ,Global.screenH * 0.0625), "+" + levelUp[2], lvlUpLabel);
	GUI.Label(Rect(Global.screenW * 0.3229 ,Global.screenH * 0.4687,Global.screenW * 0.125 ,Global.screenH * 0.0625), "+" + levelUp[3], lvlUpLabel);
	GUI.Label(Rect(Global.screenW * 0.3229 ,Global.screenH * 0.5468,Global.screenW * 0.125 ,Global.screenH * 0.0625), "+" + levelUp[4], lvlUpLabel);
	
	if( levelUp[5] != "" )
		{	
			GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.6562,Global.screenW * 0.5437 ,Global.screenH * 0.09375), "Congratulations!", lvlUpLabel);
			GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.7343,Global.screenW * 0.5437 ,Global.screenH * 0.09375), "You learned a new skill:", lvlUpLabel);
			lvlUpLabel.normal.textColor = Color.green;
			GUI.Label(Rect(Global.screenW * 0.4062 ,Global.screenH * 0.7343,Global.screenW * 0.5437 ,Global.screenH * 0.15625), levelUp[5].ToString(), lvlUpLabel);
			lvlUpLabel.normal.textColor = Color.white;
		}		
	if( !qrRewards )
		if( GUI.Button( Rect( Global.screenW * 0.4583 ,Global.screenH * 0.8281,Global.screenW * 0.1729 ,Global.screenH * 0.075 ), "Continue", styleOrangeBut ) )
				levelUp = null;			
	GUI.EndGroup();
}
	
function DrawExtraScreens()
	{
		switch( currentScreen )
		{
			case SCREEN_GAINED: 
			
			
				GUI.BeginGroup(Rect(Global.screenW * 0.2645 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09));
				lvlUpLabel.normal.textColor = Color.white;
				GUI.Label( Rect( Global.screenW * 0.052 ,Global.screenH * 0.175,Global.screenW * 0.78125 ,Global.screenH * 0.09375 ), "You have gained:", guiStyle3 );
				//XP, CASH, ITEM
				var startY : int = 120;
				
				if( qrRewards.ContainsKey("XP") )
					{
						GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3333,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "XP: ", lvlUpLabel);
						GUI.Label(Rect(Global.screenW * 0.15625 ,Global.screenH * 0.3333,Global.screenW * 0.7083 ,Global.screenH * 0.0625), qrRewards["XP"].ToString(), lvlUpLabel);
						startY += 30;
					}
				if( qrRewards.ContainsKey( "CASH" ) )
					{
						GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3333,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "CASH: ", lvlUpLabel);
						GUI.Label(Rect(Global.screenW * 0.15625 ,Global.screenH * 0.3333,Global.screenW * 0.7083 ,Global.screenH * 0.0625), qrRewards["CASH"].ToString(), lvlUpLabel);
						startY += 30;
					}
				if( qrRewards.ContainsKey( "ITEM" ) )
					{
						GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3333,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "ITEM: ", lvlUpLabel);
						GUI.Label(Rect(Global.screenW * 0.15625 ,Global.screenH * 0.3333,Global.screenW * 0.7083 ,Global.screenH * 0.0625), qrRewards["ITEM"].ToString(), lvlUpLabel);
						startY += 30;
					}
					
				if( GUI.Button( Rect( Global.screenW * 0.4854 ,Global.screenH * 0.8125,Global.screenW * 0.16666 ,Global.screenH * 0.0781 ), "Continue", styleOrangeBut ) )
					{
						//check if we have leveled up;
						if( qrRewards.ContainsKey( "XP" ) )
							{
								var strLevel : String = qrRewards["XP"];
								if( levelUp )//we have leveld up
									{
										currentScreen = SCREEN_LEVELUP;
									}
								else
									currentScreen = SCREEN_MISSION;						
							}
					}						
				GUI.EndGroup();

			break;
			case SCREEN_LEVELUP:
				DrawLevelUp();
				GUI.BeginGroup(Rect(Global.screenW * 0.2646 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09));				
				
				if( GUI.Button( Rect( Global.screenW * 0.4854 ,Global.screenH * 0.8125,Global.screenW * 0.16666 ,Global.screenH * 0.0625 ), "Continue", styleOrangeBut ) )
					{
						levelUp = null;
						currentScreen = SCREEN_MISSION;
					}
				GUI.EndGroup();
			break;
			case SCREEN_MISSION:
				
				if( !qrRewards.ContainsKey( "MISSION" ) )
					{
						currentScreen = SCREEN_BOSS;
						return;
					}
				
				GUI.BeginGroup(Rect(Global.screenW * 0.2646 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09));
				lvlUpLabel.normal.textColor = Color.white;
													 
				GUI.Label( Rect( Global.screenW * 0.052 ,Global.screenH * 0.175,Global.screenW * 0.78125 ,Global.screenH * 0.09375 ), "New mission unlocked: ", guiStyle3 );
				GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.25,Global.screenW * 0.8333 ,Global.screenH * 0.0625	), qrRewards["MISSION"].ToString(), lvlUpLabel);
				
				if( GUI.Button( Rect( Global.screenW * 0.4854 ,Global.screenH * 0.8125,Global.screenW * 0.16666 ,Global.screenH * 0.0625 ), "Continue", styleOrangeBut ) )
					{
						currentScreen = SCREEN_BOSS;
					}
				
				GUI.EndGroup();
			
			break;
			case SCREEN_BOSS:
				if( !qrRewards.ContainsKey( "MONSTER" ) )
					{
						qrRewards = null;
						return;
					}
				
				GUI.BeginGroup(Rect(Global.screenW * 0.2646 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09));
				lvlUpLabel.normal.textColor = Color.white;
				GUI.Label( Rect( Global.screenW * 0.052 ,Global.screenH * 0.175, Global.screenW * 0.78125 ,Global.screenH * 0.09375 ), "Boss encounter: ", guiStyle3 );
				GUI.Label(Rect(Global.screenW * 0.052, Global.screenH * 0.375,Global.screenW * 0.3125, Global.screenH * 0.0625), qrRewards["MONSTER"].ToString(), lvlUpLabel);

				if( GUI.Button( Rect( Global.screenW * 0.2979 ,Global.screenH * 0.8125,Global.screenW * 0.1666 ,Global.screenH * 0.078125 ), "Cancel", styleOrangeBut ) )
					{
						qrRewards = null;
					}
				if( GUI.Button( Rect( Global.screenW * 0.4854 ,Global.screenH * 0.8125,Global.screenW * 0.1666 ,Global.screenH * 0.078125 ), "Fight", styleOrangeBut ) )
					{
						scriptMissions.GoMission = null;
						Global.self.FightMob( qrRewards[ "MONSTER" ], 1 );
					}
				GUI.EndGroup();	
						
			break;
			case SCREEN_FAILED:
			
				GUI.BeginGroup( Rect( Global.screenW * 0.2646 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09 ) );
				lvlUpLabel.normal.textColor = Color.white;
				GUI.Label( Rect( Global.screenW * 0.052 ,Global.screenH * 0.175, Global.screenW * 0.78125 ,Global.screenH * 0.09375 ), "QR code scan failed, try again!", guiStyle3 );
				
				if( GUI.Button( Rect( Global.screenW * 0.4854 ,Global.screenH * 0.8125,Global.screenW * 0.1666 ,Global.screenH * 0.078125 ), "Continue", styleOrangeBut ) )
					{
						qrRewards = null;
					}
				GUI.EndGroup();
				
			break;
			case SCREEN_INVALID:
			
				GUI.BeginGroup( Rect( Global.screenW * 0.2646 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09 ) );
				lvlUpLabel.normal.textColor = Color.white;
				GUI.Label( Rect( Global.screenW * 0.052 ,Global.screenH * 0.175,Global.screenW * 0.78125 ,Global.screenH * 0.09375 ), "Invalid QR Code", guiStyle3 );
				GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3125,Global.screenW * 0.625 ,Global.screenH * 0.0625), qrRewards["QRCODE"].ToString(), lvlUpLabel);
				
				if( GUI.Button( Rect( Global.screenW * 0.4854 ,Global.screenH * 0.8125,Global.screenW * 0.1666 ,Global.screenH * 0.078125 ), "Continue", styleOrangeBut ) )
					{
						qrRewards = null;
					}
				GUI.EndGroup();
				
			break;
			case SCREEN_COOLDOWN:
				GUI.BeginGroup( Rect( Global.screenW * 0.2646 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09 ) );
				lvlUpLabel.normal.textColor = Color.white;
				GUI.Label( Rect( Global.screenW * 0.052 ,Global.screenH * 0.175,Global.screenW * 0.78125 ,Global.screenH * 0.09375 ), "Too soon", guiStyle3 );
				lvlUpLabel.wordWrap = true; 
				GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3125,Global.screenW * 0.625 ,Global.screenH * 0.1875), qrRewards["COOLDOWN"].ToString(), lvlUpLabel);
				lvlUpLabel.wordWrap = false;
				
				if( GUI.Button( Rect( Global.screenW * 0.4854 ,Global.screenH * 0.8125,Global.screenW * 0.1666 ,Global.screenH * 0.078125 ), "Continue", styleOrangeBut ) )
					{
						qrRewards = null;
					}
				GUI.EndGroup();
				
			break;
			case SCREEN_PAYEDMISSION:
				GUI.BeginGroup( Rect( Global.screenW * 0.2646 ,Global.screenH * 0.05,Global.screenW * 0.8333 ,Global.screenH * 1.09 ) );
				lvlUpLabel.normal.textColor = Color.white;
				GUI.Label( Rect( Global.screenW * 0.052 ,Global.screenH * 0.175,Global.screenW * 0.78125 ,Global.screenH * 0.09375 ), "Payed mission", guiStyle3 );
				lvlUpLabel.wordWrap = true; 
				GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3125,Global.screenW * 0.625 ,Global.screenH * 0.1875), qrRewards["COST"].ToString(), lvlUpLabel);
				
				if( qrRewards.ContainsKey( "NOMONEY" ) )
					GUI.Label( Rect( Global.screenW * 0.052 ,Global.screenH * 0.4375,Global.screenW * 0.625 ,Global.screenH * 0.125 ), qrRewards[ "NOMONEY" ].ToString(), lvlUpLabel );
				else
					if( GUI.Button( Rect( Global.screenW * 0.4854 ,Global.screenH * 0.8125,Global.screenW * 0.1666 ,Global.screenH * 0.078125 ), "Activate", styleOrangeBut ) )
						{
							var mission : Mission = qrRewards[ "MISSION" ];
							Global.myChar.Money -= mission.mCost;
							mission.mCost = 0;
							ActivateMission( mission );
							qrRewards = null;				
						}			
				lvlUpLabel.wordWrap = false;
			
				if( GUI.Button( Rect( Global.screenW * 0.2979 ,Global.screenH * 0.8125,Global.screenW * 0.1666 ,Global.screenH * 0.07125), "Cancel", styleOrangeBut ) )
					{
						qrRewards = null;
					}				
				GUI.EndGroup();
				
			break;
		}
	}
		

function ActivateQRReward( str : String )
{
	if( str == "" ) //failed scan show this..
		{
			//show failed message
			qrRewards = new Hashtable();
			currentScreen = SCREEN_FAILED;
			return;
		}
		
	var reqText : String = "";
	var the_url = Global.server + "/mmo_iphone/activate_qr_reward.php?qr_code=" + WWW.EscapeURL(str) + "&player_id=" + Global.myChar.id;
	print(WWW.EscapeURL(str) + "WWW.EscapeURL(str)");
	var request : WWW = new WWW( the_url );
	yield request;
	
	while( request.error && request.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			request = new WWW( the_url );
			yield request;
		}
	Debug.Log( "QR response: " + request.text );
	reqText = request.text;
	reqText = Regex.Replace(reqText, "\n", "");
	StopCamera();
	
	if( !reqText.Contains( "-" ) ) //qr code not found
		{
			if( reqText.Contains( "Time left" ) )
				{
					var timeLeft: String[] = Regex.Split( reqText, ":" );
					currentScreen = SCREEN_COOLDOWN;
					qrRewards = new Hashtable();
					qrRewards.Add( "COOLDOWN", "You need to wait " + timeLeft[1] + " before scanning this code again." );
					return;
				}
			currentScreen = SCREEN_INVALID;
			qrRewards = new Hashtable();
			qrRewards.Add( "QRCODE", str );
			return;
		}		

	//response format: XP-MISSION-MONSTER-CASH-ITEM
	//if level up XP format will be: "XP"/XP/BRT/ACC/FORT/DEF/Special
	qrRewards = new Hashtable();
	var resp : String[] = Regex.Split( reqText, "-" );
    Debug.Log("resp e "+resp[2]);
    
    if(resp[2]=="ZombieOwen") Global.CES = 1;
        else if(resp[2]=="ZombieDavid") Global.CES = 2;
    
    Debug.Log("Global.CES e "+Global.CES);     
	
	if( resp[0] != "0" && resp[0] != "" )
		{
			
			if( resp[0].Contains("/" ) ) //if level up, first value is total xp, else xp gained
				{
					var lvlStr : Array = Regex.Split( resp[0], "/" );				
					qrRewards.Add( "XP", lvlStr[0] );
				    var t :int;
				    t = parseInt( lvlStr[1].ToString() );
					Global.myChar.EXP = t;
					lvlStr[0] = "XP";
					ShowLevelUp( lvlStr );				
				}
			else
				{
					qrRewards.Add( "XP", resp[0] );
	                Debug.Log("resp[0] = "+resp[0]);
					Global.myChar.EXP += parseInt( resp[0] );
					Debug.Log( "We have gained XP: " + resp[0] + "   " +  parseInt( resp[0] ) );
				}
			
		}
	if( resp[1] != "0" && resp[1] != "" )
		qrRewards.Add( "MISSION", resp[1] );
	if( resp[2] != "0" && resp[2] != "" )
		qrRewards.Add( "MONSTER", resp[2] );
	if( resp[3] != "0" && resp[3] != "")
		{
			qrRewards.Add( "CASH", resp[3] );
			Global.myChar.Money += parseInt( resp[3] );
		}
	if( resp[4] != "0" && resp[4] != "" )
		{
			qrRewards.Add( "ITEM", resp[4] );
			Inventory.self.UpdateEqInvItems();
		}
	
	if( ( resp[0] != "0" && resp[0] != "" ) || ( resp[3] != "0" && resp[3] != "" ) || ( resp[4] != "0" && resp[4] != "" ) ) //if we have xp cash or item show first screen, else show mission/boss
		currentScreen = SCREEN_GAINED;
	else
		currentScreen = SCREEN_MISSION; 
}

function ClearBuilding()
{
    getBuildings = true; 
    var geoURL = "https://api.foursquare.com/v2/venues/search?ll="+scriptMain.lat+","+scriptMain.lon+"&radius=10&llAcc=10&oauth_token=E40TXSFWZHRDRZA4VYHWJUVYWHQ1BBFXW25FESZVYTLIFAC4&v=20120119";
    print("Latitudine si longitudine" + scriptMain.lat+","+scriptMain.lon);
    var request : WWW = new WWW( geoURL );
	yield request;
	
	while(request.error && request.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			request = new WWW( geoURL );
			yield request;
		}
		print("request.text=======+++++"+request.text);
    var fourDWL : String;
    fourDWL = request.text;
    
    for (var ii:int = 0; ii<Global.venuesTex.length; ii++) {
    	if (Regex.IsMatch(request.text,Global.venuesTex[ii].name)) 
    	{
    		print("Global.venuesTex[ii].name             " + Global.venuesTex[ii].name);
    		Global.venueTexture = Global.venuesTex[ii];
    		Global.switchDefTex = true;
    	}
    }
    var count = 0;
    var name ="";
    var i = fourDWL.IndexOf("name");
    
    while (i > 0)
	    {
	        if(fourDWL[i+7]!='.')
		        {
			         name = "";
			         i = i + 7 ;
				         while(fourDWL[i]!='"')
					         {
						          name = name + fourDWL[i];
						        //  print("numele dourDWL[i]" + name);
						          i++;
					         }
			          buildingArray[count++] = name;
		        }
		   	 i = fourDWL.IndexOf("name",i+1);
	    }
}

class Mission
{
    var itsDone :int;
	var missionId : int;
	var name : String;
	var level : int;
	var toDo : String;
	var what : String;
	var quant : float;
	var reward : String;
	var rewardQuant : int;
	var done : float;
	var percentDone : float;
	var mActive : boolean;
	var interfaceDescription : String;
	var mCost : int; //activation cost ( player must pay cash to activate this quest )
	var mInfo : String;
	var drop_special_item_id : int;
	
	function SetData( inID : int, inName : String, inLevel : int, td : String, inQaunt : float, inRewardType, inRewardQ : int, inDone : float, active : boolean, cost : int, m_info : String, special_item : int  )
		{
			missionId = inID;
			name = inName;
			level = inLevel;
			itsDone = 0;
			
			if (td.Contains("/")) 
	            {
					var aux : String[] = Regex.Split(td,"/");
					toDo = aux[0].ToUpper();
					what = aux[1].ToUpper();
	            }
			else 
	            {
					toDo = td.ToUpper();
					what="";
	            }  
	            
			quant = inQaunt;
			reward = inRewardType;
			rewardQuant = inRewardQ;
			if( toDo != "MOVE" )
				done = inDone;
			else
				done = Global.distFromHomebase;
			percentDone = 0;
			mActive = active;
			interfaceDescription = name + " ("+ level +")";
			calcPercent();
			mCost = cost;
			mInfo = m_info;
			drop_special_item_id = special_item;
		}

	
	public function Mission( inID : int, inName : String, inLevel : int, td : String, inQaunt : float, inRewardType, inRewardQ : int, inDone : float, active : boolean, cost : int, m_info : String, special_item : int )
		{
			SetData(inID, inName, inLevel, td, inQaunt, inRewardType, inRewardQ, inDone, active, cost, m_info, special_item);
			
		}

	function calcPercent()
		{
			percentDone = 100*done/quant;
		}
	
	function getPercentDone() : float
		{
			return 100 * done / quant;
		}
 
	public function UpdateMission( amount : float )
		{
			//THIS MUST BE SENT TO HELL
			done += amount;
			calcPercent();
	        Debug.Log("Percent "+getPercentDone());
			//Global.myChar.EXP += rewardQuant; //for now only add xp;
			//Global.save_stats(); 
			//PostToServer();
		}
 
	public function SetQuant(amount : float)
		{
			done = amount;
			this.calcPercent();
		}
	
	public function ToString()
		{
			var s : String = "";
			s = name + " " + reward + " " + rewardQuant + " " + done + "/" + quant;
			return s;
		}
	
	public function RewardString()
		{
			return rewardQuant+reward;
		}
  
}

function UpdateVector( V:int[],j,k,l)
{
	V[0] = j;
	V[1] = k;
	V[2] = l;
}

function compara_misiune_selectata( misiune_selectata : String, categorie_misiune : String) : boolean
{ 
	if ( misiune_selectata == "DROP" && categorie_misiune == "KILL" )
			return true;
	return misiune_selectata.ToUpper().Contains(categorie_misiune);
}

function PutMissionInWindow( AMission : Mission , i : int , j : int, k : int, l : int, realMissionLength : int)
{
	var V: int[] = new int[3];

	if( AMission.toDo.ToUpper().Contains("CRAFT") )
		{
			if ( !AMission.mActive )
	    		ActivateMission(AMission);
		}
	if (AMission.level<=Global.myChar.LVL && AMission.itsDone != 1 && compara_misiune_selectata(AMission.toDo,chooseMission) )//AMission.toDo.ToUpper().Contains(chooseMission)) 
	{ 
	    realMissionLength++;

	    if(AMission.toDo=="MOVE")                // move = exploration       !!!
		   {	
		   
		       GUI.DrawTexture( new Rect( 0, Global.screenH * 0.2031 * j, Global.screenW * 0.65625 ,Global.screenH * 0.1875 ), texElementBgSelBlue, ScaleMode.StretchToFill );
			   GUI.Label(new Rect(Global.screenW * 0.03125 ,Global.screenH * 0.2031*j+Global.screenH * 0.09375,Global.screenW * 0.4166 ,Global.screenH * 0.1093),AMission.interfaceDescription,blackText);
			   GUI.Label(new Rect(Global.screenW * 0.2916 ,Global.screenH * 0.2031*j+Global.screenH * 0.09375,Global.screenW * 0.1041 ,Global.screenH * 0.1093),AMission.RewardString(),blueText);
			   GUI.DrawTexture(new Rect(Global.screenW * 0.2916 ,Global.screenH * 0.2031*j+Global.screenH * 0.0333,Global.screenW * 0.2208 ,Global.screenH * 0.0218 ) , bar_grey , ScaleMode.StretchToFill);
		            
		   } // pentru misiuni desenez culorile specifice fiecarui tip              
	   	if(AMission.toDo=="KILL" || AMission.toDo == "DROP")			// kill = survival
			{	 //Global.screenW * 0.0104 ,Global.screenH * 0.0156,Global.screenW * 0.1041 ,Global.screenH * 0.09375
				GUI.DrawTexture( new Rect( 0, Global.screenH * 0.2968 * k, Global.screenW * 0.65625 ,Global.screenH * 0.28125 ), texElementBgSelRed, ScaleMode.StretchToFill );
		       
		        if ( GUI.Button(Rect(Global.screenW * 0.0104, Global.screenH * 0.2968*k+Global.screenH * 0.0156,Global.screenW * 0.1041 ,Global.screenH * 0.09375),"Info") )     // de pus butonul cu prioritate
			        {
			        	GoMission = AMission;
			        	InfoText = "\tTEST misiuneblabla\n\tdfsdfdsfjksdjkfsdfhdsfdhsffdsjkfjk";
			        	InfoWindowActivated = !InfoWindowActivated;
			        } 
			         
		        GUI.Label(new Rect(Global.screenW * 0.1145, Global.screenH * 0.2968*k+Global.screenH * 0.03125,Global.screenW * 0.25,Global.screenH * 0.1093),AMission.interfaceDescription,blackText);
		        GUI.Label(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2968*k+Global.screenH * 0.1375,Global.screenW * 0.4166,Global.screenH * 0.1093),AMission.interfaceDescription,blackText);
		        GUI.Label(new Rect(Global.screenW * 0.2916, Global.screenH * 0.2968*k+Global.screenH * 0.09375,Global.screenW * 0.1041,Global.screenH * 0.1093),AMission.RewardString(),blueText);
		        GUI.DrawTexture(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2968*k+Global.screenH * 0.1125,Global.screenW * 0.2206,Global.screenH * 0.0218 ) , bar_grey , ScaleMode.StretchToFill);    
		    }      
	    if(AMission.toDo=="CRAFT")                 // craft
			{ 
		        GUI.DrawTexture( new Rect( 0, Global.screenH * 0.2031 * l, Global.screenW * 0.65625, Global.screenH * 0.1875 ), texElementBgSelOrange, ScaleMode.StretchToFill );
		        GUI.Label(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2031*l+Global.screenH * 0.09375,Global.screenW * 0.4166 ,Global.screenH * 0.1093),AMission.interfaceDescription,blackText);
		        GUI.Label(new Rect(Global.screenW * 0.2916, Global.screenH * 0.2031*l+Global.screenH * 0.0406,Global.screenW * 0.1041 ,Global.screenH * 0.1093),AMission.RewardString(),blueText);
		        GUI.DrawTexture(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2031*l+Global.screenH * 0.05,Global.screenW * 0.2208 ,Global.screenH * 0.0218 ) , bar_grey , ScaleMode.StretchToFill);           
		    }        
	    if(AMission.toDo=="BOSS")
			{
		        GUI.DrawTexture( new Rect( 0, Global.screenH * 0.2031 * i, Global.screenW * 0.65625, Global.screenH * 0.1875 ), texElementBgSelBlack, ScaleMode.StretchToFill );
		        GUI.Label(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2031*i+Global.screenH * 0.09375,Global.screenW * 0.4166 ,Global.screenH * 0.1093),AMission.interfaceDescription,whiteText);
		        GUI.Label(new Rect(Global.screenW * 0.2916, Global.screenH * 0.2031*i+Global.screenH * 0.0406,Global.screenW * 0.1041 ,Global.screenH * 0.1093),AMission.RewardString(),white2Text);
		        GUI.DrawTexture(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2031*i+Global.screenH * 0.05,Global.screenW * 0.2208 ,Global.screenH * 0.0218 ) , bar_grey , ScaleMode.StretchToFill);        
		    }        
	    if(chooseMission=="KILL")
	        if( ( k + 1 ) * 95 < scrollPosition.y || ( k - 1 ) * 95 > scrollPosition.y + 320 ) 
	        	{
	        		UpdateVector(V,j,k,l);
	        		return V;
	        	}
	        else if(chooseMission == "CRAFT")
	             if( ( l + 1 ) * 65 < scrollPosition.y || ( l - 1 ) * 65 > scrollPosition.y + 320 )
		             {
		             	UpdateVector(V,j,k,l);
		             	return V;
		             }
	             else if(chooseMission == "MOVE")
	                  if( ( j + 1 ) * 65 < scrollPosition.y || ( j - 1 ) * 65 > scrollPosition.y + 320 )
		                  {
		                  	UpdateVector(V,j,k,l);
		                  	return V;
		                  }
			/*	GUI.Label(new Rect(15, 65*i+30,200,35),Global.missionsArray[i].interfaceDescription,blackText);
				GUI.Label(new Rect(140, 65*i+13,50,35),Global.missionsArray[i].RewardString(),blueText);
				GUI.DrawTexture(new Rect(15, 65*i+16,106,7 ) , bar_grey , ScaleMode.StretchToFill); */
				
		var done : int;
		var td : int;
		var greenBarScale : float = AMission.done * 1.0f/AMission.quant;
		if (greenBarScale > 1) 
				greenBarScale =1;
		if( AMission.toDo.ToUpper().Contains("MOVE") )
			{
				if ( !AMission.mActive )
					ActivateMission(AMission);
				td = 1;
				
				if( greenBarScale < 1 ) 
					done = 0;
				else
					done = 1;
						//done = parseInt(greenBarScale);
			}
		else
			{
				td = AMission.quant;
				done = AMission.done;
			}
	    if(chooseMission=="KILL")
		    {	 //Global.screenW * 0.3645, Global.screenH * 0.2031 * k + Global.screenH * 0.05,Global.screenW * 0.0416 ,Global.screenH * 0.0625
		    	GUI.Label(new Rect(Global.screenW * 0.3645, Global.screenH * 0.2968 * k + Global.screenH * 0.0729,Global.screenW * 0.0416 ,Global.screenH * 0.0625),done.ToString(),fractionStyle1);
		        GUI.Label(new Rect(Global.screenW * 0.427, Global.screenH * 0.2968 * k + Global.screenH * 0.0958,Global.screenW * 0.0416 ,Global.screenH * 0.0625),td.ToString(), fractionStyle2 );	
		    }
	    else if (chooseMission=="MOVE")
	    	{
	           GUI.Label(new Rect(Global.screenW * 0.3645, Global.screenH * 0.2031 * j + Global.screenH * 0.05,Global.screenW * 0.0416 ,Global.screenH * 0.0625),done.ToString(),fractionStyle1);
	           GUI.Label(new Rect(Global.screenW * 0.427, Global.screenH * 0.2031 * j + Global.screenH * 0.0968,Global.screenW * 0.0416 ,Global.screenH * 0.0625),td.ToString(), fractionStyle2 );	
	        }
	    else if (chooseMission == "CRAFT")
	        {
	           GUI.Label(new Rect(Global.screenW * 0.3645, Global.screenH * 0.2031 * l + Global.screenH * 0.05,Global.screenW * 0.0416 ,Global.screenH * 0.0625),done.ToString(),fractionStyle1);
	           GUI.Label(new Rect(Global.screenW * 0.427, Global.screenH * 0.2031 * l + Global.screenH * 0.0968,Global.screenW * 0.0416 ,Global.screenH * 0.0625),td.ToString(), fractionStyle2 );	
	           
	        }
		var aux = GUI.color.a;
		GUI.color.a = greenBarScale/2 + 0.5;
	   
	    if(chooseMission=="KILL")
		    {	
				GUI.Label(new Rect(Global.screenW * 0.3645, Global.screenH * 0.2968 * k + Global.screenH * 0.0729,Global.screenW * 0.0416 ,Global.screenH * 0.0625),done.ToString(),fractionStyle1);
			    GUI.Label(new Rect(Global.screenW * 0.427, Global.screenH * 0.2968 * k + Global.screenH * 0.0958,Global.screenW * 0.0416 ,Global.screenH * 0.0625),td.ToString(), fractionStyle2 );	
			    GUI.DrawTexture(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2968 * k + Global.screenH * 0.1093,Global.screenW * 0.2208*greenBarScale,Global.screenH * 0.0218 ) , bar_green , ScaleMode.StretchToFill);   // bara green ( cat e complet din quest )
		    }
	  	else if(chooseMission == "CRAFT")
		    {
		    	GUI.Label(new Rect(Global.screenW * 0.3645, Global.screenH * 0.2031 * l + Global.screenH * 0.05,Global.screenW * 0.0416 ,Global.screenH * 0.0625),done.ToString(),fractionStyle1);
		        GUI.Label(new Rect(Global.screenW * 0.427, Global.screenH * 0.2031 * l + Global.screenH * 0.0968,Global.screenW * 0.0416 ,Global.screenH * 0.0625),td.ToString(), fractionStyle2 );	
		        GUI.DrawTexture(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2031 * l + Global.screenH * 0.05,Global.screenW * 0.2208*greenBarScale,Global.screenH * 0.0218 ) , bar_green , ScaleMode.StretchToFill);
		    }
	    else if(chooseMission == "MOVE") 
		    {
		         GUI.Label(new Rect(Global.screenW * 0.3645, Global.screenH * 0.2031 * j + Global.screenH * 0.05,Global.screenW * 0.0416 ,Global.screenH * 0.0625),done.ToString(),fractionStyle1);
		         GUI.Label(new Rect(Global.screenW * 0.427, Global.screenH * 0.2031 * j + Global.screenH * 0.0968,Global.screenW * 0.0416 ,Global.screenH * 0.0625),td.ToString(), fractionStyle2 );	
		         GUI.DrawTexture(new Rect(Global.screenW * 0.03125, Global.screenH * 0.2031 * j + Global.screenH * 0.05,Global.screenW * 0.2208*greenBarScale,Global.screenH * 0.0218 ) , bar_green , ScaleMode.StretchToFill);
		    }
                
		GUI.color.a = aux;
				
		if( AMission.getPercentDone() > 99.99f ) //it's done
			{   
		       if(chooseMission=="KILL") 
		       
					if (GUI.Button (new Rect(Global.screenW * 0.4687, Global.screenH * 0.2968 * k + Global.screenH * 0.0718,Global.screenW * 0.1692 ,Global.screenH * 0.07625),"",doneStyle))
						{
				          // print("Intra aiciiiiii");
				             AMission.itsDone = 1;
				            //scriptLevelUp.CompleteMission( i );
				            CompleteMission( i );
				           //  print("Intra aiciiiiii");
			                if ( AMission.toDo == "DROP" )
								{
									DeleteUniqueItemFromQuest(AMission);
								}
			          	}
	            if(chooseMission=="MOVE")
					if (GUI.Button (new Rect(Global.screenW * 0.4687,Global.screenH * 0.2031 * j + Global.screenH * 0.0406,Global.screenW * 0.1692 ,Global.screenH * 0.07625),"",doneStyle))
						{print("Intra aaaaaaaiciiiiii");
		                    AMission.itsDone = 1;
		                 //  scriptLevelUp.CompleteMission( i );
		                   CompleteMission( i );
		              	}
	            if(chooseMission=="CRAFT")
					if (GUI.Button (new Rect(Global.screenW * 0.4687,Global.screenH * 0.2031 * l + Global.screenH * 0.0406,Global.screenW * 0.1692 ,Global.screenH * 0.07625),"",doneStyle))
						{print("Intra aiccccccccciiiiii");
	                        AMission.itsDone = 1;
	                       // scriptLevelUp.CompleteMission( i );
	                        CompleteMission( i );
	                   	}                                                                                                                                
			    k++;
			    l++;
			    j++;
		    }
		else
		{   
			var t : Mission;
		    t = Global.missionsArray[ i ];
	      
	          if(chooseMission=="KILL")    // misiune survival
		        {
					GUI.DrawTexture( Rect( Global.screenW * 0.4687, Global.screenH * 0.2968 * k + Global.screenH * 0.0718,Global.screenW * 0.1692 ,Global.screenH * 0.07625 ), texDoneInactive, ScaleMode.StretchToFill );	
					
					if( GUI.Button( Rect( 0, Global.screenH * 0.2031 * k + Global.screenH * 0.0718, Global.screenW * 0.4583 ,Global.screenH * 0.1875), "", GUIStyle.none ) )
			            {               
			            	ExitMissions();
							if( !t.mActive )
								{
									ActivateMission( AMission );
									// 
				                }
							else
								{   
									ExitMissions();
									Debug.Log( "Mission : " + AMission.toDo + " - " + AMission.what );
									if( AMission.toDo == "KILL" || AMission.toDo == "DROP" )
										{
											scriptMissions.GoMission = AMission;
											//Global.self.FightMob( AMission.what );
											Global.self.StartMission( AMission );
										}						
								}
						}
					k++;
				}
	        if(chooseMission=="MOVE")    // misiune exploration
		        {
					GUI.DrawTexture( Rect( Global.screenW * 0.4687,Global.screenH * 0.2031 * j + Global.screenH * 0.0406,Global.screenW * 0.1692 ,Global.screenH * 0.07625 ), texDoneInactive, ScaleMode.StretchToFill );
						
					if( GUI.Button( Rect( 0, Global.screenH * 0.2031 * j + Global.screenH * 0.0406, Global.screenW * 0.4583 ,Global.screenH * 0.1875 ), "", GUIStyle.none ) )
			            {
			        	    ExitMissions();
							
							if( !AMission.mActive )
								{
									ActivateMission( AMission );
				                }
							else
								{   
									ExitMissions();
									Debug.Log( "Mission : " + AMission.toDo + " - " + AMission.what );
									
									if( AMission.toDo == "KILL" || AMission.toDo == "DROP" )
										{
											scriptMissions.GoMission = AMission;
											Global.self.StartMission( AMission );
										}					
								}					
						}
					j++;
				}
	        if(chooseMission=="CRAFT")    // misiune craft
		        {
		        	t = Global.missionsArray[ i ];
					GUI.DrawTexture( Rect( Global.screenW * 0.4687,Global.screenH * 0.2031 * l + Global.screenH * 0.0406,Global.screenW * 0.1692 ,Global.screenH * 0.07625 ), texDoneInactive, ScaleMode.StretchToFill );	
						
					if( GUI.Button( Rect( 0, Global.screenH * 0.2031 * j + Global.screenH * 0.0406, Global.screenW * 0.4583 ,Global.screenH * 0.1875 ), "", GUIStyle.none ) )
			            {
			        	    ExitMissions();
							if( !t.mActive )
								{
									ActivateMission( AMission );
				                }
							else
								{   
									ExitMissions();
									Debug.Log( "Mission : " + AMission.toDo + " - " + AMission.what );
									if( AMission.toDo == "KILL" || AMission.toDo == "DROP" )
										{
											scriptMissions.GoMission = AMission;
											Global.self.StartMission( AMission );
										}					
								}
						  	l++;
			            }
				}
		}   
	}
	
	UpdateVector(V,j,k,l);
	return V;
}

function delete_special_item(itemId : int)
{
	var index : int = Inventory.self.find_item_from_inventory(itemId);
	
	if ( index != -1 )
		{
			Inventory.self.itemsInInventory[ index ] = Item();
			yield Inventory.self.SendInventoryItems();
		}

	/*var the_url = Global.server + "/mmo_iphone/update_spec_item.php?id_item=" + itemId + "&id_user=" + Global.myChar.id + "&delete=sterge";
	var update : WWW = new WWW(the_url);
	yield update;
	while (update.error && update.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying" );
		update = new WWW(the_url);
		yield update;
	}*/
}

function DeleteUniqueItemFromQuest( mission : Mission)
{
	yield delete_special_item(mission.drop_special_item_id);
	yield scriptBattle.scriptInventory.GetInventoryItems();
}