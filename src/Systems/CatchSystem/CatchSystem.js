// eslint-disable-next-line no-unused-vars
const PokemonModel = require("../../database/models/PokemonModel");
const { PokeBalls } = require("../../Data/Items");
const PlayerDB = require("../../database/PlayerDB");
const SpawnDB = require("../../database/SpawnDB");
module.exports = class CatchSystem
{

	testCatch(pokeball = "pokeball", pokemon, userId, channelId)
	{
		const playerDB = new PlayerDB(userId);
		const spawnDB = new SpawnDB(channelId);
		pokemon.pokeball = pokeball;
		playerDB.addPokemon(pokemon.pokemon);
		spawnDB.removePokemonFromSpawns(pokemon.pokemon.name);
		return true;
	}

	/**
	 * 
	 * @param {string} pokeball 
	 * @param {PokemonModel} pokemon 
	 */
	tryCatch(pokeball = "pokeball", pokemon)
	{
		// Using Gen 6 Catch Rate
		// Shake Probability Equation: b = 65536 / (255 / a) ^ 0.1875
		// b is a value that determines the probability that a single shake check passes.
		// a is the catch rate after various factors such as weakening the pokemon and using stronger PokeBalls are taken into consideration.
		// Modify Catch rate (Gen 3 - 4)
		// a = ((((3 * HPmax) -(2 * HPcurrent)) * rate * BonusBall)/(3 * HPmax)) * BonusStats
		let catchRate = (((((3 * pokemon.maxHp) - (2 * pokemon.currentHp)) * 1 * PokeBalls[pokeball].base_rate)/ (3 * pokemon.maxHp)) * (pokemon.status === "None" ? 1 : 2));
	}
};