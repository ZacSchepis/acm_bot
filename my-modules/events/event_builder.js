
// {
//     timeZone: 'America/Boise',
//     weekday: 'long', month:'long', day: 'numeric',
//     hour: 'numeric', minute: 'numeric'
//   }).format(date);



/**
 * 
 * @typedef {Object} CronOptions
 * @property {string} [second]
 * @property {string} [minute]
 * @property {string} [hour]
 * @property {string} [dayMonth]
 * @property {string} [month]
 * @property {string} [repeatString]
 * @param {CronOptions} [options] 
 * @param {Date} time
 */
function makeCronTime(time, options = {}){

    // console.log(time)
    const test = new Intl.DateTimeFormat('en-US',{
        timeZone: 'America/Boise', minute: '2-digit', 
        hour: '2-digit', day:'2-digit', month: '2-digit', hour12:false
    })
    const parts = test.formatToParts(time)
    const cronTime = [
        // `${options.second       || parts[3].value}`,
        `${options.minute       || parts[6].value}`, 
        `${options.hour         || parts[4].value}`, 
        `${options.dayMonth     || parts[2].value}`, 
        `${options.month        || parts[0].value}`, 
        `${options.repeatString || "*"           }`
    ].join(" ")
    // const cronTime = `${parts[6].value} ${hour === "" ? parts[4].value : hour} ${parts[2].value} ${parts[0].value} ${repeatString === "" ? "*" : repeatString}`
    // console.log(cronTime)
    // console.log(test.formatToParts(time))
    return cronTime
}
    // To get weekly events, uncomment the below lines
    //
    // const cli = await authorize()
    // const upcomingEvents = await listEvents(cli)
    // const EventsEmbed = {
    //     title: "Upcoming Events",
    //     description: "Here are the upcoming events",
    //     fields: upcomingEvents,
    //     color: client.user.hex,
    //     thumbnail:{
    //         url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
    //     }
    // }
    // const channel_ = await client.channels.cache.get('613534490941325319')
    // channel_.send({embeds:[EventsEmbed]}).then(()=>{console.log(`Sent:Embed maybe?`)}).catch(console.error)
    
    // Uncomment the lines above this
    


// Usage:
// Where: id is an ID
// and fn is a function to callback later, but can't really pass args...
// const newEvent = Event.buildEvent(new Date() || Date.parse(new Date()), id, fn)
module.exports = {
    Event:{
        cronExpression: (time, options) => makeCronTime(time, options),
        eventId: (id) => id,
        callback: (fn) => fn,
        buildEvent: (time, id, fn, options) =>  {return {
            cronExpression: makeCronTime(time, options),
            eventId: id,
            callback: fn? fn : null 
            }
        }
    }

}

