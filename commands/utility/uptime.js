module.exports = {
    name: 'uptime',
    description: "Displays this bots uptime",
    cooldown: 3, 
    category: 'Utility',
    data: {
        'name':'uptime',
        'description':'Displays how long this bot has been up for',
    },
    execute(interaction){
        const client = interaction.client;
        let totalSeconds = (client.uptime / 1000); 
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400; 
        let hours = Math.floor(totalSeconds / 3600); 
        totalSeconds %= 3600; 
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let timestring = `${days}d ${hours}h ${minutes}m ${seconds}s`
        interaction.reply(`${client.user} has been online for: ${timestring}`)
    }
}