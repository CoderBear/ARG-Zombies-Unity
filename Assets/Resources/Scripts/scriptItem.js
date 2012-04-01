// BACKPACK / INVENTORY
class Item{
	var id : int;
	var name : String;
	var quantity : int;
	var equipped : int;
	var brutality : int;
	var accuracy : int;
	var fortitude : int;
	var attack : int;
	var defense : int;
	var health : int;
	var regen : int;
	var energ : int; //items don't have energy yet.
	var duration : int;
	var repeating : int;
	var slot : int;
	var craft : int;
	var craft_items : String;
	var	weapon_dmg_min : int;
	var weapon_dmg_max : int;
	var weapon_type : String;
	var price : int;
	var level : int;

	//var craft			: boolean;
	var craft_id		: int[];
	var craft_quantity	: int[];
	var available		: boolean;

	var id_auction		: int;
	var id_trade		: int;
	var exp_time		: String;
	var active			: boolean;

	var description		: String;
	var mob_id			: int;
	
	var temporar        : int;    // 1 temporar ( quest specific ),  0 permanent

	function Item(){
		repeating		= 0;
	var	armour_type		= "";
		craft			= 0;
		craft_items		= "";
	 	weapon_type		= "";

		id				= 0;
		name			= "";
		brutality		= 0;
		accuracy		= 0;
		fortitude		= 0;
		attack			= 0;
		defense			= 0;
		health			= 0;
		regen			= 0;
		energ			= 0;
		
		duration		= 0;
		slot			= 0;
		//craft			= false;
		weapon_dmg_min	= 0;
		weapon_dmg_max	= 0;
		price			= 0;
		level			= 0;
		available		= false;
		mob_id			= 0;
		temporar        = 0;
		active          = false;
	}
	
	function Item(itemstr: String[]){
		temporar        = 0;
		active          = false;
		
		var wepdmg : String[];
		id 			= parseInt(itemstr[0]);
		quantity 	= parseInt(itemstr[1]);
		equipped	= parseInt(itemstr[2]);
		name 		= itemstr[3];
		brutality	= parseInt(itemstr[4]);
		accuracy 	= parseInt(itemstr[5]);
		fortitude 	= parseInt(itemstr[6]);
		attack 		= parseInt(itemstr[7]);
		defense 	= parseInt(itemstr[8]);
		health 		= parseInt(itemstr[9]);
		regen 		= parseInt(itemstr[10]);
		duration 	= parseInt(itemstr[11]);
		slot 		= parseInt(itemstr[12]);
		craft 		= parseInt(itemstr[13]);
		craft_items = itemstr[14];
		if((slot == 6) || (slot == 1)){
			wepdmg = Regex.Split(itemstr[15], "-");
			weapon_dmg_min 	= parseInt(wepdmg[0]);
			weapon_dmg_max 	= wepdmg.length>1 ? parseInt(wepdmg[1]) : parseInt(wepdmg[0]);
			weapon_type	= wepdmg.length > 2 ? wepdmg[2] :"M";
		}
		try
		{	
			price = parseInt(itemstr[16]);
		}
		catch( ex )
		{
			price = 0;
		}
		level 		= parseInt(itemstr[17]);
		if (itemstr.length > 18) 
		{
			mob_id = parseInt(itemstr[18]);
			if ( itemstr.length > 19 )
				temporar = parseInt(itemstr[19]);
		}
	}

	function Item2(aStr: String){
		var values	: String[] = Regex.Split(aStr, ":");
		var values2	: String[];
		var values3	: String[];

		id				= parseInt(values[0]);
		name			= values[1];
		brutality		= parseInt(values[2]);
		accuracy		= parseInt(values[3]);
		fortitude		= parseInt(values[4]);
		attack			= parseInt(values[5]);
		defense			= parseInt(values[6]);
		health			= parseInt(values[7]);
		regen			= parseInt(values[8]);
		duration		= parseInt(values[9]);
		slot			= parseInt(values[10]);
		//craft			= values[11][0] == "1" ? true : false;
		
		values2			= Regex.Split(values[12], ",");
		craft_id		= new int[values2.length];
		craft_quantity	= new int[values2.length];

		for(var i : int = 0; i<values2.length; i++){
			values3				= Regex.Split(values2[i], ";");
			craft_id[i]			= (parseInt(values3[0]));
			craft_quantity[i]	= (parseInt(values3[1]));
		}
		
		values2			= Regex.Split(values[13], "-");
		weapon_dmg_min	= parseInt(values2[0]);
		weapon_dmg_max	= values2.length>1 ? parseInt(values2[1]) : parseInt(values2[0]);
		
		price			= parseInt(values[14]);
		level			= parseInt(values[15]);
		available		= false;
	}

