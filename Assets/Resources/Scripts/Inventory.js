var script_main : scriptMain;
var LuncherPlane : GameObject;
static var self : Inventory;
var goSelInvItem : GameObject;		// gameobject for selected item in inventory

static var startX : int; 					// x pos for first inventory item
static var startY : int;					// y pos for first inventory item
static var texwidth : int;					// width of inventory item texture	
static var texheight : int;				// height of inventory item texture
static var paddingX : int;					// x padding for inventory item
static var paddingY : int;					// y padding for inventory item
static var maxInvItems : int;				// max number of items in inventory
static var itemsPerRow : int;				// number of items per row in inventory
static var peItemsPerRow : int;				// number of items per row in peq inventory
static var nItemsInInventory : int;			// current number of items in inventory
static var resetMe : boolean = false;
var in_battle : boolean;
var in_pvp : boolean;
static var inventoryBack : boolean = false;
static var maxEquipedItems : int; 					// max number of items equiped
var battle_script : scriptBattle;
var pvp_script : scriptPvP;
var texInventoryFrame : Texture2D;			// inventory frame texture 
var texPEquipedFrame : Texture2D;
var texTooltipItemFrame : Texture2D;
var bSwapAlert 		: boolean;
var bTransferAllAlert : boolean;
var swapAlertRect 	: Rect;
var idSwapAlert		: int;
var styleErrorFrame	: GUIStyle;
var styleDialogFrame: GUIStyle;
var styleButSmll	: GUIStyle;
var styleButSmllGreen	: GUIStyle;
var texLoaderWheel 	: Texture2D;
var nAngle 			: float;
static var selecteditem	: boolean = false;
var styleSendBut : GUIStyle;

static var butDown : boolean = false;
var touch : iPhoneTouch;			
var state : int;
var descLabelHeight : int;			// used to display the stats on an item
var countItemStats: int;
var texInvItems : Texture2D[];		// array of textures for each inventory item
var texPEqItems : Texture2D[]; 		// array of textures for each peq inventory item
var texSelInvItem : Texture2D;		// texture of selected inventory item 
var invWireFrame : Vector2[];		// array for storing the inventory grid wireframe
var peqWireFrame : Vector2[];       // array for storing the player eq grid wireframe
var goInvItems : GameObject[];		// array of gameobjects to display each inventory item
static var itemsInInventory : Item[];		// array of items objects that are in inventroy
static var itemsEquiped : Item[];	// array of items equiped
var texItemInInv : String[];		// array of paths to texture for each inventory item
var texItemPEq : String[];			// array of paths to texture for each peq inventory item
var temp_item : Item;
static var temp_slot : int;
static var selitem : int = -1;				// position of slected item in inventory
var selstate : boolean = false;
var oldselitem : int = -1;		
static var bIsSelItemHigh : boolean = false;	//flag for highlight of selected item
var bInvIsCreated : boolean = false; 	//flag for creation of inventory
var style : GUIStyle;				// gui style for buttons displayed
var texInventory : Texture2D;		// texture of inventory button
var backbtnstyle : GUIStyle;
var btnstyle : GUIStyle;
var bInvWasModified : boolean;
static var bInventory : boolean;			// flag inventory button was pressed
static var bPlayerEq : boolean; 			// flag for player frame pressed
static var bResetSelItem : boolean;
var invToolTipX : int;
var invToolTipY : int;
var is_updating : boolean;

var styleBackBut	: GUIStyle;
var styleUnequipBut	: GUIStyle;
static var itemidd : int; 
// Variables for the quantity dialog
var DLG_VENDOR : int = 1;
var DLG_BANK : int = 2;
var quantity_dialog : int;
var show_quantity_dialog : boolean;
var sQuantity : String;
var sAux : String;
var dark_pixel : Texture2D;

function init_battle() 
{
	in_battle = true;
	battle_script = GetComponent(scriptBattle);
}

function init_pvp() 
{
	in_battle = true;
	in_pvp = true;
	pvp_script = GetComponent(scriptPvP);
}

function init_mainScript()
{
	script_main = GetComponent(scriptMain);
}
static var firstRun : boolean = true;

function Start() 
{


		init_mainScript();
	
	if ( Application.loadedLevelName != "sceneBattle" && Application.loadedLevelName != "sceneStory" && Application.loadedLevelName != "scenePvP" && Application.loadedLevelName != "sceneBuilding")
				script_main.verificareFlagState();
	self = this; 
    Resources.UnloadUnusedAssets();
	sQuantity = "1"; 
	dark_pixel = Resources.Load("Menus/Menu_General/dark_pixel", Texture2D);
	is_updating = false;
	
	startX = Global.screenW * 0.3229; //was 125 for 3D
	startY = Global.screenH * 0.28125; //was 45 for 3D	
	texwidth = Global.screenW* 0.1083;
	texheight = Global.screenH * 0.1625;
	paddingX = Global.screenW * 0.0208;
	paddingY = Global.screenH * 0.0468;
	maxInvItems = 15;
	maxEquipedItems = 6;
	texInvItems = new Texture2D[maxInvItems];
	texPEqItems = new Texture2D[maxEquipedItems];
	itemsPerRow = 5;
	peItemsPerRow = 2;
	bInvWasModified = false;
	
	descLabelHeight = Global.screenH * 0.0625;
	invWireFrame = new Vector2[maxInvItems];
	peqWireFrame = new Vector2[maxEquipedItems];
	var offsetX : int = 0;
	var offsetY : int = 0;
	
	for(var i = 0; i < maxInvItems; i++)
		{
			invWireFrame[i].x = startX + offsetX;
			invWireFrame[i].y = startY + offsetY;
			offsetX = (paddingX + texwidth) * ((i+1) % itemsPerRow);
			offsetY = (paddingY + texheight) * ((i+1) / itemsPerRow);
			//posInvItems[i] = initPosInvItem + Vector3((i%itemsPerRow)*22, -(i/itemsPerRow)*22, 0);
		}
	offsetX  = 0;
	offsetY  = 0;
	
	for(i = 0; i < maxEquipedItems; i++)
		{
			peqWireFrame[i].x = startX + offsetX;
			peqWireFrame[i].y = startY + offsetY;
			offsetX = (paddingX + texwidth) * ((i+1) % peItemsPerRow);
			offsetY = (paddingY + texheight) * ((i+1) / peItemsPerRow);
		}
		
	//dragspeedX = 1.0;
	//dragspeedY = 1.0;
	
	itemsEquiped = new Item[maxEquipedItems];
	itemsInInventory = new Item[maxInvItems];
	texItemInInv = new String[maxInvItems];
	texItemPEq = new String[maxEquipedItems];
	yield StartCoroutine( GetInventoryItems() );
	CreateInventory();
	bInvIsCreated = false;
	bResetSelItem = false;
	
	for(i=0;i<maxEquipedItems;i++)
		{		
			if (itemsEquiped[i]) 
				{
					Global.myChar.equipItem(itemsEquiped[i]);
				}
		}
	if( Application.loadedLevel == 1 )
		{
			AddItemStats();	
		}
		
	firstRun = false;
	
	swapAlertRect = Rect (Global.screenW * 0.3125, Global.screenH * 0.3125,Global.screenW * 0.4583, Global.screenH * 0.3333);
}
function UpdateEqInvItems()
{
	yield StartCoroutine( GetInventoryItems() );
	UpdateInventory();
	UpdatePlayerEq();
}

function CreateInventory() 
{
	UpdateInventory();
	UpdatePlayerEq();
	bInvIsCreated = true;
}

function UpdateInventory() 
{
	for(var i = 0; i < maxInvItems; i++)
		{
			if (itemsInInventory[i]) 
				{
					texItemInInv[i] = "Menus/Inventory/Icons/"+itemsInInventory[i].id;
				}
			texInvItems[i] = Resources.Load(texItemInInv[i]);
		}
}
 
function UpdatePlayerEq()
{
	for(var i = 0; i < maxEquipedItems; i++)
		{	//print("i-urile sunt astea " + i);
			if (itemsEquiped[i]) 
				{	//print("-=--=-=-=-=-=-=++++++++ "+itemsEquiped[i]);
					texItemPEq[i] = "Menus/Inventory/Icons/"+itemsEquiped[i].id;
					//print("--------------------" + itemsEquiped[i].id);
				}
			texPEqItems[i] = Resources.Load(texItemPEq[i]);
		}
}

