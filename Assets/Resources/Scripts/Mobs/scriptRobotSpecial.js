var shoot : GameObject;
var shootTriple : GameObject;
var special : GameObject;
var specialCharge : GameObject;
var temp : GameObject;
static var bSpecialDone : boolean;
static var cShoot : int;

function Start() {
	var clone : GameObject;
	bSpecialDone = false;
	temp = gameObject.Find("robo_main/Bone13");
}

function Update () {
	if((gameObject.animation["special"].normalizedTime > 0.12)&&(gameObject.animation["special"].normalizedTime < 0.15))
	{
	var	clone = Instantiate(specialCharge, Vector3(temp.transform.position.x-0.7,temp.transform.position.y,temp.transform.position.z), temp.transform.rotation);
		Destroy(clone, 1.8);
	}
	if((gameObject.animation["special"].normalizedTime > 0.6)&&(gameObject.animation["special"].normalizedTime < 0.7)&& (!bSpecialDone))
	{		
		Instantiate(special, temp.transform.position, temp.transform.rotation);
		bSpecialDone = true;
	}
	
	if((gameObject.animation["hit_2"].normalizedTime > 0.4)&&(gameObject.animation["hit_2"].normalizedTime < 0.5)&& (!bSpecialDone))
	{
		Instantiate(shoot, Vector3(temp.transform.position.x-0.7,temp.transform.position.y,temp.transform.position.z), temp.transform.rotation);
		bSpecialDone = true;
	}

	if((gameObject.animation["hit_1"].normalizedTime > 0.4)&&(gameObject.animation["hit_1"].normalizedTime < 0.5)&& (!bSpecialDone))
	{
		Instantiate(shootTriple, Vector3(temp.transform.position.x-0.7,temp.transform.position.y,temp.transform.position.z), temp.transform.rotation);
		bSpecialDone = true;
	}
	
	if((gameObject.animation["hit_1"].normalizedTime > 0.5)&&(gameObject.animation["hit_1"].normalizedTime < 0.6)&& (!bSpecialDone))
	{
		Instantiate(shootTriple, Vector3(temp.transform.position.x-0.7,temp.transform.position.y,temp.transform.position.z), temp.transform.rotation);
		bSpecialDone = true;
	}
	
	if((gameObject.animation["hit_1"].normalizedTime > 0.6)&&(gameObject.animation["hit_1"].normalizedTime < 0.7)&& (!bSpecialDone))
	{
		Instantiate(shootTriple, Vector3(temp.transform.position.x-0.7,temp.transform.position.y,temp.transform.position.z), temp.transform.rotation);
		bSpecialDone = true;
	}
}