const {
  PermissionFlagsBits,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  SlashCommandBuilder,
} = require("discord.js");
const GuildSettings = require("../../models/GuildSettings");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("setup")
  .setDescription("Set up the channel for Bard.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addChannelOption(option =>
		option.setName('channel')
			.setDescription('The channel to Talk to Bard.')
      .setRequired(true)),
  

  async execute(client, interaction) {
    try {
      const channel = await interaction.options.getChannel('channel')
      let guildSettings = await GuildSettings.findOne({
        guildId: interaction.guild.id,
      });
      if (!guildSettings) {
        guildSettings = new GuildSettings({ guildId: interaction.guild.id });
      }
       guildSettings.channelId = channel.id
       guildSettings.save();
       const chl = await client.channels.fetch(guildSettings.channelId)
       chl.send('This Channel will now be use for Bard.')
       interaction.reply({ content: `Bard Has Been setup to <#${channel.id}>`})
/*
      const modal = new ModalBuilder()
        .setCustomId("setup")
        .setTitle("Server Setup");
      const DescriptionInput = new TextInputBuilder()
          .setCustomId("setup_modal_description_input")
          .setLabel("Back Story:")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(false);

        const secondActionRow = new ActionRowBuilder().addComponents(DescriptionInput);

        modal.addComponents(secondActionRow);

        if (guildSettings.backstory) {DescriptionInput.setValue(guildSettings.backstory);}
        await interaction.showModal(modal);*/
    } catch (error) {
      console.error(`Error: `, error);
      await interaction.reply({
        content: "An error occurred while setting up the bot.",
        ephemeral: true,
      });
    }
  },
};
