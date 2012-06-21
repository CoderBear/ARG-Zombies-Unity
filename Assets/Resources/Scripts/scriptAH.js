static var bAH	: boolean = false;
static var bBuy	: boolean = false;
static var bSell: boolean = false;
static var bExpired : boolean = false;
static var bRefreshAHItems : boolean = false;

var sellScrollPos 	: Vector2 = Vector2.zero;
var buyScrollPos 	: Vector2 = Vector2.zero;
var failScrollPos	: Vector2 = Vector2.zero;
var sellItemsFrame  : Rect;
var buyItemsFrame	: Rect;
var failItemsFrame	: Rect;
var touch 			: Touch;

var texSellItems 	: Array;
var texBuyItems 	: Texture2D[];
var texFailItems	: Texture2D[];
var sellItemCnt		: GUIContent;
var buyItemCnt 		: GUIContent;
var failItemCnt		: GUIContent;
var styleErrorFrame	: GUIStyle;

var styleAhAlertText: GUIStyle;
var ahAlertRect		: Rect;
var idAhBuyAlert	: int;
var idAhSellAlert	: int;
var idAhFaillAlert	: int;
static var bAhBuyAlert 		: boolean;
static var bAhSellAlert 	: boolean;
static var bAhFaillAlert 	: boolean;
static var bAhBuySelected	: boolean;
static var bAhSellSelected 	: boolean;
static var bAhExpiredSelected: boolean;

var nUserId		: int;
var nMoney		: int;
var nBuyItems	: int;
var nSellItems	: int;
var nFailItems	: int;
var myItems = new Array();
var AHItems		: Item3[];
var FailItems	: Item3[];
var nSearchItems: int;
var nSearchItems1:int;
var nBuyItem	: int;
var nSellItem	: int;
var nFailItem	: int;
var texBackB	: Texture2D;
var texAH		: Texture2D;
var texFailFrame: Texture2D;
var texSellFrame: Texture2D;
var texBuyFrame	: Texture2D;

var texSearch	: Texture2D;
var sTitle		: String;
var sPrice1		: String;
var sMoney		: String;
var sAH			: String;

var sQuantity	: String;
var sPrice		: String;
var sExpire		: String;
var sAux		: String;
var sSearch		: String;
var style		: GUIStyle;
var styleButSmll: GUIStyle;
var styleButBig	: GUIStyle;
var styleList	: GUIStyle;
var styleBut	: GUIStyle;
var styleButP	: GUIStyle;
var styleFail	: GUIStyle;
var styleFailP	: GUIStyle;
var styleTextF1	: GUIStyle;
var styleText1	: GUIStyle;
var styleText2	: GUIStyle;
var styleText3	: GUIStyle;

var scrollPos	: float;
var intScrollPos: int;

var is_updating	: boolean;
var is_updating_ah : boolean;

function Start(){
	is_updating_ah = false;
	nUserId = Global.myChar.id;
	nBuyItem = -1;
	nSellItem = -1;
	sQuantity = "1";
	sPrice = "0";
	sExpire = "0";
	nMoney = Global.myChar.Money;
	ahAlertRect = Rect (150, 100, 220, 120);
	sellItemsFrame = Rect(17, 72, 158, 190);
	buyItemsFrame =	Rect(17, 72, 158, 190);
	failItemsFrame = Rect(17, 72, 158, 190);
	GetAHItems();
}



