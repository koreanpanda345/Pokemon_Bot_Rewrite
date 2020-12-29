// eslint-disable-next-line no-unused-vars
const PokemonModel = require("./PokemonModel");
// eslint-disable-next-line no-unused-vars
const ItemModel = require("./ItemModel");

/**
 * This is the Player's Model. This is used to construct the player object to be used.
 * @type {PlayerModel}
 */
module.exports = class PlayerModel
{
	constructor (userId, credits, caughtPokemon, team, pc, bag)
	{
		/**
		 * @type {string}
		 */
		this.userId = userId;
		/**
		 * @type {number}
		 */
		this.credits = credits;
		/**
		 * @type {number}
		 */
		this.caughtPokemon = caughtPokemon;
		/**
		 * @type {PokemonModel[]}
		 */
		this.team = team;
		/**
		 * @type {PokemonModel[]}
		 */
		this.pc = pc;
		/**
		 * @type {ItemModel[]}
		 */
		this.bag = bag;
	}
};
