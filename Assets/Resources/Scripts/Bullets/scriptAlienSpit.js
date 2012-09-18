var moveSpeed : float = 2;

function Start() {
	
	transform.position = Vector3(transform.position.x - 1, 1.5, -7);
	transform.eulerAngles = Vector3(0, 0, 90);
	gameObject.rigidbody.velocity = Vector3(-7,0,0);
	//Destroy(gameObject,1.6);
}

function Update () {
	//transform.position -= Vector3.right * Time.deltaTime * moveSpeed;
}

function OnDisable() {
	scriptAlienSpecial.bSpecialDone = false;
}

function OnCollisionEnter(collision : Collision){
	Destroy(gameObject);
}
