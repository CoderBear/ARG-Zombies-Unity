var script_main : scriptMain;
var LuncherPlane : GameObject;

static var self : Inventory;

var goSelInvItem : GameObject;		// gameobject for selected item in inventory
var goInvFrame : GameObject; 		// gameobject for inventory frame
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
var in_battle : boolean;
var in_pvp : boolean;
var maxEquipedItems : int; 					// max number of items equiped
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

var checkRange : boolean;

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
var posInvItems : Vector3[];		// position in inventory grid for each item
var itemsInInventory : Item[];		// array of items objects that are in inventroy
static var itemsEquiped : Item[];			// array of items equiped
var texItemInInv : String[];		// array of paths to texture for each inventory item
var texItemPEq : String[];			// array of paths to texture for each peq inventory item
var texSelItemInInv : String;		// path to texture for current selected item
var temp_item : Item;
static var temp_slot : int;
	
static var selitem : int = -1;				// position of slected item in inventory
var selstate : boolean = false;
var oldselitem : int = -1;
				
static var bIsSelItemHigh : boolean = false;	//flag for highlight of selected item
var bSelItemIsMoving : boolean = false; //flag when moving selected item
var bInvIsCreated : boolean = false; 	//flag for creation of inventory

var style : GUIStyle;				// gui style for buttons displayed
var texInventory : Texture2D;		// texture of inventory button
var texInventoryP : Texture2D;		// texture of inventory button

var texInvItemUnused : Texture2D;
var texInvItemUsed : Texture2D;
var initPosInvItem : Vector3;		// initial positon for constructing the inventory objects grid
var initScaleInvItem : Vector3;		// initial scale of a inventory object

var deltapos : Vector3;
var dragspeedX : float;
var dragspeedY : float;

var bArmour : boolean;		
//var cPC	: Char = new Char();		// char to display the item equiped

var backbtnstyle : GUIStyle;
var btnstyle : GUIStyle;
var invbtnstyle : GUIStyle;

var bInvWasModified : boolean;
static var bInventory : boolean;			// flag inventory button was pressed
static var bPlayerEq : boolean; 			// flag for player frame pressed
static var bResetSelItem : boolean;

var invToolTipX : int;
var invToolTipY : int;

var is_updating : boolean;


// Variables for the quantity dialog
var DLG_NONE : int = 0;
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
	if ( Application.loadedLevelName != "sceneBattle" && Application.loadedLevelName != "sceneStory" && Application.loadedLevelName != "scenePVP" && Application.loadedLevelName != "sceneBuilding")
				script_main.verificareFlagState();
			
	self = this; 
    Resources.UnloadUnusedAssets();
	sQuantity = "1"; 
	dark_pixel = Resources.Load("Menus/Menu_General/dark_pixel", Texture2D);
	checkRange = false;
	is_updating = false;
	startX = 150; //was 125 for 3D
	startY = 80; //was 45 for 3D	
	texwidth = 52;
	texheight = 52;
	paddingX = 10;
	paddingY = 15;
	maxInvItems = 15;
	maxEquipedItems = 6;
	texInvItems = new Texture2D[maxInvItems];
	texPEqItems = new Texture2D[maxEquipedItems];
	itemsPerRow = 5;
	peItemsPerRow = 2;
	bInvWasModified = false;
	descLabelHeight = 20;
	//initPosInvItem = Vector3(-37, 37, 100);
	//initScaleInvItem = Vector3(2, 0.01, 2);
	//goSelInvItem = GameObject.Find("goSelInvItem");
	//goInvFrame = GameObject.Find("goInvFrame");
	invWireFrame = new Vector2[maxInvItems];
	peqWireFrame = new Vector2[maxEquipedItems];
	//posInvItems = new Vector3 [maxInvItems];
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
	swapAlertRect = Rect (150, 100, 220, 120);
}
function UpdateEqInvItems()
{
	yield StartCoroutine( GetInventoryItems() );
	UpdateInventory();
	UpdatePlayerEq();
}

function CreateInventory() {
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
		{
			if (itemsEquiped[i]) 
				{
					texItemPEq[i] = "Menus/Inventory/Icons/"+itemsEquiped[i].id;
				}
			texPEqItems[i] = Resources.Load(texItemPEq[i]);
		}
}

