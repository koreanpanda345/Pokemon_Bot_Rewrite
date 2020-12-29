// eslint-disable-next-line no-unused-vars
const CommandContextBase = require("../../../bases/CommandContextBase");
// eslint-disable-next-line no-unused-vars
const PlayerDB = require("../../../database/PlayerDB");

/**
 * 
 * @param {CommandContextBase} ctx
 * @param {PlayerDB} db 
 * @param {string[]} args 
 */
module.exports = (ctx, db, args = [0]) =>
{
	let id = args[0];
	if(isNaN(id)) return ctx.sendMessage("Sorry, but that is not a valid id.");
	const account = db.getAccount();
	id = Number(id - 1);
	const pc = account.pc;
	if(pc.length < id) return ctx.sendMessage("Sorry, but it seems like you don't have that many pokemon.");
	const embed = ctx.defaultEmbed();
	const pokemon = pc[Number(id)];
	embed.setTitle(`${pokemon.nickname || pokemon.name}`);

	ctx.sendMessage(embed);
};