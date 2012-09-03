var spit : GameObject;
static var bSpecialDone : boolean;

function Start() {
	bSpecialDone = false;
}

function Update () {
	if((gameObject.animation["special"].normalizedTime > 0.73)&& (!bSpecialDone))
	{
		Instantiate(spit, transform.position, transform.rotation);
		bSpecialDone = true;
	}

}