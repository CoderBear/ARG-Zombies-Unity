class SpecialAttackStep{
	var hitZones:		Array;
	var hitFlags:		Array;
	var grafic:			String;
	var delay:			float;
	var gRect:			Rect;
	
	function SpecialAttackStep(){
		hitZones = new Array();
		hitFlags = new Array();
	}
	function loadStep(v: Array){
		//load grafic properties
		var str: String = v[0];
		grafic = str;
				
		str = v[1];
		delay = parseFloat(str);
		
		str = v[2];
		var zV: Array = Regex.Split(str,",");
		var xStr:String = zV[0];
		var yStr:String = zV[1];
		var wStr:String = zV[2];
		var hStr:String = zV[3];
		gRect = Rect(parseInt(xStr),parseInt(yStr),parseInt(wStr),parseInt(hStr));
		
		//load hitZones
		for (var i:int=3;i<v.length;i++){
			//add new hitZone
			str = v[i];
			zV = Regex.Split(str,",");
			xStr = zV[0];
			yStr = zV[1];
			wStr = zV[2];
			hStr = zV[3];
			var zone: Rect = Rect(parseInt(xStr),parseInt(yStr),parseInt(wStr),parseInt(hStr));
			var flag: boolean = false;
			hitZones.Push(zone);
			hitFlags.Push(flag);
		}
	}
	function testHit(xPoz: int, yPoz: int): boolean {
		print(hitZones.length);
		var i:int;
		for (i=0;i<hitZones.length;i++){
			var zone: Rect = hitZones[i];
			if ((zone.xMin<=xPoz)&&(xPoz<=zone.xMax)&&(zone.yMin<=yPoz)&&(yPoz<=zone.yMax)){
				for (var j:int = i+1;j<hitFlags.length;j++)
					if (hitFlags[j]) return false;
				hitFlags[i] = true;
				break;
			}
		}
		return true;
	}
	function nrZonesHitted(): int{
		var nr: int = 0;
		for (var i:int = 0;i<hitFlags.length;i++){
			if (hitFlags[i]) nr++;
		}
		return nr;
	}
}