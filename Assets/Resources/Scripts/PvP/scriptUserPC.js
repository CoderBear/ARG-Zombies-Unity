var id		: int;				// id in the database
var Nick	: String;			// Nickname
var User	: String;			// Username
var Difficulty : int;			// difficutly (easy, medium, hard, insane)
	
var posH	: Vector3;			// where char is displayed;
var pos1	: Vector3;			// first position to go to, this is the character's home
var pos2	: Vector3;			// second position to go to, this is where the character will attack
var role	: int;				// role of the character, can be: NONE, PC, MOB1, MOB2, MOB3
		
var BRT		: int;				// brutatlity
var ACC		: int;				// accuracy
var FORT	: int;				// fortidude
var ATK		: float;			// attack
var DEF		: int;				// defense
var HP		: int;				// life of the character
var ENRG	: int;				// mana/energy of the character
	
var REGEN	: float;			// extra regen
var DMG		: float;			// extra damage
var CTH		: float;			// chance to hit the mob
var EVASION	: float;			// extra evasion
static var LVL		: int;				// level
var EXP		: int;				// experience
	
var Money : int;				// the money char has
	
var Hands	: int;				// item id, armour to be used on hands
var Helmet	: int;				// item id, armour to be used on the helmet
var Chest	: int;				// item id, armour to be used on the chest
var Pants	: int;				// item id, armour to be used on pants
var Shoes	: int;				// item id, armour to be used on shoes
var Weapon	: int;				// item id, weapom wielded*/
	
var WMinD 	: int;
var WMaxD 	: int;
var WepType : int;
	
var AvatarId : String;				//id of avatar to use
	
function Start() {
	transform.eulerAngles = Vector3(0,90,0);
}

function Update () {
}