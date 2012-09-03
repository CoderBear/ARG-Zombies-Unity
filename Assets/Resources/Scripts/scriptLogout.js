var CharId	 : int;

function Start()
{
	CharId	 = Global.myChar.id;
}
 function SetLastTimeOnline()
 {		
 	scriptMain.firstLog = 0;
 	var	wwwData;
	var postData : WWWForm = new WWWForm();
	postData.AddField("id", Global.myChar.id);
		
	if (Global.Hp_incercare > 1)	
			postData.AddField("hp", Global.Hp_incercare +"");
	else postData.AddField("hp", Global.myChar.HP +"");
	
	var login_url = Global.server + "/mmo_iphone/set_logout.php";
	var download = new WWW(login_url, postData);
	yield download;
	while (download.error && download.error.ToString().Contains("Resolving host timed out"))
		{
			Debug.Log( "Retrying" );
			download = new WWW(login_url, postData);
			yield download;
		}
	while (download.error && download.error.ToString().Contains("Resolving host timed out"));
	if(download.error) 
		{
			print( "Error downloading: " + download.error );
			wwwData = "Error! Could not connect.";
			return;
		}
	else
		{
			wwwData = download.text;
			print ("A mers!" + Global.myChar.id);
		}
 }
 
function OnApplicationQuit()
{
	SetLastTimeOnline();
	var login_url = Global.server + "/mmo_iphone/login.php?logout=" + CharId;
	var download = new WWW( login_url);
	yield download;
	while( download.error && download.error.ToString().Contains("Resolving host timed out") )
		{
	    	Debug.Log( "Retrying" );
	   		download = new WWW( login_url);
			yield download;
		}

    var wwwData;
	if(download.error) 
	{
		wwwData = "Error! Could not connect.";
	}
	else
	{
		wwwData = download.text;
	}
}

function Update ()
{

}