function DrawInventory() 
{	
	
	GUI.DrawTexture(Rect(Global.screenW * 0.22, Global.screenH * 0.05, Global.screenW * 0.7 /*+ itemsPerRow*(paddingX+texwidth)*/, Global.screenH * 1.05), texInventoryFrame	/*ScaleMode.StretchToFill,true,1*/);
	//GUI.Label(Rect(startX - 15, startY - 25, 100, 20),Global.myChar.Money+" gold");
	for (var i = 0; i< maxInvItems; i++)
	{	
		//goInvItems[i].renderer.material.mainTexture = Resources.Load(texItemInInv[i]);
		//goInvItems[i].renderer.enabled = true;	
		
		GUI.DrawTexture(Rect(invWireFrame[i].x-Global.screenW * 0.0625,invWireFrame[i].y-Global.screenH * 0.03125,texwidth,texheight),texInvItems[i],ScaleMode.StretchToFill,true,1);
		if(itemsInInventory[i].quantity > 1)
		{
			if (itemsInInventory[i].quantity < 10) 
				{	
					GUI.DrawTexture(Rect(invWireFrame[i].x+Global.screenW * 0.00625, invWireFrame[i].y+Global.screenH * 0.00125, Global.screenW *0.0229, Global.screenH * 0.0375), dark_pixel, ScaleMode.StretchToFill, true, 1);
				} 
			else
				if (itemsInInventory[i].quantity < 100) 
				{
					GUI.DrawTexture(Rect(invWireFrame[i].x+Global.screenW * 0.00625, invWireFrame[i].y+Global.screenH * 0.00125, Global.screenW * 0.0375, Global.screenH * 0.0375), dark_pixel, ScaleMode.StretchToFill, true, 1);
				} 
				else 
				{
					GUI.DrawTexture(Rect(invWireFrame[i].x+Global.screenW * 0.00625, invWireFrame[i].y+Global.screenH * 0.00125, Global.screenW * 0.00208, Global.screenH * 0.0375), dark_pixel, ScaleMode.StretchToFill, true, 1);
				}
				
			GUI.Label(Rect(invWireFrame[i].x+Global.screenW * 0.0104,invWireFrame[i].y,Global.screenW * 0.0625, Global.screenH * 0.09375),itemsInInventory[i].quantity+"");
		}
	}
}

function DrawPlayerEq() 
{	

	
	GUI.DrawTexture(Rect(startX-Global.screenW * 0.0729, startY-Global.screenH * 0.125,Global.screenW * 0.0833 + itemsPerRow*(paddingX+texwidth), Global.screenH * 0.2093 + (maxInvItems/itemsPerRow)*(paddingY+texheight)), texPEquipedFrame,ScaleMode.StretchToFill,true,0);
	
	for (var i = 0; i< maxEquipedItems; i++)
	{		
		GUI.DrawTexture(Rect(peqWireFrame[i].x,peqWireFrame[i].y,texwidth,texheight),texPEqItems[i],ScaleMode.StretchToFill,true,1);
		
		
	}
	

}

//check if user clicked on an item	
function CheckPointIsInInvItem(square : Vector2 , pointX : float, pointY : float) 
{
	if((pointX < square.x) || (pointX > (square.x+texwidth)))
		{
			return false;
		}	
	if((pointY < square.y) || (pointY > (square.y+texheight)))
		{
			return false;
		}
		
		
		print("a intrat in inventar");
		selecteditem = true;
		print("a intrat in inventar2");
	return true;
	
				
}



//check if touch was on the player
//for 3D drag and drop
function CheckPointIsInPlayerFrame(pointX : float, pointY : float) 
{
	
	if((pointX < 5) || (pointX >118))
		{
			return false;
		}	
	if((pointY < 75) || (pointY > 235))
		{
			return false;
		}
	return true;

}

//check if touch was in invetory frame
//we don't want to deselect an item if user clicked outside the inventory
function TouchIsInInventory(pointX : float, pointY : float) 
{
	
	if((pointX < startX) || (pointX >(startX+itemsPerRow*(paddingX+texwidth))))
		{
			return false;
		}	
	if((pointY < startY) || (pointY > (startY+(maxInvItems/itemsPerRow)*(paddingY+texheight)-20)))
		{
			return false;
		}
	return true;
}



//check if touch was in invetory frame
//we don't want to deselect an item if user clicked outside the inventory
function TouchIsInPEq(pointX : float, pointY : float) 
{
	
	if((pointX < startX) || (pointX >(startX+peItemsPerRow*(paddingX+texwidth))))
		{
			return false;
		}	
	if((pointY < startY) || (pointY > (startY+(maxEquipedItems/peItemsPerRow)*(paddingY+texheight)-20)))
		{
			return false;
		}
	return true;
}

//select item clicked by user in inv
function GetInvSelectedItem(pointX : float , pointY : float) 
{
	//var res : int = -1;
	for(var i=0; i<maxInvItems; i++)
	{
		if(CheckPointIsInInvItem(invWireFrame[i], pointX, pointY))
			{
				itemidd = itemsInInventory[i].id;
				//res = i;
				
				break;
			}
	}
	//return res;	
	return i;
}

//select item clicked by user in peq inv
function GetPEqSelectedItem(pointX : float , pointY : float) 
{
	//var res : int = -1;
	for(var i=0; i<maxEquipedItems; i++)
		{
			if(CheckPointIsInInvItem(peqWireFrame[i], pointX, pointY))
				{
					//res = i;
					break;
				}
		}
	//return res;	
	return i;
}


	
function HightlightSelectedItem() 
{
	// Log.add("now highlight");
	//goSelInvItem.transform.position = goInvItems[selitem].transform.position;
   	//goSelInvItem.renderer.enabled = true;
   	
   if(bPlayerEq){}
   
	  // GUI.DrawTexture(Rect(peqWireFrame[selitem].x-Global.screenW * 0.0104,peqWireFrame[selitem].y-Global.screenH * 0.125,texwidth+Global.screenW * 0.0208,texheight+Global.screenH * 0.03125),texSelInvItem,ScaleMode.StretchToFill,true,0);
  // else
	  // GUI.DrawTexture(Rect(invWireFrame[selitem].x-Global.screenW * 0.0104,invWireFrame[selitem].y-Global.screenH * 0.125,texwidth+Global.screenW * 0.0208,texheight+Global.screenH * 0.03125),texSelInvItem,ScaleMode.StretchToFill,true,0);
  
}
	

static function ResetSelectedItem() 
{
	//goSelInvItem.renderer.enabled = false;
	//selstate = false;
   	bIsSelItemHigh = false;
   	selitem = -1;
}

function DestroyInventory()
{
	
	bInvIsCreated = false;
}

function EquipSelectedItem()
{
	if (itemsInInventory[selitem]) 
		{
		     var itemType;
		     switch(itemsInInventory[selitem].slot)
			     {
			 	  case 1:;
				  case 2:;
				  case 3:;
				  case 4:;
				  case 5:;
					itemType= "ARMOR";
					break;
					
				  case 6:
					itemType= "WEAPON";
					break;
					
				  default:
					break;
			     }
		    CheckMissions(itemsInInventory[selitem].name,itemType);
			Global.myChar.equipItem(itemsInInventory[selitem]);
			SwapItemFromInvToChar(itemsInInventory[selitem]);
			UpdateInventory();
			UpdatePlayerEq();
			ResetSelectedItem();
			bInvWasModified = true;
			/*for(var i = 0;i<6;i++)
		{	print("--=--=-=---=--=----=------" + itemsEquiped[i].id);
			
			print("--=--=-=---=--=----=------" + itemsEquiped[i].quantity);
		   
		    print("--=--=-=---=--=----=------" + itemsEquiped[i].equipped);}*/
			
			//yield StartCoroutine( Global.save_stats() );
		}
}

function UnEquipSelectedItem() 
{
	if ( selitem == -1 || itemsEquiped[selitem] == null )
			return;
	if (itemsEquiped[selitem]) 
	{
		if( SwapItemFromCharToInv( itemsEquiped[selitem] ) )
			{
				for(var i=0;i<6;i++)
					if(itemsEquiped[i].slot != 0)
						{
							Global.myChar.equipItem(itemsEquiped[i]);
						}			
			
				UpdateInventory();
				UpdatePlayerEq();
				SendInventoryItems();
				ResetSelectedItem();
				
				yield StartCoroutine( GetInventoryItems() );
				Global.save_stats();
			}
	}
}
function UseSelectedItem()
{
	if (itemsInInventory[selitem].mob_id !=0) 
		{
			// Init the mob
			//Global.FightMob();
			Global.self.FightMob( itemsInInventory[selitem].mob_id.ToString(), 1 );
		} 
	else
	if (in_battle) 
		{
			if (itemsInInventory[selitem].health !=0 ||
				itemsInInventory[selitem].brutality !=0 ||
				itemsInInventory[selitem].accuracy !=0 ||
				itemsInInventory[selitem].fortitude !=0 ||
				itemsInInventory[selitem].defense !=0 ||
				itemsInInventory[selitem].regen !=0 ||
				itemsInInventory[selitem].attack !=0 ||
				itemsInInventory[selitem].duration) 
					{
						if (in_pvp)
							pvp_script.addDuration(
							itemsInInventory[selitem].health,
							0/*itemsInInventory[selitem].kENRG*/,
							itemsInInventory[selitem].brutality,
							itemsInInventory[selitem].accuracy,
							itemsInInventory[selitem].fortitude,
							itemsInInventory[selitem].defense,
							itemsInInventory[selitem].regen,
							itemsInInventory[selitem].attack,
							0/*itemsInInventory[selitem].kEVASION*/,
							itemsInInventory[selitem].duration);
						else 
							battle_script.addDuration(
							itemsInInventory[selitem].health,
							0/*itemsInInventory[selitem].kENRG*/,
							itemsInInventory[selitem].brutality,
							itemsInInventory[selitem].accuracy,
							itemsInInventory[selitem].fortitude,
							itemsInInventory[selitem].defense,
							itemsInInventory[selitem].regen,
							itemsInInventory[selitem].attack,
							0/*itemsInInventory[selitem].kEVASION*/,
							itemsInInventory[selitem].duration);
					} 
				else 
					{
						return;
					}
		} 
	else 
		{
			return;
		}
		
	// Update the item in inventory
	if (itemsInInventory[selitem].quantity == 1) 
		{
			itemsInInventory[selitem] = new Item();
			UpdateInventory();
			UpdatePlayerEq();	
		}
	else 
		{
			itemsInInventory[selitem].quantity--;	
			UpdateInventory();
			UpdatePlayerEq();
		}
		
	bInvWasModified = true;
}

