// const desc =(command) =>[
//     `**Command Name**: ${command.name}`,
//     `**Description**: ${command.description}`,
//     `**Cooldown**: ${command.cooldown}`
// ].join("\n")
function getSubCommandsString(command, fields=[]){
    if (!command.options){
        fields.push({name:command.name, value:command.description})
    }
    else if ( command.options.length>1){
        command.options.forEach(element=>{
            let args = element.options ? `\nArgs: ${element.options.map(ele => ele.name).join(" ")}` : ""
            fields.push({name:`${command.name} ${element.name}`, value:`${element.description}${args}`})
            // if(element.options) getSubCommandsString(element, fields)
        })
    }
    else if (command.options.length == 1){
        let arg = command.options[0].name ? `\nArg: ${command.options[0].name}` : ""
        fields.push({name:`${command.name}`, value:`${command.description}${arg}`})
    }
    return fields
}
function typeing(command){
    
}

// conditional logic:
// base command
//  sub command 
//      sub command args
// args
// basic command


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
            let fields = getSubCommandsString(command.data);
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
    }
}