class BattleAnimations{
var texHLT: Texture2D;
var texENG: Texture2D;
//--------------------
	var triger: 	int;
	var curAnim: 	String;
	var curChar:	Character;
	var nextChar: 	Character;
	var nextAnim:	String;
	var goNext:		boolean;
	var toTarget:	boolean;
	var toHome:		boolean;
	var takeHit:	boolean;
	
	var showDamage:	boolean;
	var DMGTime:	float;
	var DMGObj:		GameObject;
	var DMG:		int;
	
	var bar1l1:		int;
	var bar1l2:		int;
	var bar2l1:		int;
	var bar2l2:		int;
	var newBar1l1:	int;
	var newBar1l2:	int;
	var newBar2l1:	int;
	var newBar2l2:	int;
	
	var hitFin		: boolean;
	//-------------------
	function BattleAnimations(){
		takeHit = false;
		toTarget = false;
		toHome = false;
		goNext = false;
		triger = 60;
		bar1l1 = 0;
		bar1l2 = 0;
		bar2l1 = 0;
		bar2l2 = 0;
		
		hitFin = true;
	}
	function action(player1: Character, player2: Character, action: String, result: String){
		player1.goNearCharacter(player2);
		curChar = player1;
		curAnim = action;
		
		nextChar = player2;
		nextAnim = result;
		
		toTarget = true;
		
		goNext = true;
	}
	function setNewBars(b1l1:int, b1l2:int, b2l1:int, b2l2:int){
		newBar1l1 = b1l1;
		newBar1l2 = b1l2;
		newBar2l1 = b2l1;
		newBar2l2 = b2l2;
	}
	function animDMG(){
		showDamage = true;
		DMGTime = 1.5;
		
		DMGObj = GameObject.Instantiate(Resources.Load("Objects/DMGText"));
		DMGObj.transform.position = nextChar.gameObj.transform.localPosition;
		print("Running now.");
		if (curChar.dir == "left"){
			DMGObj.transform.position.x+=0.4;
		} else {
			DMGObj.transform.position.x-=1;
		}
		DMGObj.transform.position.y+=2.5;
		var txt: TextMesh = DMGObj.GetComponent(TextMesh);
		if (DMG == 0) txt.text = "miss";
		else txt.text = ""+DMG;
		//set newBars
		bar1l1 = newBar1l1;
		bar1l2 = newBar1l2;
		bar2l1 = newBar2l1;
		bar2l2 = newBar2l2;
	}
	
	function animate(Char : Character, animation : String){
		var sAnim : String = Char.sChar + animation;
		var vPos : Vector3 = Char.gameObj.transform.position;
		var vLocalPos : Vector3 = Char.gameObj.transform.localPosition;
		var vLocalScale : Vector3 = Char.gameObj.transform.localScale;
		
		GameObject.Destroy(Char.gameObj);
		Char.gameObj = GameObject.Instantiate(Resources.Load(sAnim));
		Char.gameObj.animation.Play();
		Char.gameObj.transform.Translate(vPos, Space.World);
		Char.gameObj.transform.localPosition = vLocalPos;
		Char.gameObj.transform.localScale = vLocalScale;
	}
	
	function render () {
		if (toTarget){
			curChar.render();
			if (curChar.isOnTarget){
				Log.add("On target.");
				toTarget = false;
				goNext = true;
				//curChar.gameObj.animation.Play();
				animate(curChar, curAnim);
				curChar.gameObj.animation.wrapMode = WrapMode.Once;
			}
		}
		
		if (toHome){
			curChar.render();
			if (curChar.isOnTarget){
				toHome = false;
				//curChar.gameObj.animation.Play("idle");
				animate(curChar,"Basic/idle");
				curChar.gameObj.animation.wrapMode = WrapMode.Loop;
			}
		}
		
		if (goNext){
			//var c: float = curChar.gameObj.animation[curAnim].time/curChar.gameObj.animation[curAnim].length*100;
			var c: float = curChar.gameObj.animation[curChar.gameObj.animation.clip.name].time /
							curChar.gameObj.animation[curChar.gameObj.animation.clip.name].length*100;
			if (c>=triger){
				//nextChar.gameObj.animation.Play(nextAnim);
				if(hitFin) animate(nextChar, nextAnim);
				nextChar.gameObj.animation.wrapMode = WrapMode.Once;
				takeHit = true;
				
				if(hitFin) animDMG();
				hitFin = false;
				goNext = false;
			}
		}
		if (takeHit){
			if (!nextChar.gameObj.animation.isPlaying /*&& nextChar.sCurAnim == nextAnim*/){
				Log.add("Turn finised, animate idle.");
				//nextChar.gameObj.animation.PlayQueued("idle");
				if(nextChar.HLT>0){
					animate(nextChar, "Basic/idle");
					//nextChar.gameObj.animation.wrapMode = WrapMode.Loop;
				}
				takeHit = false;
				
				curChar.goHome();
				toHome = true;
			}
		}
		if (showDamage){
			if (DMGTime <=0){
				showDamage = false;
				GameObject.Destroy(DMGObj);
				hitFin = true;
			}
			DMGTime -= Time.deltaTime;
		}
	}
	function OnGUI(){
		GUI.DrawTexture(Rect(0,0,bar1l1,10),texHLT, ScaleMode.StretchToFill, true, 1);
		GUI.DrawTexture(Rect(0,10,bar1l2,5),texENG, ScaleMode.StretchToFill, true, 1);
		GUI.DrawTexture(Rect(480-bar2l1,0,bar2l1,10),texHLT, ScaleMode.StretchToFill, true, 1);
		GUI.DrawTexture(Rect(480-bar2l2,10,bar2l2,5),texENG, ScaleMode.StretchToFill, true, 1);
	}
}