function RemoveItemFromInventory()
{
	itemsInInventory[selitem] = new Item();
}

function RemoveItemFromPlayerEq(item:Item)
{
	itemsEquiped[selitem] = new Item();
	itemsEquiped[selitem].slot = item.slot;
	Global.myChar.equipItem(itemsEquiped[selitem]);
	CalcNewStats(itemsEquiped[selitem],item);
}
function SwapItemFromCharToInv(item:Item) : boolean
{
	for(var i = 0; i<maxInvItems; i++)
		{
			if(itemsInInventory[i].id == 0)
			{
				break;
			}
		}
	if(i<maxInvItems)
		{
			itemsInInventory[i] = item;
			itemsInInventory[i].equipped = 0;
			itemsEquiped[selitem] = new Item();
			itemsEquiped[selitem].slot = itemsInInventory[i].slot;
			Global.myChar.equipItem(itemsEquiped[selitem]);
			CalcNewStats(itemsEquiped[selitem],itemsInInventory[i]);
			//itemsEquiped[selitem].slot = itemsInInventory[i].slot;
		}
	else
		{
			bSwapAlert = true;
			return false;
		}
	return true;
}

function SwapItemFromInvToChar(item:Item)
{
	
	
	var i = item.slot;
	if ( i == 6 ) 
			i = 0;
	if ( i == 0 || i == 1 )
		SwapWeaponFromInvToChar(item);  //new: cristi add for weapons and hands exploit
	else
	{
		itemsInInventory[selitem] = itemsEquiped[i];
		itemsInInventory[selitem].equipped = 0;
		itemsEquiped[i] = item;
		itemsEquiped[i].equipped = 1;
	}
	CalcNewStats(itemsEquiped[i], itemsInInventory[selitem]);
}

function SwapWeaponFromInvToChar(item:Item)
{
   var 	i = item.slot;
	if ( i == 6 )
		 i = 0;
	if ( itemsEquiped[0].id != 0 )
		{
			itemsInInventory[selitem] = itemsEquiped[0];
			itemsInInventory[selitem].equipped = 0;
			itemsEquiped[0] = new Item();
			itemsEquiped[i] = item;
			itemsEquiped[i].equipped = 1;
		}
	else
		{
			itemsInInventory[selitem] = itemsEquiped[1];
			itemsInInventory[selitem].equipped = 0;
			//itemsEquiped[0] = new Item();
			itemsEquiped[1] = new Item();
			itemsEquiped[i] = item;
			itemsEquiped[i].equipped = 1;
		}
}

function RemoveItemStats() 
{
	for (var i : int = 0; i<maxEquipedItems; i++) 
		{
			Global.myChar.BRT 	= Global.myChar.BRT - itemsEquiped[i].brutality;
			Global.myChar.ACC 	= Global.myChar.ACC - itemsEquiped[i].accuracy;
			Debug.Log("fuck life " + Global.myChar.FORT +"-"+itemsEquiped[i].fortitude);
			Global.myChar.FORT 	= Global.myChar.FORT - itemsEquiped[i].fortitude;
			Global.myChar.DEF 	= Global.myChar.DEF - itemsEquiped[i].defense;
		}	
	Global.myChar.CalculateHybridStats();
	
//		Global.myChar.ATK 	= Global.myChar.ATK - itemsEquiped[i].attack - (itemsEquiped[i].brutality * 2);
//		Global.myChar.HP 	= Global.BaseHP + ((Global.myChar.FORT - 10) * 5) + ((Global.myChar.LVL-1) * 10) - itemsEquiped[i].health;
//		Global.myChar.REGEN	= Global.myChar.REGEN - itemsEquiped[i].regen;
//		Global.myChar.EVASION = (Global.myChar.DEF/2.0) + (Global.myChar.LVL/10);
	
}

function AddItemStats()
 {
	for (var i : int = 0; i<maxEquipedItems; i++) 
		{
			if( !itemsEquiped[i] ) 
					continue;
			Global.myChar.BRT 	= Global.myChar.BRT + itemsEquiped[i].brutality;
			Global.myChar.ACC 	= Global.myChar.ACC + itemsEquiped[i].accuracy;
			Debug.Log("fuck life " + Global.myChar.FORT +"+"+itemsEquiped[i].fortitude);
			Global.myChar.FORT 	= Global.myChar.FORT + itemsEquiped[i].fortitude;
			Global.myChar.DEF 	= Global.myChar.DEF + itemsEquiped[i].defense;
		}
	Global.myChar.CalculateHybridStats();	
	for( i = 0; i < maxEquipedItems; i++ )
		{	
			if( !itemsEquiped[i] ) 
					continue;
			Global.myChar.ATK += itemsEquiped[i].attack;
			Global.myChar.HP += itemsEquiped[i].health;
			Global.myChar.REGEN += itemsEquiped[i].regen;
			Global.myChar.ENRG += itemsEquiped[i].energ;
		}
		
//		Global.myChar.ATK 	= Global.myChar.ATK + itemsEquiped[i].attack + (itemsEquiped[i].brutality * 2);
//		Global.myChar.HP 	= Global.BaseHP + ((Global.myChar.FORT - 10) * 5) + ((Global.myChar.LVL-1) * 10) + itemsEquiped[i].health;
//		Global.myChar.REGEN	= Global.myChar.REGEN + itemsEquiped[i].regen;
//		Global.myChar.EVASION = (Global.myChar.DEF/2.0) + (Global.myChar.LVL/10);
	
}

function CalcNewStats(itemAdd : Item, itemRem: Item) 
{
	Global.myChar.BRT 	= Global.myChar.BRT + (itemAdd.brutality - itemRem.brutality);
	Global.myChar.ACC 	= Global.myChar.ACC + (itemAdd.accuracy - itemRem.accuracy);
	Global.myChar.FORT 	= Global.myChar.FORT + (itemAdd.fortitude - itemRem.fortitude);
	Global.myChar.DEF 	= Global.myChar.DEF + (itemAdd.defense - itemRem.defense);
	Global.myChar.CalculateHybridStats();
	Global.myChar.ATK += (itemAdd.attack - itemRem.attack);
	Global.myChar.HP += (itemAdd.health - itemRem.health);
	Global.myChar.REGEN += (itemAdd.regen - itemRem.regen);
	Global.myChar.ENRG += (itemAdd.energ - itemRem.energ);

//	Global.myChar.ATK 	= Global.myChar.ATK + (itemAdd.attack - itemRem.attack) + ((itemAdd.brutality * 2) - (itemRem.brutality * 2));
//	Global.myChar.HP 	= Global.BaseHP + ((Global.myChar.FORT - 10) * 5) + ((Global.myChar.LVL-1) * 10) + (itemAdd.health - itemRem.health);
//	Global.myChar.REGEN	= Global.myChar.REGEN + (itemAdd.regen - itemRem.regen);
//	Global.myChar.EVASION = (Global.myChar.DEF/2.0) + (Global.myChar.LVL/10);
//	Global.myChar.ENRG 	= Global.myChar.ENRG + (itemAdd.enrg - itemRem.energ);
	
}

