class TXTStream{
	var file : 	TextAsset;
	var poz: 	int;
	
	function open(path: String){
		file = Resources.Load(path,TextAsset);
		poz = 0;
	}
	function readLine(): String{
		var line : String = "";
		while((file.text[poz] != "\n")&&(poz != file.text.Length)){
			line += file.text[poz];
			poz++;
		}
		poz++;
		return line;
	}
	function eof(): boolean {
		if (poz >= file.text.Length){
			return true;
		}
		return false;
	}
	function close(){
		//TextAsset.Destroy(file);
	}
}