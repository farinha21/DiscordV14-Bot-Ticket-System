const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-ticket')
        .setDescription('🎫 Setup the ticket system! /setup-ticket')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => option.setName('channel').setDescription('📝 The channel where the ticket system will be setup!').setRequired(true))
        .addRoleOption(option => option.setName('support-role').setDescription('👮‍♂️ The role that will be able to see the tickets!').setRequired(true))
        .addChannelOption(option => option.setName('open-category').setDescription('📂 The category where the tickets will be opened!').setRequired(true))
        .addChannelOption(option => option.setName('close-category').setDescription('📂 The category where the tickets will be closed!').setRequired(true)),

    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        const supportRole = interaction.options.getRole('support-role');
        const openCategory = interaction.options.getChannel('open-category');
        const closeCategory = interaction.options.getChannel('close-category');

        await interaction.deferReply({ ephemeral: true }); // This will defer the reply to the user, so the bot will not be "thinking" for a long time.

        // Check if the channel is a text channel.
        if (channel.type !== ChannelType.GuildText) return interaction.editReply({ embeds: [client.config.embeds.E('The channel must be a text channel!')] });
        if (openCategory.type !== ChannelType.GuildCategory) return interaction.editReply({ embeds: [client.config.embeds.E('The open category must be a category channel!')] });
        if (closeCategory.type !== ChannelType.GuildCategory) return interaction.editReply({ embeds: [client.config.embeds.E('The close category must be a category channel!')] });

        // Embeds
        const ticketEmbed = new EmbedBuilder()
            .setTitle('🎫 Ticket System')
            .setDescription('\`📝\` : Open a ticket by clicking on the button below!')
            .setColor(client.config.colors.info)
            .setTimestamp();

        // Buttons
        const ticketRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('open-ticket')
                    .setEmoji('🎫')
                    .setStyle(ButtonStyle.Secondary)
            );

        await channel.send({ embeds: [ticketEmbed], components: [ticketRow] }); // Send the embed and the button to the channel in line 16.

        const ticketData = {
            supportRoleID: supportRole.id,
            openCategoryID: openCategory.id,
            closeCategoryID: closeCategory.id
        }; // Create an object with the data.

        fs.writeFileSync(`ticket.json`, JSON.stringify(ticketData, null, 4)); // Write the data to the file.

        await interaction.editReply({ embeds: [client.config.embeds.S('🎫', 'The ticket system has been setup!')] }); // Edit the reply to the user.
    }
};