// Gets the items available for buying and selling
function GetAHItems(){
	if (is_updating) return;
	is_updating = true;
	yield StartCoroutine( Global.getUserData() );
	nMoney = Global.myChar.Money;
	var i : int;
	nBuyItems = 0;
	nSellItems = 0;
	nFailItems = 0;

	var download : WWW = new WWW(Global.server + "/mmo_iphone/auction_items.php");
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying");
		download = new WWW(Global.server + "/mmo_iphone/auction_items.php");
		yield download;
	}
	
	var sBuyItems : String = download.text;
	var values : String[] = Regex.Split(sBuyItems, "<br />");
	if(values.length-1 > 0){
		nBuyItem = 0;
		bAhBuyAlert = false;
	}
	else{
		nBuyItem = -1;
		bAhBuyAlert = true;
	}
	AHItems = new Item3[values.length-1];
	texBuyItems = new Texture2D[values.length-1];
	for(i = 0; i<values.length-1; i++){
		AHItems[i] = Item3(values[i]);
		AHItems[i].active = true;
		texBuyItems[i] = Resources.Load("Menus/Inventory/Icons/" + AHItems[i].id);
		print(AHItems[i].name);
		nBuyItems++;
	}
	nSearchItems = nBuyItems;

 
	download = new WWW(Global.server + "/mmo_iphone/auction_fail.php?id_user=" + nUserId);	
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying");
		download = new WWW(Global.server + "/mmo_iphone/auction_fail.php?id_user=" + nUserId);	
		yield download;
	}
	

	var sFailItems : String = download.text;
	values = Regex.Split(sFailItems, "<br />");
	if(values.length-1 > 0){
		nFailItem = 0;
		bAhFaillAlert = false;
	}
	else{
		nFailItem = -1;
		bAhFaillAlert = true;	
	}
	FailItems = new Item3[values.length-1];
	texFailItems = new Texture2D[values.length-1];
	for(i = 0; i<values.length-1; i++){
		FailItems[i] = Item3(values[i], 0);
		FailItems[i].active = false;
		texFailItems[i] = Resources.Load("Menus/Inventory/Icons/" + FailItems[i].id);
		nFailItems++;
	}
	nSearchItems1 = nFailItems;
	
	download = new WWW(Global.server + "/mmo_iphone/items-on.php?id=" + nUserId);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying" );
		download = new WWW(Global.server + "/mmo_iphone/items-on.php?id=" + nUserId);
		yield download;
	}
	var sSellItems : String = download.text;
	values = Regex.Split(sSellItems, "<br />");
	if(parseInt(values[0]) > 0){
		nSellItem = 0;
		bAhSellAlert = false;
	}
	else{
		nSellItem = -1;
		bAhSellAlert = true;
	}
	//myItems = new Item[values.length-1];
	texSellItems = new Texture2D[values.length-1];
	
	//var myItems = new Array();
	texSellItems = new Array();
	var t=new Item();
	for(i = 0; i<values.length-2; i++){
		var newitem = new Item(Regex.Split(values[i+1], ":"));
		if ( newitem.temporar != 0 )
			continue;
		myItems.Add(newitem);
		t = myItems[myItems.length-1];
		texSellItems.Add( Resources.Load("Menus/Inventory/Icons/" + t.id) );
		nSellItems++;

	}

	sExpire = "24";
	is_updating = false;
}

// A button which is only visible within certain boundaries
function ScrollButton(aRect : Rect, aStr : String) : boolean{
	if(aRect.yMin>35 && aRect.yMax<307) return GUI.Button(aRect, aStr, styleList); else return false;
}

function ScrollButton(aRect : Rect, aCnt : GUIContent) : boolean{
	//if(aRect.yMin>70 && aRect.yMax<320) return GUI.Button(aRect, aCnt, styleList); else return false;
	return GUI.Button(aRect, aCnt, styleList);
}

