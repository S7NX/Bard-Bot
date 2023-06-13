const { Client, Message } = require("discord.js");
const GuildSettings = require("../../models/GuildSettings");
const { getBardResponse } = require("../../handlers/functions");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;

  if (message.content.includes(`<@${client.user.id}>`)) {
    let guildSettings = await GuildSettings.findOne({
      guildId: message.guild.id,
    });
    if (!guildSettings) {
      guildSettings = new GuildSettings({ guildId: message.guild.id });
      guildSettings.save();
    }
    if (message.channel.id == guildSettings.channelId) return;
    message.channel.sendTyping();
    try {
      const content = message.content;
      const slicedContent = content.replace(`<@${client.user.id}>`, "");
      const backstoryraw = `${guildSettings.backstory}`;
      const backstory = backstoryraw.replace(`{question}`, slicedContent);
      const answer = await getBardResponse(backstory);
      message.reply({ content: answer });
    } catch (e) {
      console.log(e);
    }
  }
};
