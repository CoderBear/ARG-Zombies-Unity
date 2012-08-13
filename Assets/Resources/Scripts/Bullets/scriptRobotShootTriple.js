var moveSpeed : float = 7;

function Start() {
	transform.eulerAngles = Vector3(0, 0, 90);
	gameObject.rigidbody.velocity = Vector3(-7,0,0);
	//Destroy(gameObject, 0.4);
}

function Update () {
	//transform.position -= Vector3.right * Time.deltaTime * moveSpeed;
}

function OnDisable() {
	scriptRobotSpecial.bSpecialDone = false;
}

function OnCollisionEnter(collision : Collision){
	Destroy(gameObject);
}
