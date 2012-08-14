var boom : GameObject;
var start : float; 
var drop : boolean;

function Start() {
	transform.eulerAngles = Vector3(90,180,0);
	gameObject.rigidbody.velocity = Vector3(-3,1.5,0);
	start = Time.time + 0.5;
	drop = false;
}

function Update () {
	if((Time.time > start)&&(!drop)){
		//gameObject.rigidbody.AddForce(0,-15,0);
		gameObject.rigidbody.velocity = Vector3(-3,0,0);
		drop = true;
		start = Time.time + 0.2;
	}
	if((Time.time > start)&&(drop)){
		//gameObject.rigidbody.AddForce(0,-15,0);
		gameObject.rigidbody.velocity = Vector3(-3,-1.5,0);
		drop = false;
		start = Time.time + 10;
	}
}

function OnCollisionEnter(collision : Collision){
	Destroy(gameObject);
}

function OnDisable(){
	print("boom");
	Instantiate(boom, transform.position, transform.rotation);	
	scriptClownSpecial.bSpecialDone = false;
}