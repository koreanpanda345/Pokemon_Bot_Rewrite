// eslint-disable-next-line no-unused-vars
const PokemonBot = require("../PokemonBot");


module.exports = class CommandManager
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
	 * @param {string} dir 
	 */
	loadCommands(dir)
	{
		const commands = require("fs").readdirSync(`./src/commands/${dir}`).filter(d => d.endsWith(".js"));
		for(const file of commands)
		{
			const command = new(require(`../commands/${dir}/${file}`))(this.client);
			this.client.commands.set(command.props.name, command);
			this.client.logger.info(`Command ${command.props.name} is ready.`);
		}
	}
};