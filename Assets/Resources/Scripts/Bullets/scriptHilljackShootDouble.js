
function Start() {
	transform.eulerAngles = Vector3(0, 0, 90);
	gameObject.rigidbody.velocity = Vector3(-7,0,0);
	//Destroy(gameObject, 1);
}

function Update () {
	//transform.position -= Vector3.right * Time.deltaTime * moveSpeed;
}

function OnCollisionEnter(collision : Collision){
	Destroy(gameObject);
}

function OnDisable() {
	scriptHilljackSpecial.bSpecialDone = false;
}