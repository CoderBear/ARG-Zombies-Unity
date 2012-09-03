//Constants used to show tutorials.

static var TUT_MAIN				: int = 1 << 0;
static var TUT_INV_EQUIPED  	: int = 1 << 1;
static var TUT_INV_ON 			: int = 1 << 2;
static var TUT_INV_BANK			: int = 1 << 3;
static var TUT_DISTRICT_INFO	: int = 1 << 4;
static var TUT_TRADE			: int = 1 << 5;
static var TUT_CHAT				: int = 1 << 6;
static var TUT_AUCTION_EXP		: int = 1 << 7;
static var TUT_AUCTION_BUY		: int = 1 << 8;
static var TUT_AUCTION_SELL		: int = 1 << 9;
static var TUT_CRAFT			: int = 1 << 10;
static var TUT_FIGHT_NORMAL		: int = 1 << 11;
static var TUT_FIGHT_PVP		: int = 1 << 12;


static var CRAFT_ARMOR : int = 1;
static var CRAFT_WEAPON : int = 2;
static var CRAFT_CONSUMABLE : int = 3;
static var CRAFT_SUMMON : int = 4;

//this is used know on what screens to display tutorials. ( only show tutorials the first time );
static var activeTutorials : int;
static var activeTutorialScreen : int = 0;
static var tutStyle : GUIStyle = new GUIStyle(); 


static function DrawTutorialOverlay( Type : int )
{
	if( CommonConstants.activeTutorials & Type )
		return; //this has already been show once.
	
	activeTutorialScreen = Type;
	tutStyle.normal.background = Resources.Load( ( "TutorialOverlays/" + Type ), Texture2D );
	tutStyle.active.background = tutStyle.normal.background;
	GUI.Window( 4, Rect( 0, 0, Screen.width, Screen.height ), DoTutorialOverlay, "");
}

static function DoTutorialOverlay( windowId : int )
{	
	if( GUI.Button( Rect( 0, 0, Screen.width, Screen.height), "", tutStyle ) )
	{
		activeTutorials |= activeTutorialScreen;
		PlayerPrefs.SetInt("Active Tutorials", activeTutorials);
		activeTutorialScreen = 0;
	}
}