function DrawInventory() 
{
	GUI.DrawTexture(Rect(startX-35, startY-40, 45 + itemsPerRow*(paddingX+texwidth), 85 + (maxInvItems/itemsPerRow)*(paddingY+texheight)), texInventoryFrame,ScaleMode.StretchToFill,true,1);
	//GUI.Label(Rect(startX - 15, startY - 25, 100, 20),Global.myChar.Money+" gold");
	for (var i = 0; i< maxInvItems; i++)
	{	
		//goInvItems[i].renderer.material.mainTexture = Resources.Load(texItemInInv[i]);
		//goInvItems[i].renderer.enabled = true;	
		GUI.DrawTexture(Rect(invWireFrame[i].x,invWireFrame[i].y,texwidth,texheight),texInvItems[i],ScaleMode.StretchToFill,true,1);
		if(itemsInInventory[i].quantity > 1)
		{
			if (itemsInInventory[i].quantity < 10) 
				{
					GUI.DrawTexture(Rect(invWireFrame[i].x+3, invWireFrame[i].y+4, 11, 12), dark_pixel, ScaleMode.StretchToFill, true, 1);
				} 
			else
				if (itemsInInventory[i].quantity < 100) 
				{
					GUI.DrawTexture(Rect(invWireFrame[i].x+3, invWireFrame[i].y+4, 18, 12), dark_pixel, ScaleMode.StretchToFill, true, 1);
				} 
				else 
				{
					GUI.DrawTexture(Rect(invWireFrame[i].x+3, invWireFrame[i].y+4, 25, 12), dark_pixel, ScaleMode.StretchToFill, true, 1);
				}
			GUI.Label(Rect(invWireFrame[i].x+5,invWireFrame[i].y,30,30),itemsInInventory[i].quantity+"");
		}
	}
}

