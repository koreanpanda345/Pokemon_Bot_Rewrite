const db = require("quick.db");
const PlayerModel = require("./models/PlayerModel");
// eslint-disable-next-line no-unused-vars
const PokemonModel = require("./models/PokemonModel");
// eslint-disable-next-line no-unused-vars
const ItemModel = require("./models/ItemModel");
/**
 * This is the Player's Database Class. This class is responsible for anything to do with the player's accounts.
 * @requires {db} - This the database package that will be used for now. Later on, before deployment, there will be a switch in dbs to a remote db. this is way there is a class, so it makes the switch easier to do.
 * @type {PlayerDB}
 */
module.exports = class PlayerDB
{
	/**
	 *
	 * @param userId - the user's id
	 */
	constructor(userId)
	{
		/**
		 * @type {string}
		 */
		this.userId = userId;
	}

	/**
	 * Checks to see if the user has a pokemon or not.
	 * @returns {boolean} - If the user has a pokemon.
	 */
	hasPokemon()
	{
		if(!db.has(`player_${this.userId}_account`)) return false;
		const account = db.get(`player_${this.userId}_account`);
		return account.team.length !== 0;

	}

	/**
	 * Create user's account.
	 */
	createAccount()
	{
		if(db.has(`player_${this.userId}_account`)) return;
		const account = new PlayerModel(this.userId, 200, 0, [], [], []);

		db.set(`player_${this.userId}_account`, {userId: account.userId, credits: account.credits, caughtPokemon: account.caughtPokemon, team: account.team, pc: account.pc, bag: account.bag});
	}

	/**
	 * Get the user's account.
	 */
	getAccount()
	{
		if(!db.has(`player_${this.userId}_account`)) this.createAccount();
		console.log(db.get(`player_${this.userId}_account`));
		const json = db.get(`player_${this.userId}_account`);
		return new PlayerModel(json.userId, Number(json.credits), Number(json.caughtPokemon), json.team, json.pc, json.bag);
	}

	/**
	 * Add a pokemon to the user's account.
	 * Depending on the user's team size, can differ where the pokemon will be stored.
	 * @param {PokemonModel} model
	 */
	addPokemon(model)
	{
		const account = this.getAccount();
		model.expNeededToLevelUp = model.expNeeded();
		console.debug(account);
		if(account.team.length <= 5) account.team.push(model);
		else account.pc.push(model);
		this.save(account);
	}

	/**
	 * Updates the Pokemon Model for the given pokemon by index.
	 * @param {number} index - This is the pokemon's index that is either in the team array, or pc array.
	 * @param {PokemonModel}  model - the updated Pokemon Model.
	 * @param {boolean} team - whether the pokemon is in the team array, or not. if not, then we will assume it is in the pc array.
	 */
	updatePokemon(index, model, team= false)
	{
		const account = this.getAccount();
		console.debug(account);
		if(team)
			account.team[index] = model;
		else
			account.pc[index] = model;

		this.save(account);
	}

	/**
	 * Used for the user to buy an item, and have it put in their bag.
	 * @param {ItemModel} item
	 * @returns {{success?: boolean, reason?: string}}
	 */
	buyItem(item)
	{
		const account = this.getAccount();
		if(item.price > account.credits) return {success: false, reason: "You don't have enough to buy this item yet."};

		account.credits -= item.price;
		account.bag.push(item);
		this.save(account);
	}

	/**
	 * Saves the data.
	 * @param {PlayerModel} model
	 */
	save(model)
	{
		db.set(`player_${this.userId}_account`, model);
	}

};
