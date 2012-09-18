var allItems           : Item5[];

var advertisementsName : String[];
var advertisementsLink : String[];
var itemName           : String;
var sItem   	       : String;
var sItemDetails       : String;
var sIngredients       : String;
var sTitle		       : String;
var sDay1              : String;
var sDay3              : String;
var sDay5              : String;
var sDay7              : String;

var nrAllItems         : int;
var nrAdvertisements   : int;
var upperLimit         : int;
var lowerLimit         : int; 
var v                  : int[];

var changedLvl1        : boolean; //lvl 1-9
var changedLvl2        : boolean; //lvl 10-19
var changedLvl3        : boolean; //lvl 20-29
var changedLvl4        : boolean; //lvl 30-39
var changedLvl5        : boolean; //lvl 40-49
var changedLvl6        : boolean; //lvl 50+
var changedLvl         : boolean;
static var buyDown     : boolean = false; //buy button
static var bMarket     : boolean; 
static var bCraft      : boolean; // flag inventory button was pressed
var is_updating	       : boolean;
static var redeemDown         : boolean;
static var advetisementDown   : boolean;
var ok                 : boolean;

var i                  : int;
var nUserId		       : int;
var nItems		       : int;
var nCraftPos	       : int;
var nCraftItems	       : int;
var intScrollPos       : int;
var cont               : int;

var scrollPos	       : float;

static var marketBack : boolean = false;
var styleDiff1 			  : GUIStyle;
var styleDiff2 			  : GUIStyle;
var styleDiff3 			  : GUIStyle;
var styleDiff4 			  : GUIStyle;
var styleDiff5 			  : GUIStyle;
var styleDiff6 			  : GUIStyle;
var styleRedeemBut		  : GUIStyle;
var styleEarnBut		  : GUIStyle;
var styleBuyButton	      : GUIStyle;
var styleBuyBut			  : GUIStyle;
var newbackStyle		  : GUIStyle;
var styleBackBut		  : GUIStyle;
var styleLowerUpper       : GUIStyle;
var styleLoow             : GUIStyle;
var styleButP             : GUIStyle;
var styleBut	          : GUIStyle;
var style		          : GUIStyle;
var styleText1            : GUIStyle;
var styleText2	          : GUIStyle;
var styleCraftIngredients : GUIStyle;
var styleList	          : GUIStyle;
var stylePlus             : GUIStyle;
var backbtnstyle          : GUIStyle;
var btnstyle 	          : GUIStyle;
var btnClaimToken         : GUIStyle;

var MarketTexture		 : Texture2D;
var ClaimTokensTexture   : Texture2D;
var texLoaderWheel       : Texture2D;
var texFrame             : Texture2D;
var texBack		         : Texture2D;
var texCraft	         : Texture2D;
var neededItems	         : Texture2D[];
var texCraftBut	         : Texture2D;
var texCraftButP         : Texture2D;
var texBackBut 	         : Texture2D;
var texBackButP	         : Texture2D;
var texItemToDisplay     : Texture2D[];
var texCategoryToDisplay : Texture2D[];
var texCraftFrame        : Texture2D;			// texture for craft frame
var texAux	             : Texture2D;
var x1                   : Texture2D;
var x2                   : Texture2D;
var x3                   : Texture2D;
var x4                   : Texture2D;

var scrollPosition      : Vector2;

var touch 		: Touch;

var scrollFrame	: Rect;

var itemToDisplay : GUIContent;

var mainTexture       : buttonSize;

function initCoords()
{
	mainTexture = buttonSize(0.1, 0.05, 0.9, 0.8);
}

class buttonSize
{
	var x      : int;
	var y      : int;
	var width  : int;
	var height : int;
	
	function buttonSize(xPos : float, yPos : float, bWidth : float, bHeight : float)
	{
		x      = Screen.width * xPos;
		y      = Screen.height * yPos;
		width  = Screen.width * bWidth;
		height = Screen.height * bHeight;		
	}
}


function Start()
{
	updateClaimTokensMessage();
	initCoords();
	changedLvl1 = true;
	changedLvl2 = false;
	changedLvl3 = false;
	changedLvl4 = false;
	changedLvl5 = false;
	changedLvl6 = false;
	
	lowerLimit = 0;
    upperLimit = 9;
	nUserId = Global.myChar.id;
	scrollPosition = Vector2.zero;
	
	scrollFrame = Rect(Global.screenW * 0.2708, Global.screenH * 0.3125, Global.screenW * 0.2916, Global.screenH * 0.5);
	nrAllItems = 0;
	getItems();
	btnClaimToken.active.background = Resources.Load("Buttons/CLAIM");
	btnClaimToken.normal.background = Resources.Load("Buttons/CLAIM");
	
    Resources.UnloadUnusedAssets();
	
}

