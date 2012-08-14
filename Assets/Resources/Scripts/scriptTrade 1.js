static var bTrade;

var nMoney			: int;
var nMyMoney		: int;
var nYourMoney		: int;
var nMyMoneyID		: int;
var nYourMoneyID	: int;

var nMyMoney2		: int;
var nYourMoney2		: int;
var nMyMoneyID2		: int;
var nYourMoneyID2	: int;

var bMeReady		: boolean;
var bYouReady		: boolean;
var lastTime		: float;
var sAux			: String;
var nUserId			: int;
static var sTo		: String;
var sNick			: String;
var bFound			: boolean;
var sMsg			: String;
var sChat			: String;
var sChatScrolled	: String;
var nInvItem		: int;
var nInvItemSel		: int;
var nRemainingItems	: int;
var texFrame		: Texture2D;

var scrollPosInv	: float;
var intScrollPosInv	: int;
var scrollPosMy		: float;
var intScrollPosMy	: int;
var scrollPosYour	: float;
var intScrollPosYour : int;
var scrollPosChat	: float;
var intScrollPosChat : int;

var styleBut		: GUIStyle;
var styleBut1		: GUIStyle;
var styleBut1P		: GUIStyle;
var styleBut2		: GUIStyle;
var styleBut2P		: GUIStyle;
var styleBut3		: GUIStyle;
var styleBut3P		: GUIStyle;
var styleList		: GUIStyle;
var styleEdit		: GUIStyle;

var nGUIFrame		: int;
var bGUIFrame		: boolean;

var	GUI_INFO		: int = 0;
var	GUI_MY_TRADE	: int = 1;
var	GUI_YOUR_TRADE	: int = 2;
var	GUI_MONEY		: int = 3;
var	GUI_FIN			: int = 4;
var	GUI_FAIL		: int = 5;

var texAH			: Texture2D;
var sAH				: String;
var sTitle			: String;
var styleText1		: GUIStyle;
var styleText2		: GUIStyle;
var styleText3		: GUIStyle;
var styleText4		: GUIStyle;
var styleText5		: GUIStyle;
var styleText6		: GUIStyle;
var st_small_yellow_right : GUIStyle;
var styleCenteredTitle : GUIStyle;

var sQuantity		: String;
var sMoney			: String;

var myTrades		: Item4[];
var yourTrades		: Item4[];
var myItems			: Item[];
var myTrades2		: Item4[];
var yourTrades2		: Item4[];
var myItems2		: Item[];

var nInvItems		: int;
var nMyTrades		: int;
var nYourTrades		: int;
var nMyTrade		: int;
var nYourTrade		: int;

var nInvItems2		: int;
var nMyTrades2		: int;
var nYourTrades2	: int;

var texArrowRight	: Texture2D;
var texArrowRightP	: Texture2D;
var texArrowLeft	: Texture2D;
var texArrowLeftP	: Texture2D;
var texBigArrowRight : Texture2D;
var texBigArrowRightP : Texture2D;
var texBigArrowLeft	: Texture2D;
var texBigArrowLeftP : Texture2D;
var texClose		: Texture2D;
var texCloseP		: Texture2D;
var texFrameBig		: Texture2D;
var texFrameDialog	: Texture2D;
var texFrameChat	: Texture2D;
var texFrameSendMsg	: Texture2D;
var texSend			: Texture2D;
var texSendP		: Texture2D;
var texCancel		: Texture2D;
var texCancelP		: Texture2D;
var texFinalize		: Texture2D;
var texFinalizeP	: Texture2D;
var texGold			: Texture2D;
var texReady		: Texture2D;

var style			: GUIStyle;
var styleChat		: GUIStyle;

static var bInitialized : boolean;
var bTradeFin		: boolean;
var bFinalize		: boolean;

var nChatLines		: int;
var texLoaderWheel	: Texture2D;
var bLoaderWheel	: boolean;
var WWWResult		: String;
var bUpdating		: boolean;
var bUpdatingTrades	: boolean;

var wheel_level		: int;

