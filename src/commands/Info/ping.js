module.exports = {
    /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  data: {
    name: 'ping',
    description: 'Replies with the bot ping!',
  },

  async execute (client, interaction) {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
    );
  },
};