function getItems()
{
	var getItemsUrl = Global.server + "/mmo_iphone/itemsinventor.php"; 
	var i : int;
	var sAllItems : String;
	
	var download = new WWW( getItemsUrl );
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
		{
			Debug.Log("Astept download-ul");
			download = new WWW( getItemsUrl );
			yield download;
		}
	if(download.error) 
		{
			print( "Error downloading Items: " + download.error );
			return;
		}
	else
		{
			sAllItems = download.text;
		}  
	var values : String[] = Regex.Split(sAllItems, "<br>");
	nrAllItems = values.length-1;
	allItems = new Item5[nrAllItems];
	print("Sunt: " + nrAllItems + " valori "); 
	for(i = 0; i < nrAllItems ; i++)
		{
			allItems[i] = Item5(values[i]);
		}
	
}

//=============
//VB Cu Ionut sami modifice buyupdate sami faca el scaderea pe server
function buyItem(idItem : int, price : int )
{
	var	wwwData;
	var postData : WWWForm = new WWWForm();	
	print("Id-ul itemului selectat: " + idItem + " are pretul: " + price);
	//TODO: ide modificat variabilele de post.
	postData.AddField("userid", Global.myChar.id + "");
	print("Id-ul USERULUI selectat: " + Global.myChar.id);
	
	postData.AddField("itemid", idItem + "");
//	Debug.Log();
	print("Id-ul itemului selectat: " + idItem );
	
	postData.AddField("price", price +"");
	print(" are pretul: " + price);
	//TODO: update server: bani -= pret item cumparat
	
	var buyItem1 = Global.server + "/mmo_iphone/buyupdate.php";//invalid link
	print("Trece de link ");
	var download = new WWW(buyItem1, postData);
	print("Trece de link ==========");
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW(buyItem1, postData);
			print("Trece de link ++++++++");
			yield download;
		}

	if(download.error) 
		{
			print( "Error updating: " + download.error );
			wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			wwwData = download.text;
			print ("A mers!" + /*Global.myChar.id + " " +*/ download.text + "\n" + wwwData);
		}
		
}

function earnTokens()
{ //advertisements view
	var getAdvertisements = Global.server + ""; // link-ul pentru reclame.
	var values : String[]; 
	var values1 : String[];
	var i : int;
	
	var download = new WWW( getAdvertisements );
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
		{
			download = new WWW( getAdvertisements );
			yield download;
		}
	if(download.error) 
		{
			print( "Error downloading Advertisements: " + download.error );
			return;
		}
	else
		{
			var	wwwDat = download.text;
		}  
	values = Regex.Split(wwwDat, "<br />");
	for( i = 0; i < values.Length; i++)
	{
		advertisementsName[i] = values[0];
		advertisementsLink[i] = values[1];
	}
	
}

function claimTokens(aStr : String, soultoken : String)
{ //Buy/In-app Purchase view
	// Cand este apasat un buton, trimite face update data, soultoken si mesaj
	var	wwwData;
	var date : String;
	var newDate : String;
	var postData : WWWForm = new WWWForm();
	date = System.DateTime.Now.ToString();
	var values1 = Regex.Split(date, "/");
	var aux = Regex.Split(values1[2], " ");
	newDate = aux[0] + "-" + values1[0] + "-" + values1[1] + " " + aux[1];

	postData.AddField("token", soultoken);
	postData.AddField("userid", Global.myChar.id + "");
	postData.AddField("data", newDate); //TODO: verificare variabile de post + link valid
	postData.AddField("tiplink", aStr);

	var wwwDat;
	var values : String[];
	
	var sendData = Global.server + "/mmo_iphone/linkuri.php";//data link
	
	var download = new WWW(sendData, postData);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW(sendData, postData);
			yield download;
		}

	if(download.error) 
		{
			print( "Error updating: " + download.error );
			wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			print("S-au trimis: data - " + newDate + ", " + aStr + ", " + soultoken);
			wwwDat = download.text;
			print ("Data trimisa" + Global.myChar.id + " " + download.text);
		}

		values = Regex.Split(wwwDat, "<br />");
		switch(aStr)
			{
				case "d1":
					sDay1 = values[0];
					break;
				case "d3":
					sDay3 = values[0];
					break;
				case "d5":
					sDay5 = values[0];
					break;
				case "d7":
					sDay7 = values[0];
					break;
			}
			print("intoarce : " + wwwDat);
	//TODO: adaugat grafica + actiunea pe buton. onclick = update data + add bani
}

