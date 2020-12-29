const db = require("quick.db");
// eslint-disable-next-line no-unused-vars
const SpawnModel = require("./models/SpawnModel");

module.exports = class SpawnDB
{
	constructor(channelId)
	{
		/**
		 * @type {string}
		 */
		this.channelId = channelId;
	}
	/**
	 * @returns {SpawnModel[]}
	 */
	checkSpawns()
	{
		if(!db.has(`channel_${this.channelId}_spawns`))
			this.createSpawnChannel();
		return db.get(`channel_${this.channelId}_spawns`);
	}
	/**
	 * 
	 * @param {string} name 
	 */
	checkIfPokemonSpawned(name)
	{
		const spawns = this.checkSpawns();

		if(spawns.length === 0) return;

		const founds = spawns.find(x => x.pokemon.name.toLowerCase().trim() === name.trim().toLowerCase());
		if(typeof founds === "undefined") return false;
		return founds;
	}
	/**
	 * 
	 * @param {SpawnModel} model 
	 */
	addPokemonToSpawn(model)
	{
		const spawns = this.checkSpawns();
		spawns.push(model);
		this.save(spawns);
	}

	removePokemonFromSpawns(name)
	{
		const spawns = this.checkSpawns();
		const index = spawns.findIndex(x => x.pokemon.name.trim().toLowerCase() === name.trim().toLowerCase());
		if(index === -1) return false;
		spawns.splice(index, 1);
		this.save(spawns);
	}

	createSpawnChannel()
	{
		db.set(`channel_${this.channelId}_spawns`, []);
	}
	/**
	 * 
	 * @param {SpawnModel[]} models 
	 */
	save(models)
	{
		db.set(`channel_${this.channelId}_spawns`, models);
	}
};