//will get inventory from server and store each item
function GetInventoryItems()
{
	yield UpdateTimeFromServer();

	is_updating = true;
	var the_url : String = "";
 	var numberOfItems : int = 0;
 	var values : String[];
 	var itemstats : String[];
	
	if(Global.myChar.id == 0)
		{
			the_url = Global.server + "/mmo_iphone/items-on.php?id=" + 1;
		}
	else
		{	
			the_url = Global.server + "/mmo_iphone/items-on.php?id=" + Global.myChar.id;
		}
	var download : WWW = new WWW(the_url);
	yield download;
	
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying");
			download = new WWW(the_url);
			yield download;
		}
	if(download.error) 
		{
			return;
		}
	else
		{
			Log.add(download.text);
		}
		
	print("Aici fadce dwnloadul jehfrsdflksd" + download.text);
	values = Regex.Split(download.text,"<br />");
	
	for(var i=0; i<maxInvItems; i++)
		{
			itemsInInventory[i] = new Item();
		}
	for(i=0; i<maxEquipedItems; i++)
		{
			//print("fghiusrgffbskljhgkglhfgdkiygday");
			itemsEquiped[i] = new Item();
			//print(itemsEquiped[i] + "+++++++++");
		}
	numberOfItems = parseInt(values[0]);
	nItemsInInventory = numberOfItems;
	i = 1;
	var j : int = 0;
	var k : int = 0;
	
	while(i<=numberOfItems)
		{
			itemstats = Regex.Split(values[i],":");
			if(parseInt(itemstats[2]) == 0)// item is equipped itemstats=1
				{
					if (itemsInInventory.length > j) 
							itemsInInventory[j] = new Item(itemstats);
					j=j+1;
				}
			else
			
				{
					temp_item = new Item(itemstats);
					
					switch (temp_item.slot) 
						{
							case 6:
								temp_slot = 0;
								//checkRange = true;
							break;
							case 1:
								temp_slot = 1;
							break;
							case 2:
								temp_slot = 2;
							break;
							case 3:
								temp_slot = 3;
							break;
							case 4:
								temp_slot = 4;
							break;
							case 5:
								temp_slot = 5;
							break;
							default:
								temp_slot = 0;
							break;
						}
					itemsEquiped[temp_slot] = temp_item;
					// verificare item equipat daca e luncher
					//itemsEquiped[temp_slot].id = 226;
					if (itemsEquiped[temp_slot].id == 226)
						{
							if( Application.loadedLevelName != "sceneMap" )
								{
									itemsEquiped[temp_slot].weapon_type = "R";
									LuncherPlane = GameObject.Find("PC/man_master/Bone01/Bone02/Bone03/Bone11/Bone12/Bone13/Suport_arma_Dr/weapons");
									LuncherPlane.transform.localPosition.x = -0.07;
									LuncherPlane.transform.localPosition.y = -0.005;
									LuncherPlane.transform.localPosition.z = 0.006;
									LuncherPlane.transform.localScale.x = 1.5;
									LuncherPlane.transform.localScale.y = 0.5;
									LuncherPlane.transform.Rotate(Vector3(0,0,-15));

									scriptBattle.cPC.WepType = 3;
									scriptPvP.cPC.WepType = 3;
								}
							else
								{
									itemsEquiped[temp_slot].weapon_type = "R";
									LuncherPlane = GameObject.Find("PC/man_master/Bone01/Bone02/Bone03/Bone11/Bone12/Bone13/Suport_arma_Dr/weapons");
									LuncherPlane.transform.localPosition.x = -0.07;
									LuncherPlane.transform.localPosition.y = -0.005;
									LuncherPlane.transform.localPosition.z = 0.006;
									LuncherPlane.transform.localScale.x = 1.5;
									LuncherPlane.transform.localScale.y = 0.5;
									
									scriptBattle.cPC.WepType = 3;
									scriptPvP.cPC.WepType = 3;
								}
						}
				}
			i=i+1;
		}
	is_updating = false;
	scriptBattle.scriptInventory.log_inventory();
	var up : boolean = false;
	
	for(i=0;i<maxInvItems;i++)
		{
			if ( itemsInInventory[i].temporar != 0 )
				if ( Interval60Min( itemsInInventory[i].temporar, parseInt( OnTime ) ) )
					{
						itemsInInventory[i] = Item();
						up = true;
					}
		}
	if ( up ) {
		//yield SendInventoryItems();
		up = false;
		}
}

//save the inventory on the server
function SendInventoryItems()
{
	for (var ix:int = 0; ix<6; ix++) {
		Debug.Log("Updated Inventory.");
	}
	var tempd : String;
	is_updating = true;
	scriptBattle.scriptInventory.log_inventory();
	var the_url : String = "";
	var itemstring : String = "";
	the_url = Global.server + "/mmo_iphone/update_inventory.php";
	var k : int = 0;
	 
	//calculate the number of non-null items;
	/*for(var i = 0; i < maxInvItems; i++ )
		if( itemsInInventory[ i ].quantity != 0 && itemsInInventory[ i ].id != 0 )
			k++;
	for( i = 0; i < maxEquipedItems; i++ )
		if( itemsEquiped[ i ].quantity != 0 && itemsEquiped[ i ].id != 0 )
			k++;*/
	
	var postData : WWWForm = new WWWForm();	
    //now add all the non null items to inventory ( k items )   
       
	for(var i:int = 0; i < maxInvItems; i++)
		{	
			if( itemsInInventory[ i ].quantity != 0 || itemsInInventory[ i ].id != 0 )
				{
					postData.AddField("" + k + "_item_id", itemsInInventory[i].id );
					tempd = tempd+"_item_id"+itemsInInventory[i].id	+ "//";				
		       		postData.AddField("" + k + "_quantity", itemsInInventory[i].quantity );
		       		tempd = tempd+"_quantity"+itemsInInventory[i].quantity+ "//";	
		       		//print("itemsInInventory[i].quantity " + itemsInInventory[i].quantity );
		       		
		       		postData.AddField("" + k + "_active", itemsInInventory[i].equipped );
		       		tempd = tempd+"_active"+itemsInInventory[i].equipped+ "//";
		       		postData.AddField("" + k + "_add_time", itemsInInventory[i].temporar );
		       		tempd = tempd+"_add_time"+itemsInInventory[i].temporar+ "//";
		       		k++;
				}
		}
		tempd = tempd+ " acum bag din alea echipate ";
	for(i = 0; i < maxEquipedItems ; i++)
		{
			if( itemsEquiped[ i ].quantity !=0 || itemsEquiped[ i ].id != 0 )
				{
					postData.AddField("" + k + "_item_id", itemsEquiped[i].id);
					tempd = tempd+"_item_id"+itemsEquiped[i].id+ "//";
					itemsEquiped[i].quantity = 1;
					postData.AddField("" + k + "_quantity", itemsEquiped[i].quantity);
					tempd = tempd+"_quantity"+itemsEquiped[i].quantity+ "//";
					
					print("itemsInInventory[i].quantity echipate" + itemsEquiped[i].quantity  + " " + itemsEquiped[i].name );
					
		       	 itemsEquiped[i].equipped = 1;
		       	 		postData.AddField("" + k + "_active", itemsEquiped[i].equipped);
		       	 	tempd = tempd+"_active"+itemsEquiped[i].equipped+ "//";
		       	 	//print("--=--=-=---=--=maaaaaaa----=------" + itemsEquiped[i].equipped);
		       	 	postData.AddField("" + k + "_add_time", itemsInInventory[i].temporar );
		       	 	tempd = tempd+"_add_time"+itemsEquiped[i].temporar+ "//";
					k++;
				}
		}
	postData.AddField("user_id", Global.myChar.id);
	postData.AddField("number", k);
	tempd = tempd+ "user_id: " + Global.myChar.id + "number: " + k; 
	var upload : WWW = new WWW(the_url,postData);
	yield upload;
	Debug.Log("#########: "+tempd);
	while (upload.error && upload.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying");
			upload = new WWW(the_url,postData);
			yield upload;
		}
	bInvWasModified = false;
	is_updating = false;	
}

//Mihai: this doesnt seems to be used anywhere
//function GetItemSlot(item : Item)
//{
//	var itemSlot : String = "";
//	switch(item.slot)
//		{
//			case 1:
//				itemSlot= "Hands";
//				break;
//			case 2:
//				itemSlot= "Helmet";
//				break;
//			case 3:
//				itemSlot= "Chest";
//				break;
//			case 4:
//				itemSlot= "Pants";
//				break;
//			case 5:
//				itemSlot= "Shoes";
//				break;
//			case 6:
//				itemSlot= "Weapon";
//				break;
//			case 7:
//				itemSlot= "Else";
//				break;	
//			default:
//				break;
//		}
//	return itemSlot;
//}


function VendorSelectedItem(kItem : Item, kQuantity : int)
{
	Global.myChar.Money += kItem.price*kQuantity;
	if (kItem.quantity - kQuantity > 0) 
		{
			itemsInInventory[selitem].quantity -= kQuantity;
		} 
	else 
		{
			if (kItem.equipped == 1) 
				{
					RemoveItemFromPlayerEq(kItem);
				} 
			else 
				{
					RemoveItemFromInventory();
				}
		}
	UpdateInventory();
	UpdatePlayerEq();
	SendInventoryItems(); 
	Global.save_stats();
	ResetSelectedItem();
}

var recording : boolean;
var newPt : Vector2;

