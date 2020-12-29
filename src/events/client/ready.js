// eslint-disable-next-line no-unused-vars
const PokemonBot = require("../../PokemonBot");

/**
 * Ready Event.
 * @type {exports}
 */
module.exports = class
{
	/**
	 *
	 * @param {PokemonBot} client
	 */
	constructor(client)
	{
		this.client = client;
	}

	invoke()
	{
		this.client.logger.info(`${this.client.user.username} is ready`);
		this.client.user.setStatus(this.client.status);
	}
};
