var curveX : AnimationCurve;

function Start(){
	curveX = AnimationCurve.Linear(0,0.3,2,2.5);
	gameObject.animation.CrossFade("walk");
	Destroy(gameObject,2);
}

function OnDisable(){
	Global.spawnInPosition = true;
}

function Update () {
	transform.position.x = curveX.Evaluate(Time.time);
}