module.exports = {
    name: 'sendbotmessage',
    description:'Send message through this bot via DM',
    cooldown: 2,
    specific:true,
    data:{
        'name':'sendbotmessage',
        'description':'Send message through this bot via DM',
        'options':[
            {
                'name':'userid', 
                'description':'The user to send this DM to',
                'type':3, 
                'required':true
            },
            {
                'name':'content',
                'description':'The message to send',
                'type':3,
                'required': true
            },
            {
                'name':'file',
                'description':'Optional file to attach',
                'type':11,
                'required':false
            }
        ]
    },
    async execute(interaction){
        const client = interaction.client;
        const id_ = interaction.options.getString('userid')
        const user = await client.users.fetch(interaction.options.getString('userid'));
        if ( user !== null && user !== undefined ){
            const content = interaction.options.getString('content');
            const attachment = interaction.options.getAttachment('file');
            return user.send({content:content})
                .then(()=>{
                    return interaction.reply({content:`Hopefully sent: "${content}" to "${user.tag}"`})
                })
                .catch(error=>{
                    console.log(error);
                    return interaction.reply({content:`Could not send message to "${user.tag}".`, ephemeral: true})
                })
        }
        return interaction.reply({content:`Could not find ${interaction.options.getString('userid')}`, ephemeral:true})
    }
}