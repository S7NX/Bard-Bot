const { Client, Message } = require("discord.js");
const GuildSettings = require("../../models/GuildSettings");
const {
  getBardResponse,
  splitTextIntoParts,
} = require("../../handlers/functions");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  let guildSettings = await GuildSettings.findOne({
    guildId: message.guild.id,
  });
  if (!guildSettings) return;
  if (!guildSettings.channelId) return;
  if (message.channel.id === guildSettings.channelId) {
    message.channel.sendTyping();
    try {
      let content = message.content;
      if (content.includes(`<@${client.user.id}>`)) {
        let slice = content.replace(`<@${client.user.id}>`, "");
        content = slice;
      }
      const backstoryraw = `${guildSettings.backstory}`;
      const backstory = backstoryraw.replace(`{question}`, content);
      const answer = (await getBardResponse(backstory)) || "No Comment.";

      if (answer.length <= 2000) {
        message.reply(`${JSON.stringify(answer)}`);
      } else {
        const parts = splitTextIntoParts(answer, 2000);
        for (let i = 0; i < parts.length; i++) {
          if (i === 0) {
            message.channel.send(`${JSON.stringify(answer)}`);
          } else {
            await message.channel.send(`${JSON.stringify(answer)}`);
          }
        }
      }
    } catch (e) {
      if (e instanceof RangeError && e.code === "MessageContentType") {
        console.log("Error: Message content must be a string");
        message.reply("An error occurred while processing the response.");
      } else {
        console.log("Error:", e);
        message.reply("An error occurred while processing the response.");
      }
    }
  }
};
