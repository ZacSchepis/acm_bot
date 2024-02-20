const { EmbedBuilder, WebhookClient } = require('discord.js');
const { id, token } = require('../../imp/webhook.json');
'/home/appsro/CodingStuff/acm_bot/my-modules/google_calendar/calendar_test.js'
const {authorize, listEvents, makeUnix} = require('/home/appsro/CodingStuff/acm_bot/my-modules/google_calendar/calendar_test.js')

const webhookClient = new WebhookClient({ id: id, token: token });


// To get weekly events, uncomment the below lines
async function testHook(){
    const cli = await authorize()
    const EventsEmbed = {
        title: "Upcoming Events",
        description: "Here are the upcoming events",
        fields: await listEvents(cli),
        color: 0x00a4c9,
        thumbnail:{
            url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
        }
    }
    // const channel_ = await webhookClient.channels.cache.get('613534490941325319')
    webhookClient.send({embeds:[EventsEmbed]}).then(()=>{console.log(`Sent:Embed maybe?`)}).catch(console.error)
    
    // Uncomment the lines above this
    
}
testHook()