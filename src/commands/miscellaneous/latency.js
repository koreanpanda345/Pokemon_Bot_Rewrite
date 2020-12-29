const CommandBase = require("../../bases/CommandBase");
// eslint-disable-next-line no-unused-vars
const CommandContextBase = require("../../bases/CommandContextBase");


module.exports = class LatencyCommand extends CommandBase
{
	constructor(client)
	{
		super(client, {
			name: "latency",
			aliases: ["ping"],
			description: "Displays my latency",
			category: "Miscellaneous",
			enabled: true
		});
	}
	/**
	 *
	 * @param {CommandContextBase} ctx
	 */
	async invoke(ctx)
	{
		const latency = this.client.ws.ping;
		let embed = ctx.defaultEmbed();
		embed.setColor(`${(latency < 100 ? "GREEN" : latency < 200 ? "ORANGE" : "RED")}`);
		embed.setDescription(`My Latency is ${latency} ms`);
		embed.setTitle("PONG!");

		ctx.sendMessage(embed);
	}
};