// The interface for buying stuff
function guiBuy(){
	var download : WWW;
		
	//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
	CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_AUCTION_BUY );
	
	GUI.DrawTexture(Rect(4, 40, 471, 234), texBuyFrame);

	var i : int;
	var j : int;
	// nSearchItems - items which are active
	// nSearchItems1 - items which are expired
	
	//if(nBuyItems<1) GUI.Label(Rect(20, 40, 300, 20), "No items.");
	
	GUI.DrawTexture(Rect (157, 270, 317, 47), texSearch);
	GUI.Label(Rect(377, 275, 83, 36), "Search", styleButSmll);
	sSearch = GUI.TextField (Rect (185, 283, 181, 20), sSearch, 22);
	
	if(sAux != sSearch){
		sSearch = sSearch.Replace("\n", "").Replace("\r", "");
		sAux = sSearch;
	}
	// ACTIVE ITEMS HERE
	buyScrollPos = GUI.BeginScrollView(buyItemsFrame, buyScrollPos, Rect(0, 0, 145, nBuyItems*27));
	for(i = 0; i<nBuyItems; i++){
		styleList = (i == nBuyItem )? styleBut : styleButP;
		if(AHItems[i].name.ToLower().IndexOf(sSearch.ToLower()) > -1 || sSearch.length == 0){
			if (AHItems[i].quantity < 2) {
				buyItemCnt.text = "  " + (AHItems[i].name.length>14?AHItems[i].name.Substring(0,14)+"..":AHItems[i].name);
			} else {
				buyItemCnt.text = "  " + (AHItems[i].name.length>14?AHItems[i].name.Substring(0,14)+"..["+AHItems[i].quantity+"]":AHItems[i].name);
			}
			buyItemCnt.image = texBuyItems[i];
			//if(ScrollButton(Rect(20, 45 + (42*(nSearchItems1 + nSearchItems-1)) - (42*intScrollPos), 190, 39), AHItems[i].name)){
			if(ScrollButton(Rect(0, (27*i), 190, 26), buyItemCnt) || i == nBuyItem){
				texAH = Resources.Load("Menus/Inventory/Icons/" + AHItems[i].id);
				sTitle=	AHItems[i].name;
				/*sAH =	(AHItems[i].brutality > 0 ? ("\nBrutality : " + AHItems[i].brutality) : "") +
						(AHItems[i].accuracy > 0 ? ("\nAccuracy : " + AHItems[i].accuracy) : "") +
						(AHItems[i].fortitude > 0 ? ("\nFortitude : " + AHItems[i].fortitude) : "") +
						(AHItems[i].attack > 0 ? ("\nAttack : " + AHItems[i].attack) : "") +
						(AHItems[i].defense > 0 ? ("\nDefense : " + AHItems[i].defense) : "") +
						(AHItems[i].health > 0 ? ("\nHealth : " + AHItems[i].health) : "") +
						(AHItems[i].regen > 0 ? ("\nRegen : " + AHItems[i].regen) : "") +
						((AHItems[i].weapon_dmg_min != 0 || AHItems[i].weapon_dmg_max != 0) ? 
						("\nDamage : "	+ AHItems[i].weapon_dmg_min + " - "
										+ AHItems[i].weapon_dmg_max) : "") +
						(AHItems[i].level > 0 ? ("\nLevel : " + AHItems[i].level) : "") +
						"\nQuantity : " + AHItems[i].quantity +	(AHItems[i].quantity > 1 ? " pieces" : " piece") +
						"\nExpiration time : " + AHItems[i].exp_time;*/
				sAH =	"Expiration time : \n" + AHItems[i].exp_time;
				sPrice1 = "" + AHItems[i].price;
				sQuantity = "" + AHItems[i].quantity;
				nBuyItem = i;
			}
		}
	}
	GUI.EndScrollView();
	// ACTIVE ITEMS GUI, appears when an item is selected
	if(nBuyItem != -1){
		GUI.DrawTexture(Rect(185, 72, 51, 52), texAH);
		styleText1.normal.textColor = Color(1, 0.6, 0, 1);
		GUI.Label(Rect(240, 72, 80, 20), sTitle, styleText1);
		GUI.Label(Rect(240, 87, 220, 200), sAH, styleText2);
		styleText1.normal.textColor = Color(1, 1, 1, 1);
		GUI.Label(Rect(185, 179, 80, 20), "Quantity:", styleText1);
		GUI.Label(Rect(185, 218, 80, 20), "Price:", styleText1);
		GUI.Label(Rect(185, 198, 80, 20), sQuantity, styleText1);
		GUI.Label(Rect(185, 236, 80, 20), sPrice1, styleText1);
	
	
		if(GUI.Button(Rect(377, 225, 83, 36), "Back", styleButSmll)){
			scriptMain.bGUI = true;
			Craft.bCraft = false;
			bSell = false;
			bBuy = false;
			bExpired = false;
			Global.bNeedToUpdateInv = true;
		}
		
		if(GUI.Button(Rect(377, 75, 83, 33), "Buy", styleButBig))
		if ( !is_updating_ah )
		{
			BuyItem();
		}
		
		
	}
}

