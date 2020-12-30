/**
 * This is the Pokemon's Model. This is used to construct the Pokemon object, to make it easier to move data around, and have props defined already.
 * @type {PokemonModel}
 */
module.exports = class PokemonModel
{
	constructor(name, nickname, level, exp, shiny, nature, moves, ability, pokerus, canEvolve, canMegaEvolve, item, status, maxHp, currentHp, growthRate, ivs, evs, pokeball = "N/A")
	{
		/**
		 * @type {string}
		 */
		this.name = name;
		/**
		 * @type {string}
		 */
		this.nickname = nickname;
		/**
		 * @type {number}
		 */
		this.level = level;
		/**
		 * @type {number}
		 */
		this.exp = exp;
		/**
		 * @type {boolean}
		 */
		this.shiny = shiny;
		/**
		 * @type {string}
		 */
		this.nature = nature;
		/**
		 * @type {string[]}
		 */
		this.moves = moves;
		/**
		 * @type {{ability: {name: string, url: string}, is_hidden: boolean, slot: number}}
		 */
		this.ability = ability;
		/**
		 * @type {boolean}
		 */
		this.pokerus = pokerus;
		/**
		 * @type {number}
		 */
		// this.expNeededToLevelUp = 0;
		/**
		 * @type {boolean}
		 */
		this.canEvolve = canEvolve;
		/**
		 * @type {boolean}
		 */
		this.canMegaEvolve = canMegaEvolve;
		/**
		 * @type {string}
		 */
		this.item = item;
		/**
		 * @type {string}
		 */
		this.status = status;
		/**
		 * @type {number}
		 */
		this.maxHp = maxHp;
		/**
		 * @type {number}
		 */
		this.currentHp = currentHp;
		/**
		 * @type {string}
		 */
		this.growthRate = growthRate;
		/**
		 * @type {{hp: number, atk: number, def: number, spa: number, spd: number, spe: number}}
		 */
		this.ivs = ivs;

		/**
		 * @type {{hp: number, atk: number, def: number, spa: number, spd: number, spe: number}}
		 */
		this.evs = evs;
		this.pokeball = pokeball; // if pokeball is N/A Then that means it is a wild pokemon. if it is false, then that means that pokemon can't be caught. if it is a string then it should be a pokeball's name.
	}

	/**
	 * Used to heal the pokemon fully
	 */
	heal()
	{
		this.currentHp = this.maxHp;
		this.status = "None";
	}

	/**
	 * Used to get the amount of exp is needed for the pokemon to level up.
	 * @todo Fix this so it doesn't throw the TypeError that it is not a function. 
	 * @todo Make this where the PokemonModel automatically uses this method so we can get the expNeededToLevelUp to added, and be able to be used.
	 */
	/**
	 * @deprecated This doesn't work how i wanted to work. so this will be moved, and be used outside the model.
	 */
	// expNeeded()
	// {
	// 	P.getGrowthRateByName(this.growthRate)
	// 		.then(response =>
	// 		{
	// 			console.debug(response);
	// 			return response.levels[this.level + 1].experience;
	// 		}).catch(error => console.error(error));
	// }
};
