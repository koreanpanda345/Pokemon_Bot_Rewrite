const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
module.exports = class PokemonModel
{
	constructor(name, nickname, level, exp, shiny, nature, moves, ability, pokerus, canEvolve, canMegaEvolve, item, status, maxHp, currentHp, growthRate, ivs, evs)
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
		 * @type {number | "H" | "S"}
		 */
		this.ability = ability;
		/**
		 * @type {boolean}
		 */
		this.pokerus = pokerus;
		/**
		 * @type {number}
		 */
		this.expNeededToLevelUp = this.expNeeded();
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
	}

	heal()
	{
		this.currentHp = this.maxHp;
		this.status = "None";
	}

	expNeeded()
	{
		P.getGrowthRateByName(this.growthRate)
			.then(response =>
			{
				console.debug(response);
				return response.levels[this.level + 1].experience;
			}).catch(error => console.error(error));
	}
};
