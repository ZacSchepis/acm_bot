const { ChannelType } = require('discord-api-types/v10');

module.exports = 
{
    name: 'messageUpdate',
    description: 'A message has been updated',
    async messageUpdate(oldMessage, newMessage)
    {
        const client = oldMessage.client;
        const id = client.ss.genericServerSearch(client.so.logChannel,newMessage.guild.id)
        if(oldMessage.content === newMessage.content)
        {
            return;
        }
        if(oldMessage.channel.type === ChannelType.DM 
            || oldMessage.author.bot)
            {
                return;
            }
        if(!oldMessage.guild || oldMessage.author.bot)
        {
            return;
        }
        if(id != null)
        {
            let logchamp = await client.channels.cache.get(id);
            const EditedEmbed = 
            {
                author: { name : oldMessage.author.tag, icon_url : oldMessage.author.avatarURL()},
                title : `Message edited in ${oldMessage.channel.name}`,
                fields: [
                    {
                        name : `**User**`, 
                        value : `**Name: **${newMessage.author.tag}\n**Mention: **<@${newMessage.author.id}>\n**ID: **${newMessage.author.id}`,
                        inline : true
                    },
                    {
                        name : `**Channel**`, 
                        value : `**Name: **\<#${newMessage.channel.id}>\n**Mention:  **<#${newMessage.channel.id}>\n**ID: **${newMessage.channel.id}`,
                        inline : true
                    },
                    {
                        name :"**Before**",
                        value : `${oldMessage.content}`
                    },
                    {
                        name : "**After**",
                        value : `${newMessage.content}`
                    }
                ],
                thumbnail: { url : "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png" },
                color : 0x00a4c9
            }
            // let fields = [{name:`**User**`,value:`**Name: **${newMessage.author.tag}.\n**Mention: **<@${newMessage.author.id}>\n**ID: **${newMessage.author.id}`,inline:true},{name:`**Channel**`,value:`**Name: **\<#${newMessage.channel.id}>\n**Mention:  **<#${newMessage.channel.id}>\n**ID: **${newMessage.channel.id}`,inline:true},{name:"**Before**",value:`${oldMessage.content}`},{name:"**After**",value:`${newMessage.content}`}]
            return logchamp.send({embeds : [EditedEmbed]}).catch(()=>{
                console.log(`'${oldMessage.author.tag}' `)
            })
        }
    }
    

}