static var bChat	: boolean;
var chatScrollPos 	: Vector2;
var nUserId			: int;
var sMsg			: String;
var sChat			: String;
var sAux			: String;

static var chatBack : boolean = false;

var mixToolkit5 : UIToolkit;	//mix3
mixToolkit5 = GameObject.Find("UI").transform.FindChild("UIToolKit5").GetComponent(UIToolkit); //mix 3

var mixToolkit6 : UIToolkit;	//mix3
mixToolkit6 = GameObject.Find("UI").transform.FindChild("UIToolKit6").GetComponent(UIToolkit); //mix 3


//static var Chats	: Array; 
//var texSend			: Texture2D;
//var texSendP		: Texture2D;
//var texClose		: Texture2D;
//var texCloseP		: Texture2D;
//var styleEdit		: GUIStyle;
//var texTab			: Texture2D;
//var texTabP			: Texture2D;
//var scrollPosChat	: float;
//var intScrollPosChat: int;

var lastTime		: float;
static var	Chats = new Array();
var auxChat			: Chat;
var auxChat2		: Chat;
static var nCurChat		: int;
var sTo				: String;
var bFound			: boolean;
static var MAX_CHATS: int = 3;
var styleSendBut : GUIStyle;
var texChatFrame2 	: Texture2D;
var texChatFrame	: Texture2D;
var style			: GUIStyle;
var sScrolledChat	: String;
var texPlus			: Texture2D;
var texPlusP		: Texture2D;
var styleTab		: GUIStyle;
var styleTabP		: GUIStyle;
var styleText1		: GUIStyle;
var tabStyle		: GUIStyle;
var is_updating		: boolean;
var styleEmptyChat  : GUIStyle;
var stylePlusBut	: GUIStyle;
var styleMinusBut	: GUIStyle;
var newbackStyle	: GUIStyle;
static var chatd			: boolean = false;
function Start()
{
	is_updating = false;
	chatScrollPos = Vector2.zero;
	sMsg = "";
	sChat = "";
	//nUserId = Global.myChar.id;
	nUserId = Global.myChar.id;
	auxChat = new Chat();
	Chats.Add(auxChat);
	showAllSprites();
}

class Chat
{
	var sChat	: String;
	var sTo		: String;
	
	function Chat()
		{
			sChat = "";
			sTo = "";
		}
}

