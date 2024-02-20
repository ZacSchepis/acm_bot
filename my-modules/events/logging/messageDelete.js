module.exports = {
    name: 'messageDelete',
    description: 'A message has been deleted',
    async messageDelete(message){
        const client = message.client;
        const id = client.ss.genericServerSearch(client.so.logChannel, message.guild.id)
        if(!message.guild || message.author.bot)
        {
            return;
        }
        if(id != null && !message.author.bot)
        {
            const logchamp = await client.channels.cache.get(id);
            const DeletedMessageEmbed = {
                author : { name : message.author.tag, icon_url : message.author.avatarURL() },
                title : `Message deleted in ${message.channel.name}`,
                description : `${message.content}`,
                color : 0x00a4c9,
                timestamp: new Date().toISOString(),
                thumbnail: { url : "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png" },

            }
            return logchamp.send({embeds:[DeletedMessageEmbed]})
        }
    }
    
    

}