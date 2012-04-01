class CSV{
	var splitter : String = ";";
	
	var PCProgression:	Array;
	var NPCs:			Array;
	var equips:			Array;
	var skills:			Array;
	
	var special1:		Array;
	
	var ret:			Array;
	var lineByID:		Array;
	
	function CSV(){}
	
	function loadFiles(){
		loadFile("files/characterProgression");PCProgression = ret;
		loadFile("files/enemyList");NPCs = ret;
		loadFile("files/equips");equips = ret;
		loadFile("files/skills");skills = ret;
		
		loadFile("files/special1");special1 = ret;
	}
	function loadFile(path: String){
		var l : int = 0;
		var file : TXTStream = new TXTStream();
		file.open(path);
		file.readLine();
		ret = new Array();
		while(!file.eof()){
			var line : String = file.readLine();
			var lineArray : Array = Regex.Split(line,splitter);
			ret[l] = lineArray;
			l++;
		}
		file.close();
	}
	function getLineByID(ID: int, container: Array){
		lineByID = null;
		for (var i: int = 0;i<container.length;i++){
			var newLine : Array = container[i];
			var str: String = newLine[0];
			var newID : int = parseInt(str);
			if (ID == newID) lineByID = newLine;
		}
	}
	function parseString(str: String){
		ret = new Array();
		var lines: Array = Regex.Split(str,"\n");
		for (var i: int = 0;i<lines.length;i++){
			var lineStr: String = lines[i];
			var line: Array = Regex.Split(lineStr,splitter);
			ret.Push(line);
		}
	}
}