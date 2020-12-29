const { randomInt } = require("../../modules/Utils");


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

	spawnPokemon()
	{
		const natDexId = randomInt(1, 898);
		console.log(natDexId);
		return natDexId;
	}
};