function LoaderWheel() {
	wheel_level++;
	bLoaderWheel = true;
}

function UnloaderWheel() {
	wheel_level--;
	if (wheel_level<1) bLoaderWheel = false;
}

function Init(){
	GetTradeItems();
}

function Start(){
	wheel_level = 0;
	bLoaderWheel = false;
	
	bInitialized = false;
	bMeReady = false;
	bYouReady = false;
	
	nInvItems = 0;
	nMyTrades = 0;
	nYourTrades = 0;
	nInvItem = -1;
	nInvItemSel = -1;
	nMyTrade = -1;
	nYourTrade = -1;
	
	nUserId = Global.myChar.id;
	sNick = Global.myChar.Nick;
	sTo = "admin";
	lastTime = 0;
	
	nChatLines = 0;
	bLoaderWheel = false;
	bUpdating = false;
	bUpdatingTrades = false;
	
	GetTradeItems();
}



function sendTrade(aItem : int, aQuantity : int, aMoney : int){
	LoaderWheel();
	var postData = new WWWForm();
	postData.AddField("user", nUserId);
	postData.AddField("to", sTo);
	postData.AddField("id_item", aItem);
	postData.AddField("quantity", aQuantity);
	postData.AddField("money", aMoney);
	postData.AddField("opt", ((aMoney != -1) ? 3 : 1));

	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade.php", postData);
	yield upload;
	UnloaderWheel();
}

function removeTrade(){
	LoaderWheel();
	var postData = new WWWForm();
	postData.AddField("user", nUserId);
	postData.AddField("to", sTo);
	postData.AddField("trade", myTrades[nMyTrade].id_trade);
	postData.AddField("opt", 4);
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade.php", postData);
	yield upload;
	UnloaderWheel();
}

function removeMoney(){
	LoaderWheel();
var 	postData = new WWWForm();
	postData.AddField("user", nUserId);
	postData.AddField("to", sTo);
	postData.AddField("trade", nMyMoneyID);
	postData.AddField("opt", 4);
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade.php", postData);
	yield upload;
	UnloaderWheel();
}

function leaveTrade(){
	LoaderWheel();
	var postData = new WWWForm();
	postData.AddField("user", nUserId);
	postData.AddField("to", sTo);
	postData.AddField("id_item", 0);
	postData.AddField("quantity", 0);
	postData.AddField("money", 0);
	postData.AddField("opt", 5);
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade.php", postData);
	yield upload;
	UnloaderWheel();
}

//function finalizeTrade2(){
//	LoaderWheel();
//	postData = new WWWForm();
//	postData.AddField("user", nUserId);
//	postData.AddField("opt", 6);
//	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade.php", postData);
//	//while(!upload.isDone){}
//	yield upload;
//	UnloaderWheel();
//}
//
//function finalizeTrade() : String 
//{
//	LoaderWheel();
//	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade_fin.php?user=" + nUserId);
//	while(!upload.isDone) {};
//	UnloaderWheel();
//	return upload.text;
//}

function finalizeTrade3(){
	LoaderWheel();
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade_fin.php?user=" + nUserId);
	yield upload;
	UnloaderWheel();
}

function GetTradeItems(){
	if(!bUpdatingTrades) GetTradeItems2();
}

