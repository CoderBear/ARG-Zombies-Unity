var DELAY_ELEM:			float = 0;

var TYPE_ANIMATION: 	int = 0;
var TYPE_SOUND:			int = 1;
var TYPE_FLAG: 			int = 2;

var DELAY_ANIMATION:	float = 4;
var DELAY_SOUND:		float = 0;
var DELAY_FLAG:			float = 0;

class BattleMediaQueueElem{
	var queue:				Array;
	var running:			boolean;
	var started:			boolean;
	
	var delay:				float;
	
	/////////////////////////////////////////////////////
	function BattleMediaQueueElem(){
	}
	function init(){
		queue = new Array();
		running = false;
		started = false;
		delay = DELAY_ELEM;
	}
	function addAction(tip: int, str: String){
		var newAction: BattleMediaElem = new BattleMediaElem();
		switch (tip){
			case TYPE_ANIMATION:
				newAction.actionType = TYPE_ANIMATION;
				newAction.delay = DELAY_ANIMATION;
				break;
			case TYPE_SOUND:
				newAction.actionType = TYPE_SOUND;
				newAction.delay = DELAY_SOUND;
				break;
			case TYPE_FLAG:
				newAction.actionType = TYPE_FLAG;
				newAction.delay = DELAY_FLAG;
				break;
		}
		newAction.action = str;
		newAction.started = false;
		newAction.running = false;
		queue.Push(newAction);
	}
	function addAnimation(player1: Character, player2: Character, action: String, result: String){
		var newAction: BattleMediaElem = new BattleMediaElem();
		newAction.actionType = TYPE_ANIMATION;
		newAction.delay = DELAY_ANIMATION;
		newAction.ATT = player1;
		newAction.TAR = player2;
		newAction.result = result;
		newAction.action = action;
		newAction.started = false;
		newAction.running = false;
		queue.Push(newAction);
	}
	///////////////////////////////////////////
	function startPlaying(){
		running = true;
		started = true;
		
		for (var i:int=0;i<queue.length;i++){
			var elem: BattleMediaElem = queue[i];
			elem.startPlaying();
		}
	}
	function render(){
		if (!running) return;
		
		var stillRunning: boolean = false;
		var i:int = 0;
		while (i<queue.length){
			var elem: BattleMediaElem = queue[i];
			
			if (elem.running){
				elem.render();
				stillRunning = true;
			} else if (elem.started){
				queue.RemoveAt(i);
				i--;
			}
			i++;
		}
		if (!stillRunning){
			if (delay <= 0) running = false;
			else delay -= Time.deltaTime;
		}
	}
}