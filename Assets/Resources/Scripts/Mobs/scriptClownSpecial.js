var bomb : GameObject;
var temp : GameObject;
static var bSpecialDone : boolean;
var bShowBomb : boolean;

function Start() {
	bSpecialDone = false;
	bShowBomb = false;
	temp = gameObject.Find("bomba");
	temp.renderer.enabled = false;
}

function Update () {
	if((gameObject.animation["special"].normalizedTime > 0)&&(!bShowBomb)&&(!bSpecialDone)){
		temp.renderer.enabled = true;
		bShowBomb = true;
	}
	if((gameObject.animation["special"].normalizedTime > 0.72)&&(!bSpecialDone))
	{
		Instantiate(bomb, temp.transform.position, temp.transform.rotation);
		bSpecialDone = true;
		temp.renderer.enabled = false;
		bShowBomb = false;
	}
}