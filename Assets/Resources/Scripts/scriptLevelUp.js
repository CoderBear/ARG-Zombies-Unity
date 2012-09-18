/*var guiStyle		: GUIStyle;		// font size 32
var guiStyle2		: GUIStyle;		// font size 20
var guiStyle3		: GUIStyle;		// font size 20, centered
var style			: GUIStyle;		// button style
var nPts			: int;			// points left to spend
var nFORT			: int;			// fortitude for HP
var nBRT			: int;			// brutality for attack
var nACC			: int;			// accuracy for hit
var nDEF			: int;			// defense for evasion

var texAccept		: Texture2D;
var texAcceptP		: Texture2D;
var texLoading		: Texture2D;
var bLoading		: boolean;

function Start(){
	var values : String[];
	bLoading = false;
	nPts = 4;
}

function AddMissionToCharacter()
{
	Debug.Log("adding mission , player id:" + Global.myChar.id + " , level: " + Global.myChar.LVL);
	var url : String = Global.server + "/mmo_iphone/add_player_mission.php?player_id="+Global.myChar.id+"&level=" + Global.myChar.LVL;
	var req : WWW=new WWW(url);
	yield req;
	
	while (req.error && req.error.ToString().Contains("Resolving host timed out"))
	    {
			Debug.Log( "Retrying" );
			req = new WWW(url);
			yield req;
	    }
}

function OnGUI()
{
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	if(bLoading)
		{
			GUI.DrawTexture (Rect(0,0,480,320), texLoading, ScaleMode.StretchToFill, true, 1);
			return;
		}

	GUI.Label(Rect(40, 85, 400, 100), "How would you like to invest\nyour points?", guiStyle);
	GUI.Label(Rect(40, 175, 400, 100), "Available", guiStyle2);
	GUI.Label(Rect(40, 205, 400, 100), "Brutality", guiStyle2);
	GUI.Label(Rect(40, 235, 400, 100), "Accuracy", guiStyle2);
	GUI.Label(Rect(40, 265, 400, 100), "Fortitude", guiStyle2);
	GUI.Label(Rect(40, 295, 400, 100), "Defense", guiStyle2);
	GUI.Label(Rect(210, 175, 40, 100), "" + nPts, guiStyle3);
	GUI.Label(Rect(210, 205, 40, 30), "" + (Global.myChar.BRT + nBRT), guiStyle3);
	GUI.Label(Rect(210, 235, 40, 30), "" + (Global.myChar.ACC + nACC), guiStyle3);
	GUI.Label(Rect(210, 265, 40, 30), "" + (Global.myChar.FORT + nFORT), guiStyle3);
	GUI.Label(Rect(210, 295, 40, 30), "" + (Global.myChar.DEF + nDEF), guiStyle3);
	
	if(GUI.Button(Rect(200, 295, 30, 30), "-", guiStyle2))
		{
			if(nDEF>0)
				{
					nPts++;
					nDEF--;
				}
		}
	if(GUI.Button(Rect(255, 295, 30, 30), "+", guiStyle2))
		{
			if(nPts>0)
				{
					nPts--;
					nDEF++;
				}
		}
	if(GUI.Button(Rect(200, 265, 30, 30), "-", guiStyle2))
		{
			if(nFORT>0)
				{
					nPts++;
					nFORT--;
				}
		}
	if(GUI.Button(Rect(255, 265, 30, 30), "+", guiStyle2))
		{
			if(nPts>0)
				{
					nPts--;
					nFORT++;
				}
		}
	if(GUI.Button(Rect(200, 235, 30, 30), "-", guiStyle2))
		{
			if(nACC>0)
				{
					nPts++;
					nACC--;
				}
		}
	if(GUI.Button(Rect(255, 235, 30, 30), "+", guiStyle2))
		{
			if(nPts>0)
				{
					nPts--;
					nACC++;
				}
		}
	if(GUI.Button(Rect(200, 205, 30, 30), "-", guiStyle2))
		{
			if(nBRT>0)
				{
					nPts++;
					nBRT--;
				}
		}
	if(GUI.Button(Rect(255, 205, 30, 30), "+", guiStyle2))
		{
			if(nPts>0)
				{
					nPts--;
					nBRT++;
				}
		}

	// Back
	style.active.background = texAccept;
	style.normal.background = texAcceptP;
	if(GUI.Button(Rect(320, 240, 125, 52), "", style))
		{
			Global.myChar.HP += nFORT*5 + 10;
			Global.myChar.ATK += nBRT*2 + 1;
			
			//Global.myChar.MANA += nINT*10;
			//Global.myChar.ARMOUR += nAGI*0.3;
			
			Global.myChar.BRT += nBRT;
			Global.myChar.ACC += nACC;
			Global.myChar.FORT += nFORT;
			Global.myChar.DEF += nDEF;
			Global.myChar.EVASION = (Global.myChar.DEF/2.0) + (Global.myChar.LVL/10.0);
			
			if (Global.save_stats())
				{
					bLoading = true;
					AddMissionToCharacter();
					Application.LoadLevel("sceneMap");
				}
		}
	//Log.OnGUI();
}*/
/*static var levelUp : Array; 
static var bLevelUp : int;



var guiStyle 		: GUIStyle;
var guiStyle3		: GUIStyle;
var generalFrame	: GUIStyle;
var lvlUpLabel		: GUIStyle;
var styleOrangeBut	: GUIStyle;



var texLevelUpB		: Texture2D;



function Start()
{

}



static function CompleteMission( nr : int )
{
	var mission : Mission = Global.missionsArray[ nr ];
	var the_url = Global.server + "/mmo_iphone/complete_quest.php?mission_id=" + mission.missionId + "&player_id=" + Global.myChar.id;
	 print("Intra aiciiiiii");	
	
	var request : WWW = new WWW( the_url );
	yield request;
	 print("Intra aiciiiiii");
	while( request.error && request.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying" );
		request = new WWW( the_url );
		yield request;
	}
	
	 print("Intra aiciiiiii");
	Global.missionsArray.RemoveAt( nr );
	var response = Regex.Split(request.text,"<br />");		
	response = Regex.Split(response[0].Trim(), "-");

	 print("Intra aiciiiiii");
	if( response.length == 1 ) 
			return;
	 print("Intra aiciiiiii");

	if( response[0] == "XP" )
		{	
			if( response.length > 2 ) //level up
				{
					scriptLevelUp.levelUp = new Array();
					scriptLevelUp.levelUp.Add( Global.myChar.LVL + 1 );
					scriptLevelUp.levelUp.Add( response[2] ); //BRT
					scriptLevelUp.levelUp.Add( response[3] ); //ACC
					scriptLevelUp.levelUp.Add( response[4] ); //FORT
					scriptLevelUp.levelUp.Add( response[5] ); //DEF
					scriptLevelUp.levelUp.Add( response[6] ); //SPECIAL
					
					Global.myChar.LVL +=  1;
					Global.myChar.BRT +=  parseInt(  response[2].ToString() );
					Global.myChar.ACC += parseInt(  response[3].ToString() );
					Global.myChar.FORT += parseInt( response[4].ToString() );
					Global.myChar.DEF += parseInt( response[5].ToString() );
					Global.myChar.EXP = parseInt( response[1].ToString() );
					Global.myChar.CalculateHybridStats();
				}
			else
				{
					print(response[ 1 ] + "response[ 1 ]");
					Global.myChar.EXP += parseInt( response[ 1 ] );
				}
		}
}

/*
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
}*/

