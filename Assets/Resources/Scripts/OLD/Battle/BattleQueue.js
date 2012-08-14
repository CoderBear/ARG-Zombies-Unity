class BattleQueue{
	var queue:		Array;
	////////////////////////
	function BattleQueue(){
		
	}
	function setCharacters(c: Character, enemies: Array){
		queue = new Array();
		var nr: int = 0;
		var elem: BattleQueueElem = new BattleQueueElem();
		elem.setCharacter(c);
		queue[nr] = elem;
		for (var i:int=0;i<enemies.length;i++){
			var e: Character = enemies[i];
			elem = new BattleQueueElem();
			elem.setCharacter(e);
			nr++;
			queue[nr] = elem;
		}
		orderQueue();
	}
	function orderQueue(){
		for (var i:int = 0;i<queue.length-1;i++){
			for (var j:int = i+1;j<queue.length;j++){
				var aux1: BattleQueueElem = queue[i];
				var aux2: BattleQueueElem = queue[j];
				if (aux1.turn > aux2.turn){
					queue[i] = aux2;
					queue[j] = aux1;
				}
			}
		}
	}
	function reOrderQueue(){
		var aux1: BattleQueueElem = queue[0];
		var aux2: BattleQueueElem = queue[1];
		aux1.reTurn();
		queue[0] = aux2;
		queue[1] = aux1;
		
		var i:int = 1;
		for (var j:int = i+1;j<queue.length;i++){
			var aux11: BattleQueueElem = queue[i];
			var aux21: BattleQueueElem = queue[j];
			if (aux11.turn >= aux21.turn){
				queue[i] = aux21;
				queue[j] = aux11;
				i = j;
			}
		}
	}
	function printQueue(){
		for (var i:int = 0;i<queue.length;i++){
			var aux: BattleQueueElem = queue[i];
			var c:Character = aux.character;
			print(i+"-"+c.name+"-"+aux.turn);
		}
	}
}