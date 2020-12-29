const CommandBase = require("../../bases/CommandBase");
// eslint-disable-next-line no-unused-vars
const CommandContextBase = require("../../bases/CommandContextBase");
const PlayerDB = require("../../database/PlayerDB");
const viewPokemon = require("./pc_subcommands/viewPokemon");

module.exports = class PCCommand extends CommandBase
{
	constructor(client)
	{
		super(client, {
			name: "pc",
			description: "Commands to interact with pokemon in the pc.",
			category: "Pokemon",
			preconditions: [
				/**
				 * @param {CommandContextBase} ctx
				 */
				(ctx) =>
				{
					const db = new PlayerDB(ctx.userId);
					if(!db.hasPokemon()) return "It looks like you don't have any pokemon yet. try using the `p.start` command to get your first pokemon.";
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
		if(ctx.args.length == 0) ctx.args.push("1");
		let action = ctx.args.shift().toLowerCase();
		let args = ctx.args;

		switch(action) // @todo Add more subcommands.
		{
		case "move": // p.pc move 1 2
			// @todo Add the subcommand for moving pokemon in the pc, or to the team.
			break;

		default: // p.pc | p.pc 1
			viewPokemon(ctx, new PlayerDB(ctx.userId), args);
			break;
		}
	}
};