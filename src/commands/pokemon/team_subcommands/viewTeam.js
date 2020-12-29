// eslint-disable-next-line no-unused-vars
const CommandContextBase = require("../../../bases/CommandContextBase");
// eslint-disable-next-line no-unused-vars
const PlayerDB = require("../../../database/PlayerDB");

const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();

/**
 * 
 * @param {CommandContextBase} ctx 
 * @param {PlayerDB} db 
 * @param {string[] args 
 */
module.exports = (ctx, db) =>
{
	const account = db.getAccount();
	const embed = ctx.defaultEmbed();

	embed.setTitle(`${ctx.user.username}'s team`);
	
	const team = account.team;
	embed.fields = [
		{name: "Slot 1", value: `Level ${team[0].level}${team[0].shiny ? " ⭐" : ""} ${team[0].name}`},
		{name: "Slot 2", value: team[1] !== undefined ? `Level ${team[1].level}${team[1].shiny ? " ⭐" : ""} ${team[1].name}` : "---"},
		{name: "Slot 3", value: team[2] !== undefined ? `Level ${team[2].level}${team[2].shiny ? " ⭐" : ""} ${team[2].name}` : "---"},
		{name: "Slot 4", value: team[3] !== undefined ? `Level ${team[3].level}${team[3].shiny ? " ⭐" : ""} ${team[3].name}` : "---"},
		{name: "Slot 5", value: team[4] !== undefined ? `Level ${team[4].level}${team[4].shiny ? " ⭐" : ""} ${team[4].name}` : "---"},
		{name: "Slot 6", value: team[5] !== undefined ? `Level ${team[5].level}${team[5].shiny ? " ⭐" : ""} ${team[5].name}` : "---"}
	];

	ctx.sendMessage(embed);
};