// Interface for expired stuff
function guiExpired(){
	var download : WWW;
	
	//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
	CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_AUCTION_EXP );
	
	GUI.DrawTexture(Rect(4, 40, 471, 234), texFailFrame);

	var i : int;
	// EXPIRED ITEMS HERE
	failScrollPos = GUI.BeginScrollView(failItemsFrame, failScrollPos, Rect(0, 0, 145, nFailItems*27));
	for(i = 0; i<nFailItems; i++){
		styleList = i == nFailItem ? styleFail : styleFailP;
		if (FailItems[i].quantity < 2) {
			failItemCnt.text = "  " + (FailItems[i].name.length>14?FailItems[i].name.Substring(0,14)+"..":FailItems[i].name);
		} else {
			failItemCnt.text = "  " + (FailItems[i].name.length>14?FailItems[i].name.Substring(0,14)+"..["+FailItems[i].quantity+"]":FailItems[i].name);
		}

		failItemCnt.image = texFailItems[i];
		if(ScrollButton(Rect(0, (27*i), 190, 26), failItemCnt) || i == nFailItem){
			texAH = Resources.Load("Menus/Inventory/Icons/" + FailItems[i].id);
			sTitle=	FailItems[i].name;
			sAH =	"\nQuantity : " + FailItems[i].quantity +
					"\nPrice : " + FailItems[i].price +
					"\nExpiration time : " + FailItems[i].exp_time;
					
			sQuantity = "" + FailItems[i].quantity;
			sPrice = "" + FailItems[i].price;
			sExpire = "24";										
			nFailItem = i;
		}
	}
	GUI.EndScrollView();
	// EXPIRED ITEMS GUI, appears when an item is selected
	if(nFailItem != -1){
		GUI.DrawTexture(Rect(185, 72, 51, 52), texAH);
		styleText1.normal.textColor = Color(1, 0.6, 0, 1);
		GUI.Label(Rect(240, 72, 80, 20), sTitle, styleText1);
		styleText1.normal.textColor = Color(1, 1, 1, 1);
		GUI.Label(Rect(240, 87, 80, 20), "Expired", styleTextF1);
		//GUI.Label(Rect(260, 155, 190, 70), sAH, styleText2);

		GUI.Label(Rect(185, 160, 80, 20), "Quantity:", styleText1);
		GUI.Label(Rect(185, 199, 80, 20), "Price:", styleText1);
		GUI.Label(Rect(185, 237, 80, 20), "Expires in 24 h.", styleText1);

		sAux = sQuantity;
		sAux = GUI.TextField (Rect (183, 179.5, 92.5, 20), sAux, 25);
		if(sAux.length<1) sAux = "1";
		if(parseInt(sAux)) sQuantity = sAux; else sAux = sQuantity;
		if(FailItems.length > 0)
		if(parseInt(sQuantity)>FailItems[nFailItem].quantity) sQuantity = ""+FailItems[nFailItem].quantity;

		sAux = sPrice;
		sAux = GUI.TextField (Rect (183, 218.5, 92.5, 20), sAux, 25);
		if(sAux.length<1) sAux = "1";
		if(parseInt(sAux)) sPrice = sAux; else sAux = sPrice;
		/*	
		sAux = sExpire;
		sAux = GUI.TextField (Rect (336, 250, 123, 18), sAux, 25);
		if(sAux.length<1) sAux = "0";
		if(parseInt(sAux)) sExpire = sAux; else sAux = sExpire;
		if(parseInt(sExpire)>48) sExpire = "48";
		*/
		if(GUI.Button(Rect(377, 75, 83, 33), "Resell", styleButBig)){
			download = new WWW(Global.server + "/mmo_iphone/auction_fail.php?id_user=" + nUserId +
				"&auction=" + FailItems[nFailItem].id_auction + "&opt=3" +
				"&quantity=" + sQuantity + "&price=" + sPrice + "&exp=" + sExpire);
			yield download;
			while (download.error && download.error.ToString().Contains("Resolving host timed out"))
			{
				Debug.Log( "Retrying" );
				download = new WWW(Global.server + "/mmo_iphone/auction_fail.php?id_user=" + nUserId +
				"&auction=" + FailItems[nFailItem].id_auction + "&opt=3" +
				"&quantity=" + sQuantity + "&price=" + sPrice + "&exp=" + sExpire);
				yield download;
			}
			//while (!download.isDone) continue;
			print("expired response is:"+download.text);
			sAH = "\nItem placed in Auction House.";

			yield StartCoroutine( Global.getUserData() );
			nMoney = Global.myChar.Money;
			GetAHItems();
			nFailItem = -1;
			Global.bNeedToUpdateInv = true;
			//yield WaitForSeconds(1);
		}

		if(GUI.Button(Rect(377, 113, 83, 36), "to   BackPack", styleButSmll)){
			download = new WWW(Global.server + "/mmo_iphone/auction_fail.php?id_user=" + nUserId +
				"&auction=" + FailItems[nFailItem].id_auction + "&opt=2");
			yield download;
			while (download.error && download.error.ToString().Contains("Resolving host timed out"))
			{
				Debug.Log( "Retrying" );
				download = new WWW(Global.server + "/mmo_iphone/auction_fail.php?id_user=" + nUserId +
				"&auction=" + FailItems[nFailItem].id_auction + "&opt=2");
				yield download;
			}
			//while (!download.isDone) continue;
			
			var sMsg = download.text;
			print("expired BackPack response is:"+download.text);
			sAH = "\nItem back in backpack.";
			GetAHItems();
			nFailItem = -1;
			Global.bNeedToUpdateInv = true;
		}
		
		if(GUI.Button(Rect(377, 154, 83, 36), "Vendor", styleButSmll)){

            download = new WWW(Global.server + "/mmo_iphone/auction_fail.php?id_user=" + nUserId +
				"&auction=" + FailItems[nFailItem].id_auction + "&opt=1");
            yield download;
            while (download.error && download.error.ToString().Contains("Resolving host timed out"))
			{
				Debug.Log( "Retrying" );
	            download = new WWW(Global.server + "/mmo_iphone/auction_fail.php?id_user=" + nUserId +
				"&auction=" + FailItems[nFailItem].id_auction + "&opt=1");
	            yield download;
			}
            print("expired Vendor response is:"+download.text);
            sAH = "\nItem sold.";

            yield StartCoroutine( Global.getUserData() );
            nMoney = Global.myChar.Money;
            GetAHItems();
           	nFailItem = -1;
           	Global.bNeedToUpdateInv = true;
            yield WaitForSeconds(1);
		}

		if(GUI.Button(Rect(377, 225, 83, 36), "Back", styleButSmll)){
			scriptMain.bGUI = true;
			Craft.bCraft = false;
			bExpired = false;
			bBuy = false;
			bSell = false;
			Global.bNeedToUpdateInv = true;
		}
	}
}