function Update () 
{

	if (Inventory.resetMe) {
		GetInventoryItems();
		Inventory.resetMe = false;
	}
	if (show_quantity_dialog) 
			return;
    if (Input.GetButtonDown ("Fire1")) 
	    {
		   	recording = true;
	   		
	   		if (recording)
		   		{
				   	newPt = Vector2(Input.mousePosition.x, Input.mousePosition.y);
		   		}
	    }
	if (recording)
	    {
	       	//touch = iPhoneInput.GetTouch(0); 
	        if(recording)
		        {	
		        	if(bInventory)
			        	{
			        		if(TouchIsInInventory(newPt.x, Global.screenH-newPt.y))
				        		{
				        			oldselitem = selitem;
				        			ResetSelectedItem();
				    				selitem = GetInvSelectedItem(newPt.x, Global.screenH-newPt.y);
									if (itemsInInventory.length > selitem)
					    				if((selitem != -1) && (itemsInInventory[selitem].id !=0))
						    				{		
						    					bIsSelItemHigh = true;
						    					//HightlightSelectedItem();
						    					if(selitem == oldselitem)
							    					{
							    						selstate = !selstate;
							    					}
						    					else
							    					{
							    						selstate = true;
							    					}
						    				}
				        		}
			        	}
		            else bIsSelItemHigh = false;
		        	
		        	if(bPlayerEq)
			        	{
			        		if(TouchIsInPEq(newPt.x, Global.screenH-newPt.y))
				        		{
				        			ResetSelectedItem();
				    				selitem = GetPEqSelectedItem(newPt.x, Global.screenH-newPt.y);
				    				if (itemsEquiped.length > selitem)
					    				if((selitem != -1) && (itemsEquiped[selitem].id !=0))
						    				{		
						    					bIsSelItemHigh = true;
						    					//HightlightSelectedItem();
						    				}
				                    
				                }
			        	}
		    	}
	    	if (itemsInInventory.length-1 < selitem) selitem = oldselitem;
	     }
     recording = false;
}

function TransferAllToBank()
{
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/move_all_items.php?user=" + Global.myChar.id );
	yield upload;
	
	while (upload.error && upload.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying");
			upload = new WWW(Global.server + "/mmo_iphone/move_all_items.php?user=" + Global.myChar.id );
			yield upload;		
		}
	if(upload.error) 
		 print( "Error downloading: " + upload.error );
	if( upload.text.IndexOf("fail", 0) > 0 )
		 bTransferAllAlert = true;

	yield StartCoroutine( GetInventoryItems() );
	
	UpdateInventory();
	UpdatePlayerEq();
	Global.save_stats();	
	
	yield StartCoroutine( scriptMain.theBank.GetInventoryItems() );
}

function TransferToBank(kItem : Item, kQuantity : int)
{
	var postData = new WWWForm();
	postData.AddField("id_user", Global.myChar.id);
	postData.AddField("id_item", kItem.id);
	postData.AddField("quantity", kQuantity);
	postData.AddField("opt", 1);
	var upload : WWW = new WWW(Global.server + "/mmo_iphone/bank.php", postData);
	
	yield upload;
	while (upload.error && upload.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying");
			upload = new WWW(Global.server + "/mmo_iphone/bank.php", postData);
			yield upload;
		}

	if (upload.text.IndexOf("1", 0) > 0) 
		{
			if (itemsInInventory[selitem].quantity - kQuantity > 0) 
				{
					itemsInInventory[selitem].quantity -= kQuantity;
				} 
			else 
				{
					if(kItem.equipped == 1)
						RemoveItemFromPlayerEq(kItem);
					else
						RemoveItemFromInventory();
				}
			UpdateInventory();
			UpdatePlayerEq();
			Global.save_stats();
			ResetSelectedItem();
			yield StartCoroutine( scriptMain.theBank.GetInventoryItems() );
			scriptMain.theBank.UpdateInventory();
		} 
	else 
		{
			bSwapAlert = true;
		}
}

function log_inventory()
{
	var log : String;
	log = "Inventory: ";
	
	for(var i=0;i<itemsInInventory.length;i++)
			log += itemsInInventory[i].id + " " + itemsInInventory[i].quantity + " -temprar: " + itemsInInventory[i].temporar + "   =  ";
	log += "      Equipment: ";
	
	for(i=0;i<itemsEquiped.length;i++)
			log += itemsEquiped[i].id + " " + itemsEquiped[i].quantity + " -temprar: " + itemsEquiped[i].temporar + "   =  ";
}

//function DoSpecialItemLoot(itemid1 : int, itemid2 : int, chance : float )
//{
//	//var done1 : boolean = false;
//	//GetInventoryItems();
//	var	done = LootItem(itemid1);
//	//LootItem(itemid2, Global.OnTime )
//	var rand = Random.Range(0,10);
//	
//	//if ( rand <= chance )
//	//	update_special_item(itemid2,1);
//	//else
//	//	update_special_item(itemid2,0);
//	//return done;
//}

var OnTime : String;

function LootItems(itemId1 : int, itemId2 : int, special : boolean, chance : float)
{
	OnTime = "0";
	//var bOK : boolean = false;
	var s1 : int;
	var s2 : int;
	var rand = Random.Range(0,10);
	yield UpdateTimeFromServer();
	
	s1 = find_index_to_loot_item(itemId1);
	s2 = find_index_to_loot_item(itemId2,s1);
	
	if ( (s1 != -1) && (s2 != -1) )
		{
			if ( itemsInInventory[s1].id != 0 )
					itemsInInventory[s1].quantity++;
			else
					itemsInInventory[s1] = Item([""+itemId1, "1", "0", "0", "0", "0", "0", "0", "0", 																						"0", "0", "0", "0", "0", "0", "0-0", "0", "0", "0", "0"]);
			
			if ( rand <= chance )
				{
					if ( itemsInInventory[s2].id != 0 )
						itemsInInventory[s2].quantity++;
					else
						itemsInInventory[s2] = Item([""+itemId2, "1", "0", "0", "0", "0", "0", "0", "0", 																						"0", "0", "0", "0", "0", "0", "0-0", "0", "0", "0", OnTime]);
				}
			else
				if ( itemsInInventory[s2].id != 0 )
					itemsInInventory[s2].temporar = parseInt( OnTime );
			//if ( special )
			//itemsInInventory[s2].temporar = parseInt( OnTime );
			SendInventoryItems();			
		}
}

function find_item_from_inventory( itemid : int )
{
	for(var i=0;i<maxInvItems;i++)
		{
			if(itemsInInventory[i].id == itemid)
				if(itemsInInventory[i].slot == 7 && itemsInInventory[i].quantity < 999)
					return i;
		}
	return -1;
}

function find_index_to_loot_item(itemId : int, previtem : int) : int
{
	var i : int;
	if ( previtem == -1 )
		return -1;
	
	for(i=0;i<maxInvItems;i++)
		{
			//if ( i == previtem )
			//	continue;
			if(itemsInInventory[i].id == itemId)
				if(itemsInInventory[i].slot == 7 && itemsInInventory[i].quantity < 999)
					return i;
		}
	for(i=0;i<maxInvItems;i++)
		{
			if ( i == previtem )
					continue;
			if ( itemsInInventory[i].id == 0 )
					return i;
		}
	return -1;
}

function find_index_to_loot_item(itemId : int) : int
{
	var i : int;
	
	for(i=0;i<maxInvItems;i++)
		{
			if(itemsInInventory[i].id == itemId)
				if(itemsInInventory[i].slot == 7 && itemsInInventory[i].quantity < 999)
					return i;
		}
	for(i=0;i<maxInvItems;i++)
		if ( itemsInInventory[i].id == 0 )
			return i;	
	return -1;
}

function LootItem(itemId : int, time :  String) : boolean
{
	var bOk : boolean = false;
	var i : int;
	bOk = false;
	for(i=0;i<maxInvItems;i++)
		{
			if(itemsInInventory[i].id == itemId)
				{
					if(itemsInInventory[i].slot == 7 && itemsInInventory[i].quantity < 999)
						{
							bOk = true;
							itemsInInventory[i].quantity++;
							itemsInInventory[i].temporar = parseInt( time );
							break;
						}
					else
						bOk = false;
				}
		}
	if(!bOk)
		for(i=0;i<maxInvItems;i++)
			{
				if(itemsInInventory[i].id == 0)
					{
						itemsInInventory[i] = Item([""+itemId, "1", "0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0-0", "0", time]);
						bOk = true;
						break;
					}	
			}
	if(bOk)
		SendInventoryItems();
	
	return bOk;
}


function LootItem(itemId : int) : boolean
{
	var bOk : boolean = false;
	var i : int;
	bOk = false;
	
	for(i=0;i<maxInvItems;i++)
		{
			if(itemsInInventory[i].id == itemId)
				{
					if(itemsInInventory[i].slot == 7 && itemsInInventory[i].quantity < 999)
						{
							bOk = true;
							itemsInInventory[i].quantity++;
							break;
						}
					else
						bOk = false;
				}
		}
	if(!bOk)
		for(i=0;i<maxInvItems;i++)
			{
				if(itemsInInventory[i].id == 0)
					{
						itemsInInventory[i] = Item([""+itemId, "1", "0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0-0", "0", "0"]);
						bOk = true;
						break;
					}	
			}
	if(bOk)
		SendInventoryItems();
	
	return bOk;
}

