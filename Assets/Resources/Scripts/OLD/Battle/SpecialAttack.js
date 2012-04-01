// Comment the code, ffs :'(
class SpecialAttack{
	var steps:		Array;
	var curStep:	int;
	var delay:		float;
	var touched:	boolean;
	
	var isRunning:	boolean;
	
	function SpecialAttack(){
		steps = new Array();
	}
	function loadSpecialByID(ID: int){
		var v: Array = new Array();
		switch (ID){
			case 1:
				v = scriptMain.CSVData.special1;
				break;
		}
		//load steps (each line is a step)
		for (var i:int=0;i<v.length;i++){
			var v1: Array = v[i];
			var step: SpecialAttackStep = new SpecialAttackStep();
			step.loadStep(v1);
			steps.Push(step);
		}
	}
	function start(){
		curStep = 0;
		delay = 0;
		isRunning = true;
		touched = false;
		print("---------------");
	}
	function render(){
		
	}
	function OnGUI(){
		var step: SpecialAttackStep = steps[curStep];
		
//		var texG: Texture2D;
//		//if (step.grafic == "quad") texG = scriptMain.tex.texSpecialQuad;
//		//else if (step.grafic == "line1") texG = scriptMain.tex.texSpecialLine1;
//		GUI.DrawTexture(step.gRect,texG, ScaleMode.StretchToFill, true, 1);

		
		//------ test mouse position if pressed
		/*
		if (Input.GetMouseButton(0)) {
			step.testHit(Input.mousePosition.x,320-Input.mousePosition.y);
		}
		*/
		if (Input.touchCount>0){
			var touch : Touch = Input.GetTouch(0);
			if (touch.phase == TouchPhase.Ended){
				if (touched) delay+=step.delay;
			} else 
			if (step.grafic == "quad")
			{
				if ((!touched)&&(touch.phase == TouchPhase.Began)){
					touched = true;
					step.testHit(touch.position.x,320-touch.position.y);
				}
			} 
			else if (step.grafic == "line1"){
				if (touch.phase == TouchPhase.Moved){
					touched = true;
					if(!step.testHit(touch.position.x,320-touch.position.y)){
						delay+=step.delay;
					}
				}
			}
		}
		//-------------------------------------
		//GUI.Label (Rect (0, 0, 100, 20), step.nrZonesHitted()+"/"+step.hitZones.length);
		BattleScript.zH = step.nrZonesHitted();BattleScript.zT = step.hitZones.length;
		delay+=Time.deltaTime;
		if (delay>=step.delay){
			touched = false;
			curStep++;
			delay = 0;
			if (curStep == steps.length){
				isRunning = false;
			}
		}
	}
}