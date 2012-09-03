class SpecialAttacks{
	
var attackname : String;
var attackanimation : String;
var min_damage : int;
var max_damage : int;
var energcost : int;
var target : int;
var max_score_time : float;
var score_lost_per_sec : float;

function SpecialAttacks(){
	attackname = "";
	attackanimation = "";
	min_damage = 0;
	max_damage = 0;
	
}	
	
function SpecialAttacks(values: String[]){
	var dmgrange : String[];
		
	attackname		= values[0];
	attackanimation = values[1];
	
	if(values[2].length > 1){	
		dmgrange = Regex.Split(values[2], "-");
		if(dmgrange.length > 0){
			min_damage 	= 1/3*parseInt(dmgrange[0]);
			max_damage 	= dmgrange.length >1?parseInt(dmgrange[1]):parseInt(dmgrange[0]);
		}
	}
	else
	{
		min_damage 	= 0;
		max_damage 	= 0;
	}
	energcost  = parseInt(values[3]);
	target = parseInt(values[4]);
	max_score_time = parseFloat(values[5]);
	score_lost_per_sec = parseFloat(values[6]);
}

}