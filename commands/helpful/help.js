// const desc =(command) =>[
//     `**Command Name**: ${command.name}`,
//     `**Description**: ${command.description}`,
//     `**Cooldown**: ${command.cooldown}`
// ].join("\n")
const types = {
    3:'STRING',
    4:'INTEGER',
    5:'BOOLEAN',
    6:'USER',
    7:'CHANNEL',
    8:'ROLE',
    9:'MENTIONABLE',
    10:'NUMBER',
    11:'ATTACHMENT',
}
function getCommandString(command, fields=[]){
    if(!command.options){
        fields.push({name:command.name,value:command.description})
    }
    else if(command.options){
        let noSubs = {name:`/${command.name} `, value:`${command.description}\nArgs: `};
        let noSubsTruth = false
        for(let subGroup=0;subGroup<command.options.length;subGroup++){
            let com = command.options[subGroup];            
            if(com.type === 2){
                // if the current command is of type 2, it is a subcommandGroup, therfore,
                //  it has another level to go into the subcommands in that subcommandGroup
                for( const subCommand of com.options ){
                    let args = subCommand.options ? `\nArgs: ${subCommand.options.map(ele=>`${ele.name} (type:${types[ele.type]})`).join(" ")}` : "";
                    fields.push({name:`/${command.name} ${com.name} ${subCommand.name}`, value: `${subCommand.description}${args}`})
                }
            }
            else if( com.type ===1 ){
                // else if it type 1, it is a subcommand so explore that instead
                let args = com.options ? `\nArgs: ${com.options.map(ele => `${ele.name} (type:${types[ele.type]})`).join(" ")}` : "";
                fields.push({name: `/${command.name} ${com.name}`, value: `${com.description}${args}`})
            }
            else if( com.type > 2 && com.type <12 ){
                noSubs.value += `${com.name} (type:${types[com.type]}) `
                noSubsTruth = true
            }
        }
        if(noSubsTruth === true) fields.push(noSubs)
    }
    return fields
}

module.exports = {
    name: 'help',
    description: 'Help command',
    cooldown: 1,
    data: {
        'name':'help',
        'description':'Display commands or info on one command',
        'options':[
            {
                'name':'command',
                'description':'Get info on a specific command',
                'type': 3,
                'focused':true,
                'autocomplete':true
            }
        ]
    },    
    async autocomplete(interaction){
        const client = interaction.client
        let choices = []
        const focusedOption = interaction.options.getFocused(true);
        if(focusedOption.name === 'command'){
            client.commands.forEach((item, key)=>{
                if(key){
                    choices.push(item.name)
                }
            })
        }
        const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
        await interaction.respond(
            filtered.map(choice=> ({name: choice, value: choice}))
        )

    },
    execute(interaction){
        const client = interaction.client;
        const comm = interaction.options.getString('command');
        if(comm !== undefined && comm !== null){
            const command = client.commands.get(comm)
            if(!command) return
            let fields = getCommandString(command.data);
            const desc = [
                `**Base Command Name**: ${command.name}`,
                `**Description**: ${command.description}`,
                `**Cooldown**: ${command.cooldown}`
            ].join("\n")
            const helpfulEmbed = {
                title: command.name,
                description: desc,
                fields:fields,
                color: client.user.hex,
                thumbnail:{
                    url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
                }
            }
            return interaction.reply({embeds:[helpfulEmbed]})
        }
        let fields = [];
        client.commands.forEach((item, key)=>{
            if(key){
                fields.push({name: item.name, value: item.description})
            }
        })
        const helpEmbed = {
            title:`${client.user.username} Bot's commands`,
            description: 'CommandName: Description Formatting',
            fields:fields,
            color: client.user.hex,
            thumbnail:{
                url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
            }, 
        }
        return interaction.reply({embeds:[helpEmbed]})
    },
    getCommandString
}