const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    name: 'suggest',
    description: 'Send feedback directly to the support server for this bot',
    cooldown: 10,
    data: {
        'name':'suggest',
        'description':"Sends suggestion re this bot or server",
        'options': [
            {
                'name':'bot',
                'description':'Sends a suggestion to the bot dev',
                'type':1,
                'options':[
                    {'name':'suggestion', 'description':'suggestion','type':3, 'required':true}
                ]
            },
            {
                'name':'server',
                'description':'Sends a suggestion for this server (if enabled)',
                'type':1,
                'options':[
                    {'name':'suggestion','description':'suggestion','type':3, 'required':true}
                ]
            }
        ]
    },
    async execute(interaction){
        const client = interaction.client;
        const sugType = interaction.options.getSubcommand()
        const suggestion = interaction.options.getString('suggestion')
        const message_ = [
            `**User**: ${interaction.user.tag}`,
            `**User ID**: (${interaction.user.id})`, 
            `**Guild Name**: ${interaction.guild.name}`,
            `**Guild ID**: (${interaction.guild.id})`,
            `**Suggestion**: ${suggestion}`
        ].join("\n")
        const suggestionEmbed = {
            title: `:incoming_envelope:New Suggestion Submitted:incoming_envelope:`,
            description: message_,
            color: client.user.hex,
            thumbnail:{
                url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
            }
        }
        if(sugType === 'bot'){
            const suggestionChannel = await client.channels.cache.get('985231190216818748')
            suggestionChannel.send({content:'<@294781978815889409>',embeds:[suggestionEmbed]})
            return interaction.reply({content:`Sending: ${suggestion} to ${suggestionChannel.name}`, ephemeral: true})
        }
        else if(sugType === 'server'){
            const guildId = interaction.guild.id;
            const column = 'suggestionChannel'
            let suggestionChannel = client.ss.genericServerSearch(column, guildId)
            if(suggestionChannel !== null){
                suggestionChannel = await client.channels.cache.get(suggestionChannel)
                suggestionChannel.send({embeds:[suggestionEmbed]})
                return interaction.reply({content:`Sending: ${suggestion} to ${suggestionChannel.name}`, ephemeral:true})
            }
            else if(suggestionChannel === null){
                return interaction.reply({content:"This server currently doesn't have this feature enabled", ephemeral:true})
            }
        }
    }
}