function DoSwapAlert (windowID : int) 
{
	//GUI.DrawTexture(Rect(0, 0, 220, 120), texErrorFrame);
	
	GUI.Label(Rect(Global.screenW * 0.04166, Global.screenH * 0.09375,Global.screenW * 0.3958, Global.screenH * 0.0625),"Not enough free slots in inventory.\nPlease remove some items.");
	
	if(GUI.Button(Rect(Global.screenW * 0.1541, Global.screenH * 0.21875,Global.screenW * 0.1729, Global.screenH * 0.1125), "Close", styleButSmll))
			bSwapAlert = false;
}

function DoTransferAllAlert( windowId : int )
{
	GUI.Label(Rect(Global.screenW * 0.04166, Global.screenH * 1.04,Global.screenW * 0.3958, Global.screenH * 0.0625),"No more free slots in the bank");

		if(GUI.Button(Rect(Global.screenW * 0.1541, Global.screenH * 0.21875,Global.screenW * 0.1729, Global.screenH * 0.1125), "Close", styleButSmll))
			bTransferAllAlert = false;
}

function QunatityDialog(windowID : int) 
{	
	GUI.Label(Rect(Global.screenW * 0.1458, Global.screenH * 0.09375,Global.screenW * 0.4166, Global.screenH * 0.0625),"Select quantity:");
	sAux = sQuantity;
	sAux = GUI.TextField (Rect (Global.screenW * 0.1208, Global.screenH * 0.15625,Global.screenW * 0.1104, Global.screenH * 0.0625), sAux, 25);
	if (sAux.length < 1) sAux = "1";
		if (parseInt(sAux)) 
			{
				if (parseInt(sAux) > 0) sQuantity = sAux; else sQuantity = "1";
				if (itemsInInventory.length > selitem)
				if (parseInt(sQuantity) > itemsInInventory[selitem].quantity) sQuantity = "" + itemsInInventory[selitem].quantity;
			} 
	else 
		{
			sAux = sQuantity;
		}
	
	if (GUI.Button(Rect(Global.screenW * 0.0583, Global.screenH * 0.21875,Global.screenW * 0.1729, Global.screenH * 0.1125), "Cancel", styleButSmll)) 
		{
			show_quantity_dialog = false;
		}
    // + / - / Max buttons
    if (GUI.Button(Rect(Global.screenW * 0.0583, Global.screenH * 0.1343,Global.screenW * 0.0479, Global.screenH * 0.1125), "-", styleButSmll)) 
	    {
			if(parseInt(sAux)>1) 
				{
			        sQuantity = (parseInt(sQuantity)-1).ToString();  
		        }
		}
    if (GUI.Button(Rect(Global.screenW * 0.2479, Global.screenH * 0.1343,Global.screenW * 0.0479, Global.screenH * 0.1125), "+", styleButSmllGreen)) 
	    {
			if(parseInt(sAux)>=1)
				{
			         sQuantity = (parseInt(sQuantity)+1).ToString(); 
		        }
		}
    if (GUI.Button(Rect(Global.screenW * 0.3125, Global.screenH * 0.1343,Global.screenW * 0.0479, Global.screenH * 0.1125), "Max", styleButSmll)) 
	    {
			sQuantity = "" + itemsInInventory[selitem].quantity;
		}
	if (GUI.Button(Rect(Global.screenW * 0.2479, Global.screenH * 0.21875,Global.screenW * 0.1729, Global.screenH * 0.1125), "Accept", styleButSmll)) 
	{
		if (quantity_dialog == DLG_VENDOR) 
			{
				VendorSelectedItem(itemsInInventory[selitem], parseInt(sQuantity));
			} 
		else
			if (quantity_dialog == DLG_BANK) 
				{
					TransferToBank(itemsInInventory[selitem], parseInt(sQuantity));
				}
		show_quantity_dialog = false;
	}
}

