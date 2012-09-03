// BOOM		= 0;
// SKULL	= 1;
// SWOOSH	= 2;

class Effect{
	var effect	: int;
	var gameObj	: GameObject;
	var pos		: Vector3;

	function Effect(){}

	function Effect(inEffect : int, inPos : Vector3){
		switch(inEffect){
			case 0:
				gameObj = GameObject.Instantiate(Resources.Load("Effects/Boom"));
				gameObj.transform.Translate(pos, Space.World);
			break;
			case 1:
				gameObj = GameObject.Instantiate(Resources.Load("Effects/Skull"));
				gameObj.transform.Translate(pos, Space.World);
			break;
			case 2:
				gameObj = GameObject.Instantiate(Resources.Load("Effects/Swoosh"));
				gameObj.transform.Translate(pos, Space.World);
			break;
		}
	}
}