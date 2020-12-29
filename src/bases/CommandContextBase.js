/* eslint-disable no-unused-vars */
const { Message, MessageEmbed, Guild, Channel, User, GuildMember} = require("discord.js");


module.exports = class CommandContextBase
{
	/**
	 *
	 * @param {Message} message
	 * @param {string[]} args
	 */
	constructor(message, args)
	{
		/**
		 *
		 * @type {Message}
		 */
		this.message = message;
		/**
		 *
		 * @type {string[]}
		 */
		this.args = args;
		/**
		 * @type {string}
		 */
		this.channelId = message.channel.id;
		/**
		 * @type {string}
		 */
		this.guildId = message.guild.id;
		/**
		 * @type {Guild}
		 */
		this.guild = message.guild;
		/**
		 * @type {Channel}
		 */
		this.channel = message.channel;
		/**
		 * @type {string}
		 */
		this.userId = message.author.id;
		/**
		 * @type {User}
		 */
		this.user = message.author;
		/**
		 * @type {GuildMember}
		 */
		this.member = message.member;
	}

	/**
	 *
	 * @returns {MessageEmbed}
	 */
	defaultEmbed()
	{
		const embed = new MessageEmbed();
		embed.color = "RANDOM";
		embed.setFooter(`${this.guild.me.displayName || this.message.client.user.username}`);
		return embed;
	}

	/**
	 *
	 * @param {*} content
	 * @returns {*}
	 */
	sendMessage(content)
	{
		return this.channel.send(content);
	}
};
