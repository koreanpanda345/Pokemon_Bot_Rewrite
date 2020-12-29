const CommandBase = require("../../bases/CommandBase");
// eslint-disable-next-line no-unused-vars
const CommandContextBase = require("../../bases/CommandContextBase");
const {starters, natures} = require("../../Data/Pokemon");
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const PlayerDB = require("../../database/PlayerDB");
const PokemonModel = require("../../database/models/PokemonModel");
const {RandomInt} = require("../../modules/Utils");
module.exports = class StartPokemonCommand extends CommandBase
{
	constructor(client)
	{
		super(client, {
			name: "start",
			description: "Allows you to start on your pokemon advenature.",
			category: "Pokemon",
			preconditions: [
				/**
				 * @param {CommandContextBase} ctx
				 */
				// eslint-disable-next-line no-unused-vars
				(ctx) =>
				{
					const db = new PlayerDB(ctx.user.id);
					console.debug(db.hasPokemon());
					if(db.hasPokemon()) return "You already have a starter";
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
		const db = new PlayerDB(ctx.user.id);
		let embed = ctx.defaultEmbed();
		embed.setDescription(`Welcome, ${ctx.user.username} to the world of Pokemon. Who am I, your asking, well I am Pokemon Bot.
        I will be with you on your journy through this world. but before we can do that, you need a pokemon. How about I give you one.\n\`Note: All Starters are Shiny Locked, so don't worry. This just means you will not get a shiny starter, but you can breed to get one, using your starter.\``)
		//Grass: 🍃 | Fire: 🔥 | Water: 💧
			.addField("Kanto", "🍃: Bulbasaur | 🔥:  Charmander | 💧: Squirtle")
			.addField("Johto", "🍃: Chikorita | 🔥: Cyndaquil | 💧: Totodile")
			.addField("Hoenn", "🍃: Treecko | 🔥: Torchic | 💧: Mudkip")
			.addField("Sinnoh", "🍃: Turtwig | 🔥: Chimchar | 💧: Piplup")
			.addField("Unova", "🍃: Snivy | 🔥: Tepig | 💧: Oshawott")
			.addField("Kalos", "🍃: Chespin | 🔥: Fennekin | 💧: Froakie")
			.addField("Alola", "🍃: Rowlet | 🔥: Litten | 💧: Popplio")
			.addField("Galar", "🍃: Grookey | 🔥: Scorbunny | 💧: Sobble");

		ctx.sendMessage(embed).then(async () =>
		{
			let filter = (m) => m.author.id === ctx.user.id && m.channel.id === ctx.channelId;
			let pick = await ctx.channel.createMessageCollector(filter, {max: 1});

			pick.on("collect", collected =>
			{
				if(collected.content.startsWith("cancel"))
				{
					return ctx.sendMessage("Stopping command process.");
				}
				let isStarter = false;
				starters.forEach(gen =>
				{
					if(gen.includes(collected.content.trim().toLowerCase())) isStarter = true;
				});

				if(!isStarter) return ctx.sendMessage("Sorry, but that is not a starter.");
				P.getPokemonByName(collected.content.trim().toLowerCase())
					.then(response =>
					{
						console.debug(response);
						let confirmEmbed = ctx.defaultEmbed();
						P.getPokemonSpeciesByName(collected.content.trim().toLowerCase())
							.then((species) =>
							{
								console.debug(species);
								confirmEmbed.setDescription(`You have selected ${response.name}\n\nAbout ${response.name}:\nType: ${response.types[0].type.name}\nPokedex Entry: ${species["flavor_text_entries"][species["flavor_text_entries"].findIndex(x => x.language.name === "en")]["flavor_text"]}`);
								confirmEmbed.setTitle("Are you sure?");
								confirmEmbed.setImage(response.sprites["front_default"]);
								ctx.sendMessage(confirmEmbed).then(async () =>
								{
									let confirm = await ctx.channel.createMessageCollector(filter, {max: 1});
									confirm.on("collect", async answer =>
									{
										if(answer.content.trim().toLowerCase().startsWith("cancel"))
										{
											return ctx.sendMessage("Stopping command process.");
										}

										if(answer.content.trim().toLowerCase().startsWith("y"))
										{
											db.createAccount();
											db.addPokemon(new PokemonModel(
												response.name.toString(),
												"",
												5,
												0,
												false,
												natures[RandomInt(0, natures.length)].name.toLowerCase(),
												["tackle"],
												response.abilities[0],
												false,
												true,
												false,
												"",
												"None",
												0,
												0,
												species.growth_rate,
												{
													hp: RandomInt(0, 31),
													atk: RandomInt(0, 31),
													def: RandomInt(0, 31),
													spa: RandomInt(0, 31),
													spd: RandomInt(0, 31),
													spe: RandomInt(0, 31)
												},
												{
													hp: 0,
													atk: 0,
													def: 0,
													spa: 0,
													spd: 0,
													spe: 0
												}
											));

											ctx.sendMessage(`You selected ${response.name}. Would you like to nickname ${response.name}?`);
											let yesOrNo = await ctx.channel.createMessageCollector(filter, {max: 1});

											yesOrNo.on("collect", async (res) =>
											{
												if(res.content.trim().toLowerCase().startsWith("y"))
												{
													ctx.sendMessage("What would you like the nickname to be?");
													let nicknameProcess = await ctx.channel.createMessageCollector(filter, {max: 1});

													nicknameProcess.on("collect", nickname =>
													{
														if(nickname.content.trim().toLowerCase().startsWith("cancel"))
														{
															return ctx.sendMessage("Cancelling.");
														}
														const account = db.getAccount();
														const poke = account.team[0];
														poke.nickname = nickname.content;

														db.updatePokemon(0, poke, true);
														return ctx.sendMessage(`Your ${response.name}'s nickname is now ${poke.nickname}! Enjoy your adventure in the Land of pokemon.`);
													});
												}
												else
												{
													return ctx.sendMessage("Ok! Enjoy your adventure in the Land of pokemon.");
												}
											});
										}
									});
								});
							});

					})
					.catch(error =>
					{
						console.error(error);
					});
			});
		});
	}
};
