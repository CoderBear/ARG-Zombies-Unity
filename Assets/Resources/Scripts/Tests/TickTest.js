var gameObj : GameObject;

function Start(){
	gameObj = GameObject.Instantiate(Resources.Load("Animations/Mobs1.5/"+TestGlobal.testEnemyName));
	if(TestGlobal.testEnemyName == "TickMan"){
		gameObj.transform.position = Vector3(2.9,0,-7);
		gameObj.transform.localScale = Vector3(4,4,-4);
		gameObj.animation["death"].wrapMode = WrapMode.Once;
	}
	if(TestGlobal.testEnemyName == "Tick"){
		gameObj.transform.position = Vector3(0.3,0,-7.2);
		gameObj.transform.localScale = Vector3(3.8,3.8,-3.8);
	}
	
}
function Update (){
	if(TestGlobal.testEnemyName == "TickMan"){
		if((!gameObj.animation.IsPlaying("death"))&&(!TestGlobal.testBool)){
			TestGlobal.testBool = true;
			gameObj.animation.Play("death");
		}
		if(!gameObj.animation.IsPlaying("death")){
			TestGlobal.testEnemyName = "Tick";
			Application.LoadLevel("sceneTest");
		}
	}	
}