function updateClaimTokensMessage()  
{
	//TODO: trebuie aplicata atunci cand se deschide pagina market tokens pentru a afisa timpul ramas pana la activarea mesajului.
	var	wwwData;
	var date : String;
	var newDate : String;
	var postData : WWWForm = new WWWForm();
	date = System.DateTime.Now.ToString();
	var values1 = Regex.Split(date, "/");
	var aux = Regex.Split(values1[2], " ");
	newDate = aux[0] + "-" + values1[0] + "-" + values1[1] + " " + aux[1];
	
	postData.AddField("userid", Global.myChar.id + "");
	postData.AddField("data", newDate);
	
	var wwwDat;
	var values : String[];
	
	var sendData = Global.server + "/mmo_iphone/linkrefresh.php";
	
	var download = new WWW(sendData, postData);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			download = new WWW(sendData, postData);
			yield download;
		}

	if(download.error) 
		{
			print( "Error updating: " + download.error );
			wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			wwwDat = download.text;
		}
	
		print("Trimitem primele date");
		values = Regex.Split(wwwDat, ";");
		
		if (values.length >4) {
		sDay1 = values[0];
		
		sDay3 = values[1];
		sDay5 = values[2];
		sDay7 = values[3];
		}
}

function Update()
{
	if(bCraft && Input.touchCount > 0)
		{
			touch = Input.GetTouch(0); 
			
			if(touch.phase == TouchPhase.Moved)
				{
		    		//only dragging
		    		//print("now drag ah buy");
		    		if(scrollFrame.Contains(Vector2(touch.position.x,Global.screenH -touch.position.y)))
		    			scrollPosition.y += touch.deltaPosition.y;
				}
		}
}