// Interface for selling stuff
function guiSell(){
	var i : int;
	
	
	//if(nSellItems<1) GUI.Label(Rect(20, 40, 300, 20), "No items available for selling.");
	
	//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
	CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_AUCTION_SELL );

    var t = new Item();
	
	GUI.DrawTexture(Rect(4, 40, 471, 234), texSellFrame);
	sellScrollPos = GUI.BeginScrollView(sellItemsFrame, sellScrollPos, Rect(0, 0, 145, nSellItems*27));

	for(i = 0; i<nSellItems; i++){
		t = myItems[i];

		styleList = i == nSellItem ? styleBut : styleButP;
			if (t.quantity < 2) {
				sellItemCnt.text = "  " +  (t.name.length>14 ? t.name.Substring(0,14)+".." : t.name);
			} else {
				sellItemCnt.text = "  " +  (t.name.length>14 ? t.name.Substring(0,14)+"..["+t.quantity+"]" : t.name);
		}

		sellItemCnt.image = texSellItems[i];
		if(ScrollButton(Rect(0, (27*i), 190, 26), sellItemCnt) || i == nSellItem){
			texAH = Resources.Load("Menus/Inventory/Icons/" + t.id);
			sTitle = t.name;
			sAH =	(t.brutality > 0 ? ("\nBrutality : " + t.brutality) : "") +
					(t.quantity > 0 ? ("\nQuantity : " + t.quantity) : "") +
					(t.accuracy > 0 ? ("\nAccuracy : " + t.accuracy) : "") +
					(t.fortitude > 0 ? ("\nFortitude : " + t.fortitude) : "") +
					(t.attack > 0 ? ("\nAttack : " + t.attack) : "") +
					(t.defense > 0 ? ("\nDefense : " + t.defense) : "") +
					(t.health > 0 ? ("\nHealth : " + t.health) : "") +
					(t.regen > 0 ? ("\nRegen : " + t.regen) : "") +
					((t.weapon_dmg_min != 0 || t.weapon_dmg_max != 0) ? 
					("\nDamage : "	+ t.weapon_dmg_min + " - "
									+ t.weapon_dmg_max) : "") +
					(t.level > 0 ? ("\nRequired level : " + t.level) : "");
			nSellItem = i;
		}
	}
	GUI.EndScrollView();
	if(nSellItem != -1){
		GUI.DrawTexture(Rect(185, 72, 51, 52), texAH);
		styleText1.normal.textColor = Color(1, 0.6, 0, 1);
		GUI.Label(Rect(240, 72, 80, 20), sTitle, styleText1);
		GUI.Label(Rect(240, 80, 220, 200), sAH, styleText2);
		styleText1.normal.textColor = Color(1, 1, 1, 1);
		GUI.Label(Rect(185, 160, 80, 20), "Quantity:", styleText1);
		GUI.Label(Rect(185, 199, 80, 20), "Price:", styleText1);
		GUI.Label(Rect(185, 237, 80, 20), "Expires in 24 h.", styleText1);
       
		sAux = sQuantity;
		sAux = GUI.TextField (Rect (183, 179.5, 92.5, 20), sAux, 25);
		if(sAux.length<1) sAux = "0";
		if(parseInt(sAux)) sQuantity = sAux; else sAux = sQuantity;
		t = myItems[nSellItem];
		if(parseInt(sQuantity)>t.quantity) sQuantity = ""+t.quantity;
        //Debug.Log("sAux : "+sAux);
        
		sAux = sPrice;
		sAux = GUI.TextField (Rect (183, 218.5, 92.5, 20), sAux, 25);
		if(sAux.length<1) sAux = "0";
		if(parseInt(sAux)) sPrice = sAux; else sAux = sPrice;
		
		/*sAux = sExpire;
		sAux = GUI.TextField (Rect (332, 241, 93, 20), sAux, 25);
		if(sAux.length<1) sAux = "0";
		if(parseInt(sAux)) sExpire = sAux; else sAux = sExpire;
		if(parseInt(sExpire)>48) sExpire = "48";
		*/
		
		if( GUI.Button( Rect( 377, 225, 83, 36 ), "Back", styleButSmll ) ){
			scriptMain.bGUI = true;
			Craft.bCraft = false;
			bSell = false;
			bBuy = false;
			bExpired = false;
			Global.bNeedToUpdateInv = true;
		}
		
		if(GUI.Button(Rect(377, 75, 83, 33), "Sell", styleButBig) && parseInt(sQuantity) > 0)
		if ( !is_updating_ah )
		{
            SellItem();
         //  guiSell();
            print("S-a vandut + ceva");
		}

	}
}