	function Item3(aStr : String){
		var values	: String[] = Regex.Split(aStr, ";");
		var values2	: String[];

		id_auction		= parseInt(values[0]);
		id				= parseInt(values[1]);
		name			= values[2];
		brutality		= parseInt(values[3]);
		accuracy		= parseInt(values[4]);
		fortitude		= parseInt(values[5]);
		attack			= parseInt(values[6]);
		defense			= parseInt(values[7]);
		health			= parseInt(values[8]);
		regen			= parseInt(values[9]);
		duration		= parseInt(values[10]);

		values2			= Regex.Split(values[11], "-");
		weapon_dmg_min	= parseInt(values2[0]);
		weapon_dmg_max	= values2.length>1 ? parseInt(values2[1]) : parseInt(values2[0]);

		level			= parseInt(values[12]);
		price			= parseInt(values[13]);
		quantity		= parseInt(values[14]);
		exp_time		= values[15];
		//active			= (values[16]==1 ? true : false);
	}
	
	function Item3(aStr : String, overload : int){
		var values	: String[] = Regex.Split(aStr, ";");

		id_auction		= parseInt(values[0]);
		id				= parseInt(values[1]);
		name			= values[2];
		quantity		= parseInt(values[3]);
		price			= parseInt(values[4]);
		exp_time		= values[5];
	}
	
	function Item4(aStr : String){
		var values	: String[] = Regex.Split(aStr, "~!");
		var values2	: String[];
		
		id				= parseInt(values[0]);
		name			= values[1];
		brutality		= parseInt(values[2]);
		accuracy		= parseInt(values[3]);
		fortitude		= parseInt(values[4]);
		attack			= parseInt(values[5]);
		defense			= parseInt(values[6]);
		health			= parseInt(values[7]);
		regen			= parseInt(values[8]);

		values2			= Regex.Split(values[9], "-");
		if(values2[0].length > 0){
			weapon_dmg_min	= parseInt(values2[0]);
			weapon_dmg_max	= values2.length>1 ? parseInt(values2[1]) : parseInt(values2[0]);
		}

		price			= parseInt(values[10]);
		level			= parseInt(values[11]);
		description		= values[12];
	}
	
	function Item4(aStr : String[]){
		id_trade	= parseInt(aStr[0]);
		id			= parseInt(aStr[1]);
		quantity	= parseInt(aStr[2]);
	}
	
	function initTrade(aStr : String[]){
		id_trade	= parseInt(aStr[0]);
		id			= parseInt(aStr[1]);
		quantity	= parseInt(aStr[2]);
	}

}

// CRAFTING
class Item2{
	var id				: int;
	var name			: String;
	var brutality		: int;
	var accuracy		: int;
	var fortitude		: int;
	var attack			: int;
	var defense			: int;
	var health			: int;
	var regen			: int;
	var duration		: int;
	var slot			: int;
	//var craft			: boolean;
	var craft_id		: int[];
	var craft_quantity	: int[];
	var weapon_dmg_min	: int;
	var weapon_dmg_max	: int;
	var price			: int;
	var level			: int;
	var available		: boolean;
	var craft_type 		: int;
	
	function Item2(){
		id				= 0;
		name			= "";
		brutality		= 0;
		accuracy		= 0;
		fortitude		= 0;
		attack			= 0;
		defense			= 0;
		health			= 0;
		regen			= 0;
		duration		= 0;
		slot			= 0;
		//craft			= false;
		weapon_dmg_min	= 0;
		weapon_dmg_max	= 0;
		price			= 0;
		level			= 0;
		available		= false;
		craft_type		= 0;
	}
	
