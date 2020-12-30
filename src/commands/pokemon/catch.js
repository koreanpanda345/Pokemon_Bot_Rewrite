const CommandBase = require("../../bases/CommandBase");
// eslint-disable-next-line no-unused-vars
const CommandContextBase = require("../../bases/CommandContextBase");
const PlayerDB = require("../../database/PlayerDB");
const CatchSystem = require("../../Systems/CatchSystem/CatchSystem");
const SpawnDB = require("../../database/SpawnDB");

module.exports = class CatchCommand extends CommandBase
{
	constructor(client)
	{
		super(client, {
			name: "catch",
			aliases: "c",
			category: "Pokemon",
			description: "Allows you to try and catch the pokemon.",
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
	async invoke(ctx)
	{
		const catchSystem = new CatchSystem();

		const spawnDB = new SpawnDB(ctx.channelId);

		if(!spawnDB.checkIfPokemonSpawned(ctx.args[0]))
			return ctx.sendMessage("Sorry, but it doesn't seem like that pokemon spawned yet.");
		
		let result = catchSystem.testCatch("pokeball", spawnDB.checkSpawns().find(x => x.pokemon.name == ctx.args[0].toLowerCase()), ctx.userId, ctx.channelId);
		if(result == true)
		{
			await ctx.sendMessage("Successful");
		}
	}
};