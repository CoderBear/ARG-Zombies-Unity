class Equip{
	var ID			:int;
	var type		:String;
	var name		:String;
	var val			:int;
	var valMAX		:int;
	var reqLVL		:int;
	
	var multAGI		:int;
	var multDEF		:int;
	var multATT		:int;
	var multEVA		:int;
	
	function Equip(){
		
	}
	function loadEquipWithID(newID: int){
		scriptMain.CSVData.getLineByID(newID,scriptMain.CSVData.equips);
		var stats: Array = scriptMain.CSVData.lineByID;
		var str: String;
		
		ID = newID;
		
		str = stats[1];
		name = str;
		
		str = stats[2];
		type = str;
		
		str = stats[3];
		val = parseInt(str);
		
		str = stats[4];
		valMAX = parseInt(str);
		
		str = stats[5];
		reqLVL = parseInt(str);
		
		str = stats[6];
		multAGI = parseFloat(str);
		
		str = stats[7];
		multDEF = parseFloat(str);
		
		str = stats[8];
		multATT = parseFloat(str);
		
		str = stats[9];
		multEVA = parseFloat(str);
	}
	function printStats(){
		print(ID+" "+name+" "+type+" "+val+" "+valMAX+" "+reqLVL+" "+multAGI+" "+multDEF+" "+multATT);
	}
}
class Potion{
	var ID			:int;
	var name		:String;
	var val			:int;
	var type		:String;
}