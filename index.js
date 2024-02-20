// Discord Imports 
const { Client, GatewayIntentBits, Partials ,IntentsBitField, DiscordAPIError, PermissionsBitField } = require('discord.js');
const { ChannelType } = require('discord-api-types/v10');
const Discord = require('discord.js')
// imports from node
// const rp = require('request-promise');
var fs = require("fs");

// Importing my stuff
const {ServerSearch, ServerOptions} = require("./my-modules/server_stuff/ServerSearch.js");
const {checkUpdates, embed, acknowledgeStatus} = require('./updates.js')
const { authorize, listEvents, makeUnix } = require('./my-modules/google_calendar/calendar_test.js')
const { create, read, update, delete_} = require("./attempting.js");
const { token, clientId } = require('./config.json');

const lazyfill = (m) =>{
	fs.writeFileSync("lzy.txt", m.content);
}
const client = new Client(
    { 
        intents: 
        [
            GatewayIntentBits.GuildMembers,
            new IntentsBitField(
            [
                IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.MessageContent, 
                IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages
            ])
        ], 
        partials: 
        [
            Partials.Channel, Partials.Message, Partials.Reaction
        ] 
    });
const acm_thumbnail = {thumbnail:{url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
const acm_image_link = "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png";
const cron = require("node-cron")

const cooldowns = new Discord.Collection()
client.jobs = new Discord.Collection()
client.commands = new Discord.Collection()
client.logging = new Discord.Collection()
//const monrem = const mondayDayReminder = {title: "ACM Club Meeting This Thursday", description: "This thursday there will be an ACM Club Meeting
//const mondayDayReminder = {title: "ACM Club Meeting This Thursday", description: "This thursday there will be an ACM Club Meeting @ 5pm in the [Lilibridge Engineering Lounge](https://goo.gl/maps/JCUxgBBd3cDFe5Jk7)",color: 0x00a4c9, thumbnail:{url: "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
const { Event } = require('./my-modules/events/event_builder.js')
const { join } = require('path')
const EventEmitter = require('events');
const event = new EventEmitter();
const EVENTS = {JOB_COMPLETE: 'JOB COMPLETE'}
//TODO: Add a job complete event
event.on(EVENTS.JOB_COMPLETE, ()=>{
    //Use some method to remove teh job from the stack
    if(jobsQueue.length === 0){
        return;
    }
    jobsQueue.shift().stop();

    // and then it is all good
})

let jobsIdx = 0
const jobsQueue = []

const addCronJob = (cronExpression, jobFunction) =>{
    console.log(`Adding job for time: '${cronExpression}' to be queued.\n`)
    const cronJob = cron.schedule(cronExpression, jobFunction, {timezone: 'America/Boise'})
    jobsQueue.push({ cronJob, jobIdx: jobsIdx++ })
    // jobsIdx++
    // jobsQueue.push({ cronExpression, jobFunction })
    // jobsQueue.sort((a,b) => a.executeTime - b.executeTime);
}
const executeJobs = ()=>{
    const currentTime = Date.now();
    jobsQueue.forEach((jobInfo)=>{
        const { cronExpression, jobFunction } = jobInfo;
        if(cron.schedule(cronExpression).next().isSameOrBefore(currentTime)){
            jobFunction();
            event.emit(EVENTS.JOB_COMPLETE);

        }
    })
}
// setInterval(executeJobs, 60000);



// let Reminder = new ReminderStuff();
/* UNCOMMENT THIS FOR SERVER LISTENING
const net = require('net');
const { Server } = require('http');

const HOST = 'localhost';
const PORT = 3337;
const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log(`Received data(${new Date()}):`, data.toString());
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, HOST, () => {
  console.log('Server listening on', HOST + ':' + PORT);
});

*/
function convert(integer) {
    var str = Number(integer).toString(16);
    return str.length == 1 ? "0" + str : str;
};


client.once('ready', async () =>
{
    
    const serverSearch = new ServerSearch("./my-modules/server_stuff")
    
    client.ss = serverSearch
    console.log('Benders back baby!');
    client.user.color=42185;
    client.user.hex = parseInt('0x'+convert(client.user.color).padStart(6,"0"));
    client.so = ServerOptions
    checkUpdates(client)
    let folderPath = join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(folderPath);
    for (const folder of commandFolders)
    {
        const commandsPath = join(folderPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
        for (const file of commandFiles)
        {
            const filePath = join(commandsPath, file);
            const command = require(filePath);
            if('data' in command && 'execute' in command)
            {
                client.commands.set(command.name, command)
            }
        }
    }

    folderPath = join(__dirname, 'my-modules/events/logging');
    const loggingFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of loggingFiles)
    {
        const logPath = join(folderPath, file);
        const logging = require(logPath) 
        if('name' in logging)
        {
            client.logging.set(logging.name, logging)
        }
    }
    // console.log(jobsQueue)
    const eventChannel = client.channels.cache.get('799813234709233664')
    const Events = await authorize().then(listEvents).catch(console.error)
    // console.log(Events.event)
    Events.event.forEach((job)=>{
        addCronJob(job.cronExpression,  ()=>{
            console.log(`Posting Event Notification for: ${job.data.title}, ${job.cronExpression}`)
            eventChannel.send({embeds:[job.data]})
            console.log(`Removing: ${jobsQueue.filter((ele)=>ele.jobIdx === jobsIdx)}`)

            jobsQueue = jobsQueue.filter((ele) => ele.jobIdx !== jobsIdx)
            // jobsQueue.forEach((ele)=>{

            //     if(ele.jobIdx === jobsIdx){
            //         console.log(`Removing: '${ele}' from the queue.`)
            //         jobsQueue.splice(jobsIdx, 1)
            //     }
            // })
        })
    })
    // console.log(jobsQueue)

});

    // To get weekly events, uncomment the below lines
    //
    // const cli = await authorize()
    // const EventsEmbed = {
    //     title: "Upcoming Events",
    //     description: "Here are the upcoming events",
    //     fields: await listEvents(cli),
    //     color: client.user.hex,
    //     thumbnail:{
    //         url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
    //     }
    // }
    // const channel_ = await client.channels.cache.get('613534490941325319')
    // channel_.send({embeds:[EventsEmbed]}).then(()=>{console.log(`Sent:Embed maybe?`)}).catch(console.error)
    
    // Uncomment the lines above this
   
/*
cron.schedule('00 07 * * 2,3', async ()=>{
    console.log("it's croning time")
    const {dunID} = require("./config.json")
    // const dunID = '294781978815889409'
    client.users.send(dunID, "Don't forget to bring your laptop before you leave town for work, and also your AirPods.").then(()=>{console.log(`Likely sent reminder to Dunya`)})
})
*/

// async function ScrapeXKCD(){
//     const xkcdlink = "https://c.xkcd.com/random/comic/";
//     const sta = Date.now();
//     let result={}
//     const pat =/<meta property="og:image" content="([^<]*)">/
//     const numpat = /<meta property="og:url" content="([^<]*)">/
//     const titlepat = /<meta property="og:title" content="([^<]*)">/
//     await rp(xkcdlink).then(function(html){result.title = html.split(titlepat)[1];result.url=html.split(numpat)[1];result.picture=html.split(pat)[1]}).catch(function(err){console.log(err)})
//     result.time = Date.now()-sta;
//     return result
// }


client.on('guildCreate', guild=>{
    console.log(`Was added to another server :D (${guild.name})`)
    client.ss.addDefaultServer(guild.id);
    client.ss.writeLocalChange(guild.id, ServerOptions.serverName,guild.name)

})
client.on('messageCreate', async (message) =>{
    // If the channel the message was received in is a DM channel
    //  or the author of the message is a bot
    //  return
    if( message.channel.type === ChannelType.DM 
        || message.author.bot ) 
        {
            return;
        }
    //lazyfill(message);
	const pass_channelid = client.ss.genericServerSearch(client.so.passwordChannel, message.guild.id);
    // If the channel the message was sent in is a password channel
    //  and if that server has a password channel ...
    if(message.channel.id === pass_channelid  && pass_channelid != null)
    {
        const role = client.ss.findServerPasswordRole(message.guild.id, message.content.toLowerCase());
        const notDupe = client.ss.verifyNotDupe(message.guild.id, message.member._roles) 
        if(notDupe)
        {
            console.log("User is already verified");
            return;
        }
        if(role)
        {
            if(role[0] === undefined)
            {
                message.author.send({content:"Invalid password, please use a listed password as described above."});
                return;
            }
            message.member.roles.add(role[0]['role']).then(()=>
            {
                message.member.roles.remove(role[1]).catch(()=>
                {
                    console.error;
                    console.log(
                        [
                            `Error in ${message.guild.name}, by ${message.author.tag} in #${message.channel.name}.`,
                            `Likely: User verification errored because no temp role`,
                            `({tempRole:${client.ss.genericServerSearch(client.so.tempRole, message.guild.id)}})`
                        ].join(" "))
                });
            });
            message.delete();
        }
    }

    // So this feature is a thing that would automatically send a notification about club events.
    // This code is bad code, so it probably won't be used ever again, but I might re-purpose it later
    // TEMPORARILY REMOVED
    // if(message.guild.id === "613534490941325315"){
    //     let tempcode = "";
    //     let conn = await pool.getConnection();
    //     let stuff = await conn.query("SELECT * FROM Reminder;");
    //     delete stuff.meta;
    //     console.log({"canSend":stuff[0].canSend,"isSent":stuff[0].isSent})
        
    //     if((stuff[0].canSend === 1) && (new Date().getDay()===3)){
    //         DisplayUsed("A Club Meeting Reminder Can Be Sent Today")
    //         let problems = await conn.query(`SELECT link FROM SERVER_LINKS WHERE SERVER_ID="${message.guild.id}" AND label="leet";`)
    //         delete problems.meta;
    //         problems.forEach(ele=>{tempcode+=ele.link+"\n"})
    //         console.log({title:"This Weeks Leet Code Problem(s)",description:`${tempcode}`})
    //         updateboth(0,1);
    //         console.log("Yes")
    //     }
    //     if((stuff[0].canSend === 0) && (new Date().getDay() !==3)){
    //         DisplayUsed("A Club Meeting Reminder Cannot Be Sent Today")
    //         updateboth(1,0);
    //         console.log("No")
    //     }
    //     if((stuff[0].isSent ===1) && (new Date().getDay()===3)) {DisplayUsed("A Club Meeting Reminder Was Probably Sent Today");conn.end();}
    //     conn.end();
    //     /*
    //     if (Reminder.canSend(new Date().getDay())===true){
    //         console.log("Yes")
    //         console.log(Reminder.getStatus())
    //     }*/
    // }

})
client.on('interactionCreate', async interaction =>{    
    const command = client.commands.get(interaction.commandName)
    if (!command)
    {
        return;
    }
    if (!cooldowns.has(command.name))
    {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown ||1)*1000;
    
    if(timestamps.has(interaction.user.id))
    {
        const expireTime = timestamps.get(interaction.user.id)+cooldownAmount;

        if(now < expireTime){
            const timeLeft = (expireTime - now) /1000;
            return interaction.reply(
                {
                    content:`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the /${interaction.commandName} command`, 
                    ephemeral:true
                }
            );
        }
    }
    try{
        if(interaction.isAutocomplete())
        {
            await command.autocomplete(interaction);
        }
        else if(!interaction.isAutocomplete())
        {
            command.execute(interaction);
        }

    }
    catch(error)
    {
        console.error(error);
        interaction.reply(
            {
                content:"There was an error executing that command.", 
                ephemeral:true
            })
            .catch(console.error)
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(
        ()=> timestamps.delete(interaction.user.id), cooldownAmount);
});

//
    // if(interaction.commandName==='leetcode'){
    //     interaction.reply({content:`'/${interaction.commandName}' is not available in this server right now :(`, ephemeral: true})
    //     return
        // const prob = interaction.options.getString('problem');
        // //let pat = /"["[]/https://leetcode.com/problems/add-two-numbers/
        // let lepet = /https:\/\/www.leetcode.com\/problems\/
        // if(!lepet.test(prob)){interaction.reply({content:"Incorrect format. Try again, using the format of `https://www.leetcode.com/problems/problem-name-goes-here`",ephemeral:true});return;}
        // let pat = /<title>([^<]*)<\/title>/
        // let conn = await pool.getConnection();
        //     rp(prob).then(function(html){let temp = html.split(pat);
        //         conn.query("INSERT INTO SERVER_LINKS (SERVER_ID, link, label) VALUES "+`("${interaction.guild.id}","[${temp[1]}](${prob})","leet");`).then(console.log("added leet code success")).catch(function(err){console.log(err)})
        //     })
        //     .catch(function(err){console.log(err)})
        
        // //let pat = new RegExp("[*](https://www.leetcode)");
        // //conn.query("INSERT INTO SERVER_LINKS (SERVER_ID,link,label) VALUES ("+`'${interaction.guild.id}','${prob}','leet');`).then(()=>{interaction.reply({content:"Hopefully added : "+prob+".",ephemeral:true})})
    //}
    
//     if(interaction.commandName  === "enablelogging"){
//         const chan = interaction.options.getChannel('logchannel')
//         console.log(chan)
//         if(!chan.permissionsFor(client.user.id).has(['SEND_MESSAGES','READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'VIEW_CHANNEL']))
//         {
//             interaction.reply({content:`[Missing permissions](https://www.youtube.com/dQw4w9WgXcQ)`})
//             return
//         }
//         console.log("Has perms")
//         serverSearch.writeLocalChange(interaction.guild.id, ServerOptions.logChannel,`${chan.id}`)
//         interaction.reply({content:"Hopefully sucessfully added logging potential to that channel"})

//     }
//     if(interaction.commandName === 'enablebasicwelcome'){
//         const chan = interaction.options.getChannel('welcomechannel');
//         if(!chan.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'VIEW_CHANNEL'])){
//             interaction.reply({content:"Missing permissions :(",ephemeral:true})
//             return
//         }
//         serverSearch.writeLocalChange(interaction.guild.id, ServerOptions.welcomeChannel, chan.id)
//         interaction.reply({content:"Hopefully sucessfully added welcome message potential to that channel", ephemeral: true})
//     }
//     if(interaction.commandName === 'gradecalc'){
//         const gradefile = interaction.options.getAttachment('gradefile');
//         if(!gradefile) interaction.reply("No file was attached, try again");
//         try{
//             const response = await fetch(gradefile.url);
//             if(!response.ok){return interaction.reply("There was an error with fetching the file: "+response.statusText)}
//             const text = await response.text();
//             if(text) interaction.reply({content:`${interaction.user}`, embeds:[calculategrades(text, interaction.user.username)],ephemeral:true})
//         }catch(error){console.log(error)}
//     }
//     if(interaction.commandName === 'uptime'){
//         // console.log(interaction.options)
//         let totalSeconds = (client.uptime / 1000); let days = Math.floor(totalSeconds / 86400);
//         totalSeconds %= 86400; let hours = Math.floor(totalSeconds / 3600); totalSeconds %= 3600; let minutes = Math.floor(totalSeconds / 60);
//         let seconds = Math.floor(totalSeconds % 60);
//         let timestring = `${days}d ${hours}h ${minutes}m ${seconds}s`
//         interaction.reply(`${client.user} has been online for: ${timestring}`)
//     }
// });
// */
//#endregion



client.on('messageDelete', async (message) =>{
    const logging = client.logging.get('messageDelete');
    logging.messageDelete(message).catch(console.error);
    
})


client.on('messageUpdate', async (oldMessage, newMessage)=>{
    const logging = client.logging.get('messageUpdate');
    logging.messageUpdate(oldMessage, newMessage).catch(console.error);
})


client.on('guildMemberAdd', async newPerson=>{
   // One: User is new and a password is used in server....
   // so...dm them and also send message to welcome channel
    let passwordChannel = client.ss.genericServerSearch(client.so.passwordChannel, newPerson.guild.id);
    let welcomeChannel = client.ss.genericServerSearch(client.so.welcomeChannel, newPerson.guild.id);
    let passwords = client.ss.genericServerSearch(client.so.passwordRoles, newPerson.guild.id);
    let basic = {title:`Welcome to the ${newPerson.guild.name}!`,description:`<@${newPerson.user.id}>(${newPerson.user.tag}) has joined the server. You are the ${newPerson.guild.memberCount}th to join the server!\n:robot: beep-boop I am a [not] robot.`,color:0x00a4c9,thumbnail:{url:acm_image_link},footer:{text:`${newPerson.user.tag} joined at ${new Date().toDateString()}`}}
    if(welcomeChannel){
        let welcChan = await client.channels.cache.get(welcomeChannel);
        welcChan.send({embeds:[basic]})
    }
    if(passwordChannel){
        let passChan = await client.channels.cache.get(passwordChannel);
        const desc = `***This server uses a password verification system to identify new people.***\n*By "password", I mean a message. For example, sending one of the "passwords" below into <#${passwordChannel}> will give you the role related to it in the ${newPerson.guild.name} server.\nThe password to send will be distinct, with a description directly below it.*\nTo gain access to the rest of the server, you can send one of the following passwords in <#${passwordChannel}>.Alternatively, just send "${passwords[0].password}" to be placed under the default role.`
        basic.description = desc
        let fields_ = []
        passwords.forEach(element => fields_.push({name: `${element['password']}`, value: element['description'], inline:true }))
        basic.fields = fields_
        // passChan.send({embeds:[basic]})
        newPerson.send({embeds:[basic]}).catch(console.error)
    }
});
module.exports = {
    name:'index',
    description:'Recent updates to this file: "interactionCreate" handler is now done without conditionally checking which command was ran. Now each command is ran by: command.execute(interaction)'
}


client.on('warn', (warn) => console.warn(warn))
client.on('error',(error) => console.error(error))
client.login(token)
