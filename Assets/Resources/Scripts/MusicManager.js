//playlist
static var MUSIC_MENU : String = "ZOMBIEMENU";
static var MUSIC_MENU_LONGER : String = "ZOMBIEmenulongger";
static var MUSIC_BOSS : String = "ZOMBIEboss";

static function PlayFile( file : String )
{
	PlayerPrefs.SetString( "PlayFile", file );
}

