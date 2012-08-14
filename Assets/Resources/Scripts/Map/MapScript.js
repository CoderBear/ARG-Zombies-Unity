var visible:	boolean;
var located: 	boolean;
var ready:		boolean;
var lat: 		float;
var lon: 		float;
var hAcc:		float;
var vAcc:		float;
var zoom:		int;
var mapTex:		Texture;
var dist:		float;

var lblStyle: GUIStyle = new GUIStyle();
lblStyle.normal.textColor = Color.black;
//lblStyle.normal.background = scriptMain.tex.texSpecialQuad;

function Start(){
	visible = false;
	located = false;
	ready = false;
	lat = 0;
	lon = 0;
	hAcc = 0;
	vAcc = 0;
	zoom = 15;
	mapTex = null;
}
//-------------------------------
function startLocationService(){
	// Start service before querying location
	iPhoneSettings.StartLocationServiceUpdates(5,5);
	
	// Wait until service initializes
	var maxWait : int = 20;
	while (iPhoneSettings.locationServiceStatus == LocationServiceStatus.Initializing && maxWait > 0) {
		yield WaitForSeconds(1);
		maxWait--;
	}
	
	// Service didn't initialize in 20 seconds
	if (maxWait < 1) {
		print("Timed out");
		located = false;
		return;
	}
	// User denied access to device location
	if (iPhoneSettings.locationServiceStatus == LocationServiceStatus.Failed) {
		print("User denied access to device location");
		located = false;
		return;
	}
	located = true;
	return;
}
//-----------------------------
function stopLocationService(){
	// Stop service if there is no need to query location updates continously
	iPhoneSettings.StopLocationServiceUpdates();
}
//-----------------------------
function loadMap(){
	print("******** in function load map ***********");
	
	startLocationService();
	
	/*
	var newLat: float;
	var newLon: float;
	if (!located){
		//fake coordinates
		newLat = 44.425168;
		newLon = 26.104589;
	} else {
		newLat = iPhoneInput.lastLocation.latitude;
		newLon = iPhoneInput.lastLocation.longitude;
	
		lat = newLat;
		lon = newLon;
		
		var url = "http://maps.google.com/maps/api/staticmap?center="+lat+","+lon+"&zoom="+zoom+"&size=480x350&sensor=false";
		//print(url);

		var Download : WWW = new WWW (url);
		yield Download; // Wait for download to complete
		mapTex=Download.texture;
		visible = true;
	}
	*/
}
//-------------------------------
function reLoadMap(){
	var url = "http://maps.google.com/maps/api/staticmap?center="+lat+","+lon+"&zoom="+zoom+"&size=480x350&sensor=false";
	var download : WWW = new WWW (url);
	yield download; // Wait for download to complete
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
    	Debug.Log( "Retrying" );
    	download = new WWW (url);
		yield download; // Wait for download to complete
	}
	mapTex=download.texture;
	ready = true;
}
//-------------------------------
function Update(){
	if (iPhoneSettings.locationServiceStatus == LocationServiceStatus.Stopped){
		startLocationService();
	}
	if (!located) return;
	
	var newLat: float;
	var newLon: float;
	
	newLat = iPhoneInput.lastLocation.latitude;
	newLon = iPhoneInput.lastLocation.longitude;
	if ((newLat!=lat)||(newLon!=lon)){
		lat = newLat;
		lon = newLon;
		hAcc = iPhoneInput.lastLocation.horizontalAccuracy;
		vAcc = iPhoneInput.lastLocation.verticalAccuracy;
		reLoadMap();
	}
}
//-------------------------------------
function OnGUI(){
	 var screenScale: float = Screen.width / 480.0;
     var scaledMatrix: Matrix4x4 = Matrix4x4.identity.Scale(Vector3(screenScale,screenScale,screenScale));
     GUI.matrix = scaledMatrix;

	if(GUI.Button(Rect(165,160,150,30),"load map")){
		loadMap();
	}
	if (ready) {
		GUI.DrawTexture(Rect(0,0,480,350),mapTex, ScaleMode.StretchToFill, true, 1);
	}
	GUI.Label (Rect (0, 0, 200, 200), "Located - "+located.ToString()+"\nReady - "+ready.ToString()+"\nLat: "+lat+"\nLon:"+lon+"\nhAcc: "+hAcc+"\nvAcc: "+vAcc,lblStyle);
}