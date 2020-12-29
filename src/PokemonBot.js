/**
 * Author: Koreanpanda345
 * File: PokemonBot.js
 * Created At: 12/27/2020
 * Last Modified: 12/28/2020
 * Description: This is the Pokemon Bot's Core. This is a file that will be used in just about every file, except for databases, and files in the Data folder.
 */

//#region Imports
const { Client, Collection } = require("discord.js"); // Discord.js
const {Inscriber} = require("@koreanpanda/inscriber"); // Logger package
const CommandManager = require("./manager/CommandManager"); // Command Manager
const EventManager = require("./manager/EventManager"); // Event manager
// eslint-disable-next-line no-unused-vars
const CommandBase = require("./bases/CommandBase"); // Command base
//#endregion

//#region Class

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
		this.commandCategories = ["miscellaneous", "pokemon"]; // Command Categories.
		this.eventCategories = ["client", "guild"]; // Event Categories.
	}

	loadFiles()
	{
		this.commandCategories.forEach(x => new CommandManager(this).loadCommands(x));
		this.eventCategories.forEach(x => new EventManager(this).loadEvents(x));
		this.logger.info("All files are loaded in.");
	}
};
//#endregion
