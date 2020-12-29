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
module.exports = (ctx, db, args) =>
{
	let id = args[0];
	console.debug(`${typeof id} -> ${id}`);
	if(isNaN(Number(id))) return ctx.sendMessage("Sorry, but that is not a valid id.");
	const account = db.getAccount();
	id = Number(id - 1);
	const team = account.team;
	if(team.length < id) return ctx.sendMessage("Sorry, but it seems like you don't have that many pokemon.");
	const embed = ctx.defaultEmbed();
	const pokemon = team[Number(id)];
	embed.setTitle(`${((pokemon.nickname !== "" || pokemon.nickname !== undefined || pokemon.nickname !== null) ? `${pokemon.nickname} (${pokemon.name})` : `${pokemon.name}`)}`);
	
	P.getPokemonByName(pokemon.name)
		.then((response) =>
		{
			console.debug(response);
			let type = response.types.length === 1 ? `${response.types[0].type.name}` : `${response.types[0].type.name} | ${response.types[1].type.name}`;
			embed.setDescription(`Trainer: ${ctx.user.tag}\nTypes: ${type}\nAbility: ${pokemon.ability.ability.name}`);
			embed.setImage(response.sprites["front_default"]);
			ctx.sendMessage(embed);
		});
};