function DoUpdate()
{
	is_updating = true;
	var values : String[];
	bChat = true;
	if(Time.timeSinceLevelLoad > lastTime + 5)
		{
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
			
			if(sAux[0]!="0")
				{
					values = Regex.Split(sAux, "~~!!~~<br />");
					
					for(var i : int = 0; i<parseInt(values[0]); i++)
						{
							//print("" + values[i*2 + 1] + ": " + values[i*2 + 2] + "\n");
							bFound = false;
							
							for(var j : int = 0; j<Chats.length; j++)
								{
									auxChat2 = Chats[j];
									
									if(values[i*2 + 1] == auxChat2.sTo)
										{
											auxChat2.sChat += values[i*2 + 1] + ": " + values[i*2 + 2] + "\n";
											bFound = true;
										}
								}
							if(!bFound)
								{
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

function Update()
{
	if (!bChat) 
			return;
	if (!is_updating) 
			DoUpdate();
}

function Send(toUser : String, aMsg : String)
{
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


var chatSprite		: UISprite;

function showAllSprites()
{	
	chatSprite = mixToolkit5.addSprite("chat resize.png",0,0,5);
	chatSprite.setSize (Global.screenW * 0.7395 ,Global.screenH * 0.8437);
	chatSprite.position = Vector3(Global.screenW * 0.25 ,-Global.screenH * 0.1406,-3);
	chatSprite.hidden = true;
}



function OnGUI()
{
	//var screenScale: float = Screen.width / 480.0;
   // var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
   // GUI.matrix = scaledMatrix;
	var values : String[];
	
	if(!bChat) 
		return;
	if(chatd)
	{
	//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
	//CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_CHAT );
	//GUI.DrawTexture(Rect(125, 45, 350, 87), texChatFrame);
	//GUI.DrawTexture(Rect(120, 45, 355, 270), texChatFrame2);
	chatSprite.hidden = false;
	if(Chats && Chats.length>0)
		auxChat = Chats[nCurChat];
	if(Chats && Chats.length>0)
		if(auxChat.sTo == "")
			{	
				GUI.Label(Rect(Global.screenW * 0.3125 ,Global.screenH * 0.3437,Global.screenW * 0.7083 ,Global.screenH * 0.0625), "Start conversation with:", styleText1);
				sTo = GUI.TextField (Rect(Global.screenW * 0.3 ,Global.screenH * 0.4375,Global.screenW * 0.5208 ,Global.screenH * 0.0625), sTo, 50);
				
				if(GUI.Button(Rect (Global.screenW * 0.8291 ,Global.screenH * 0.4156,Global.screenW * 0.1395 ,Global.screenH * 0.09375), "", styleSendBut))
					{
						auxChat.sTo = sTo.ToLower();
						sTo = "";
					}
			}
	else
		{	
			GUI.Label(Rect(Global.screenW * 0.3125 ,Global.screenH * 0.3437,Global.screenW * 0.4833 ,Global.screenH * 0.0625),"You are now chating with:", styleText1);
			styleText1.normal.textColor = Color.green;
			GUI.Label(Rect(Global.screenW * 0.625 ,Global.screenH * 0.3437,Global.screenW * 0.4833 ,Global.screenH * 0.0625),auxChat.sTo, styleText1);
			styleText1.normal.textColor = Color.white;
			sMsg = GUI.TextField (Rect(Global.screenW * 0.3 ,Global.screenH * 0.4375,Global.screenW * 0.5208 ,Global.screenH * 0.0625), sMsg, 50);
			
			if(GUI.Button(Rect (Global.screenW * 0.8291 ,Global.screenH * 0.4156,Global.screenW * 0.1395 ,Global.screenH * 0.09375), "", styleSendBut))
				{
					Send(auxChat.sTo, sMsg);
					auxChat.sChat += "Me: " + sMsg + "\n";
					sMsg = "";
				}
			values = Regex.Split(auxChat.sChat,"\n");
			
			if(values.length > 0)
				{	
					chatScrollPos = GUI.BeginScrollView(Rect(Global.screenW * 0.3145 ,Global.screenH * 0.53125,Global.screenW * 0.6041 ,Global.screenH * 0.34375),chatScrollPos, Rect(0,0,Global.screenW * 0.6875,values.length*Global.screenH * 0.0625));
					sScrolledChat = "";
					
					for(var i = values.length - 2; i >=0; i--)
						{
							sScrolledChat += values[i] + "\n";
						}
				
					GUI.Label(Rect(0, 0, Global.screenW * 0.6875, values.length*Global.screenH * 0.0625), sScrolledChat);
					GUI.EndScrollView ();
				}
		}

	if(Chats && Chats.length>0)

	for(i = 0; i<Chats.length; i++)
		{
			tabStyle = nCurChat == i ? styleTab : styleTabP;
			auxChat = Chats[i];
			
			if(GUI.Button(Rect (Global.screenW * 0.3958+i*((Global.screenW * 0.5833/MAX_CHATS)+Global.screenW * 0.01041), Global.screenH * 0.28125, Global.screenW * 0.7291/MAX_CHATS, Global.screenH * 0.07125), auxChat.sTo!="" ? "      "+auxChat.sTo : "     Empty chat", styleEmptyChat))
				{
					nCurChat = i;
				}
		}														
	
	style.active.background = texPlusP;
	style.normal.background = texPlus;
	if(Chats)
		if(Chats.length<MAX_CHATS)
		
			if(GUI.Button(Rect (Global.screenW * 0.3854+Chats.length*(Global.screenW * 0.5833/MAX_CHATS)+(Chats.length-Global.screenW * 0.00208)*Global.screenW * 0.01041, Global.screenH * 0.28125, Global.screenW * 0.1041 ,Global.screenH * 0.078125), "+", stylePlusBut))
				{
					auxChat = new Chat();
					Chats.Add(auxChat);
					nCurChat = Chats.length-1;
				}
	if(Chats.length > 0)
	
		if(GUI.Button(Rect (Global.screenW * 0.3 ,Global.screenH * 0.28125, Global.screenW * 0.1041 ,Global.screenH * 0.078125), "-", styleMinusBut))
			{
				Chats.RemoveAt(nCurChat);
				while(Chats.length-1 < nCurChat && nCurChat > 0) nCurChat--;
			}
			
			
	if(GUI.Button(Rect(Global.screenW * 0.3 ,Global.screenH * 0.875, Global.screenW * 0.1437 ,Global.screenH * 0.09375),"",newbackStyle))
			{
				chatBack = true;
				scriptMain.bCharFrame = true;
				scriptMain.makeActiveOrInactive = true;
				chatd = !chatd;
				chatSprite.hidden = true;
			}
}
}