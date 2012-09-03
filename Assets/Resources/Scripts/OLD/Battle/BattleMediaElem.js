class BattleMediaElem{
	var actionType:		int;
	var delay:			float;
	var action:			String;
	var started:		boolean;
	var running:		boolean;
	
	var ATT:			Character;
	var TAR:			Character;
	var result:			String;
	///////////////////////////////////////
	function BattleMediaElem(){
	}
	////////////////////////////////////
	function startPlaying(){
		running = true;
		started = true;
	}
	function render(){
		if (!running) return;
		delay-=Time.deltaTime;
		if (delay <=0){
			running = false;
		}
	}
}