function OnGUI()
{
	//TODO: butoanele de buy si redeem au functionalitatile inversate
	//var screenScale : float = Screen.width/480.0;
	//var scaledMatrix : Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale, screenScale, screenScale));
	//GUI.matrix = scaledMatrix;
	
//	if(!bMarket)
	//	return;

	
	if(buyDown)
		{	
			scriptMain.alertJos = false;
			GUI.DrawTexture(Rect(Global.screenW * 0.2083, Global.screenH * 0.078125, Global.screenW * 0.75, Global.screenH * 0.8906), MarketTexture);
			scriptMain.butDown = false;
			
			if(GUI.Button(Rect(Global.screenW * 0.5, Global.screenH * 0.1875, Global.screenW * 0.0729, Global.screenH * 0.05625), "", styleDiff1))
				{
					changedLvl1 = true;
					changedLvl2 = false;
					changedLvl3 = false;
					changedLvl4 = false;
					changedLvl5 = false;
					changedLvl6 = false;
					changedLvl = true;
					lowerLimit = 0;
					upperLimit = 9;
				}
			if(GUI.Button(Rect(Global.screenW * 0.5729, Global.screenH * 0.1875, Global.screenW * 0.0729, Global.screenH * 0.05625), "", styleDiff2))
				{
					changedLvl1 = false;
					changedLvl2 = true;
					changedLvl3 = false;
					changedLvl4 = false;
					changedLvl5 = false;
					changedLvl6 = false;
					changedLvl = true;
					lowerLimit = 10;
					upperLimit = 19;
				}
			if(GUI.Button(Rect(Global.screenW * 0.6458, Global.screenH * 0.1875, Global.screenW * 0.0729, Global.screenH * 0.05625), "", styleDiff3))
				{
					changedLvl1 = false;
					changedLvl2 = false;
					changedLvl3 = true;
					changedLvl4 = false;
					changedLvl5 = false;
					changedLvl6 = false;
					changedLvl = true;
					lowerLimit = 20;
					upperLimit = 29;
				}
			if(GUI.Button(Rect(Global.screenW * 0.7187, Global.screenH * 0.1875, Global.screenW * 0.0729, Global.screenH * 0.05625), "", styleDiff4))
				{
					changedLvl1 = false;
					changedLvl2 = false;
					changedLvl3 = false;
					changedLvl4 = true;
					changedLvl5 = false;
					changedLvl6 = false;
					changedLvl = true;
					lowerLimit = 30;
					upperLimit = 39;
				}
			if(GUI.Button(Rect(Global.screenW * 0.7916, Global.screenH * 0.1875, Global.screenW * 0.0729, Global.screenH * 0.05625), "", styleDiff5))
				{
					changedLvl1 = false;
					changedLvl2 = false;
					changedLvl3 = false;
					changedLvl4 = false;
					changedLvl5 = true;
					changedLvl6 = false;
					changedLvl = true;
					lowerLimit = 40;
					upperLimit = 49;
				}
			if(GUI.Button(Rect(Global.screenW * 0.8645, Global.screenH * 0.1875, Global.screenW * 0.0729, Global.screenH * 0.05625), "", styleDiff6))
				{
					changedLvl1 = false;
					changedLvl2 = false;
					changedLvl3 = false;
					changedLvl4 = false;
					changedLvl5 = false;
					changedLvl6 = true;
					changedLvl = true;
					lowerLimit = 50;
					upperLimit = 32767;
				}
			
			if(GUI.Button(Rect(Global.screenW * 0.3125, Global.screenH * 0.8281, Global.screenW * 0.1437, Global.screenH * 0.09375), "", newbackStyle))
				{
					marketBack = true;
					scriptMain.bCharFrame = true;
					buyDown = !buyDown;
					scriptMain.makeActiveOrInactive = true;
				}
			
			//GUI.DrawTexture(Rect(115, 454, 345, 270), texBack);
			//GUI.DrawTexture(Rect(5, 30, 228, 282), texFrame);
			//GUI.DrawTexture(Rect(243, 30, 228, 282), texFrame);
			
			scrollPosition = GUI.BeginScrollView(scrollFrame, scrollPosition, Rect(0, 0, Global.screenW * 0.2708, Global.screenH * 0.0843 * nCraftItems));
			nCraftItems = 0;
			var idItem = 0;
			var itemPrice = 0;
			var level = 0;
			for(i = 0; i < nrAllItems; i++)
				{
					if(allItems[i].level >= lowerLimit && allItems[i].level < upperLimit)
					{
						//styleList = i == nCraftPos ? styleBut : styleButP;
						itemToDisplay.text = " " + (allItems[i].name.length > 14 ? allItems[i].name.Substring(0,14) + ".." : allItems[i].name);
						//itemToDisplay.image = texCategoryToDisplay[i]; TODO: verificare categorie
						
						//if(GUI.Button(Rect(15, 2 + (27 * nCraftItems), 240, 27), itemToDisplay, styleList) || i == nCraftPos)
						if(GUI.Button(Rect(Global.screenW * 0.03125, Global.screenH * 0.00625 + (Global.screenH * 0.0843 * nCraftItems), Global.screenW * 0.2291, Global.screenH * 0.0843), itemToDisplay) || i == nCraftPos)
							{	
								changedLvl = false;
								nCraftPos = i;
								//texCraft = texCategoryToDisplay[i];
								
								sTitle = allItems[i].name.length > 14 ? splitItemName(allItems[i].name) : allItems[i].name;
								
								sItem = ("BRUT +" + allItems[i].brutality + "\n") +
										("ACC  +" + allItems[i].accuracy + "\n") +
										("FORT +" + allItems[i].fortitude + "\n") +
										("ATK  +" + allItems[i].attack + "\n") +
										("DEF  +" + allItems[i].defense + "\n");
									
								sItemDetails = ("LEVEL REQUIRED : " + allItems[i].level + "\n") +
											   ("PRICE : " + allItems[i].price + "\n");
								
								idItem = allItems[i].id;
								itemPrice = allItems[i].price;
								level  = allItems[i].level;
										
							}
						nCraftItems++;
					}

				}
				GUI.EndScrollView();
				
				if(nCraftPos != -1)
					{
						//TODO: afisare textura item
						
						GUI.Label(Rect(Global.screenW * 0.7083, Global.screenH * 0.3125, Global.screenW * 0.2916, Global.screenH * 0.125), sTitle);
						
						GUI.Label(Rect(Global.screenW * 0.6041, Global.screenH * 0.4062, Global.screenW * 0.28125, Global.screenH * 0.2187), sItemDetails);
						
						GUI.Label(Rect(Global.screenW * 0.8541, Global.screenH * 0.4062, Global.screenW * 0.1041, Global.screenH * 0.25), sItem);
						
						//Todo: verificare daca userul are bani pentru item-ul respectiv						
						if(Global.myChar.soulToken >= itemPrice && itemPrice >= 0 && Global.myChar.LVL >= level)
							{ 
								if(GUI.Button(Rect(Global.screenW * 0.7187, Global.screenH * 0.625, Global.screenW * 0.1041, Global.screenH * 0.09375), "", styleBuyBut))
									{
										buyItem(idItem, itemPrice);
										Global.myChar.soulToken -= itemPrice;
										//Global.save_stats();
									}
							}
					}
		}
		
		
				
		if(redeemDown)
			{
				scriptMain.alertJos = false;
				GUI.DrawTexture(Rect(Global.screenW * 0.25, Global.screenH * 0.04, Global.screenW * 0.7083, Global.screenH * 1.05), ClaimTokensTexture);
				scriptMain.butDown = false;
				
				if(GUI.Button(Rect(Global.screenW * 0.2916, Global.screenH * 0.8906, Global.screenW * 0.1437, Global.screenH * 0.09375), "", newbackStyle))
				{
					marketBack = true;
					scriptMain.bCharFrame = true;
					redeemDown = !redeemDown;
					scriptMain.makeActiveOrInactive = true;
					
				}
				
				GUI.DrawTexture(Rect(Global.screenW * 0.3229, Global.screenH * 0.4218, Global.screenW * 0.0625, Global.screenH * 0.09375), x1);
				GUI.DrawTexture(Rect(Global.screenW * 0.3229, Global.screenH * 0.5468, Global.screenW * 0.0625, Global.screenH * 0.09375), x2);
				GUI.DrawTexture(Rect(Global.screenW * 0.3229, Global.screenH * 0.65625, Global.screenW * 0.0625, Global.screenH * 0.09375), x3);
				GUI.DrawTexture(Rect(Global.screenW * 0.3229, Global.screenH * 0.78125, Global.screenW * 0.0625, Global.screenH * 0.09375), x4);
				
				
				GUI.Label(Rect(Global.screenW * 0.4375, Global.screenH * 0.375, Global.screenW * 0.2916, Global.screenH * 0.125), sDay1);
				GUI.Label(Rect(Global.screenW * 0.4375, Global.screenH * 0.5156, Global.screenW * 0.2916, Global.screenH * 0.125), sDay3);
				GUI.Label(Rect(Global.screenW * 0.4375, Global.screenH * 0.6406, Global.screenW * 0.2916, Global.screenH * 0.125), sDay5);
				GUI.Label(Rect(Global.screenW * 0.4375, Global.screenH * 0.7556, Global.screenW * 0.2916, Global.screenH * 0.125), sDay7);
				
				
				
				if(GUI.Button(Rect(Global.screenW * 0.7708, Global.screenH * 0.4156, Global.screenW * 0.14375, Global.screenH * 0.09375), "", btnClaimToken))
					{
						Global.myChar.soulToken += 1;
						
						claimTokens("d1", "1");
						
					}
				
				if(GUI.Button(Rect(Global.screenW * 0.7708, Global.screenH * 0.5343, Global.screenW * 0.14375, Global.screenH * 0.09375), "", btnClaimToken))
					{
						Global.myChar.soulToken += 2;
						claimTokens("d3", "2");
						
					}
					
				
				if(GUI.Button(Rect(Global.screenW * 0.7708, Global.screenH * 0.65625, Global.screenW * 0.14375, Global.screenH * 0.09375), "", btnClaimToken))
					{
						Global.myChar.soulToken += 3;
						claimTokens("d5", "3");
						
					}
				
				if(GUI.Button(Rect(Global.screenW * 0.7708, Global.screenH * 0.775, Global.screenW * 0.14375, Global.screenH * 0.09375), "", btnClaimToken))
					{
						Global.myChar.soulToken += 4;
						claimTokens("d7", "4");
						
					}
				
			}
			
			
}

function splitItemName( itemName : String) : String
{
	var str : String;
	var split : String[];
	var temp : String;
	var i : int; 
	
	str = "";
	temp = "";
	split = Regex.Split(itemName," ");
	
	if(split.length>1)
		{
			for(i = 0; i< split.length; i++)
				{
					if(split[i].length>14)
						{
							str+=split[i].Substring(0,14)+"..";
							break; 
						}
					else
						{
							temp = str + split[i];
							if(temp.length>15)
								{
									str += "\n"+split[i];
								}
							else
								{
									str +=split[i]+" ";
								}
						}
				}
		}
	else
		{
			str = itemName.Substring(0,14)+"..";
		}
	return str;
}


