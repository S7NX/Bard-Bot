const { Client, Guild } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings');
const UserSettings = require('../../models/UserSettings');

/**
 *
 * @param {Client} client
 * @param {Guild} guild
 */
module.exports = async (client, guild) => {
  try {
    const guildId = guild.id;
    if (!guildId) return;
    console.log(`I have left the guild ${guild.name}`);

    const guildSettings = await GuildSettings.findOne({ guildId });
    if (!guildSettings) return;
    const { channelId, backstory} = guildSettings;
        // Remove the guild settings from the database
    await GuildSettings.deleteMany({ guildId, channelId, backstory}).catch((error) => {
      console.log(error);
      });
  } catch (error) {
    console.log(`Error Deleting Guild Data automatically: ${error}`);
  }
};
