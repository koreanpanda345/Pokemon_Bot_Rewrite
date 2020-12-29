const db = require("quick.db");
const PlayerModel = require("./models/PlayerModel");
// eslint-disable-next-line no-unused-vars
const PokemonModel = require("./models/PokemonModel");
// eslint-disable-next-line no-unused-vars
const ItemModel = require("./models/ItemModel");
module.exports = class PlayerDB
{
	constructor(userId)
	{
		/**
		 * @type {string}
		 */
		this.userId = userId;
	}
	hasPokemon()
	{
		if(!db.has(`player_${this.userId}_account`)) return false;
		const account = db.get(`player_${this.userId}_account`);
		return account.team.length !== 0;

	}

	createAccount()
	{
		if(db.has(`player_${this.userId}_account`)) return;
		const account = new PlayerModel(this.userId, 200, 0, [], [], []);

		db.set(`player_${this.userId}_account`, {userId: account.userId, credits: account.credits, caughtPokemon: account.caughtPokemon, team: account.team, pc: account.pc, bag: account.bag});
	}

	getAccount()
	{
		if(!db.has(`player_${this.userId}_account`)) this.createAccount();
		console.log(db.get(`player_${this.userId}_account`));
		const json = db.get(`player_${this.userId}_account`);
		return new PlayerModel(json.userId, Number(json.credits), Number(json.caughtPokemon), json.team, json.pc, json.bag);
	}

	/**
	 *
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
	 *
	 * @param {number} index
	 * @param {PokemonModel}  model
	 * @param {boolean} team
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
	 *
	 * @param {ItemModel} item
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
	 * @param {PlayerModel} model
	 */
	save(model)
	{
		db.set(`player_${this.userId}_account`, model);
	}

};
