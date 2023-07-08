const {PermissionsBitField} =require('discord.js')

module.exports = {
    name: 'bulkdelete',
    description: 'Delete x amount of messages in a channel',
    cooldown: 4,
    data: {
        'name':'bulkdelete',
        'description':'Bulk deletes x messages in channel',
        'options':[
            {
                'name':'number',
                'description':'Deletes x amount of messages',
                'type':4,
                'required':true
            },
            {
                'name':'channel', 
                'description':'Channel to bulk delete in',
                'type':7,
                'required':false
            }
        ]
    },
    execute(interaction){
        const client = interaction.client;
        const channel = interaction.options.getChannel('channel') || interaction.channel
        if(!channel.permissionsFor(client.user.id).has([PermissionsBitField.Flags.ManageMessages]||
            !channel.permissionsFor(interaction.user.id).has([PermissionsBitField.Flags.ManageMessages]))){
                return interaction.reply({content:"One of us is missing permissions...", ephemeral:true})
            }
        const toDelete = interaction.options.getInteger('number');
        channel.bulkDelete(toDelete)
            .then(()=>{
                return interaction.reply({content: `Successfully deleted ${toDelete} messages in ${channel.name}`,ephemeral: true})
            })
            .catch(error=>{
                console.log(error);
                return interaction.reply({content:`Error on trying to delete messages...(${error.rawError.message})`, ephemeral:true})
        })

    }
}