function BuyItem()
{
	if ( is_updating_ah )
		return;
	is_updating_ah = true;
			
	var download = new WWW(Global.server + "/mmo_iphone/auction_buy.php?id_user=" + nUserId +
							"&auction=" + AHItems[nBuyItem].id_auction);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying" );
		download = new WWW(Global.server + "/mmo_iphone/auction_buy.php?id_user=" + nUserId +
								"&auction=" + AHItems[nBuyItem].id_auction);
		yield download;
	}

	if(download.text.IndexOf("yes") > -1) {
		sAH = "\nItem bought.";
				
	} else {
		sAH = "\nFailed.";
	}
			
			
	print("buy response is:"+download.text);
	//GetAHItems();

	yield StartCoroutine( Global.getUserData() );
	nMoney = Global.myChar.Money;
	GetAHItems();
	Global.bNeedToUpdateInv = true;
	nBuyItem = 0;
	yield WaitForSeconds(1.0);
	is_updating_ah = false;
}

function SellItem()
{
	if ( is_updating_ah )
		return;
    var t = new Item();	
    t = myItems[nSellItem];	
    print("t-ul cautat de noi este " + t.name);
	is_updating_ah = true;
  //  Debug.Log("nUserId = "+nUserId+" id item = "+myItems[nSellItem].id+" quantity "+sQuantity+" price ="+ sPrice+";_____nSellItem="+nSellItem+" Numele"+myItems[nSellItem].name);
            
	var download : WWW = new WWW(Global.server + "/mmo_iphone/auction.php?id_user=" + nUserId + "&id_item=" +
					t.id + "&quantity=" + sQuantity + "&price=" + sPrice +
				"&exp=" + sExpire);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying" );
		download = new WWW(Global.server + "/mmo_iphone/auction.php?id_user=" + nUserId + "&id_item=" +
								t.id + "&quantity=" + sQuantity + "&price=" + sPrice +
								"&exp=" + sExpire);
		yield download;
               
	}
	Debug.Log("Sell: " +sQuantity);
	sAH = "\nItem sold.";
			
			
	for(var i = 0; i < Inventory.self.maxInvItems; i++ )
		if( Inventory.self.itemsInInventory[ i ].id == t.id  )
		{
			Inventory.self.itemsInInventory[ i ].quantity = t.quantity - parseInt(sQuantity);
			if ( Inventory.self.itemsInInventory[ i ].quantity <= 0 )
				Inventory.self.itemsInInventory[ i ] = Item();
		}
			
	for( i = 0; i < Inventory.self.maxEquipedItems; i++ )
		if( Inventory.self.itemsEquiped[ i ].id == t.id)
		{
			Inventory.self.itemsEquiped[ i ].quantity = t.quantity - parseInt(sQuantity); 
			if ( Inventory.self.itemsEquiped[ i ].quantity <= 0 )
				Inventory.self.itemsEquiped[ i ] = Item();
		}
		
			
	Inventory.self.is_updating=false;
	yield Inventory.self.SendInventoryItems();
            
			
	yield StartCoroutine( Global.getUserData() );
	nMoney = Global.myChar.Money;
			
	GetAHItems();
	Global.bNeedToUpdateInv = true;
	nSellItem = 0;
	
	yield WaitForSeconds(1.0);
	is_updating_ah = false;

	
	
	//yield WaitForSeconds(1);
}

