/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const PokemonBot = require("../../PokemonBot");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const CommandContextBase = require("../../bases/CommandContextBase");
const PlayerDB = require("../../database/PlayerDB");

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
	/**
	 *
	 * @param {Message} message
	 */
	async invoke(message)
	{
		if(message.author.bot || message.channel.type === "dm") return;
		const db = new PlayerDB(message.author.id);
		console.debug(db.getAccount());
		if(db.hasPokemon())
		{
			const account = db.getAccount();
			const pokemon = account.team[0];
			pokemon.exp += 1;
			console.debug(pokemon);
			db.updatePokemon(0, pokemon, true);
			if(pokemon.exp >= pokemon.expNeededToLevelUp)
			{
				pokemon.exp = 0;
				pokemon.level++;
				pokemon.expNeededToLevelUp = pokemon.expNeeded();
				db.updatePokemon(0, pokemon, true);
				message.channel.send(`Congratulations <@${message.author.id}>, ${pokemon.nickname || pokemon.name} has leveled up.`);
			}
		}
		if(typeof(process.env.PREFIX) !== "undefined")
			if(message.content.startsWith(process.env.PREFIX))
			{
				const args = message.content.slice(process.env.PREFIX.length).trim().split(" ");
				const commandName = args.shift().toLowerCase();

				const command = this.client.commands.get(commandName) || this.client.commands.find(x => x.props.aliases && x.props.aliases.includes(commandName));

				if(!command) return;

				if(!command.props.enabled) return message.channel.send(`Command ${command.props.name} is disabled.`);

				try
				{
					const ctx = new CommandContextBase(message, args);
					command.permissions.selfPermissions.forEach(permission =>
					{
						if(!ctx.guild.me.hasPermission(permission))
							return ctx.sendMessage(`I am missing the permission of ${permission}`);
					});

					command.permissions.userPermissions.forEach(permission =>
					{
						if(!ctx.member.hasPermission(permission))
							return ctx.sendMessage(`Sorry, but you don't have the permission of ${permission}. You need this permission to use this command.`);
					});
					let run = false;
					command.preconditions.forEach(condition =>
					{
						let result = condition(ctx);
						if(typeof(result) !== "boolean") return ctx.sendMessage(result);
						if(!result) return ctx.sendMessage("Something happened");
						run = true;
						console.log(result);
					});
					if(run)
						await command.invoke(ctx);
				}
				catch(e)
				{
					this.client.logger.error(e);
				}
			}
	}
};
