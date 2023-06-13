const GuildSettings = require("../../models/GuildSettings");
const {  ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')
module.exports = async (client, interaction) => {
  try{
  if (interaction.isModalSubmit()) {
  if ((interaction.customid = "setup")) {
    const channelid = interaction.fields.getTextInputValue("setup_modal_channel_input");
    const description = interaction.fields.getTextInputValue("setup_modal_description_input");
    if (!interaction.guild.channels.cache.has(channelid)) return interaction.reply('Invalid Channel ID, Please run </setup:997253311306682481> after you get a valid channel id');
    const guildId = interaction.guild.id;
    const guildSettings = await GuildSettings.findOne({ guildId: guildId });
		const preview = new ButtonBuilder()
			.setCustomId('previewdesc')
			.setLabel('preview')
			.setStyle(ButtonStyle.Secondary);
      const test = new ButtonBuilder()
			.setCustomId('testdesc')
			.setLabel('test')
			.setStyle(ButtonStyle.Danger);
      const row = new ActionRowBuilder()
			.addComponents(test, preview);

    if (guildSettings) {
      // Modify the description and partner
      if (guildSettings.partner !== channelid) {
        guildSettings.partner = channelid;
        guildSettings.desc = description;
        const chl = await client.channels.fetch(guildSettings.partner)
        chl.send('This Channel Would now Be used as Partner Channel.')
      }
      guildSettings.desc = description;
      guildSettings.partner = channelid;

      // Save the changes
      await guildSettings.save();
      await interaction.reply({ content: `Successfully saved,`, components: [row], ephemeral: true})
    }
    if (!guildSettings) {
      const guildSettings = new GuildSettings({
        guildId: guildId,
        desc: description,
        partner: channelid,
      });

      await guildSettings.save();
      await interaction.reply({ content: `Successfully saved,\n> Partner Channel to <#${guildSettings.partner}>`, components: [row],})
      const chl = await client.channels.fetch(guildSettings.partner)
      chl.send('This Channel Would now Be used as Partner Channel.')
    }
  }
}
if (interaction.isButton()) {
  if (interaction.customId == 'previewdesc'){
    const guildSettings = await GuildSettings.findOne({ guildId: interaction.guild.id });
    const invite = await interaction.guild.channels.cache
    .get(guildSettings.partner)
    .createInvite();

    const embed = new EmbedBuilder()
    .setTitle(interaction.guild.name)
    .setDescription(`${guildSettings.desc}\n\n[Invite](${invite.url})`)
    .setColor("#2f3136")
    .addFields(
      {
        name: `Members: \`${interaction.guild.memberCount}\``,
        value: `Online: \`${interaction.guild.presences.cache.filter((p) => p.status === "online").size}\` | Idle: \`${interaction.guild.presences.cache.filter((p) => p.status === "idle").size}\` | DnD: \`${interaction.guild.presences.cache.filter((p) => p.status === "dnd").size}\``,
        inline: false,
      }
    )
    .setThumbnail(interaction.guild.iconURL())
    .setFooter({ text: `Bumped by ${interaction.user.username}`,iconURL: interaction.user.displayAvatarURL({dynamic: true,format: "png",size: 2048,}) })
    interaction.reply({
      embeds: [embed],
      ephemeral: true
    })

  }
  else if ( interaction.customId == 'testdesc'){
    const guildSettings = await GuildSettings.findOne({ guildId: interaction.guild.id });
    const chl = interaction.guild.channels.cache.get(guildSettings.partner)
    const invite = await interaction.guild.channels.cache
    .get(guildSettings.partner)
    .createInvite();

    const embed = new EmbedBuilder()
    .setTitle(interaction.guild.name)
    .setDescription(`${guildSettings.desc}\n\n[Invite](${invite.url})`)
    .setColor("#2f3136")
    .addFields(
      {
        name: `Members: \`${interaction.guild.memberCount}\``,
        value: `Online: \`${interaction.guild.presences.cache.filter((p) => p.status === "online").size}\` | Idle: \`${interaction.guild.presences.cache.filter((p) => p.status === "idle").size}\` | DnD: \`${interaction.guild.presences.cache.filter((p) => p.status === "dnd").size}\``,
        inline: false,
      }
    )
    .setThumbnail(interaction.guild.iconURL())
    .setFooter({ text: `Bumped by ${interaction.user.username}`,iconURL: interaction.user.displayAvatarURL({dynamic: true,format: "png",size: 2048,}) })
    let sent = await chl.send({
      embeds: [embed],
      fetchReply: true,
    })
    await interaction.reply({ content:` Successfully Sent, https://discord.com/channels/${interaction.guild.id}/${guildSettings.partner}/${sent.id}`})

  }

}
  }catch (e){
    console.log(e)
  }
};