function OnGUI()
{
	// var screenScale: float = Screen.width / 480.0;
    // var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
    // GUI.matrix = scaledMatrix;

	if(bSwapAlert)
		{
			swapAlertRect = GUI.Window (idSwapAlert, swapAlertRect, DoSwapAlert, "", styleErrorFrame);
			GUI.FocusWindow(idSwapAlert);
		}
	if(bTransferAllAlert)
		{
			swapAlertRect = GUI.Window (idSwapAlert, swapAlertRect, DoTransferAllAlert, "", styleErrorFrame);
			GUI.FocusWindow(idSwapAlert);
		}
	if (show_quantity_dialog) 
		{
			swapAlertRect = GUI.Window(1, swapAlertRect, QunatityDialog, "", styleDialogFrame);
			GUI.FocusWindow(1);
		}
	/*if(bInvIsCreated && !bInventory)
		{
			DestroyInventory();
			if(bInvWasModified == true)
				{
					SendInventoryItems();
					bInvWasModified = false;
					//Global.save_stats();
				}
		}*/
	
			
			if(bInvWasModified == true)
				{
					DestroyInventory();
					Debug.Log("Trimite la server.");
					SendInventoryItems();
					bInvWasModified = false;
					//Global.save_stats();
				}
	
	if(bInventory && !bInvIsCreated)
		{
			CreateInventory();
		}
	if(bInventory)
	{
		if(Global.bNeedToUpdateInv)
			{
				UpdateEqInvItems();			
				Global.bNeedToUpdateInv = false;
			}
		if(bResetSelItem == true)
			{
				ResetSelectedItem();
				bResetSelItem = false;
			}
		//if it's the first time displaying, show tutorial overlay
		//CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_INV_ON );
		//Debug.Log("Inventory texture is " + texInventoryFrame);
		DrawInventory();
		if(bIsSelItemHigh)
		{	
			//GUI.DrawTexture(Rect(invWireFrame[selitem].x-Global.screenW * 0.00146,invWireFrame[selitem].y-Global.screenH * 0.00625,texwidth+Global.screenW * 0.00833,texheight+Global.screenH * 0.0125),texSelInvItem,ScaleMode.StretchToFill,true,0);		
			if(!(itemsInInventory[selitem].slot == 7) && !(itemsInInventory[selitem].slot == 8) && !(itemsInInventory[selitem].level > Global.myChar.LVL) )
			{
				if (!in_battle)
				
					if(GUI.Button(Rect(Global.screenW * 0.6125, Global.screenH * 0.88,Global.screenW * 0.1729, Global.screenH * 0.11), "EQUIP", backbtnstyle))
						{
							if(!scriptBattle.bBattle)
								{
									EquipSelectedItem();
								}
						}
			}
			else
			{
				if (in_battle) 
					{
						if (itemsInInventory[selitem].health !=0 ||
							itemsInInventory[selitem].brutality !=0 ||
							itemsInInventory[selitem].accuracy !=0 ||
							itemsInInventory[selitem].fortitude !=0 ||
							itemsInInventory[selitem].defense !=0 ||
							itemsInInventory[selitem].regen !=0 ||
							itemsInInventory[selitem].attack !=0 ||
							itemsInInventory[selitem].duration)
							
								if(GUI.Button(Rect(Global.screenW * 0.6125, Global.screenH * 0.88,Global.screenW * 0.1729, Global.screenH * 0.11), "USE", backbtnstyle))
									{
										UseSelectedItem();
									}
					}
				else
				{
					//Radu adition.
					if( itemsInInventory[selitem].mob_id !=0 )
					{
						if(GUI.Button(Rect(Global.screenW * 0.6125, Global.screenH * 0.88,Global.screenW * 0.1729, Global.screenH * 0.11), "USE", backbtnstyle)) 
							{
								UseSelectedItem();
							}						
					}
				}
			}
			if(selstate && selitem != -1)
				{
					if((selitem % itemsPerRow == 0) || (selitem % itemsPerRow == 1))
						{
							invToolTipX = invWireFrame[selitem].x + paddingX + texwidth + 10;
							invToolTipY = startY;
						}
					else
						{
							invToolTipX = startX + (paddingX + texwidth)*((selitem % itemsPerRow)-2);
							invToolTipY = startY;
						}
					//GUI.DrawTexture(Rect(invToolTipX - 10,invToolTipY - 5, 2 * (texwidth+paddingX), 3 * (texheight+paddingY)),texTooltipItemFrame,ScaleMode.StretchToFill,true,1);
					
					GUI.DrawTexture(Rect(invToolTipX - Global.screenW * 0.0416,invToolTipY - Global.screenH * 0.03125, Global.screenW * 0.2895, Global.screenH * 0.68125), texTooltipItemFrame,ScaleMode.StretchToFill,true,1);
					countItemStats = 0;
					
					if ( itemsInInventory[selitem].name.length<15) 
						{	
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight),itemsInInventory[selitem].name);
						} 
					else 
						{
							var l = 14;
							while (l>0 && itemsInInventory[selitem].name[l]!=" ") l--;
							if (l==0) l = 14;
							l++;
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight),itemsInInventory[selitem].name.Substring(0,l));
							countItemStats += descLabelHeight;
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight),
							itemsInInventory[selitem].name.Substring(l, itemsInInventory[selitem].name.length-l));
						}
					countItemStats += descLabelHeight;
					
					if(itemsInInventory[selitem].brutality !=0)
						{
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), itemsInInventory[selitem].brutality + " Brutality");
							countItemStats += descLabelHeight;
						}
					if(itemsInInventory[selitem].accuracy !=0)
						{
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), itemsInInventory[selitem].accuracy + " Accuracy");
							countItemStats += descLabelHeight;
						}
					if(itemsInInventory[selitem].fortitude !=0)
						{
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), itemsInInventory[selitem].fortitude + " Fortitude");
							countItemStats += descLabelHeight;
						}
					if(itemsInInventory[selitem].defense !=0)
						{
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), itemsInInventory[selitem].defense + " Defense");
							countItemStats += descLabelHeight;
						}
					if(itemsInInventory[selitem].health !=0)
						{
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), itemsInInventory[selitem].health + " Health");
							countItemStats += descLabelHeight;
						}	
					if(itemsInInventory[selitem].regen !=0)
						{
							if(itemsInInventory[selitem].duration !=0)
								{
									GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), itemsInInventory[selitem].regen + " Regen for " 											+ itemsInInventory[selitem].duration +" turns");
								}
							else
								{
									GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), itemsInInventory[selitem].regen + " Regen");
								}
							countItemStats += descLabelHeight;
						}
				
					if((itemsInInventory[selitem].slot ==1)||(itemsInInventory[selitem].slot ==6))
						{
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), itemsInInventory[selitem].weapon_dmg_min + " - " 											+ itemsInInventory[selitem].weapon_dmg_max + " Damage");
							countItemStats += descLabelHeight;
						}	
					GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), "Value : " + itemsInInventory[selitem].price + " gold");
					countItemStats += descLabelHeight;
					
					if(itemsInInventory[selitem].level !=0)
						{
							GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, Global.screenW * 0.2708, descLabelHeight), "Level Required : " + itemsInInventory[selitem].level);
							countItemStats += descLabelHeight;
						}	
				}
		}
		
		/*if(GUI.Button(Rect(128, 270, 61, 33), "BANK", btnstyle))
		{
			if(bIsSelItemHigh)
			{
				UseSelectedItem();
			}
		}
		
		if(GUI.Button(Rect(195, 270, 61, 33), "CRAFT", btnstyle))
		{
			Craft.bCraft = true;
			bPlayerEq = false;
			bInventory = false;
		}*/
	
		if(bIsSelItemHigh) 
			{
				if (in_battle) 
					{
						if (itemsInInventory[selitem].health !=0 ||
							itemsInInventory[selitem].brutality !=0 ||
							itemsInInventory[selitem].accuracy !=0 ||
							itemsInInventory[selitem].fortitude !=0 ||
							itemsInInventory[selitem].defense !=0 ||
							itemsInInventory[selitem].regen !=0 ||
							itemsInInventory[selitem].attack !=0 ||
							itemsInInventory[selitem].duration)
								if(GUI.Button(Rect(Global.screenW * 0.3125, Global.screenH * 0.84375,Global.screenW * 0.1729, Global.screenH * 0.1125), "USE", backbtnstyle)) 
									{
										if(bIsSelItemHigh)
											{
												UseSelectedItem();
											}
									}
					}
			}
			
			
	if(scriptMain.emailAici)
	{	
		if(GUI.Button(Rect(Global.screenW * 0.4166, Global.screenH * 0.875,Global.screenW * 0.14375, Global.screenH * 0.1),"",styleSendBut))
		{print("E aici2");
					if(selecteditem)
					{	print(selecteditem  +  "  Itemul selectat sau nu");
						scriptMain.itemToSend = itemidd;
						print("id item" + scriptMain.itemToSend);
						scriptMain.emailAici = false;
						//GetInventoryItems();					
					}
		}
	}
	
	
		
	
		
		if(GUI.Button(Rect(Global.screenW * 0.25, Global.screenH * 0.88,Global.screenW * 0.14375, Global.screenH * 0.1), "VENDOR", btnstyle))
			{
				if (bIsSelItemHigh) 
					{
						if ( itemsInInventory[selitem].temporar == 0 )
							if (itemsInInventory[selitem].quantity > 1)
								{
									quantity_dialog = DLG_VENDOR;
									sQuantity = "1";
									show_quantity_dialog = true;
								} 
							else 
								{
									VendorSelectedItem(itemsInInventory[selitem], 1);
								}
					}
			}
				if(GUI.Button(Rect(Global.screenW * 0.4375, Global.screenH * 0.88,Global.screenW * 0.14375, Global.screenH * 0.1),"BACK", btnstyle))
		{
					inventoryBack = true;
					scriptMain.bCharFrame = true;
					scriptMain.makeActiveOrInactive = true;
					scriptBattle.menuInventory = !scriptBattle.menuInventory;
					bInventory = !bInventory;	
					butDown = true;
					ResetSelectedItem();
					scriptMain.alertJos = false;
		}
	
		/*if(GUI.Button(Rect(375, 270, 83, 36), "", styleBackBut))
			{
				bInventory = false;
				bPlayerEq = false;
	            ResetSelectedItem();
			}*/
		if(scriptMain.bCanShowBank)
			if ( scriptMain.IsHome() )
			
				if(GUI.Button(Rect(Global.screenW * 0.625, Global.screenH * 0.14375,Global.screenW * 0.25625, Global.screenH * 0.1125), "Transfer  to  bank", btnstyle))
				{
					if (bIsSelItemHigh) 
					{
						if ( itemsInInventory[selitem].temporar == 0 )
							if (itemsInInventory[selitem].quantity > 1)
								{
									quantity_dialog = DLG_BANK;
									sQuantity = "1";
									show_quantity_dialog = true;
								} 
							else 
								{
									TransferToBank(itemsInInventory[selitem], 1);
								}
					}	
		
					//bInventory = false;
					//bPlayerEq = false;
				}
		if(scriptMain.bCanShowBank)
			if ( scriptMain.IsHome() )
				if( GUI.Button( Rect(Global.screenW * 0.4791, Global.screenH * 0.14375,Global.screenW * 0.1041, Global.screenH * 0.1125), "< <", btnstyle) )
					{
						TransferAllToBank();
					}
			
	}
	if(bPlayerEq)
	{
		//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
		//CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_INV_EQUIPED );
		if(bResetSelItem == true)
			{
				ResetSelectedItem();
				bResetSelItem = false;
			}
		DrawPlayerEq();
		if(bIsSelItemHigh)
			{	
				GUI.DrawTexture(Rect(peqWireFrame[selitem].x-Global.screenW * 0.0041,peqWireFrame[selitem].y-Global.screenH * 0.00625,texwidth+Global.screenW * 0.0083,texheight+Global.screenH * 0.0125),texSelInvItem,ScaleMode.StretchToFill,true,0);
				countItemStats = 0;
				GUI.BeginGroup(Rect(Global.screenW * 0.5975, Global.screenH * 0.2343,Global.screenW * 0.375, Global.screenH * 0.625));
				GUI.Label(Rect(Global.screenW * 0.0208, Global.screenH * 0.0156,Global.screenW * 0.3958, descLabelHeight),itemsEquiped[selitem].name);
				countItemStats += descLabelHeight;
				if(itemsEquiped[selitem].brutality !=0)
					{
						GUI.Label(Rect(Global.screenW * 0.0208 , Global.screenW * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), itemsEquiped[selitem].brutality + " Brutality");
						countItemStats += descLabelHeight;
					}
				if(itemsEquiped[selitem].accuracy !=0)
					{
						GUI.Label(Rect(Global.screenW * 0.0208 , Global.screenW * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), itemsEquiped[selitem].accuracy + " Accuracy");
						countItemStats += descLabelHeight;
					}
				if(itemsEquiped[selitem].fortitude !=0)
					{
						GUI.Label(Rect(Global.screenW * 0.0208 , Global.screenW * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), itemsEquiped[selitem].fortitude + " Fortitude");
						countItemStats += descLabelHeight;
					}
				if(itemsEquiped[selitem].defense !=0)
					{
						GUI.Label(Rect(Global.screenW * 0.0208 , Global.screenW * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), itemsEquiped[selitem].defense + " Defense");
						countItemStats += descLabelHeight;
					}
				if(itemsEquiped[selitem].health !=0)
					{
						GUI.Label(Rect(Global.screenW * 0.0208 , Global.screenW * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), itemsEquiped[selitem].health + " Health");
						countItemStats += descLabelHeight;
					}	
				if(itemsEquiped[selitem].regen !=0)
					{
						if(itemsEquiped[selitem].duration !=0)
							{
								GUI.Label(Rect(Global.screenW * 0.0208 , Global.screenW * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), itemsEquiped[selitem].regen + " Regen for " + 						itemsEquiped[selitem].duration +" turns");
							}
						else
							{
								GUI.Label(Rect(Global.screenW * 0.0208 , Global.screenW * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), itemsEquiped[selitem].regen + " Regen");
							}
						countItemStats += descLabelHeight;
					}
				
				if((itemsEquiped[selitem].slot ==1)||(itemsEquiped[selitem].slot ==6))
					{	
						GUI.Label(Rect(Global.screenW * 0.0208, Global.screenH * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), itemsEquiped[selitem].weapon_dmg_min + " - " + 						itemsEquiped[selitem].weapon_dmg_max + " Damage");
						countItemStats += descLabelHeight;
					}	
				GUI.Label(Rect(Global.screenW * 0.0208, Global.screenH * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), "Value : " + itemsEquiped[selitem].price + " gold");
				countItemStats += descLabelHeight;
				if(itemsEquiped[selitem].level !=0)
					{
						GUI.Label(Rect(Global.screenW * 0.0208, Global.screenH * 0.0156 + countItemStats, Global.screenW * 0.3958, descLabelHeight), "Level Required : " + itemsEquiped[selitem].level);
						countItemStats += descLabelHeight;
					}
				GUI.EndGroup();	
			}//end if bIsSelItemHigh; show player stats(temporary)
		else
			{	
				countItemStats = 0;
				GUI.BeginGroup(Rect(Global.screenW * 0.5937, Global.screenH * 0.2343,Global.screenW * 0.375, Global.screenH * 0.625)); 
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.Nick + " Level:" + Global.myChar.LVL);
				countItemStats += descLabelHeight;
				
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.BRT + " Brutality");
				countItemStats += descLabelHeight;
			
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.ACC + " Accuracy");
				countItemStats += descLabelHeight;
				
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.FORT + " Fortitude");
				countItemStats += descLabelHeight;
				
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.DEF + " Defense");
				countItemStats += descLabelHeight;
				
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.HP + " Health");
				countItemStats += descLabelHeight;
					
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.ENRG + " Energy");
				countItemStats += descLabelHeight;
				
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.ATK + " attack power");
				countItemStats += descLabelHeight;
					
				GUI.Label(Rect(Global.screenW * 0.09375, Global.screenH * 0.0625 + countItemStats, Global.screenW * 0.3958, descLabelHeight), Global.myChar.EVASION + "% dodge");
				countItemStats += descLabelHeight;
				
				GUI.EndGroup();
			}
			
		//end else bIsSelItemHigh
		/*if(GUI.Button(Rect(195, 270, 61, 33), "CRAFT", btnstyle))
		{
			bPlayerEq = false;
			bInventory = false;
			Craft.bCraft = true;
		}*/
		
		if ( selitem != -1 && selitem < itemsEquiped.length && itemsEquiped[selitem].id != 0 )
			{	
				
				if(GUI.Button(Rect(Global.screenW * 0.3125, Global.screenH * 0.8437,Global.screenW * 0.1729, Global.screenH * 0.1125), "", styleUnequipBut))
					{
						//if(bIsSelItemHigh)
						//{
							UnEquipSelectedItem();
						//}
					}
					
			//	if(GUI.Button(Rect(Global.screenW * 0.4375, Global.screenH * 0.8437,Global.screenW * 0.1729, Global.screenH * 0.1125),"BACK", btnstyle))
		//{
			
		//}
				if(GUI.Button(Rect(Global.screenW * 0.5937, Global.screenH * 0.8437,Global.screenW * 0.1729, Global.screenH * 0.1125), "VENDOR", btnstyle))
					{
						//if(bIsSelItemHigh)
						//{
							VendorSelectedItem(itemsEquiped[selitem], itemsEquiped[selitem].quantity);
						//}	
					}
			}
		
		// Flag States
		
		if (GUI.Button(Rect(Global.screenW * 0.7083, Global.screenH * 0.1468,Global.screenW * 0.125, Global.screenH * 0.1125), "PVP", btnstyle))
			{
				script_main = GetComponent(scriptMain);
				scriptMain.FlagStateCheck = "PVP";
				script_main.FlagState();
			}
		if (GUI.Button(Rect(Global.screenW * 0.8333, Global.screenH * 0.1468,Global.screenW * 0.125, Global.screenH * 0.1125), "Inactive", btnstyle))
			{
				script_main = GetComponent(scriptMain);
				scriptMain.FlagStateCheck = "Inactive";
				print("FlagState a luat valoarea: " + scriptMain.FlagStateCheck);
				script_main.FlagState();
			}
		
		if (scriptMain.FlagStateCheck != null)
			GUI.Label(Rect(Global.screenW * 0.5, Global.screenH * 0.125,Global.screenW * 0.2958, Global.screenH * 0.09375), "Flagged: " + scriptMain.FlagStateCheck);
		else GUI.Label(Rect(Global.screenW * 0.5, Global.screenH * 0.125,Global.screenW * 0.2958, Global.screenH * 0.09375), "Flagged: " + scriptMain.s);

		if(GUI.Button(Rect(Global.screenW * 0.8333, Global.screenH * 0.8906,Global.screenW * 0.1437, Global.screenH * 0.09375), "", styleBackBut))
		{
			scriptMain.makeActiveOrInactive = true;
			bPlayerEq = false;
			//if(bInvWasModified == true)
				//{
					
					SendInventoryItems();
					/*Global.save_stats();
					*/
				//}	
			//scriptMain.bCharFrame = false;
		}
	}
	if( bIsSelItemHigh )
	    HightlightSelectedItem();
	if(is_updating)
	{
		nAngle += 200*Time.deltaTime;
		
		GUIUtility.RotateAroundPivot(nAngle, Vector2(Global.screenW * 0.5, Global.screenH * 0.5));
		//GUI.DrawTexture(Rect(Global.screenW * 0.4375, Global.screenH * 0.40625,Global.screenW * 0.125, Global.screenH * 0.1875), texLoaderWheel);
		GUIUtility.RotateAroundPivot(-nAngle, Vector2(Global.screenW * 0.5, Global.screenH * 0.5));
	}
} 

