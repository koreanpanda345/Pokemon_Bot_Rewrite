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
		name = "",
		aliases = new Array(),
		description = "",
		category = "",
		enabled = true,
		selfPermissions = new Array(),
		userPermissions = new Array(),
		preconditions = [() =>
		{
			return true;
		}]
	})
	{
		this.client = client;
		this.props = {
			name,
			aliases,
			description,
			category,
			enabled
		};
		this.permissions = {
			selfPermissions,
			userPermissions
		};
		/**
		 * @type {Function[]}
		 */
		this.preconditions = preconditions;
	}
};
