// eslint-disable-next-line no-unused-vars
const PokemonBot = require("../PokemonBot");

module.exports = class CommandBase
{
	/**
	 *
	 * @param {PokemonBot} client
	 * @param {{name: string, aliases: string[], description: string, category: string, enabled: boolean, selfPermissions: import("discord.js").PermissionString[], userPermissions: import("discord.js").PermissionString[], preconditions: Function[]}} commandProps
	 */
	constructor(client, {
		name = "", // command's name
		aliases = new Array(), // command's aliases
		description = "", // command's description
		category = "", // command's category
		enabled = true, // wheter the command should be enabled or not.
		selfPermissions = new Array(), // the bot's permissions.
		userPermissions = new Array(), // the user's permissions.
		preconditions = [() => // the command's preconditions.
		{
			return true;
		}]
	})
	{
		// Pokemon Bot.
		this.client = client;
		// Command's Properties
		this.props = {
			name,
			aliases,
			description,
			category,
			enabled
		};
		// Permissions needed to use this command.
		this.permissions = {
			selfPermissions,
			userPermissions
		};
		// Preconditions that is needed to use this command.
		/**
		 * @type {Function[]}
		 */
		this.preconditions = preconditions;
	}
};
