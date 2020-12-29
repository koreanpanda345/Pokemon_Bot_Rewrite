// Using .env to hold credentials.
require("dotenv").config();
const PokemonBot = require("./PokemonBot");

const client = new PokemonBot();

const init = () => // Initialization.
{
	client.loadFiles();
	// eslint-disable-next-line no-undef
	client.login(process.env.TOKEN); // login the bot.
};

init(); // execute the bot.

//#region TODO_LIST
/**
 * Todo List
 * This lis is not make in any order. But these are things that needs to be done before the bot can be ready to be used by anyone.
 * If you are helping, and done one of the items, the please put your name done in the format like
 * @todo Example TODO List - koreanpanda345
 * So I can properly give you credits. you can add more information like your github account, and such just put them in () next to your name.
 * @todo Example TODO List with more information - koreanpanda345 (https://github.com/koreanpanda345)
 *
 * @todo Make info command to be used to check the user's first selected pokemon in their team, or a pokemon that they want to look up by their caught id.
 * @todo Make team command, to be used to add, remove, arrange pokemon, in the user's team.
 * @todo Make a bag command, to be used to see what items, the user has currently.
 * @todo make a item command, to be used to interact with the items that the user has.
 * @todo make a shop command, to be used to purchase items, with credits.
 * @todo make guild settings commands, to be used to configure the bot to behave a certain way that the server wants it to be. (Permissions: Manage Server)
 * @todo make help command, to display the bot's commands, or info about a specific command. (Should be dynamic)
 * @todo make a spawn system, to spawn pokemon in a server. (This system should not have any risk of spamming.)
 * @todo make a catch system, to catch the pokemon that spawned in the server. This should have the battle system integrated in with it, to simulate the catch scenes in the pokemon mainstream games.
 * @todo make a battle system, to be used for battles. this will be used in pvp, and pve scenarios. this should be a 6v6 battle system.
 * @todo (Optional) NPC system. enable a way to battle random npcs. This is optional, and is not needed to be here, since this requires a lot of ai, and logic to be made.
 * @todo (Critical) Improve Error Handling
 * @todo (Optional) Event System. This can be made later on, but a system to make events, for either the main server, or any server.
 */
//#endregion
