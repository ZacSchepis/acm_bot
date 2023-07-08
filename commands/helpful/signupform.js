// const {ServerSearch, ServerOptions} = require("../my-modules/server_stuff/ServerSearch");
// const serverSearch = new ServerSearch('./my-modules/server_stuff')

module.exports = {
    name: 'signupform',
    description: 'Sends a designated signup form for this server',
    cooldown: 5,
    data:{
        'name':'signupform',
        'description':'Sends a designated signup form for this server',
        'options':[
            {
                'name':'target',
                'description':'User to mention',
                'type':6,
                'required':false
            }
        ]
    },
    execute(interaction){
        const client = interaction.client;
        let link = client.ss.genericServerSearch(client.so.signupForm, interaction.guild.id)
        if(link){
            const target = interaction.options.getUser('target');
            const isTarget = target !== undefined && target !== null? true : false
            const signupform = {
                title: 'Club Sign Up Form', 
                description:`[Fill out this google form](${link}) to become an official member of this club!`,
                thumbnail: {
                    url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
                },
                color: client.user.hex
                
            }
            if(isTarget){

                return interaction.reply({content: `<@${target.id}>`, embeds:[signupform],ephemeral:!isTarget});
            }
            return interaction.reply({embeds:[signupform],ephemeral:!isTarget});
        }
        if(!link){
            return interaction.reply({content:`'/${interaction.commandName}' is not available in this server right now :(`, ephemeral: true})
            
        }
    }
}