/*
function LoadMap()
{   
	LoadSceneScript.MoreMobsToFight = false;
	Inventory.ResetSelectedItem();
	yield StartCoroutine( Global.save_stats() );
	

	while( scriptGUICutScene.cutSceneActive ) 
		yield WaitForSeconds( 0.3 );
		
    Global.theScene = 3; // from battlescene to mapscene  
  
   
     if(scriptMissions.clearingBuildings)
                    LoadSceneScript.nrOfMobs++;
	
	Application.LoadLevel("LoadingScene");
	//SendInventoryItems();
	scriptMain.makeActiveOrInactive = true;
}*/


/*


function OnGUI()
{
		if(bLevelUp != 0)
		{	
			GUI.BeginGroup(Rect(Global.screenW * 0.2229 ,Global.screenH * 0.05,Global.screenW * 0.5541 ,Global.screenH * 0.9031));
			guiStyle.normal.textColor = Color(1, 1, 1, 1);
			
			if(bLevelUp == 1 ) //level up
				GUI.DrawTexture (Rect(0, 0, Global.screenW * 0.5541 ,Global.screenH * 0.9031), texLevelUpB, ScaleMode.StretchToFill, true, 1);
			else
				{
					GUI.Label( Rect( 0, 0, Global.screenW * 0.5541 ,Global.screenH * 0.9031), "" , generalFrame );
					GUI.Label( Rect( Global.screenW * 0.1041 ,Global.screenH * 0.0125,Global.screenW * 0.4166 ,Global.screenH * 0.0781 ), "Level Down", guiStyle );
				}
			 
			guiStyle.normal.textColor = Color(1, 1, 1, 1);
			GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.3156,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "Brutality", lvlUpLabel);
			GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.4187,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "Accuracy", lvlUpLabel);
			GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.5187,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "Fortitude", lvlUpLabel);
			GUI.Label(Rect(Global.screenW * 0.052 ,Global.screenH * 0.6187,Global.screenW * 0.3125 ,Global.screenH * 0.0625), "Defense", lvlUpLabel);
			//scriptInventory.RemoveItemStats(); 
			 
			GUI.Label(Rect(Global.screenW * 0.3229 ,Global.screenH * 0.3,Global.screenW * 0.0833 ,Global.screenH * 0.09375), ((Global.myChar.BRT ) > 0 ? "+" : "") + (Global.myChar.BRT ), guiStyle3);
			GUI.Label(Rect(Global.screenW * 0.3229 ,Global.screenH * 0.4,Global.screenW * 0.0833 ,Global.screenH * 0.09375), ((Global.myChar.ACC ) > 0 ? "+" : "") + (Global.myChar.ACC ), guiStyle3);
			GUI.Label(Rect(Global.screenW * 0.3229 ,Global.screenH * 0.5062,Global.screenW * 0.0833 ,Global.screenH * 0.09375), ((Global.myChar.FORT ) > 0 ? "+" : "") + (Global.myChar.FORT ), guiStyle3);
			GUI.Label(Rect(Global.screenW * 0.3229 ,Global.screenH * 0.6031,Global.screenW * 0.0833 ,Global.screenH * 0.09375), ((Global.myChar.DEF ) > 0 ? "+" : "") + (Global.myChar.DEF ), guiStyle3);
			//scriptInventory.AddItemStats();
			
			if( GUI.Button( Rect( Global.screenW * 0.2083 ,Global.screenH * 0.7187,Global.screenW * 0.1729 ,Global.screenH * 0.1031 ), "Continue", styleOrangeBut ) )
				{
				/*	//scriptInventory.RemoveItemStats();
					Global.myChar.HP += (Global.myChar.FORT )*5 + 10;
					print("Global.myChar.HP " + Global.myChar.HP);
					Global.myChar.ATK += (Global.myChar.BRT )*2 + 1;
					print("Global.myChar.ATK " + Global.myChar.ATK);
		            Global.myChar.EVASION = (Global.myChar.DEF/2.0) + (Global.myChar.LVL/10.0);
		            print("Global.myChar.EVASION " + Global.myChar.EVASION );
					//scriptInventory.AddItemStats();*/
		/*			Global.Hp_incercare = Global.myChar.HP;
					//Unlock Mission
					//AddMissionToCharacter();
					if( scriptBattle.bNewSpecialLearned != 0 )
						{
							scriptBattle.bShowNewSpecial = scriptBattle.bNewSpecialLearned;
							bLevelUp = 0;
						}
					else
						{ 
							//finalize_durations();
							LoadMap();
						}
				}
			GUI.EndGroup();
		}

}*/