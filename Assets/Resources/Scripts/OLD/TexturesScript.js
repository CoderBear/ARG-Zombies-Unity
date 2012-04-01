class Texturi{
	var texSpecialQuad: 	Texture2D;
	var texSpecialLine1: 	Texture2D;
	
	function Texturi(){
	}
	function loadTextures(){
		texSpecialQuad = new Texture2D(50,50);
		var imageTextAsset : TextAsset = Resources.Load("Textures/specialQuad",TextAsset);
		texSpecialQuad.LoadImage(imageTextAsset.bytes);
		GameObject.DontDestroyOnLoad(texSpecialQuad);
		
		texSpecialLine1 = new Texture2D(300,50);
		imageTextAsset = Resources.Load("Textures/specialLine1",TextAsset);
		texSpecialLine1.LoadImage(imageTextAsset.bytes);
		GameObject.DontDestroyOnLoad(texSpecialLine1);
	}
}