const CommandBase = require("../../bases/CommandBase");
// eslint-disable-next-line no-unused-vars
const CommandContextBase = require("../../bases/CommandContextBase");
const PlayerDB = require("../../database/PlayerDB");
const viewPokemon = require("./team_subcommands/viewPokemon");

module.exports = class TeamCommand extends CommandBase
{
	constructor(client)
	{
		super(client, {
			name: "team",
			aliases: ["t"],
			description: "Interaction with your team", // @todo make a better description for this command.
			category: "Pokemon",
			enabled: true,
			preconditions: [
				/**
				 * @param {CommandContextBase} ctx
				 */
				(ctx) => 
				{
					const db = new PlayerDB(ctx.userId);
					if(!db.hasPokemon()) return "Seems like you don't have any pokemon. Maybe trying doing `p.start` to get your first pokemon.";
					return true;
				}
			]
		});
		
	}
	/**
	 * 
	 * @param {CommandContextBase} ctx 
	 */
	invoke(ctx)
	{
		console.debug(ctx.args);
		if(ctx.args.length == 0) ctx.args.push("1");
		let action = ctx.args.shift().toLowerCase();
		let args = ctx.args;
		
		switch(action)
		{
		case "move": // p.team move 1 2

			break;
		
		default: // p.team | p.team 1
			viewPokemon(ctx, new PlayerDB(ctx.userId), action);
			break;
		}
	}
};