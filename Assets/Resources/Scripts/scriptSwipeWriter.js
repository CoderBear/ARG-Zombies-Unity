var particle : GameObject;
var pos : String;
var newPt : Vector2;
var oldPt : Vector2;
var texSquare : Texture2D;

var n : int;
var pts : Vector2[];
var release : int[];

var output : String;
var recording : boolean;

function Start () {
	texSquare = Resources.Load("Menus/Placeholders/used_slot_placeholder", Texture2D);
	n = 0;
	recording = false;
	pts = new Vector2[1000];
	release = new int[1000];
	output = "";
}

function Update () {
    
    if (Input.GetButtonDown ("Fire1")) {
    	recording = !recording;
    	if (recording) {
		   	newPt = Vector2(Input.mousePosition.x, 320 - Input.mousePosition.y);
		   	oldPt = newPt;
		Debug.Log("scriptSwipeWriter:update(): newPt"+newPt);
		   	pts[n] = newPt;
		   	release[n] = 0;
		   	n++;
    	} else {
		   	newPt = Vector2(Input.mousePosition.x, 320 - Input.mousePosition.y);
		   	Debug.Log("scriptSwipeWriter:update(): newPt"+newPt);
		   	if (n>0)
		   	while (Vector2.Distance(pts[n-1], newPt)<11 && n>1) {
		   		n--;
		   	}
		   	if (Vector2.Distance(pts[0], newPt)<11) n = 0;
		   	oldPt = newPt;

		   	pts[n] = newPt;
		   	release[n] = 1;
		   	n++;
    	}
    }

    if (Input.GetButtonDown ("Fire2")) {
    	output = "";
		for (var i = 0; i<n; i++) {
		   	output += release[i] + ", " + pts[i].x + ", " + pts[i].y + "\n";
		}
	   	print(output);
    }
    
    if (recording) {
	   	newPt = Vector2(Input.mousePosition.x, 320 - Input.mousePosition.y);
	   	if (Vector2.Distance(oldPt, newPt) > 10) {
		   	oldPt = newPt;

		   	pts[n] = newPt;
		   	release[n] = 0;
		   	n++;
	   	}
    	pos = "" + Input.mousePosition;
    }
}

function OnGUI () {
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	GUI.Label(Rect(10, 10, 460, 300), pos + "\n" + Vector2.Distance(Vector2(0, 0), newPt) + "\n" + output);
	for (var i: int = 0; i<n; i++) {
		GUI.DrawTexture(Rect(pts[i].x - 3, pts[i].y - 3, 6, 6),
			texSquare, ScaleMode.ScaleToFit, true, 0);
	}
}