function GetTradeItems2(){
	if (bUpdatingTrades) return;
	bUpdatingTrades = true;
	LoaderWheel();

	var values : String[];
	var values2 : String[];
	
	yield StartCoroutine( Global.getUserData() );
	nMoney = Global.myChar.Money;
	var i : int;
	nInvItems2 = 0;
	
	var download : WWW = new WWW(Global.server + "/mmo_iphone/items-on.php?id=" + nUserId);
	yield download;
	var sInvItems : String = download.text;
	values = Regex.Split(sInvItems, "<br />");
	myItems2 = new Item[values.length-1];
	for(i = 0; i<values.length-2; i++){
		myItems2[i] = Item(Regex.Split(values[i+1], ":"));
		nInvItems2++;
	}


	nMyTrades2 = 0;
	nYourTrades2 = 0;
	nMyMoney2 = 0;
	nYourMoney2 = 0;
	var postData = new WWWForm();
 	postData.AddField("user", nUserId);
	postData.AddField("to", sTo);
	postData.AddField("id_item", 0);
	postData.AddField("quantity", 0);
	postData.AddField("money", 0);
	postData.AddField("opt", 2);
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade.php", postData);
	yield upload;
	//while (!upload.isDone) continue;
	
	var j : int;
	i = 0;
	values = Regex.Split(upload.text, "~~!!~~");
	values2 = Regex.Split(values[0], "<br />");
	myTrades2 = new Item4[values2.length-1];
	print("myTrades2 has " + (values2.length-1) + " elements.");
	for(i = 0; i<values2.length-1; i++){
		if(parseInt(Regex.Split(values2[i], ";")[1]) == -1){
			nMyMoney2 = parseInt(Regex.Split(values2[i], ";")[2]);
			nMyMoneyID2 = parseInt(Regex.Split(values2[i], ";")[0]);
		}else{
			print("We access item " + parseInt(Regex.Split(values2[i], ";")[1]) + " with array number" + nMyTrades2 + ", and i = " + i + ".");
			download = new WWW(Global.server + "/mmo_iphone/item_info.php?id_item=" +
								parseInt(Regex.Split(values2[i], ";")[1]));
			//while (!download.isDone) continue;
			yield download;
			
			print("Current error is here:\n" + download.text);
	
			myTrades2[nMyTrades2] = Item4(download.text);
			myTrades2[nMyTrades2].initTrade(Regex.Split(values2[i], ";"));

			for(j = 0; j<myItems2.length-2; j++){
				if(myItems2[j].id == myTrades2[nMyTrades2].id){
					myItems2[j].quantity -= myTrades2[nMyTrades2].quantity;
				}
			}

			nMyTrades2++;
		}
	}
	values2 = Regex.Split(values[1], "<br />");
	yourTrades2 = new Item4[values2.length-1];
	for(i = 0; i<values2.length-1; i++){
		if(parseInt(Regex.Split(values2[i], ";")[1]) == -1){
			nYourMoney2 = parseInt(Regex.Split(values2[i], ";")[2]);
			nYourMoneyID2 = parseInt(Regex.Split(values2[i], ";")[0]);
		}else{
			download = new WWW(Global.server + "/mmo_iphone/item_info.php?id_item=" +
											parseInt(Regex.Split(values2[i], ";")[1]));
			yield download;

			yourTrades2[nYourTrades2] = Item4(download.text);
			yourTrades2[nYourTrades2].initTrade(Regex.Split(values2[i], ";"));

			nYourTrades2++;
		}
	}

	nInvItems = nInvItems2;
	nMyTrades = nMyTrades2;
	nYourTrades = nYourTrades2;
	nMyMoney = nMyMoney2;
	nYourMoney = nYourMoney2;
	nMyMoneyID = nMyMoneyID2;
	nYourMoneyID = nYourMoneyID2;
	myItems = myItems2;
	myTrades = myTrades2;
	yourTrades = yourTrades2;


	UnloaderWheel();
	bUpdatingTrades = false;
}

