var uvAnimationTileX : int = 4; //Here you can place the number of columns of your sheet.

var uvAnimationTileY : int = 1; //Here you can place the number of rows of your sheet.
                          
var framesPerSecond : float = 10.0;

var curveY : AnimationCurve;

function Start(){
	Destroy(gameObject, 4);
	curveY = AnimationCurve.Linear(0,1.2,3.9,2.8);
}

function Update () {

    // Calculate index
    var index : int = Time.time * framesPerSecond;
    // repeat when exhausting all frames
    index = index % (uvAnimationTileX * uvAnimationTileY);
   
    // Size of every tile
    var size = Vector2 (1.0 / uvAnimationTileX, 1.0 / uvAnimationTileY);
   
    // split into horizontal and vertical index
    var uIndex = index % uvAnimationTileX;
    var vIndex = index / uvAnimationTileX;

    // build offset
    // v coordinate is the bottom of the image in opengl so we need to invert.
    var offset = Vector2 (uIndex * size.x, 1.0 - size.y - vIndex * size.y);
   
    renderer.material.SetTextureOffset ("_MainTex", offset);
    renderer.material.SetTextureScale ("_MainTex", size);
    transform.position.y = curveY.Evaluate(Time.time);
}