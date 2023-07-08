// const {ServerSearch, ServerOptions} = require("../../my-modules/server_stuff/ServerSearch");
// const serverSearch = new ServerSearch('./my-modules/server_stuff')
module.exports = {
    name: 'eventform',
    description: 'Sends an event form link to sign into any events from that club',
    cooldown: 5,
    data:{
        'name':'eventform',
        'description':'Sends an event form link to sign into club events',
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
        let link = client.ss.genericServerSearch(client.so.eventForm, interaction.guild.id)
        if(link){
            const target = interaction.options.getUser('target');
            const isTarget = target !== undefined && target !== null? true : false
            const eventform = {
                title:'Event Sign-In Form', 
                description:`[Fill out this google form](${link}) to sign in to a club event`,
                thumbnail:{
                    url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
                },
                color: client.user.hex
            }
            if(isTarget){
                return interaction.reply({content: `<@${target.id}>`,embeds:[eventform]});
            }
            return interaction.reply({embeds:[eventform]});
        }
        if(!link){
            return interaction.reply({content:`'/${interaction.commandName}' is not available in this server right now :(`, ephemeral: true})

        }
    }
}