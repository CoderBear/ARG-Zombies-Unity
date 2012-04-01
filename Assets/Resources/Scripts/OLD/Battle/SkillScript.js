class Skill{
	var ID: 		int;
	var name:		String;
	var reqWpn:		int;
	var cost:	 	int;
	var clas:		String;
	var nature:		String;
	var target:		String;
	
	var hitProc:	int;
	var hitTerm1:	String;
	var hitTerm2:	String;
	var hitMult:	float;
	
	var conds:		Array;
	
	function Skill(){
	}
	function loadFromID (newID: int){
		scriptMain.CSVData.getLineByID(newID,scriptMain.CSVData.skills);
		var stats: Array = scriptMain.CSVData.lineByID;
		var str: String;
		
		ID = newID;
		name = stats[1];
		str = stats[2];cost = parseInt(str);
		clas = stats[3];
		nature = stats[4];
		target = stats[5];
		//hit chance
		var hitStr: String = stats[6];
		var hitComp : Array = Regex.Split(hitStr,"+");
		str = hitComp[0];
		hitProc = parseInt(str);
		if (hitComp.length > 1){
			str = hitComp[1];
			var terms: Array = Regex.Split(str,"*");
			if (terms.length > 1) str = terms[1];
			else str = "1";
			hitMult = parseInt(str);
			str = terms[0];
			str = str.Substring(1,str.length-1);
			var terms2: Array = Regex.Split(str,"-");
			hitTerm1 = terms2[0];
			hitTerm2 = terms2[1];
		}
	}
	function printStats(){
		var str: String = ID+","+name+","+cost+","+clas+","+nature+","+target+","+hitProc;
		if (hitProc < 100) str += "+("+hitTerm1+"-"+hitTerm2+")*"+hitMult;
		print(str);
	}
}