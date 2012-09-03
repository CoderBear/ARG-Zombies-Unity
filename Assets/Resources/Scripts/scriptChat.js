static var bChat	: boolean;
var chatScrollPos 	: Vector2;
var nUserId			: int;
var sMsg			: String;
var sChat			: String;
var sAux			: String;

var lastTime		: float;
//static var Chats	: Array; 
static var	Chats = new Array();
var auxChat			: Chat;
var auxChat2		: Chat;
static var nCurChat		: int;
var sTo				: String;
var bFound			: boolean;

static var MAX_CHATS: int = 3;
var texChatFrame2 	: Texture2D;
var texChatFrame	: Texture2D;
var texSend			: Texture2D;
var texSendP		: Texture2D;
var texClose		: Texture2D;
var texCloseP		: Texture2D;
var style			: GUIStyle;
var styleEdit		: GUIStyle;
var sScrolledChat	: String;
var texPlus			: Texture2D;
var texPlusP		: Texture2D;
var texTab			: Texture2D;
var texTabP			: Texture2D;
var styleTab		: GUIStyle;
var styleTabP		: GUIStyle;
var styleText1		: GUIStyle;

var tabStyle		: GUIStyle;

var scrollPosChat	: float;
var intScrollPosChat: int;

var is_updating		: boolean;

function Start(){
	is_updating = false;
	chatScrollPos = Vector2.zero;
	sMsg = "";
	sChat = "";
	//nUserId = Global.myChar.id;
	nUserId = Global.myChar.id;
	auxChat = new Chat();
	Chats.Add(auxChat);
}

class Chat{
	var sChat	: String;
	var sTo		: String;
	
	function Chat(){
		sChat = "";
		sTo = "";
	}
}

function DoUpdate(){
	is_updating = true;
	var values : String[];
	//bChat = true;
	if(Time.timeSinceLevelLoad > lastTime + 5){
		lastTime = Time.timeSinceLevelLoad;
		var download : WWW = new WWW(Global.server + "/mmo_iphone/inbox.php?id=" + nUserId);
		yield download;
		while( download.error && download.error.ToString().Contains("Resolving host timed out") )
		{
    		Debug.Log( "Retrying" );
    		download = new WWW(Global.server + "/mmo_iphone/inbox.php?id=" + nUserId);
			yield download;
		}
    		
    		
		sAux = download.text;
		if(sAux[0]!="0"){
			values = Regex.Split(sAux, "~~!!~~<br />");
			for(var i : int = 0; i<parseInt(values[0]); i++){
				//print("" + values[i*2 + 1] + ": " + values[i*2 + 2] + "\n");
				bFound = false;
				for(var j : int = 0; j<Chats.length; j++){
					auxChat2 = Chats[j];
					if(values[i*2 + 1] == auxChat2.sTo){
						auxChat2.sChat += values[i*2 + 1] + ": " + values[i*2 + 2] + "\n";
						bFound = true;
					}
				}
				if(!bFound){
					auxChat2 = new Chat();
					auxChat2.sTo = values[i*2 + 1];
					auxChat2.sChat += values[i*2 + 1] + ": " + values[i*2 + 2] + "\n";
					Chats.Add(auxChat2);
				}
			}
		}
	}
	is_updating = false;
}

function Update(){
	if (!bChat) return;
	if (!is_updating) DoUpdate();
}

function Send(toUser : String, aMsg : String){
	var postData = new WWWForm();
	postData.AddField("id", nUserId);
	postData.AddField("to", toUser);
	postData.AddField("message", aMsg);
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/mail.php", postData);
	yield upload;
	while( upload.error && upload.error.ToString().Contains("Resolving host timed out") )
	{
    	Debug.Log( "Retrying" );
    	upload = new WWW(Global.server + "/mmo_iphone/mail.php", postData);
		yield upload;
	}
}

function OnGUI(){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	var values : String[];
	if(!bChat) return;
	
	//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
	CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_CHAT );
	
	GUI.DrawTexture(Rect(125, 45, 350, 87), texChatFrame);
	GUI.DrawTexture(Rect(120, 130, 355, 185), texChatFrame2);
	
	if(Chats && Chats.length>0)
	auxChat = Chats[nCurChat];
	if(Chats && Chats.length>0)
	if(auxChat.sTo == ""){
		GUI.Label(Rect(140, 70, 340, 20), "Start conversation with:", styleText1);
		sTo = GUI.TextField (Rect(139, 93, 232, 20), sTo, 50);
		if(GUI.Button(Rect (380, 83, 83, 40), "Start", styleTab)){
			auxChat.sTo = sTo.ToLower();
			sTo = "";
		}
	}else{
		GUI.Label(Rect(140,70,232,20),"You are now chating with:", styleText1);
		styleText1.normal.textColor = Color.green;
		GUI.Label(Rect(140,93,232,20),auxChat.sTo, styleText1);
		styleText1.normal.textColor = Color.white;
		sMsg = GUI.TextField (Rect(139, 133, 232, 20), sMsg, 50);
		if(GUI.Button(Rect (380, 124, 75, 40), "Send", styleTab)){
			Send(auxChat.sTo, sMsg);
			auxChat.sChat += "Me: " + sMsg + "\n";
			sMsg = "";
		}
		values = Regex.Split(auxChat.sChat,"\n");
		if(values.length > 0){
			chatScrollPos = GUI.BeginScrollView(Rect(135,160,337,145),chatScrollPos, Rect(0,0,330,values.length*20));
			sScrolledChat = "";
			for(var i = values.length - 2; i >=0; i--){
				sScrolledChat += values[i] + "\n";
			}
			GUI.Label(Rect(0, 0, 330, values.length*20), sScrolledChat);
			GUI.EndScrollView ();
		}
	}

	if(Chats && Chats.length>0)
	for(i = 0; i<Chats.length; i++){
		tabStyle = nCurChat == i ? styleTab : styleTabP;
		auxChat = Chats[i];
		if(GUI.Button(Rect (170+i*((280/MAX_CHATS)+5), 40, 280/MAX_CHATS, 40), auxChat.sTo!="" ? auxChat.sTo : "Empty chat", tabStyle)){
			nCurChat = i;
		}
	}
	style.active.background = texPlusP;
	style.normal.background = texPlus;
	if(Chats)
	if(Chats.length<MAX_CHATS)
	if(GUI.Button(Rect (175+Chats.length*(280/MAX_CHATS)+(Chats.length-1)*5, 50, 26, 20), "+", style)){
		auxChat = new Chat();
		Chats.Add(auxChat);
		nCurChat = Chats.length-1;
	}
	if(Chats.length > 0)
	if(GUI.Button(Rect (140, 50, 26, 20), "-", style)){
		Chats.RemoveAt(nCurChat);
		while(Chats.length-1 < nCurChat && nCurChat > 0) nCurChat--;
	}
}