
function Update(){
}

var n : int = 0;

function OnGUI(){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	if(GUI.Button(Rect(10, 10, 100, 20), "Log")){
		Log.add("Log message " + n + ".");
		n++;
	}
}