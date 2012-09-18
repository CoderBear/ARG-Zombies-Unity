var shoot : GameObject;
var shootDouble : GameObject;
var special : GameObject;
var temp : GameObject;

static var bSpecialDone : boolean;
static var cShoot : int;

function Start() {
	bSpecialDone = false;
	temp = gameObject.Find("pusca");
}

function Update () {
	if((gameObject.animation["special"].normalizedTime > 0.7)&&(gameObject.animation["special"].normalizedTime < 0.8)&&(!bSpecialDone))
	{
		Instantiate(special, Vector3(temp.transform.position.x-0.3,temp.transform.position.y + 0.65,temp.transform.position.z), transform.rotation);
		bSpecialDone = true;
	}
	
	if((gameObject.animation["hit_1"].normalizedTime > 0.4)&&(gameObject.animation["hit_1"].normalizedTime < 0.5)&& (!bSpecialDone))
	{
		Instantiate(shoot, Vector3(temp.transform.position.x-0.7,temp.transform.position.y + 0.1,temp.transform.position.z), temp.transform.rotation);
		bSpecialDone = true;
	}
	
	if((gameObject.animation["hit_2"].normalizedTime > 0.4)&&(gameObject.animation["hit_2"].normalizedTime < 0.8)&&(!bSpecialDone))
	{
		Instantiate(shootDouble, Vector3(temp.transform.position.x-0.7,temp.transform.position.y + 0.1,temp.transform.position.z), temp.transform.rotation);
		bSpecialDone = true;
	}

	
}