function getUpdates(){
	var values : String[];
	
	if(!bTrade) return;
	if(Time.timeSinceLevelLoad > lastTime + 5){
		//bLoaderWheel = true;
		bUpdating = true;
		var download : WWW = new WWW(Global.server + "/mmo_iphone/chat_inbox.php?id=" + nUserId);
		yield download;
		sAux = download.text;
		values = Regex.Split(sAux, "-");
		if(values[1].length>0){
			if(values[0][3]=="1"){
				GetTradeItems();
			}
			if(values[2][0]=="1") bMeReady = true; else bMeReady = false;
			if(values[3][0]=="1") bYouReady = true; else bYouReady = false;
		}
		if(bMeReady && bYouReady && bFinalize)
		{
			LoaderWheel();
			var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade_fin.php?user=" + nUserId);
			yield upload;

			if(upload.text.IndexOf("finalized")>-1)
			{
				nGUIFrame = GUI_FIN;
				bGUIFrame = true;
				bMeReady = false;
				bYouReady = false;
				bTrade = false;
				bTradeFin = true;
				Inventory.bInventory = false;
				scriptMain.bGUI = true;
				Craft.bCraft = false;
				scriptAH.bSell = false;
				scriptAH.bBuy = false;
				scriptChat.bChat = false;
				bInitialized = false;
				bFinalize = false;
			}else
			if(upload.text.IndexOf("fail")>-1){
				if(parseInt(sAux.Substring(4))==nUserId){
					nGUIFrame = GUI_FAIL;
					bGUIFrame = true;
					bMeReady = false;
					bYouReady = false;
				}
			}
			UnloaderWheel();
		}
		
		sAux = values[4];
		if(sAux[0]!="0"){
			values = Regex.Split(sAux, "~~!!~~<br />");
			for(var i : int = 0; i<parseInt(values[0]); i++){
				if(values[i*2 + 1] == sTo){
					sChat += values[i*2 + 1] + ": " + values[i*2 + 2] + "\n";
					nChatLines++;
					if(nChatLines > 4) scrollPosChat = nChatLines - 4;
				}
			}
		}
		bUpdating = false;
		lastTime = Time.timeSinceLevelLoad;
		//bLoaderWheel = false;
	}
}

function Update(){
	if(!bUpdating) getUpdates();
}

function Send(toUser : String, aMsg : String){
	LoaderWheel();
	var postData = new WWWForm();
	postData.AddField("id", nUserId);
	postData.AddField("to", toUser);
	postData.AddField("message", aMsg);
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/trade_chat.php", postData);
	//while(!upload.isDone){}
	yield upload;
	UnloaderWheel();
}

function ScrollButton(aRect : Rect, aStr : String) : boolean{
	if(aRect.yMin>10 && aRect.yMax<202) return GUI.Button(aRect, aStr, styleList); else return false;
}

function ScrollButton(aRect : Rect, aStr : String, aStyle : GUIStyle) : boolean{
	if(aRect.yMin>10 && aRect.yMax<202) return GUI.Button(aRect, aStr, aStyle); else return false;
}

function ScrollLabel(aRect : Rect, aStr : String){
	if(aRect.yMin>10 && aRect.yMax<202) GUI.Button(aRect, aStr, st_small_yellow_right);
}

