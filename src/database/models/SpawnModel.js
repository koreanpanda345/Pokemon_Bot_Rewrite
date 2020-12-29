// eslint-disable-next-line no-unused-vars
const PokemonModel = require("./PokemonModel");


module.exports = class SpawnModel
{
	constructor(pokemon, channelId)
	{
		/**
		 * @type {PokemonModel}
		 */
		this.pokemon = pokemon;
		/**
		 * @type {string}
		 */
		this.channelId = channelId;
	}
};