const { randomInt } = require("../../modules/Utils");
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const SpawnModel = require("../../database/models/SpawnModel");
const PokemonModel = require("../../database/models/PokemonModel");
const {natures} = require("../../Data/Pokemon");
const SpawnDB = require("../../database/SpawnDB");

module.exports = class SpawnSystem
{
	constructor(channelId)
	{
		/**
		 * @type {string}
		 */
		this.channelId = channelId;
	}

	spawnChance()
	{
		const max = 30;
		const min = 1;
		return randomInt(min, max) === randomInt(min, max);
	}
	/**
	 * @returns {SpawnModel}
	 */
	async spawnPokemon()
	{
		const natDexId = randomInt(1, 898);
		let result = await new Promise((resolve, reject) =>
		{
			P.getPokemonByName(natDexId)
				.then((response) =>
				{
					console.debug(response);
					const model = new SpawnModel(
						new PokemonModel(
							response.name,
							"",
							randomInt(1, 60),
							0,
							this.shinyRates(false, false),
							natures[randomInt(0, natures.length)],
							["Tackle"],
							response.abilities[randomInt(0, response.abilities.length)],
							false,
							false,
							false,
							null,
							"None",
							0,
							0,
							response.growth_rate,
							{
								hp: randomInt(0, 31),
								atk: randomInt(0, 31),
								def: randomInt(0, 31),
								spa: randomInt(0, 31),
								spd: randomInt(0, 31),
								spe: randomInt(0, 31)
							},
							{
								hp: 0,
								atk: 0,
								def: 0,
								spa: 0,
								spd: 0,
								spe: 0
							}

						), this.channelId);
					const db = new SpawnDB(this.channelId);
					db.addPokemonToSpawn(model);
					resolve(model);
				})
				.catch(error => 
				{
					console.error(error);
					reject(error);
				});
		});

		return result;
	}
	/**
	 * 
	 * @param {boolean} masuda If two pokemon are from different languages
	 * @param {boolean} shinyCharm if the user has a shiny charm.
	 */
	shinyRates(masuda = false, shinyCharm = false)
	{
		if(masuda && !shinyCharm)
			return [23, 56, 4000, 2, 560, 30].includes(randomInt(1, 4096));
		else if(shinyCharm && !masuda)
			return [23, 56].includes(randomInt(1, 4096));
		else
			return randomInt(1, 4096) === 23;
	}
};