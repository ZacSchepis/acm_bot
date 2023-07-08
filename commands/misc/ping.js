module.exports = {
    name: 'ping',
    description: 'Responds with "PONG"',
    cooldown:2,
    data:{
        'name':'ping',
        'description':'responds with "PONG"'
    },
    execute(interaction){
        return interaction.reply({content:'PONG'})
    }
}