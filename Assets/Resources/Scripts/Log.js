static var sLog : String;
static var nLog : int = 1;
static var show : boolean = false;
static var maxLines : int = 200;
static var scrollPos : float;
static var gray : boolean = true;
static var saveToServer : boolean = false;

static var textHeight : float = 13;

/*
static var maxLines : int = 24;

static function add(inStr : String){
	sLog += inStr + "\n";
	values = Regex.Split(sLog,"\n");
	if(values.length > maxLines){
		var i : int;
		sLog = "";
		for (i=1; i<maxLines + 1; i++){
			sLog += values[i] + "\n";
		}
	}
}
*/

static function add(inStr : String){
	if (saveToServer) {
	var	postData = new WWWForm();
		postData.AddField("log", inStr);
		
		var upload : WWW = new WWW(Global.server + "/mmo_iphone/logs.php", postData);
		yield upload;
		while( upload.error && upload.error.ToString().Contains("Resolving host timed out") )
		{
			Debug.Log( "Retrying" );
			upload = new WWW(Global.server + "/mmo_iphone/logs.php", postData);
			yield upload;
		}
	}

	var values : String[];
	sLog += inStr + "\n";

	// Uncomment to scroll automatically to the last line
	scrollPos = nLog - (Screen.height / textHeight);

	values = Regex.Split(sLog,"\n");
	nLog = values.length + 1;

	if(values.length > maxLines){
		var i : int;
		sLog = "";
		for (i=1; i<maxLines + 1; i++){
			sLog += values[i] + "\n";
		}
		nLog--;
	}
}

static function clear(){
	sLog = "";
	nLog = 0;
}

static function OnGUI(){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;
     
	//if (show) GUI.Label(Rect(0, 0, 480, 320), sLog);
	
//	if(GUI.Button(Rect(Screen.width-55, 0, 40, 25), "Show")) show = !show;
//
//	if(show){
//		if(GUI.Button(Rect(Screen.width-55, 25, 40, 25), "Gray")) gray = !gray;
//		if(GUI.Button(Rect(Screen.width-55, Screen.height-25, 40, 25), "Clear")) clear();
//	
//		scrollPos = GUI.VerticalScrollbar (Rect (Screen.width - 15, 0, 15, Screen.height),
//											scrollPos, Screen.height / textHeight, 0, nLog);
//		if(gray) GUI.Button(Rect(-5, -5, Screen.width + 7, Screen.height + 7), "");
//		GUI.Label(Rect(0, 0 - scrollPos*textHeight , Screen.width - 15, nLog * textHeight), sLog);
//	}
}