function OnGUI(){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	bAH = true;
	if(!bAH) return;
	//GUI.DrawTexture(Rect(0, 0, 480, 320), texBackB);

	if(bBuy)
		if(!bAhBuyAlert)
			guiBuy();
	
	if(bAhBuySelected && bAhBuyAlert){
		bBuy = false;
		scriptMain.bGUI = true;
		ahAlertRect = GUI.Window (idAhBuyAlert, ahAlertRect, DoBuyAlert, "",styleErrorFrame);
		GUI.FocusWindow(idAhBuyAlert);
	}
	if ( bRefreshAHItems )
	{
		GetAHItems();
		bRefreshAHItems = false;
	}
	if(bSell)
		if(!bAhSellAlert)
			guiSell();
		/*else{
			scriptMain.bGUI = true;
			ahAlertRect = GUI.Window (idAhSellAlert, ahAlertRect, DoSellAlert, "",styleErrorFrame);
			GUI.FocusWindow(idAhSellAlert);
		}*/
	if(bAhSellSelected && bAhSellAlert){
		scriptMain.bGUI = true;
		bSell = false;
		ahAlertRect = GUI.Window (idAhSellAlert, ahAlertRect, DoSellAlert, "",styleErrorFrame);
		GUI.FocusWindow(idAhSellAlert);
	}
	if(bExpired) 
		if(!bAhFaillAlert)
			guiExpired();
		/*else{
			scriptMain.bGUI = true;
			ahAlertRect = GUI.Window (idAhFaillAlert, ahAlertRect, DoExpiredAlert, "",styleErrorFrame);
			GUI.FocusWindow(idAhFaillAlert);
		}*/
	if(bAhExpiredSelected && bAhFaillAlert){
		scriptMain.bGUI = true;
		bExpired = false;
		ahAlertRect = GUI.Window (idAhFaillAlert, ahAlertRect, DoExpiredAlert, "",styleErrorFrame);
		GUI.FocusWindow(idAhFaillAlert);
	}
}