	function Item2(aStr: String){
		var values	: String[] = Regex.Split(aStr, ":");
		var values2	: String[];
		var values3	: String[];

		id				= parseInt(values[0]);
		name			= values[1];
		brutality		= parseInt(values[2]);
		accuracy		= parseInt(values[3]);
		fortitude		= parseInt(values[4]);
		attack			= parseInt(values[5]);
		defense			= parseInt(values[6]);
		health			= parseInt(values[7]);
		regen			= parseInt(values[8]);
		duration		= parseInt(values[9]);
		slot			= parseInt(values[10]);
		//craft			= values[11][0] == "1" ? true : false;
		
		values2			= Regex.Split(values[12], ",");
		craft_id		= new int[values2.length];
		craft_quantity	= new int[values2.length];

		for(var i : int = 0; i<values2.length; i++){
			values3				= Regex.Split(values2[i], ";");
			craft_id[i]			= (parseInt(values3[0]));
			craft_quantity[i]	= (parseInt(values3[1]));
		}
		
		values2			= Regex.Split(values[13], "-");
		weapon_dmg_min	= parseInt(values2[0]);
		weapon_dmg_max	= values2.length>1 ? parseInt(values2[1]) : parseInt(values2[0]);
		
		price			= parseInt(values[14]);
		level			= parseInt(values[15]);
		available		= false;
		
		switch( slot )
		{
			case 6:
				craft_type = CommonConstants.CRAFT_WEAPON;
			break;
			case 1:;
			case 2:;
			case 3:;
			case 4:;
			case 5:
				craft_type = CommonConstants.CRAFT_ARMOR;
			break;			
		}
		
		if( craft_type != 0 ) return; //we already found the craft type.
		
		if( brutality != 0 || accuracy != 0 || fortitude != 0 || attack != 0 || defense != 0 || health != 0 || regen !=0 )
		{
			//we have a consumable;
			craft_type = CommonConstants.CRAFT_CONSUMABLE;
			return;
		}		
		//only summon left :D
		craft_type = CommonConstants.CRAFT_SUMMON;	
	}
}

// AUCTION
class Item3{
	var id_auction		: int;
	var id				: int;
	var name			: String;
	var brutality		: int;
	var accuracy		: int;
	var fortitude		: int;
	var attack			: int;
	var defense			: int;
	var health			: int;
	var regen			: int;
	var duration		: int;
	var weapon_dmg_min	: int;
	var weapon_dmg_max	: int;
	var level			: int;
	var price			: int;
	var quantity		: int;
	var exp_time		: String;
	var active			: boolean;
	
	function Item3(aStr : String){
		var values	: String[] = Regex.Split(aStr, ";");
		var values2	: String[];

		id_auction		= parseInt(values[0]);
		id				= parseInt(values[1]);
		name			= values[2];
		brutality		= parseInt(values[3]);
		accuracy		= parseInt(values[4]);
		fortitude		= parseInt(values[5]);
		attack			= parseInt(values[6]);
		defense			= parseInt(values[7]);
		health			= parseInt(values[8]);
		regen			= parseInt(values[9]);
		duration		= parseInt(values[10]);

		values2			= Regex.Split(values[11], "-");
		weapon_dmg_min	= parseInt(values2[0]);
		weapon_dmg_max	= values2.length>1 ? parseInt(values2[1]) : parseInt(values2[0]);

		level			= parseInt(values[12]);
		price			= parseInt(values[13]);
		quantity		= parseInt(values[14]);
		exp_time		= values[15];
		//active			= (values[16]==1 ? true : false);
	}
	
	function Item3(aStr : String, overload : int){
	   //overload????
		var values	: String[] = Regex.Split(aStr, ";");

		id_auction		= parseInt(values[0]);
		id				= parseInt(values[1]);
		name			= values[2];
		quantity		= parseInt(values[3]);
		price			= parseInt(values[4]);
		exp_time		= values[5];
	}
}

// TRADE
class Item4{
	var id				: int;
	var name			: String;
	var brutality		: int;
	var accuracy		: int;
	var fortitude		: int;
	var attack			: int;
	var defense			: int;
	var health			: int;
	var regen			: int;
	var weapon_dmg_min	: int;
	var weapon_dmg_max	: int;
	var price			: int;
	var level			: int;
	var description		: String;
	
	var id_trade		: int;
	var quantity		: int;
	
	function Item4(aStr : String){
		var values	: String[] = Regex.Split(aStr, "~!");
		var values2	: String[];

		id				= parseInt(values[0]);
		name			= values[1];
		brutality		= parseInt(values[2]);
		accuracy		= parseInt(values[3]);
		fortitude		= parseInt(values[4]);
		attack			= parseInt(values[5]);
		defense			= parseInt(values[6]);
		health			= parseInt(values[7]);
		regen			= parseInt(values[8]);

		values2			= Regex.Split(values[9], "-");
		if(values2[0].length > 0){
			weapon_dmg_min	= parseInt(values2[0]);
			weapon_dmg_max	= values2.length>1 ? parseInt(values2[1]) : parseInt(values2[0]);
		}

		price			= parseInt(values[10]);
		level			= parseInt(values[11]);
		description		= values[12];
	}
	
	function Item4(aStr : String[]){
		id_trade	= parseInt(aStr[0]);
		id			= parseInt(aStr[1]);
		quantity	= parseInt(aStr[2]);
	}
	
	function initTrade(aStr : String[]){
		id_trade	= parseInt(aStr[0]);
		id			= parseInt(aStr[1]);
		quantity	= parseInt(aStr[2]);
	}
}