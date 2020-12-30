/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const PokemonBot = require("../../PokemonBot");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const CommandContextBase = require("../../bases/CommandContextBase");
const PlayerDB = require("../../database/PlayerDB");
const ExpSystem = require("../../Systems/PokemonSystems/ExpSystem");
const SpawnSystem = require("../../Systems/CatchSystem/SpawnSystem");
const {getSprite} = require("../../api/PokeApi/GetPokemon");
/**
 * Message Event.
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
	/**
	 *
	 * @param {Message} message
	 */
	async invoke(message)
	{
		if(message.author.bot || message.channel.type === "dm") return; // If author is bot, or message is in dms, then we are not going to do anything.
		const db = new PlayerDB(message.author.id);
		const spawnSystem = new SpawnSystem(message.channel.id);
		if(spawnSystem.spawnChance())
		{
			let spawn = await spawnSystem.spawnPokemon();
			const embed = new MessageEmbed()
				.setColor("RANDOM")
				.setDescription(`A Wild ${spawn.pokemon.name} has appeared`)
				.setImage(await getSprite(spawn.pokemon.name, spawn.pokemon.shiny));

			message.channel.send(embed);
		}
		console.debug(db.getAccount());
		if(db.hasPokemon()) // if the user has an account, and a pokemon.
		{
			// Exp System.
			const expSys = new ExpSystem();
			// @todo Move the EXP System to a different file to make this more organized.
			const account = db.getAccount();
			const pokemon = account.team[0];
			pokemon.exp += 1;
			// console.debug(pokemon);
			db.updatePokemon(0, pokemon, true);
			if(pokemon.exp >= expSys.ExpNeeded(pokemon.level + 1, pokemon.growthRate))// If the pokemon's exp is more than what the pokemon needs to level up.
			{
				pokemon.exp = 0;
				pokemon.level++;
				db.updatePokemon(0, pokemon, true);
				message.channel.send(`Congratulations <@${message.author.id}>, ${pokemon.nickname || pokemon.name} has leveled up.`);
			}
		}
		if(typeof(process.env.PREFIX) !== "undefined") // this is here because of eslint would complain.
			// @todo Add a Custom Server Prefix System.
			if(message.content.startsWith(process.env.PREFIX)) // if the message that was received starts with the bot's prefix.
			{
				const args = message.content.slice(process.env.PREFIX.length).trim().split(" ");
				const commandName = args.shift().toLowerCase();
				// Search for the command, either by name, or aliases.
				const command = this.client.commands.get(commandName) || this.client.commands.find(x => x.props.aliases && x.props.aliases.includes(commandName));
				// if command doesn't exist, then don't do anything.
				if(!command) return;
				// if command is disabled, then return a message saying it is disabled.
				if(!command.props.enabled) return message.channel.send(`Command ${command.props.name} is disabled.`);
				// try/catch block. Used for a somewhat form of error handling.
				try
				{
					const ctx = new CommandContextBase(message, args); // create the CommandContext to be used. This is similar to DSharpPlusPlus which is a discord Library for C#.
					command.permissions.selfPermissions.forEach(permission => // check Bot's permissions.
					{
						if(!ctx.guild.me.hasPermission(permission)) // if bot doesn't have one of the permissions needed, then say which one, and do not continue.
							return ctx.sendMessage(`I am missing the permission of ${permission}`);
					});

					command.permissions.userPermissions.forEach(permission => // check User's permissions.
					{
						if(!ctx.member.hasPermission(permission)) // if the user doesn't have one of the permissions needed, then say which one, and do not continue.
							return ctx.sendMessage(`Sorry, but you don't have the permission of ${permission}. You need this permission to use this command.`);
					});
					let run = false; // for preconditions, so it doesn't still continue running.
					command.preconditions.forEach(condition => // check command preconditions. This is similar to Discord.NET Preconditions.
					{
						let result = condition(ctx); // result of the condition, it can be a boolean value, or a string value.
						if(typeof(result) !== "boolean") return ctx.sendMessage(result); // if it isn't a boolean data type, then it should be a string, and send what the string value is.
						if(!result) return ctx.sendMessage("Something happened"); // if it is a boolean data type, but it is false, then send that something happened.
						run = true; // else continue.
						// console.log(result);
					});
					if(run) // this is for the preconditions, since it still executes if we don't have this here, and the precondition is unsuccessful.
						await command.invoke(ctx); // execute command.
				}
				catch(e) // for error handling.
				{
					this.client.logger.error(e);
				}
			}
	}
};
