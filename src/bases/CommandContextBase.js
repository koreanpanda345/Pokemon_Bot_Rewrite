/* eslint-disable no-unused-vars */
const { Message, MessageEmbed } = require("discord.js");


module.exports = class CommandContextBase
{
	/**
	 *
	 * @param {Message} message
	 * @param {string[]} args
	 */
	constructor(message, args)
	{
		this.message = message;
		this.args = args;
		this.channelId = message.channel.id;
		this.guildId = message.guild.id;
		this.guild = message.guild;
		this.channel = message.channel;
		this.userId = message.author.id;
		this.user = message.author;
		this.member = message.member;
	}

	defaultEmbed()
	{
		const embed = new MessageEmbed();
		embed.color = "RANDOM";
		embed.setFooter(`${this.guild.me.displayName || this.message.client.user.username}`);
		return embed;
	}

	sendMessage(content)
	{
		return this.channel.send(content);
	}
};
