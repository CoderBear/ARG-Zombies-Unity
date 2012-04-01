var CharId	 : int;

function Start(){
	CharId	 = Global.myChar.id;
}

function OnApplicationQuit(){
	
	var login_url = Global.server + "/mmo_iphone/login.php?logout=" + CharId;
	var download = new WWW( login_url);
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
	{
    	Debug.Log( "Retrying" );
   		download = new WWW( login_url);
		yield download;
	}
	
	//while(!download.isDone){}
    var wwwData;
	if(download.error) {
		//print( "Error downloading: " + download.error );
		wwwData = "Error! Could not connect.";
	}else{
		//print(wwwData);
		wwwData = download.text;
	}
}

function Update () {
}