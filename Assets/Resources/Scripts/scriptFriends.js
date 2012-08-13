#pragma strict

static var bFriend : boolean;

static var Friends = new Array();

var texFriendFrame : Texture2D;



/*class Friend
{
	var
}*/



function Start () {

}

function Update () 
{
	if(!bFriend)
		return;
	
}


function OnGUI()
{
	var screenScale: float = Screen.width / 480.0;
    var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
    GUI.matrix = scaledMatrix;
	var values : String[];
	
	if(!bFriend)
		return;
		
	CommonConstants.DrawTutorialOverlay( CommonConstants.TUT_CHAT );
	GUI.DrawTexture(Rect(125, 45, 350, 87), texFriendFrame);
	//GUI.DrawTexture(Rect(120, 130, 355, 185), texChatFrame2);	
		
	
}