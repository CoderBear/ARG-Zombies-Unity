var texLoading1 :Texture2D;
var texLoading2 :Texture2D;
var texLoading3 :Texture2D;
var texOwen :Texture2D;
var texDavid :Texture2D;
static var nrOfMobs :int;

function Start(){
Resources.UnloadUnusedAssets();
if(scriptMissions.clearingBuildings)
    if(nrOfMobs<5)
    {
      Global.theScene = 2;
      Debug.Log("AAAAAAAAAAAAAAAA");
      }
      else { 
             nrOfMobs = 0;
             Global.theScene = 3;
             Application.LoadLevel("sceneMap");
            }
if(Global.theScene == 3){ 
    
    Application.LoadLevel("sceneMap");
    Debug.Log("LOADING SCRIPT");

}
else if(Global.theScene ==2){
    Application.LoadLevel("sceneBattle");
    
    }
    
    else if(Global.theScene ==4){
    Application.LoadLevel("scenePvP");
    
    }
}

function Update () {

}


function OnGUI(){
Debug.Log("Global.CES e "+Global.CES);
/*if(Global.CES!=0){
    if(Global.CES == 1) GUI.DrawTexture (Rect(0,0,480,320), texOwen, ScaleMode.StretchToFill, true, 1);
    else if(Global.CES ==2) GUI.DrawTexture (Rect(0,0,480,320), texDavid, ScaleMode.StretchToFill, true, 1);
    
    
}else 
*/
if(Global.randomNumber <= 0.33)
		GUI.DrawTexture (Rect(0,0,480,320), texLoading1, ScaleMode.StretchToFill, true, 1);
        else if(Global.randomNumber > 0.33 && Global.randomNumber <= 0.66)
            GUI.DrawTexture (Rect(0,0,480,320), texLoading2, ScaleMode.StretchToFill, true, 1);
            else GUI.DrawTexture (Rect(0,0,480,320), texLoading3, ScaleMode.StretchToFill, true, 1);
            
}