function DrawPlayerEq() 
{
	GUI.DrawTexture(Rect(startX-35, startY-40, 45 + itemsPerRow*(paddingX+texwidth), 85 + (maxInvItems/itemsPerRow)*(paddingY+texheight)), texPEquipedFrame,ScaleMode.StretchToFill,true,0);
	//GUI.Label(Rect(startX - 15, startY - 25, 100, 20),Global.myChar.Money+" gold");
	//GUI.DrawTexture(Rect(285,65,180,200), texSelInvItem,ScaleMode.StretchToFill,true,0);
	for (var i = 0; i< maxEquipedItems; i++)
	{	
		//goInvItems[i].renderer.material.mainTexture = Resources.Load(texItemInInv[i]);
		//goInvItems[i].renderer.enabled = true;	
		GUI.DrawTexture(Rect(peqWireFrame[i].x,peqWireFrame[i].y,texwidth,texheight),texPEqItems[i],ScaleMode.StretchToFill,true,1);
		/*if(itemsInInventory[i].quantity > 1)
		{
			GUI.Label(Rect(invWireFrame[i].x+5,invWireFrame[i].y,30,30),itemsInInventory[i].quantity+"");
		}*/
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
	var res : int = -1;
	for(var i=0; i<maxInvItems; i++)
	{
		if(CheckPointIsInInvItem(invWireFrame[i], pointX, pointY))
			{
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
	var res : int = -1;
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

function DropItem(touchX : float, touchY: float) 
{
	if(CheckPointIsInPlayerFrame(touchX, touchY))
		{
		}
	else
		{
		}
}
	
function HightlightSelectedItem() {

	// Log.add("now highlight");
	//goSelInvItem.transform.position = goInvItems[selitem].transform.position;
   	//goSelInvItem.renderer.enabled = true;
   if(bPlayerEq)
	   GUI.DrawTexture(Rect(peqWireFrame[selitem].x-5,peqWireFrame[selitem].y-5,texwidth+10,texheight+10),texSelInvItem,ScaleMode.StretchToFill,true,0);
   else
	   GUI.DrawTexture(Rect(invWireFrame[selitem].x-5,invWireFrame[selitem].y-5,texwidth+10,texheight+10),texSelInvItem,ScaleMode.StretchToFill,true,0);
  
}
	
function MoveSelectedItem() 
{

}

//reset selected item	
static function ResetSelectedItem() 
{
	//goSelInvItem.renderer.enabled = false;
   	bIsSelItemHigh = false;
   	selitem = -1;
   	//selstate = false;
}

function DestroyInventory()
{
	/*for(i = 0; i<maxInvItems;i++)
	{
		GameObject.Destroy(goInvItems[i]);
	}
	goInvFrame.renderer.enabled = false;*/
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
		yield StartCoroutine( Global.save_stats() );
	}
}

function UnEquipSelectedItem() {
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
		Global.self.FightMob( itemsInInventory[selitem].mob_id.ToString(), 1 );
		//Global.FightMob();
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
	/*
	for(i=0;i<maxEquipedItems;i++)
	{
		if((item.slot != 1) && (item.slot !=6))
		{
			if(item.slot == itemsEquiped[i].slot)
				break;
		}
		else
		{
			if((itemsEquiped[i].slot == 1)||(itemsEquiped[i].slot == 6))
				break;
		}
	}
	if(i>=maxEquipedItems)
	{
		for(i=0;i<maxEquipedItems;i++)
		{
			if(itemsEquiped[i].id==0)
				break;
		}
	}
	*/
	var i = item.slot;
	if ( i == 6 ) 
			i = 0;
	//if ( i == 6 || i == 1 ) i = 0; //old: weapons are the same with gloves
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
		//itemsEquiped[1] = new Item();
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
		
		//Global.myChar.ATK 	= Global.myChar.ATK + itemsEquiped[i].attack + (itemsEquiped[i].brutality * 2);
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
	//Global.myChar.ENRG 	= Global.myChar.ENRG + (itemAdd.enrg - itemRem.energ);
	
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
	values = Regex.Split(download.text,"<br />");
	for(var i=0; i<maxInvItems; i++)
		{
			itemsInInventory[i] = new Item();
		}
	for(i=0; i<maxEquipedItems; i++)
		{
			itemsEquiped[i] = new Item();
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
					checkRange = true;
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
//			itemsEquiped[temp_slot].id = 226;
//			if (itemsEquiped[temp_slot].id == 226)
//				{
//					if( Application.loadedLevelName != "sceneMap" )
//					{
//						itemsEquiped[temp_slot].weapon_type = "R";
//						LuncherPlane = GameObject.Find("weapons");
//						LuncherPlane.transform.localPosition.x = -0.07;
//						LuncherPlane.transform.localPosition.y = -0.005;
//						LuncherPlane.transform.localPosition.z = 0.006;
//						LuncherPlane.transform.localScale.x = 1.5;
//						LuncherPlane.transform.localScale.y = 0.5;
//						LuncherPlane.transform.Rotate(Vector3(0,0,-15));
//						scriptBattle.cPC.WepType = 3;
//					}
//					else
//					{
//						itemsEquiped[temp_slot].weapon_type = "R";
//						LuncherPlane = GameObject.Find("weapons");
//						LuncherPlane.transform.localPosition.x = -0.07;
//						LuncherPlane.transform.localPosition.y = -0.005;
//						LuncherPlane.transform.localPosition.z = 0.006;
//						LuncherPlane.transform.localScale.x = 1.5;
//						LuncherPlane.transform.localScale.y = 0.5;
//						scriptBattle.cPC.WepType = 3;
//					}
//				}
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
	if ( up )
		yield SendInventoryItems();
}

//save the inventory on the server
function SendInventoryItems()
{
	is_updating = true;

	scriptBattle.scriptInventory.log_inventory();
	var the_url : String = "";
	var itemstring : String = "";
	the_url = Global.server + "/mmo_iphone/update_inventory.php";
	var k : int = 0; 
	
	//calculate the number of non-null items;
	for(var i = 0; i < maxInvItems; i++ )
		if( itemsInInventory[ i ].quantity != 0 && itemsInInventory[ i ].id != 0 )
			k++;
	for( i = 0; i < maxEquipedItems; i++ )
		if( itemsEquiped[ i ].quantity != 0 && itemsEquiped[ i ].id != 0 )
			k++;
	
	var postData : WWWForm = new WWWForm();
	postData.AddField("user_id", Global.myChar.id);
	postData.AddField("number", k);
    
    //now add all the non null items to inventory ( k items )   
    k = 0; 
    
	for(i = 0; i < maxInvItems; i++)
	{	
		if( itemsInInventory[ i ].quantity != 0 || itemsInInventory[ i ].id != 0 )
		{
			postData.AddField("" + k + "_item_id", itemsInInventory[i].id );
       		postData.AddField("" + k + "_quantity", itemsInInventory[i].quantity );
       		postData.AddField("" + k + "_active", itemsInInventory[i].equipped );
       		postData.AddField("" + k + "_add_time", itemsInInventory[i].temporar );
       		++k;
		}
	}
	for(i = 0; i < maxEquipedItems ; i++)
	{
		if( itemsEquiped[ i ].quantity !=0 || itemsEquiped[ i ].id != 0 )
		{
			postData.AddField("" + k + "_item_id", itemsEquiped[i].id);
			postData.AddField("" + k + "_quantity", itemsEquiped[i].quantity);
       	 	postData.AddField("" + k + "_active", itemsEquiped[i].equipped);
       	 	postData.AddField("" + k + "_add_time", itemsInInventory[i].temporar );
			++k;
		}
	}
	
	var upload : WWW = new WWW(the_url,postData);
	yield upload;
	while (upload.error && upload.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying");
			upload = new WWW(the_url,postData);
			yield upload;
		}

	bInvWasModified = false;
	is_updating = false;
}

function GetItemSlot(item : Item)
{
	var itemSlot : String = "";
	switch(item.slot){
		case 1:
			itemSlot= "Hands";
			break;
		case 2:
			itemSlot= "Helmet";
			break;
		case 3:
			itemSlot= "Chest";
			break;
		case 4:
			itemSlot= "Pants";
			break;
		case 5:
			itemSlot= "Shoes";
			break;
		case 6:
			itemSlot= "Weapon";
			break;
		case 7:
			itemSlot= "Else";
			break;	
		default:
			break;
	}
	return itemSlot;
}


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

function Update () {
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
        		if(TouchIsInInventory(newPt.x, 320-newPt.y))
        		{
        			oldselitem = selitem;
        			ResetSelectedItem();
    				selitem = GetInvSelectedItem(newPt.x, 320-newPt.y);
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
        		if(TouchIsInPEq(newPt.x, 320-newPt.y))
        		{
        			ResetSelectedItem();
    				selitem = GetPEqSelectedItem(newPt.x, 320-newPt.y);
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

function DoSpecialItemLoot(itemid1 : int, itemid2 : int, chance : float )
{
	//var done1 : boolean = false;
	//GetInventoryItems();
	var	done = LootItem(itemid1);
	//LootItem(itemid2, Global.OnTime )
	var rand = Random.Range(0,10);
	
	//if ( rand <= chance )
	//	update_special_item(itemid2,1);
	//else
	//	update_special_item(itemid2,0);
	//return done;
}

var OnTime : String;

function LootItems(itemId1 : int, itemId2 : int, special : boolean, chance : float)
{
	OnTime = "0";
	var bOK : boolean = false;
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
		//	itemsInInventory[s2].temporar = parseInt( OnTime );
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
				itemsInInventory[i] = Item([""+itemId, "1", "0", "0", "0", "0", "0", "0", "0", 																						"0", "0", "0", "0", "0", "0", "0-0", "0", time]);
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
	for(i=0;i<maxInvItems;i++){
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
				itemsInInventory[i] = Item([""+itemId, "1", "0", "0", "0", "0", "0", "0", "0", 																						"0", "0", "0", "0", "0", "0", "0-0", "0", "0"]);
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
	GUI.Label(Rect(20,30,190,20),"Not enough free slots in inventory.\nPlease remove some items.");
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleButSmll))
		bSwapAlert = false;
}

function DoTransferAllAlert( windowId : int )
{
	GUI.Label(Rect(20,30,500,50),"No more free slots in the bank");
	if(GUI.Button(Rect(74, 70, 83, 36), "Close", styleButSmll))
		bTransferAllAlert = false;
}

function QunatityDialog(windowID : int) 
{
	GUI.Label(Rect(70,30,200,20),"Select quantity:");
	sAux = sQuantity;
	sAux = GUI.TextField (Rect (58, 50, 53, 20), sAux, 25);
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

	if (GUI.Button(Rect(28, 70, 83, 36), "Cancel", styleButSmll)) 
		{
			show_quantity_dialog = false;
		}
    // + / - / Max buttons
    if (GUI.Button(Rect(28, 43, 23, 36), "-", styleButSmll)) 
	    {
			if(parseInt(sAux)>1) 
				{
			        sQuantity = (parseInt(sQuantity)-1).ToString();  
		        }
		}
    if (GUI.Button(Rect(119, 43, 23, 36), "+", styleButSmllGreen)) 
	    {
			if(parseInt(sAux)>=1)
				{
			         sQuantity = (parseInt(sQuantity)+1).ToString(); 
		        }
		}
    if (GUI.Button(Rect(150, 43, 53, 36), "Max", styleButSmll)) 
	    {
			sQuantity = "" + itemsInInventory[selitem].quantity;
		}
	if (GUI.Button(Rect(119, 70, 83, 36), "Accept", styleButSmll)) 
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
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

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
	if(bInvIsCreated && !bInventory)
		{
			DestroyInventory();
			if(bInvWasModified == true)
				{
					SendInventoryItems();
					//Global.save_stats();
				}
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
		CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_INV_ON );
		DrawInventory();
		if(bIsSelItemHigh)
		{	
			GUI.DrawTexture(Rect(invWireFrame[selitem].x-2,invWireFrame[selitem].y-2,texwidth+4,texheight+4),texSelInvItem,ScaleMode.StretchToFill,true,0);		
			if(!(itemsInInventory[selitem].slot == 7) && !(itemsInInventory[selitem].slot == 8) && !(itemsInInventory[selitem].level > Global.myChar.LVL) )
			{
				if (!in_battle)
					if(GUI.Button(Rect(150, 270, 83, 36), "EQUIP", backbtnstyle))
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
							if(GUI.Button(Rect(150, 270, 83, 36), "USE", backbtnstyle))
								{
									UseSelectedItem();
								}
					}
				else
				{
					//Radu adition.
					if( itemsInInventory[selitem].mob_id !=0 )
					{
						if(GUI.Button(Rect(150, 270, 83, 36), "USE", backbtnstyle)) 
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
				//GUI.DrawTexture(Rect(invToolTipX - 10,invToolTipY - 5, 2 * (texwidth+paddingX), 3 * (texheight+paddingY)),								texTooltipItemFrame,ScaleMode.StretchToFill,true,1);
				GUI.DrawTexture(Rect(invToolTipX - 20,invToolTipY - 10, 139, 218), texTooltipItemFrame,ScaleMode.StretchToFill,true,1);
				countItemStats = 0;
				if ( itemsInInventory[selitem].name.length<15) 
					{
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight),itemsInInventory[selitem].name);
					} 
				else 
					{
						var l = 14;
						while (l>0 && itemsInInventory[selitem].name[l]!=" ") l--;
						if (l==0) l = 14;
						l++;
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight),itemsInInventory[selitem].name.Substring(0,l));
						countItemStats += descLabelHeight;
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight),
						itemsInInventory[selitem].name.Substring(l, itemsInInventory[selitem].name.length-l));
					}
				countItemStats += descLabelHeight;
				if(itemsInInventory[selitem].brutality !=0)
					{
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), itemsInInventory[selitem].brutality + " Brutality");
						countItemStats += descLabelHeight;
					}
				if(itemsInInventory[selitem].accuracy !=0)
					{
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), itemsInInventory[selitem].accuracy + " Accuracy");
						countItemStats += descLabelHeight;
					}
				if(itemsInInventory[selitem].fortitude !=0)
					{
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), itemsInInventory[selitem].fortitude + " Fortitude");
						countItemStats += descLabelHeight;
					}
				if(itemsInInventory[selitem].defense !=0)
					{
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), itemsInInventory[selitem].defense + " Defense");
						countItemStats += descLabelHeight;
					}
				if(itemsInInventory[selitem].health !=0)
					{
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), itemsInInventory[selitem].health + " Health");
						countItemStats += descLabelHeight;
					}	
				if(itemsInInventory[selitem].regen !=0)
					{
						if(itemsInInventory[selitem].duration !=0)
							{
								GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), itemsInInventory[selitem].regen + " Regen for " 											+ itemsInInventory[selitem].duration +" turns");
							}
						else
							{
								GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), itemsInInventory[selitem].regen + " Regen");
							}
						countItemStats += descLabelHeight;
					}
			
				if((itemsInInventory[selitem].slot ==1)||(itemsInInventory[selitem].slot ==6))
					{
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), itemsInInventory[selitem].weapon_dmg_min + " - " 											+ itemsInInventory[selitem].weapon_dmg_max + " Damage");
						countItemStats += descLabelHeight;
					}	
				GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), "Value : " + itemsInInventory[selitem].price + " gold");
				countItemStats += descLabelHeight;
				if(itemsInInventory[selitem].level !=0)
					{
						GUI.Label(Rect(invToolTipX, invToolTipY + countItemStats, 130, descLabelHeight), "Level Required : " + itemsInInventory[selitem].level);
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
					if(GUI.Button(Rect(150, 270, 83, 36), "USE", backbtnstyle)) 
						{
							if(bIsSelItemHigh)
								{
									UseSelectedItem();
								}
						}
			}
		}
	
		if(GUI.Button(Rect(285, 270, 83, 36), "VENDOR", btnstyle))
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
	
		if(GUI.Button(Rect(375, 270, 83, 36), "BACK", btnstyle))
			{
				bInventory = false;
				bPlayerEq = false;
	            ResetSelectedItem();
			}
		if(scriptMain.bCanShowBank)
			if ( scriptMain.IsHome() )
				if(GUI.Button(Rect(325, 37, 123, 36), "Transfer  to  bank", btnstyle))
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
				if( GUI.Button( Rect(250, 37, 50, 36), "< <", btnstyle) )
					{
						TransferAllToBank();
					}
			
	}
	if(bPlayerEq)
	{
		//RADU: TUTORIALS if it's the first time displaying, show tutorial overlay
		CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_INV_EQUIPED );
		if(bResetSelItem == true)
			{
				ResetSelectedItem();
				bResetSelItem = false;
			}
		DrawPlayerEq();
		if(bIsSelItemHigh)
		{	
			GUI.DrawTexture(Rect(peqWireFrame[selitem].x-2,peqWireFrame[selitem].y-2,texwidth+4,texheight+4),texSelInvItem,ScaleMode.StretchToFill,true,0);
			countItemStats = 0;
			GUI.BeginGroup(Rect(285, 75, 180, 200));
			GUI.Label(Rect(10 , 5, 190, descLabelHeight),itemsEquiped[selitem].name);
			countItemStats += descLabelHeight;
			if(itemsEquiped[selitem].brutality !=0)
				{
					GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), itemsEquiped[selitem].brutality + " Brutality");
					countItemStats += descLabelHeight;
				}
			if(itemsEquiped[selitem].accuracy !=0)
				{
					GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), itemsEquiped[selitem].accuracy + " Accuracy");
					countItemStats += descLabelHeight;
				}
			if(itemsEquiped[selitem].fortitude !=0)
				{
					GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), itemsEquiped[selitem].fortitude + " Fortitude");
					countItemStats += descLabelHeight;
				}
			if(itemsEquiped[selitem].defense !=0)
				{
					GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), itemsEquiped[selitem].defense + " Defense");
					countItemStats += descLabelHeight;
				}
			if(itemsEquiped[selitem].health !=0)
				{
					GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), itemsEquiped[selitem].health + " Health");
					countItemStats += descLabelHeight;
				}	
			if(itemsEquiped[selitem].regen !=0)
				{
					if(itemsEquiped[selitem].duration !=0)
						{
							GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), itemsEquiped[selitem].regen + " Regen for " + 						itemsEquiped[selitem].duration +" turns");
						}
					else
						{
							GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), itemsEquiped[selitem].regen + " Regen");
						}
					countItemStats += descLabelHeight;
				}
			
			if((itemsEquiped[selitem].slot ==1)||(itemsEquiped[selitem].slot ==6))
				{
					GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), itemsEquiped[selitem].weapon_dmg_min + " - " + 						itemsEquiped[selitem].weapon_dmg_max + " Damage");
					countItemStats += descLabelHeight;
				}	
			GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), "Value : " + itemsEquiped[selitem].price + " gold");
			countItemStats += descLabelHeight;
			if(itemsEquiped[selitem].level !=0)
				{
					GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), "Level Required : " + itemsEquiped[selitem].level);
					countItemStats += descLabelHeight;
				}
			GUI.EndGroup();	
		}//end if bIsSelItemHigh; show player stats(temporary)
		else
		{
			countItemStats = 0;
			GUI.BeginGroup(Rect(285, 75, 180, 200)); 
			GUI.Label(Rect(10, 5 + countItemStats, 190, descLabelHeight), Global.myChar.Nick + " Level:" + Global.myChar.LVL);
			countItemStats += descLabelHeight;
			
			GUI.Label(Rect(10, 5 + countItemStats, 190, descLabelHeight), Global.myChar.BRT + " Brutality");
			countItemStats += descLabelHeight;
			
			GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), Global.myChar.ACC + " Accuracy");
			countItemStats += descLabelHeight;
			
			GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), Global.myChar.FORT + " Fortitude");
			countItemStats += descLabelHeight;
			
			GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), Global.myChar.DEF + " Defense");
			countItemStats += descLabelHeight;
			
			GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), Global.myChar.HP + " Health");
			countItemStats += descLabelHeight;
				
			GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), Global.myChar.ENRG + " Energy");
			countItemStats += descLabelHeight;
			
			GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), Global.myChar.ATK + " attack power");
			countItemStats += descLabelHeight;
				
			GUI.Label(Rect(10 , 5 + countItemStats, 190, descLabelHeight), Global.myChar.EVASION + "% chance to dodge");
			countItemStats += descLabelHeight;
			
			GUI.EndGroup();
		}//end else bIsSelItemHigh
		/*if(GUI.Button(Rect(195, 270, 61, 33), "CRAFT", btnstyle))
		{
			bPlayerEq = false;
			bInventory = false;
			Craft.bCraft = true;
		}*/
		if ( selitem != -1 && selitem < itemsEquiped.length && itemsEquiped[selitem].id != 0 )
		{
			if(GUI.Button(Rect(150, 270, 83, 36), "UNEQUIP", backbtnstyle))
				{
					//if(bIsSelItemHigh)
					//{
						UnEquipSelectedItem();
					//}
				}
			if(GUI.Button(Rect(285, 270, 83, 36), "VENDOR", btnstyle))
				{
					//if(bIsSelItemHigh)
					//{
						VendorSelectedItem(itemsEquiped[selitem], itemsEquiped[selitem].quantity);
					//}	
				}
		}
		
		// Flag States

		if (GUI.Button(Rect(340, 37, 60, 36), "PVP", btnstyle))
			{
				script_main = GetComponent(scriptMain);
				scriptMain.FlagStateCheck = "PVP";
				script_main.FlagState();
			}
		if (GUI.Button(Rect(400, 37, 60, 36), "Inactive", btnstyle))
			{
				script_main = GetComponent(scriptMain);
				scriptMain.FlagStateCheck = "Inactive";
				print("FlagState a luat valoarea: " + scriptMain.FlagStateCheck);
				script_main.FlagState();
			}

		if (scriptMain.FlagStateCheck != null)
			GUI.Label(Rect(240 , 40, 190, 30), "Flagged: " + scriptMain.FlagStateCheck);
		else GUI.Label(Rect(240 , 40, 190, 30), "Flagged: " + scriptMain.s);

		if(GUI.Button(Rect(375, 270, 83, 36), "BACK", btnstyle))
		{
			bPlayerEq = false;
			if(bInvWasModified == true)
				{
					/*
					SendInventoryItems();
					Global.save_stats();
					*/
				}	
			//scriptMain.bCharFrame = false;
		}
	}
	if( bIsSelItemHigh )
    	HightlightSelectedItem();
	if(is_updating)
	{
		nAngle += 200*Time.deltaTime;
		GUIUtility.RotateAroundPivot(nAngle, Vector2(240, 160));
		GUI.DrawTexture(Rect(210, 130, 60, 60), texLoaderWheel);
		GUIUtility.RotateAroundPivot(-nAngle, Vector2(240, 160));
	}
} 

function CheckMissions(item:String,type:String) //EQUIP
{
 Debug.Log("Invetory.js:function CheckMissions::"+item+"  "+type);
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

function DeleteItemFromInventory( item_ID : int, quantity : int )
{
	var index : int = FindIndexOfItemInInventory(item_ID);
	if ( index == -1 )
		throw UnityException("Nu am gasit item");
	if ( itemsInInventory[index].quantity - quantity > 0 )
		itemsInInventory[index].quantity -= quantity;
	else
	{
		itemsInInventory[index] = new Item();
	}
}

function FindIndexOfItemInInventory( item_id : int ) : int
{
	var i : int;
	for(i=0;i<itemsInInventory.length;i++)
		if ( itemsInInventory[i].id == item_id )
			return i;
	return -1;
}

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

function UnlootItem(itemId : int, quantity : int) : boolean
{
	var index = find_item_from_inventory(itemId);
	if ( index != -1 )
	{
		itemsInInventory[index].quantity -= quantity;
		if ( itemsInInventory[index].quantity < 0 )
			return false;
		if ( itemsInInventory[index].quantity == 0 )
			{
				itemsInInventory[index].quantity = 0;
				itemsInInventory[index].id = 0;
			}
	}
	else
		return false;
	
	return true;
}