function CheckMissions(item:String,type:String) //EQUIP
{
	 for (var i:int =0;i<Global.missionsArray.length;i++)
	      { 
		      var t :Mission;
		      t = Global.missionsArray[i];
		      
		      if (t.toDo.ToUpper().Contains("EQUIP") && t.done==0) 
			      {
			       if(item.ToUpper()==t.what.ToUpper() || type.ToUpper()==t.what.ToUpper()) 
				       { 
					       t.UpdateMission(1);
					       var url = Global.server + "/mmo_iphone/update_player_mission.php?mission_id="+t.missionId.ToString()+"&player_id="+Global.myChar.id+"&procent=" + t.done.ToString();
					       var post = new WWW(url);
					       yield post; 
					       
					       while (post.error && post.error.ToString().Contains("Resolving host timed out"))
								{
									Debug.Log( "Retrying");
									post = new WWW(url);
						       		yield post; 
								}
					   }
				   } 
		  } 
}

//Mihai: this doesnt seems to be used anywhere
//function DeleteItemFromInventory( item_ID : int, quantity : int )
//{
//	var index : int = FindIndexOfItemInInventory(item_ID);
//	if ( index == -1 )
//			throw UnityException("Nu am gasit item");
//	if ( itemsInInventory[index].quantity - quantity > 0 )
//			itemsInInventory[index].quantity -= quantity;
//	else
//		{
//			itemsInInventory[index] = new Item();
//		}
//}

//Mihai: this doesnt seems to be used anywhere
//function FindIndexOfItemInInventory( item_id : int ) : int
//{
//	var i : int;
//	for(i=0;i<itemsInInventory.length;i++)
//		if ( itemsInInventory[i].id == item_id )
//			return i;
//	return -1;
//}

function UpdateTimeFromServer()
{
	var the_url : String = Global.server + "/mmo_iphone/get_time.php";		
	var download : WWW = new WWW(the_url);
	yield download;
	
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
	{
		Debug.Log( "Retrying");
		download = new WWW(the_url);
		yield download;
	}
	var values : String[] = Regex.Split(download.text,"\n");
	OnTime = values[2];
}

function Interval60Min(time1 : int, time2 : int) : boolean
{
	if ( Mathf.Abs( time1 - time2 ) > ( 60 * 60 ) )
		return true;
	return false;
}

//Mihai: this doesnt seems to be used anywhere
//function UnlootItem(itemId : int, quantity : int) : boolean
//{
//	var index = find_item_from_inventory(itemId);
//	if ( index != -1 )
//		{
//			itemsInInventory[index].quantity -= quantity;
//			if ( itemsInInventory[index].quantity < 0 )
//				return false;
//			if ( itemsInInventory[index].quantity == 0 )
//				{
//					itemsInInventory[index].quantity = 0;
//					itemsInInventory[index].id = 0;
//				}
//		}
//	else
//		return false;
//	
//	return true;
//}