var testZombie : GameObject;
var rederers : Component[];
var projectile : Rigidbody;
var bullet : GameObject;
var style : GUIStyle;
var contor : int;
var animatii : String[];
var sAnim : String;
var selected : int;
var bSpecialDone : boolean;
var gridH : int;
var charChat : GameObject;
var charChatPos : Vector3;
var charChatClone : GameObject;

function animate(animation : String){
	var anim : String = "Characters/Character1/Gun_specials/" + animation;

	Destroy(testZombie);
	//print(anim);
	testZombie = GameObject.Instantiate(Resources.Load(anim));
	testZombie.animation.Play();
	testZombie.transform.Translate(0, -0.5, -7, Space.World);
}


function test1(inChar : GameObject){
		
		var renderers = inChar.GetComponentsInChildren(Renderer);
		for(var r : Renderer in renderers)
		{
			print(r.name);
		}
}
	
function test2(inChar : GameObject){
	for(var state : AnimationState in inChar.animation)
	{
		print(state.name +":" + state.length +"s is at " + state.time);
	}
}

function flip(){
	testZombie.transform.localScale.y = -testZombie.transform.localScale.y;
	testZombie.transform.Rotate(0,180.0,180.0);
}

function Start(){
	bSpecialDone = false;
	contor = testZombie.animation.GetClipCount();
	selected = 0;
	animatii = new String[contor];
	contor = 0;
	for(var state : AnimationState in testZombie.animation)
	{
		animatii[contor] = state.name;
		contor++;
	}
	if(contor < 8)
		gridH = 20;
	else	
		gridH = (contor / 8) * 30;

}
function OnGUI(){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	
	selected = GUI.SelectionGrid(Rect(0,0, 480, gridH), selected, animatii, 8);
	
	if(GUI.Button(Rect(240,300,50,20),"chat"))
	{
		Global.chatUser = "mucles";
		charChatPos = Vector3(0,0,-7);
		if(charChatClone != null){
			charChatClone.active = true;
			for( var r : Renderer in charChatClone.GetComponentsInChildren(Renderer))
				r.enabled = true;
		}else{
			charChatClone = Instantiate(charChat, charChatPos, Quaternion.identity);	
		}
	}
	
	if(GUI.Button(Rect(300,300,50,20),"end chat"))
	{
		//Global.chatUser = "mucles";
		//charChatPos = Vector3(0,0,-7);
		//Destroy(charChatClone);
		for( var r : Renderer in charChatClone.GetComponentsInChildren(Renderer))
				r.enabled = false;
		charChatClone.active = false;	
	}		

}

function Update () {

	/*if((testZombie.animation[animatii[selected]].name == "special") && (testZombie.animation[animatii[selected]].normalizedTime > 0.7) && (!bSpecialDone)){	
			GameObject.Instantiate(Resources.Load("Objects/Bullets/ClownBomb"));
			bSpecialDone = true;
	}*/
	if(contor != selected){
		//testZombie.animation[animatii[selected]].speed = 0.1;
		testZombie.animation[animatii[selected]].wrapMode = WrapMode.Once;
		testZombie.animation.CrossFade(animatii[selected]);
		contor = selected;
		bSpecialDone = false;
	}
		
}