function GUIFrame(){
	GUI.depth = 1;
	GUI.DrawTexture(Rect(120, 100, 215, 171), texFrameDialog);
	style.active.background = texCloseP;
	style.normal.background = texClose;
	if(GUI.Button(Rect(301, 107, 26, 24), "", style)){
		bGUIFrame = false;
		bTradeFin = false;
	}
	switch(nGUIFrame){
		case GUI_FIN:
			GUI.Label(Rect(220, 128, 100, 200), "Trade finished.", styleText5);
		break;		
		case GUI_FAIL:
			GUI.Label(Rect(220, 128, 100, 200), "Not enough space in inventory.", styleText5);
		break;		
		case GUI_INFO:
			GUI.DrawTexture(Rect(160, 110, 51, 52), texAH);
			GUI.Label(Rect(220, 128, 100, 200), sTitle, styleText5);
			GUI.Label(Rect(160, 153, 220, 50), sAH, styleText2);
			
			sAux = sQuantity;
			if(parseInt(sQuantity)>1) GUI.Label(Rect(160, 212, 220, 200),
				"Trade                          pieces", styleText5);
			else GUI.Label(Rect(160, 212, 220, 200), "Trade                          piece", styleText5);
			sAux = GUI.TextField (Rect (192, 210, 43, 20), sAux, 25);
			if(sAux.length<1) sAux = "1";
			if(parseInt(sAux)) sQuantity = sAux; else sAux = sQuantity;
			if(parseInt(sQuantity)>myItems[nInvItem].quantity) sQuantity = ""+myItems[nInvItem].quantity;
			styleChat.active.background = texBigArrowRightP;
			styleChat.normal.background = texBigArrowRight;
			if(GUI.Button(Rect(300, 197, 25, 35), "", styleChat)){
				bMeReady = false;
				bYouReady = false;
				sendTrade(myItems[nInvItem].id, parseInt(sQuantity), -1);
				bGUIFrame = false;
				GetTradeItems();
			}
		break;

		case GUI_MY_TRADE:
			GUI.DrawTexture(Rect(160, 110, 51, 52), texAH);
			GUI.Label(Rect(220, 128, 100, 200), sTitle, styleText5);
			GUI.Label(Rect(140, 153, 175, 70), sAH, styleText6);
			styleChat.active.background = texBigArrowLeftP;
			styleChat.normal.background = texBigArrowLeft;
			if(GUI.Button(Rect(158, 197, 25, 35), "", styleChat)){
				bMeReady = false;
				bYouReady = false;
				removeTrade();
				bGUIFrame = false;
				GetTradeItems();
			}
		break;

		case GUI_YOUR_TRADE:
			GUI.DrawTexture(Rect(160, 110, 51, 52), texAH);
			GUI.Label(Rect(220, 128, 100, 200), sTitle, styleText5);
			GUI.Label(Rect(140, 153, 175, 70), sAH, styleText6);
		break;
		
		case GUI_MONEY:
			GUI.DrawTexture(Rect(170, 120, 51, 52), texGold);
			
			sAux = sMoney;
			GUI.Label(Rect(160, 202, 220, 200), "Trade                gold", styleText1);
			sAux = GUI.TextField (Rect (201, 203, 43, 20), sAux, 25);
			if(sAux.length<1) sAux = "1";
			if(parseInt(sAux)) sMoney = sAux; else sAux = sMoney;
			if(parseInt(sMoney)>nMoney) sMoney = ""+nMoney;

			styleChat.active.background = texBigArrowRightP;
			styleChat.normal.background = texBigArrowRight;
			if(GUI.Button(Rect(300, 197, 25, 35), "", styleChat)){
				bMeReady = false;
				bYouReady = false;
				sendTrade(0, 0, parseInt(sMoney));
				bGUIFrame = false;
				GetTradeItems();
			}
		break;
	}
}

var nAngle : float;

function loaderWheel(){
	nAngle += 200*Time.deltaTime;
	GUIUtility.RotateAroundPivot(nAngle, Vector2(240, 160));
	GUI.DrawTexture(Rect(210, 130, 61, 60), texLoaderWheel);
	GUIUtility.RotateAroundPivot(-nAngle, Vector2(240, 160));
}