function Update(){
   
   if (Input.touchCount>0)
   {
    touch = Input.GetTouch(0);
    if (touch.phase == TouchPhase.Moved)
    {
    if(bBuy) 
		{
    		//only dragging
    		//print("now drag ah buy");
    		if(buyItemsFrame.Contains(Vector2(touch.position.x,320 - touch.position.y)))
    			buyScrollPos.y += touch.deltaPosition.y;
		}
	
	if(bSell)
		{
	    	//only dragging
    		//print("now drag ah sell");
    		if(sellItemsFrame.Contains(Vector2(touch.position.x,320 - touch.position.y)))
    			sellScrollPos.y += touch.deltaPosition.y;
	    }
	    
	if(bExpired) 
		{
    		//only dragging
    		//print("now drag ah expired");
    		if(failItemsFrame.Contains(Vector2(touch.position.x,320 -touch.position.y)))
    			failScrollPos.y += touch.deltaPosition.y;
		}
	}	
   }	
}

function DoBuyAlert (windowID : int) {
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	GUI.Label(Rect(20,30,190,20),"No items to buy.", styleAhAlertText);
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleButSmll)){
		bBuy = false;
		bAhBuySelected = false;
	}
}

function DoSellAlert (windowID : int) {
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	GUI.Label(Rect(20,30,190,20),"No items in inventory.", styleAhAlertText);
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleButSmll)){
		bSell = false;
		bAhSellSelected = false;
	}
}

function DoExpiredAlert (windowID : int) {
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	GUI.Label(Rect(20,30,190,40),"No expired items to recover from \nAuction House.", styleAhAlertText);
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleButSmll)){
		bExpired = false;
		bAhExpiredSelected = false;
	}
}
