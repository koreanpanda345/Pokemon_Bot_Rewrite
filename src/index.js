require("dotenv").config();
const PokemonBot = require("./PokemonBot");

const client = new PokemonBot();

const init = () => 
{
	client.loadFiles();
	// eslint-disable-next-line no-undef
	client.login(process.env.TOKEN);
};

init();
