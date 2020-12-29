const { Client, Collection } = require("discord.js");
const {Inscriber} = require("@koreanpanda/inscriber");
const CommandManager = require("./manager/CommandManager");
const EventManager = require("./manager/EventManager");
// eslint-disable-next-line no-unused-vars
const CommandBase = require("./bases/CommandBase");

module.exports = class PokemonBot extends Client
{
	constructor()
	{
		super();
		/**
		 * @type {Collection<string, CommandBase>}
		 */
		this.commands = new Collection();
		this.logger = new Inscriber();
		/**
		 * @type {import("discord.js").PresenceStatusData}
		 */
		this.status = "online";
		this.commandCategories = ["miscellaneous", "pokemon"];
		this.eventCategories = ["client", "guild"];
	}

	loadFiles()
	{
		this.commandCategories.forEach(x => new CommandManager(this).loadCommands(x));
		this.eventCategories.forEach(x => new EventManager(this).loadEvents(x));
		this.logger.info("All files are loaded in.");
	}
};
