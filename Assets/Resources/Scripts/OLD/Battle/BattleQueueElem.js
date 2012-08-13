class BattleQueueElem{
	var character: 	Character;
	var turn:		int;
	
	function BattleQueueElem(){
		
	}
	function setCharacter(c: Character){
		character = c;
		turn = character.computeTurn();
	}
	function reTurn(){
		turn = turn + character.computeTurn();
	}
}