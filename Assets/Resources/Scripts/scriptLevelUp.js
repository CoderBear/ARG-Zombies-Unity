var guiStyle		: GUIStyle;		// font size 32
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

function OnGUI(){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	if(bLoading){
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
	
	if(GUI.Button(Rect(200, 295, 30, 30), "-", guiStyle2)){
		if(nDEF>0){
			nPts++;
			nDEF--;
		}
	}
	if(GUI.Button(Rect(255, 295, 30, 30), "+", guiStyle2)){
		if(nPts>0){
			nPts--;
			nDEF++;
		}
	}

	if(GUI.Button(Rect(200, 265, 30, 30), "-", guiStyle2)){
		if(nFORT>0){
			nPts++;
			nFORT--;
		}
	}
	if(GUI.Button(Rect(255, 265, 30, 30), "+", guiStyle2)){
		if(nPts>0){
			nPts--;
			nFORT++;
		}
	}
	
	if(GUI.Button(Rect(200, 235, 30, 30), "-", guiStyle2)){
		if(nACC>0){
			nPts++;
			nACC--;
		}
	}
	if(GUI.Button(Rect(255, 235, 30, 30), "+", guiStyle2)){
		if(nPts>0){
			nPts--;
			nACC++;
		}
	}
	
	if(GUI.Button(Rect(200, 205, 30, 30), "-", guiStyle2)){
		if(nBRT>0){
			nPts++;
			nBRT--;
		}
	}
	if(GUI.Button(Rect(255, 205, 30, 30), "+", guiStyle2)){
		if(nPts>0){
			nPts--;
			nBRT++;
		}
	}

	// Back
	style.active.background = texAccept;
	style.normal.background = texAcceptP;
	if(GUI.Button(Rect(320, 240, 125, 52), "", style)){
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
	Log.OnGUI();
}