function OnGUI(){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	var values : String[];
	if(bTradeFin && bGUIFrame){
		GUIFrame();
		return;
	}
	//bTrade = false;
	if(!bTrade) return;
	// THIS IS WRONG, CORRECT SOON
	//if(bGUIFrame) GUIFrame();
	
	if(!bInitialized){
		return;
	}
	
	GUI.depth = 2;
	
	GUI.DrawTexture(Rect(2.5, 1.5, 475, 222.5), texFrame);

	var i : int;
	
	// THE INVENTORY
	if(nRemainingItems > (158 / 27)){
		scrollPosInv = GUI.VerticalScrollbar (Rect (153, 28, 15, 158), scrollPosInv, (158 / 27), 0, nRemainingItems);
		intScrollPosInv = scrollPosInv;
	}else{
		scrollPosInv = GUI.VerticalScrollbar (Rect (153, 28, 15, 158), scrollPosInv, 0, 0, 0);
		scrollPosInv = 0;
		intScrollPosInv = 0;
	}

	if(nInvItems<1) GUI.Label(Rect(20, 40, 300, 20), "No items available for trading.");
	GUI.Label(Rect(15, 4, 112, 26), "Backpack", styleCenteredTitle);

	nRemainingItems = 0;
	for(i = 0; i<nInvItems; i++){
		if(myItems[i].quantity>0){
			styleList = nRemainingItems == nInvItemSel ? styleBut1P : styleBut1;
			style.active.background = texArrowRightP;
			style.normal.background = texArrowRight;
			if(ScrollButton(Rect(128, 28 + (27*nRemainingItems) - (27*intScrollPosInv), 16, 22), "", style)){
				nInvItem = i;
				nInvItemSel = -1;
				
				sendTrade(myItems[nInvItem].id, myItems[nInvItem].quantity, -1);
				bMeReady = false;
				bYouReady = false;
				GetTradeItems();
			}
			if(ScrollButton(Rect(15, 26 + (27*nRemainingItems) - (27*intScrollPosInv), 112, 26), myItems[i].name)){
				texAH = Resources.Load("Menus/Inventory/Icons/" + myItems[i].id);
				sTitle = myItems[i].name;
				sAH =	(myItems[i].brutality > 0 ? ("\nBrutality : " + myItems[i].brutality) : "") +
						"\nQuantity : " + myItems[i].quantity +
						(myItems[i].accuracy > 0 ? ("\nAccuracy : " + myItems[i].accuracy) : "") +
						(myItems[i].fortitude > 0 ? ("\nFortitude : " + myItems[i].fortitude) : "") +
						(myItems[i].attack > 0 ? ("\nAttack : " + myItems[i].attack) : "") +
						(myItems[i].defense > 0 ? ("\nDefense : " + myItems[i].defense) : "") +
						(myItems[i].health > 0 ? ("\nHealth : " + myItems[i].health) : "") +
						(myItems[i].regen > 0 ? ("\nRegen : " + myItems[i].regen) : "") +
						((myItems[i].weapon_dmg_min != 0 || myItems[i].weapon_dmg_max != 0) ? 
						("\nDamage : "	+ myItems[i].weapon_dmg_min + " - "
										+ myItems[i].weapon_dmg_max) : "") +
						(myItems[i].level > 0 ? ("\nRequired level : " + myItems[i].level) : "");
				bGUIFrame = true;
				nInvItem = i;
				nInvItemSel = nRemainingItems;
				sQuantity = "" + myItems[i].quantity;
				nGUIFrame = GUI_INFO;
			}
			nRemainingItems++;
		}
	}
	GUI.Label(Rect(27, 194, 300, 20), "Gold: " + (nMoney - nMyMoney), styleText3);
	style.active.background = texArrowRightP;
	style.normal.background = texArrowRight;
	if(nMoney > 0)
	if(GUI.Button(Rect(127, 193, 16, 22), "", style)){
		nGUIFrame = GUI_MONEY;
		bGUIFrame = true;
	}

	// MY TRADES
	if(nMyTrades > (158 / 27) && !bGUIFrame){
		scrollPosMy = GUI.VerticalScrollbar (Rect (310, 28, 15, 158), scrollPosMy, (158 / 27), 0, nMyTrades);
		intScrollPosMy = scrollPosMy;
	}else{
		scrollPosMy = GUI.VerticalScrollbar (Rect (310, 28, 15, 158), scrollPosMy, 0, 0, 0);
		scrollPosMy = 0;
		intScrollPosMy = 0;
	}

	if(nMyTrades<1) GUI.Label(Rect(225, 40, 300, 20), "No items.");
	GUI.Label(Rect(194, 4, 112, 26), sNick, styleCenteredTitle);

	for(i = 0; i<nMyTrades; i++){
		styleList = i == nMyTrade ? styleBut2P : styleBut2;

		style.active.background = texArrowLeftP;
		style.normal.background = texArrowLeft;
		if(ScrollButton(Rect(177, 28 + (27*i) - (27*intScrollPosMy), 16, 22), "", style)){
			nMyTrade = i;
			bMeReady = false;
			bYouReady = false;
			removeTrade();
			GetTradeItems();
			break;
		}
		if(ScrollButton(Rect(194, 26 + (27*i) - (27*intScrollPosMy), 112, 26), myTrades[i].name)){
			texAH = Resources.Load("Menus/Inventory/Icons/" + myTrades[i].id);
			sTitle = myTrades[i].name;
			sAH =	(myTrades[i].brutality > 0 ? ("\nBrutality : " + myTrades[i].brutality) : "") +
					(myTrades[i].quantity > 0 ? ("\nQuantity : " + myTrades[i].quantity) : "") +
					(myTrades[i].accuracy > 0 ? ("\nAccuracy : " + myTrades[i].accuracy) : "") +
					(myTrades[i].fortitude > 0 ? ("\nFortitude : " + myTrades[i].fortitude) : "") +
					(myTrades[i].attack > 0 ? ("\nAttack : " + myTrades[i].attack) : "") +
					(myTrades[i].defense > 0 ? ("\nDefense : " + myTrades[i].defense) : "") +
					(myTrades[i].health > 0 ? ("\nHealth : " + myTrades[i].health) : "") +
					(myTrades[i].regen > 0 ? ("\nRegen : " + myTrades[i].regen) : "") +
					((myTrades[i].weapon_dmg_min != 0 || myTrades[i].weapon_dmg_max != 0) ? 
					("\nDamage : "	+ myTrades[i].weapon_dmg_min + " - "
									+ myTrades[i].weapon_dmg_max) : "") +
					(myTrades[i].level > 0 ? ("\nRequired level : " + myTrades[i].level) : "");
			bGUIFrame = true;
			nMyTrade = i;
			sQuantity = "" + myTrades[i].quantity;
			nGUIFrame = GUI_MY_TRADE;
		}
		ScrollLabel(Rect(194, 24 + (27*i) - (27*intScrollPosMy), 107, 26), "" + myTrades[i].quantity);
	}
	GUI.Label(Rect(220, 194, 75, 20), "Gold: " + nMyMoney, styleText4);
	style.active.background = texArrowLeftP;
	style.normal.background = texArrowLeft;
	if(nMyMoney > 0)
	if(GUI.Button(Rect(177, 193, 16, 22), "", style)){
		bMeReady = false;
		bYouReady = false;
		removeMoney();
		GetTradeItems();
	}
	if(bMeReady){
		//GUI.Label(Rect(260, 11, 75, 12), "Ready", styleText3);
		GUI.DrawTexture(Rect(190, 50, 120, 120), texReady);
	}

	// YOUR TRADES
	if(nYourTrades > (158 / 27)){
		scrollPosYour = GUI.VerticalScrollbar (Rect (450, 28, 15, 158), scrollPosYour, (158 / 27), 0, nYourTrades);
		intScrollPosYour = scrollPosYour;
	}else{
		scrollPosYour = GUI.VerticalScrollbar (Rect (450, 28, 15, 158), scrollPosYour, 0, 0, 0);
		scrollPosYour = 0;
		intScrollPosYour = 0;
	}

	if(nYourTrades<1) GUI.Label(Rect(350, 40, 300, 20), "No items.");
	GUI.Label(Rect(332, 4, 112, 26), sTo, styleCenteredTitle);

	for(i = 0; i<nYourTrades; i++){
		styleList = i == nYourTrade ? styleBut3P : styleBut3;
		if(ScrollButton(Rect(332, 26 + (27*i) - (27*intScrollPosYour), 112, 26), yourTrades[i].name)){
			texAH = Resources.Load("Menus/Inventory/Icons/" + yourTrades[i].id);
			sTitle = yourTrades[i].name;
			sAH =	(yourTrades[i].brutality > 0 ? ("\nBrutality : " + yourTrades[i].brutality) : "") +
					(yourTrades[i].quantity > 0 ? ("\nQuantity : " + yourTrades[i].quantity) : "") +
					(yourTrades[i].accuracy > 0 ? ("\nAccuracy : " + yourTrades[i].accuracy) : "") +
					(yourTrades[i].fortitude > 0 ? ("\nFortitude : " + yourTrades[i].fortitude) : "") +
					(yourTrades[i].attack > 0 ? ("\nAttack : " + yourTrades[i].attack) : "") +
					(yourTrades[i].defense > 0 ? ("\nDefense : " + yourTrades[i].defense) : "") +
					(yourTrades[i].health > 0 ? ("\nHealth : " + yourTrades[i].health) : "") +
					(yourTrades[i].regen > 0 ? ("\nRegen : " + yourTrades[i].regen) : "") +
					((yourTrades[i].weapon_dmg_min != 0 || yourTrades[i].weapon_dmg_max != 0) ? 
					("\nDamage : "	+ yourTrades[i].weapon_dmg_min + " - "
									+ yourTrades[i].weapon_dmg_max) : "") +
					(yourTrades[i].level > 0 ? ("\nRequired level : " + yourTrades[i].level) : "");
			bGUIFrame = true;
			nYourTrade = i;
			sQuantity = "" + yourTrades[i].quantity;
			nGUIFrame = GUI_YOUR_TRADE;
		}
		ScrollLabel(Rect(332, 24 + (27*i) - (27*intScrollPosYour), 107, 26), "" + yourTrades[i].quantity);
	}
	GUI.Label(Rect(360, 194, 80, 20), "Gold: " + nYourMoney, styleText4);
	if(bYouReady){
		GUI.DrawTexture(Rect(330, 50, 120, 120), texReady);
	}

	GUI.DrawTexture(Rect(5, 292, 373, 28), texFrameSendMsg);
	style.active.background = texSendP;
	style.normal.background = texSend;
	if(GUI.Button(Rect(325, 292, 59, 25), "", style)){
		Send(sTo, sMsg);
		sChat += "Me: " + sMsg + "\n";
		sMsg = "";
		nChatLines++;
		if(nChatLines > 4) scrollPosChat = nChatLines - 4;
	}
	sMsg = GUI.TextField(Rect(5, 292, 373, 28), sMsg, 50, styleEdit);
	GUI.DrawTexture(Rect(2.5, 225, 381, 64), texFrameChat);
	values = Regex.Split(sChat,"\n");
	nChatLines = values.length;
	var intscrollPosChat;
	if(nChatLines > 4){
		scrollPosChat = GUI.VerticalScrollbar (Rect (368.5, 225, 15, 64), scrollPosChat, 4, 0, nChatLines);
		intScrollPosChat = scrollPosChat;
	}else{
		scrollPosChat = GUI.VerticalScrollbar (Rect (368.5, 225, 15, 64), scrollPosChat, 0, 0, 0);
		scrollPosChat = 0;
		intscrollPosChat = 0;
	}
	var sScrolledChat = "";
	for(i = intScrollPosChat; i < nChatLines; i++){
		sScrolledChat += values[i] + "\n";
	}
	//GUI.Label(Rect(10, 225, 370, 70), sChat);
	GUI.Label(Rect(10, 225, 370, 70), sScrolledChat);

	style.active.background = texFinalize;
	style.normal.background = texFinalizeP;
	if(GUI.Button(Rect(394, 230, 76, 50), "", style)){
		bMeReady = true;
		bFinalize = true;
		finalizeTrade3();
	}
	style.active.background = texCancel;
	style.normal.background = texCancelP;
	if(GUI.Button(Rect(400, 280, 63, 34), "", style)){
		bMeReady = false;
		bYouReady = false;
		bTrade = false;
		leaveTrade();
		GetTradeItems();
		Inventory.bInventory = false;
		scriptMain.bGUI = true;
		Craft.bCraft = false;
		scriptAH.bSell = false;
		scriptAH.bBuy = false;
		scriptChat.bChat = false;
		bInitialized = false;
	}
	if(bGUIFrame) GUIFrame();
	if(bLoaderWheel){
		nAngle += 200*Time.deltaTime;
		GUIUtility.RotateAroundPivot(nAngle, Vector2(240, 160));
		GUI.DrawTexture(Rect(210, 130, 60, 60), texLoaderWheel);
		GUIUtility.RotateAroundPivot(-nAngle, Vector2(240, 160));
	}
}