
static var self : scriptGUICutScene = null;

static var cutSceneActive : boolean = false;
static var MODE_INTRO : short = 1;
static var MODE_CUTSCENES : short = 2;

static var mMode : short = -1;

static var activeSlide : short = 0;
static var nrSlides : short;
static var mSliding : boolean;
static var mMob : String;

static var pos1 : Vector2;
static var pos2 : Vector2;

static var cutSceneMobs : Array = null;
var  blackText : Texture2D;
static var drawn : boolean;

function Start()
{
	self = this;
//	pos1 = Vector2( 0, 0 );
//	pos2 = Vector2( 0, -320 );
	cutSceneMobs = new Array();
	cutSceneMobs.Add( "PREACHERMAN" );
    cutSceneMobs.Add( "ZOMBIEOWEN" );
    cutSceneMobs.Add( "ZOMBIEDAVID" );
    cutSceneMobs.Add( "ZOMBIETREVOR" );
    cutSceneMobs.Add( "WEREWOLF" );
    cutSceneMobs.Add( "HOMEBASE" );
}

static function Init()
{   drawn = false;
//	pos1 = Vector2( 0, 0 );
//	pos2 = Vector2( 0, -320 );
	cutSceneMobs = new Array();
	cutSceneMobs.Add( "PREACHERMAN" );
    cutSceneMobs.Add( "WEREWOLF" );
    cutSceneMobs.Add( "ZOMBIEDAVID" );
    cutSceneMobs.Add( "ZOMBIETREVOR" );
    cutSceneMobs.Add( "ZOMBIEOWEN" );
    cutSceneMobs.Add( "HOMEBASE" );
   
}

static function HasCutScene( mob : String ) : boolean
{
	if( cutSceneMobs == null || cutSceneMobs.length == 0 )
		Init();
	//mob = "PreacherMan";
	//if( true ) //if we find it :D
	for( var i : int = 0; i < cutSceneMobs.length; i++ )
		if( mob.ToUpper() == cutSceneMobs[i] )
		{
			mMob = mob;
			return true;
		}	
	return false;
}

static function ToggleCutScene( mActive : boolean, Mode : short )
{
	cutSceneActive = mActive;
	mMode = Mode;
 //  if(Global.CES!=0)
  //     mMode = MODE_INTRO;
	activeSlide = 0;
	if( mMode == MODE_CUTSCENES )
	{
		pos1 = Vector2( 0, 0 );
		pos2 = Vector2( 0, -320 );
		nrSlides = 3;
	}
	else if( mMode == MODE_INTRO )
	{
		pos1 = Vector2( 0, -334 );
		mSliding = true;
		activeSlide = 0;
		nrSlides = 0;
	}
}

var x : Vector2 = Vector2( -100, -100 );

function Update () 
{
	if( !cutSceneActive ) return;
	
	if (Input.GetMouseButton(0) && !mSliding)  //implemented for mouse,will work with ios touch
	{
		var mousePos : Vector2 = new Vector2( Input.mousePosition.x, Input.mousePosition.y );
		if ( x.x < 0 ) 
			x = mousePos;  //implement touch began
		else 
			if( x.x > mousePos.x && Vector2.Distance( mousePos , x ) > 100 )
				if( activeSlide < nrSlides -1 && mMode != MODE_INTRO )
					mSliding = true;
				else
					cutSceneActive = false;				
	}
	else 
		x = Vector2( -100, -100 );
}

function OnGUI()
{
	if( !cutSceneActive ) return;
 
	switch( mMode )
	{
		case MODE_INTRO:
			DrawIntro();
		break;
		case MODE_CUTSCENES:
            if(Global.CES==0)
			DrawCutScenes();
          else cutSceneActive = false;	
		break;
	}
}

function DrawCutScenes()
{   blackText = Resources.Load("Textures/Black",Texture2D);
  Debug.Log(blackText.ToString());
GUI.DrawTexture(Rect(0,0,480,320),blackText,ScaleMode.StretchToFill, true, 1);// de completat
    
	//draw cutscenes.
	if( !mSliding )
	{
		//Debug.Log( "Animations/cutscenes/" + mMob + "/cut" + activeSlide + "low" );
		var tex : Texture2D = Resources.Load( "Animations/cutscenes/" + mMob + "/cut" + activeSlide + "low", Texture2D );
		GUI.DrawTexture( Rect( 0, 0, 480, 320 ), tex );
	}
	else
	{
		//Debug.Log( "Sliding" );
	var	moveSpeed = 200 * Time.deltaTime;
		var tex1 : Texture2D;
		//var tex2 : Texture2D = Resources.Load( "Animations/cutscenes/" + mMob + "cut" + ( activeSlide + 1 ) + "low", Texture2D );
		if( pos1.x > -480 )
		{
			pos1.x -= moveSpeed;
			tex1 = Resources.Load( "Animations/cutscenes/" + mMob + "/cut" + activeSlide + "low", Texture2D );
			GUI.DrawTexture( Rect( pos1.x, pos1.y, 480, 320 ), tex1 );
		}
		else if( pos2.y < 0 )
		{
			if( pos2.y > 0 ) pos2.y = 0;
			pos2.y += moveSpeed;
			tex1 = Resources.Load( "Animations/cutscenes/" + mMob + "/cut" + ( activeSlide + 1 ) + "low", Texture2D );
			GUI.DrawTexture( Rect( pos2.x, pos2.y, 480, 320), tex1 );
		}
		else
		{
			mSliding = false;
			++activeSlide;
			pos1 = Vector2( 0, 0 );
			pos2 = Vector2( 0, -320 );
		}
	}
    
}

var arrivalTime : float = 0.0f;
function DrawIntro()
{    
	//Debug.Log( pos1 );
var	moveSpeed = 15 * Time.deltaTime;
	
	if( pos1.y < 0 )
	{
		if( pos1.y >= 0 )
		{
			 pos1.y = 0;
			 arrivalTime = Time.realtimeSinceStartup;
		}
		pos1.y += moveSpeed;
		mSliding = false;
	}
	else if( pos1.x > -480 )
	{
		if( Time.realtimeSinceStartup - arrivalTime >= 2 ) //wait 1 second and puf;			
		pos1.x -= moveSpeed * 20;
	}
	else
	{
		cutSceneActive = false;
	}
	
	var tex : Texture2D = Resources.Load( "Animations/cutscenes/" + mMob + "/introlow", Texture2D );
	//Debug.Log( "drawing intro at: " + Rect( pos2.x, pos2.y, tex.width, tex.height) );
	GUI.DrawTexture( Rect( pos1.x, pos1.y, tex.width, tex.height ), tex );	
    drawn = true;
}







