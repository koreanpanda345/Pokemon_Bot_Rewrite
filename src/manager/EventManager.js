// eslint-disable-next-line no-unused-vars
const PokemonBot = require("../PokemonBot");


module.exports = class EventManager
{
	/**
	 * 
	 * @param {PokemonBot} client 
	 */
	constructor(client)
	{
		this.client = client;
	}
	/**
	 * 
	 * @param {string} dir 
	 */
	loadEvents(dir)
	{
		const events = require("fs").readdirSync(`./src/events/${dir}`).filter(d => d.endsWith(".js"));
		for(const file of events)
		{
			const eName = file.split(".")[0];
			const event = new(require(`../events/${dir}/${file}`))(this.client);
			this.client.on(eName, (...args) => event.invoke(...args));
			this.client.logger.info(`Event ${eName} is ready`);
		}
	}
};