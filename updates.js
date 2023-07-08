const {PermissionsBitField, channelLink} = require('discord.js')
const fs = require('fs')
const {join} = require('path')
const updates =
{
    "title":"Recent Changes to ACM Bot",
    "description":"I have been working on improving this bot over the past few days, and here is what I have done",
    "fields":[
        {
            "name":"Less Redundant Code",
            "value":"Commands now follow [this style](https://github.com/roefinoavrililo/Discord.JS-Leveling-Bot/blob/master/commands/help.js)\nBefore, my code was conditionally checking everything in the index file" 
        },
        {
            "name":"Slash Command Improvements",
            "value":"Slash commands have also been remade and restructured, typing in `/` will show you some more commands that this bot can use. I've made it so commands can have subcommands instead of a jumble of options. The `/help` slash command now is more useful, allowing you to search info on a specific command. Commands now also have a short cooldown time."
        },
        {
            "name":"Future Improvements Plan",
            "value":"Before this summer ends, I would like get these all either set up or finished being set up:\n\t1. Finish reworking the slash commands\n\t2. Add in an XP leveling system, as well as a way to potentially reward club members with XP or something for attending ACM club events.\n\t3. Add in some other commands too. One such command being a way to automatically sign into a club event with one quick command, but maybe that will be at a later point in time. Another command I have in mind is to be able to create rolemenu's."
        },
        {
            "name":"Website Dashboard",
            "value":"Maybe at some point in the future, I would like to get a website dashboard setup for this bot. Maybe not. Who knows? Sure would be nice."
        },
        {
            "name":"Other stuff",
            "value":"If you have any feedback of improvements or additions that can be made to this bot, either run `/suggest bot` and input a suggestion via that box, it will go directly to me (appsro#0) in my support/testing server I set up for this bot, or you can just DM/mention me."
        }
    ],
    "thumbnail":{
        "url":"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
    },
    "color":0x00a4c9
}
const acknowledgeStatus = true
module.exports= {
   
    async checkUpdates(client){
        if( acknowledgeStatus === true ){
            return
        }
        await client.guilds.cache.map(element => {

            let channel = client.channels.cache.get(element.systemChannelId)
            let canPost = channel.permissionsFor(client.user.id).has([PermissionsBitField.Flags.SendMessages,PermissionsBitField.Flags.EmbedLinks])
            if(canPost)
            {
                console.log(`I have the permissions to send in: ${channel.name} (${channel.guild.name},${channel.guild.id}) :)`)
                channel.send({embeds:[updates]})
                .then(()=>{
                    console.log(`Sent embed to: ${channel.name} (${channel.guild.name},${channel.guild.id})`)
                })
                .catch((error)=>{
                    console.log(`Error sending embed in: ${channel.name} (${channel.guild.name},${channel.guild.id})\nError:${error.rawError.nessage}`)
                    console.log(error)
                })
            }
            else if(!canPost){
                // let altChannel = 
                console.log(`missing a permission in...${channel.name} (${channel.guild.name},${channel.guild.id})...skipping`)
            }
            // console.log(element.systemChannelId)
        });
    },
    updateREADME(){
        // Note, this is NOT the prettiest thing ever.
        // BUT, it is quite nice because I am lazy 
        let commandsInfo = [];
        let generalChanges = [];
        let updateNotes;
        const commandFoldersPath = join(__dirname, 'commands');
        const commandFolders = fs.readdirSync(commandFoldersPath);
        let file_contents = `# ACM Bot\n<img title="ACM logo" alt="ACM logo" src="${updates.thumbnail.url}>`
        let level = 0
        for(const folder of commandFolders){
            level +=1 
            commandsInfo[level-1] = `\n${level}. [${folder}](#${folder})`
            generalChanges[level-1] = `\n## ${folder} <a name="${folder}"></a>`;
            let subLevel = 0
            const commandsPath = join(commandFoldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
            for( const file of commandFiles){
                const command = require(join(commandsPath, file));
                if( command.name && command.description){
                    subLevel += 1
                    commandsInfo[level-1] += `\n\t${subLevel}. [${command.name}](#${command.name})`
                    generalChanges[level-1] += `\n### ${command.name} <a name="${command.name}"></a>\n${command.description}`
                }
            }
        }
        let lazyUpdate = updates.fields.map(ele=>`## ${ele.name}\n${ele.value}`)
        updateNotes = [
            `\n# ${updates.title}(${new Date().toISOString()})`,
            `${lazyUpdate.join('\n')}`
        ].join('\n')
        fs.writeFileSync('./README.md',file_contents+"\n"+updateNotes+commandsInfo.join('\n')+generalChanges.join('\n'))
    }
}