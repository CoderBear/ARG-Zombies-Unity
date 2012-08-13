class Swipe{
	var swipeImage		: GameObject;
	var swipeParticles	: GameObject;

	
	static var show : int=0;
	
	var array	: swipeStep[];
	var step	: swipeStep;
	var touch	: iPhoneTouch;
	var start	: boolean;
	var started	: boolean;
	var changed	: boolean;
	var img		: Texture2D;
	var name	: String;
	var backTimer : float;
	
	var curPos	: Vector3;
	var nextPos	: Vector3;
	var vec		: Vector3;
	var dist	: float;
	var newDist : float;
	var touchRect : Rect;
	var curPt	: int;
	var oldPt	: int;
	
	var curStep	: int;
	var steps	: int;
	var i		: int;
	var j		: int;
	var texSquare : Texture2D;
	var clueTexture : Texture2D;
	var accuracy : float;
	
	var rectError : float;
	var maxError : float;
	var stepsError : int;
	var errorPercent : float;
	var accuracyCap : int;
	
	var totalAccuracy : float;
	var accuracySteps : int;
	var minPt : int;
	
	var result	: int;	// 0 - no result yet
						// 1 - success
						// 2 - fail
						// 3 - ignore
						
	var initlength : int;
	var isInit : boolean;
	var startTime : float;
	var max_score_time : float;
	var score_lost_per_sec : float;
	
	function Swipe(sName : String, kSwipeImage : GameObject, kSwipeParticles: GameObject, kMaxScoreTime : float, kScoreLostPS)
	{
        
		swipeImage = kSwipeImage;
		swipeParticles = kSwipeParticles;
		array = new Array();
		result = 0;
		start = true;
		started = false;
		changed = true;
		name = sName;
		
		rectError = 30; // you can be this many pixles off to the right or left, up or down
		stepsError = 5; // you can be this many -1 steps off
		accuracyCap = 1; // this will be the min accuracy
		
		maxError = Mathf.Sqrt(rectError*rectError*2);
		errorPercent = 100 / maxError;
		
		if (kMaxScoreTime > 0) {
			max_score_time = kMaxScoreTime;
			score_lost_per_sec = kScoreLostPS;
		} else {
			max_score_time = 2;
			score_lost_per_sec = 10;
		}
	}
		
	function init(sPath : String){
		show=0;
		dist = 0;
		steps = 0;
		curStep = 0;
		var values : String[];
		isInit = false;
		img = Resources.Load(sPath + "_img", Texture2D);
		swipeImage.renderer.material.mainTexture = img;
		var texTransparent : Texture2D = Resources.Load("Menus/Menu_General/transparent", Texture2D);
		texSquare = Resources.Load("Menus/Placeholders/used_slot_placeholder", Texture2D);
		clueTexture = Resources.Load("Menus/Placeholders/square border", Texture2D);

		var F : TextAsset;
		F = Resources.Load(sPath, TextAsset);
		if (!F) return;
		values = Regex.Split(F.text,"\n");
		var i : int;
		var j : int;
		array = new swipeStep[values.length];
		for(i = 0; i < values.length; i++){
			if(values[i][0]!="#"){
var				values2 = Regex.Split(values[i],",");
				var newStep : swipeStep = new swipeStep();

				newStep.release = parseInt(values2[0]);
				newStep.pt = Vector2(parseInt(values2[1]), parseInt(values2[2]) - 10);
									
				array[steps] = newStep;
				steps++;
			}
		}
		initlength = array.length;
		isInit = true;
		var nClue = 0;
		accuracy = 0;
		var x : float;
        var y : float;
               
       swipeParticles.transform.position =Camera.main.ScreenToWorldPoint (Vector3(	array[0].pt.x ,
																		320-array[0].pt.y, 
																		Camera.main.nearClipPlane+2.8f));	

		startTime = Time.time;
		minPt = 0;
		yield WaitForSeconds(0);
	}
	
	function hide() {
		swipeParticles.transform.position = Vector3(-8, -8, -7.515215);
		var texTransparent : Texture2D = Resources.Load("Menus/Menu_General/transparent", Texture2D);
		swipeImage.renderer.material.mainTexture = texTransparent;
	}
		
	function Update(){
	
//	if( show >0 )
//	{	
//		Debug.Log(show+"array.pt="+array[show].pt);
//		swipeParticles.transform.position =Camera.main.ScreenToWorldPoint (Vector3(	array[show].pt.x ,
//																		320-array[show].pt.y, 
//																		Camera.main.nearClipPlane+2.8f));			
//	}	else
//	{
//		Debug.Log("Number of steps = "+ steps);
//	}
	
	
		if (!start) return;
		
		if (curPt != oldPt) {
			if (oldPt < curPt) {
				oldPt++;
			} else {
				oldPt--;
			}
		}
		
		
		
		swipeParticles.transform.position =Camera.main.ScreenToWorldPoint (Vector3(	array[oldPt].pt.x ,
																		320-array[oldPt].pt.y, 
																		Camera.main.nearClipPlane+2.8f));

		if(iPhoneInput.touchCount <= 0) {
			if (curPt>minPt && array[curPt].release == 0)
				while (array[curPt-1].release == 0 && curPt > minPt+1) {
					curPt--;
			}
			if (curPt == minPt+1 && array[minPt].release == 0) 
				curPt = minPt;
			return;
		}
	
	//	Debug.Log("curent="+ curPt +";			oldPt="+ oldPt);
	
		touch = iPhoneInput.touches[0];
		touchRect = Rect(touch.position.x - rectError, 320 - touch.position.y - rectError, rectError*2, rectError*2);
	
		dist = 250;

		for (i= minPt ; i< steps; i++) {
				
			if (touchRect.Contains(array[i].pt)) {
	
				newDist = Vector2.Distance(touch.position , array[ curPt ].pt);
				
				//move the particle to touch position
				if(newDist < dist && (i - oldPt) < stepsError && (i - oldPt) > -stepsError) {
					
					while (curPt>i && array[curPt].release==0) {
						curPt--;
					}
					while (curPt<i && array[curPt].release==0) {
						curPt++;
					}
				}
			}
		}

			if (curPt >= steps-1 && ( array[curPt].release ==0) ) 
			{
				if (Time.time - startTime <= max_score_time) {
						accuracy = 100;
				} else {
						accuracy = 100 - ((Time.time - startTime - max_score_time) * score_lost_per_sec);
						if (accuracy < accuracyCap) accuracy = accuracyCap;
				}
			
				result = 1;
				start = false;
				hide();
				return;
			}
						
			if ( curPt >= steps-1 && array[curPt].release==1  ) 
				if( touch.phase==iPhoneTouchPhase.Began)
					if( touchRect.Contains( array[curPt].pt))
					{
						if (Time.time - startTime <= max_score_time)
						{
							accuracy = 100;
						} else {
							accuracy = 100 - ((Time.time - startTime - max_score_time) * score_lost_per_sec);
							if (accuracy < accuracyCap) accuracy = accuracyCap;
						}
			
						result = 1;
						start = false;
						hide();
						return;
					}else 
					{
						result = 2;
						start = false;
						hide();	
					}											
			
			
		if (dist > 250) {
			if (curPt > 1 && array[curPt].release == 0)
			while (array[curPt-1].release == 0 && curPt > 1) {
				curPt--;
			}
			if (curPt == 1 && array[0].release == 0) curPt = 0;
		} else {
			//array[curPt].accuracy = (maxError - dist)*errorPercent;
		}
		
		if(array[curPt].release == 1)
			if (touch.phase == iPhoneTouchPhase.Ended) 
			{
				//if (touchRect.Contains(array[curPt].pt)) 
					if(curPt< steps-1)
						curPt++;
					minPt=curPt;	
			} 
			
		if(array[curPt].release == 2)
			if (touch.phase == iPhoneTouchPhase.Ended) 
			{
				if (touchRect.Contains(array[curPt].pt)) 
					if(curPt< steps-1)
						curPt++;
					minPt=curPt;	
			}
	}

}

class swipeStep{
	var pt : Vector2;
	var release : int;
	var accuracy : float;
	
	function swipeStep(){
		accuracy = 1;
	}
}



//function Update(){
//}