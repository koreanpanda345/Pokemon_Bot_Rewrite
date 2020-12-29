// eslint-disable-next-line no-unused-vars
const PokemonBot = require("../PokemonBot");

/**
 * This is the EventManager class. This class's job is to handle all events, such as loading them.
 * @type {EventManager}
 */
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
	 * Loads events in the directory.
	 * @param {string} dir
	 */
	loadEvents(dir)
	{
		const events = require("fs").readdirSync(`./src/events/${dir}`).filter(d => d.endsWith(".js"));
		for(const file of events)
		{
			const eName = file.split(".")[0]; // we need this variable because without it, we can't actually load the events, because it would just be client.on('ready.js') which is not an event.
			const event = new(require(`../events/${dir}/${file}`))(this.client);
			this.client.on(eName, (...args) => event.invoke(...args));
			this.client.logger.info(`Event ${eName} is ready`);
		}
	}
};
