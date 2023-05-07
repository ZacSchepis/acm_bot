const { token } = require('./config.json');
//const {psicom, SI} =require('./searchingFile')
const { Client, GatewayIntentBits, Partials ,IntentsBitField} = require('discord.js');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const rp = require('request-promise');
require("./my-modules/server_stuff/server.json")
const myIntents = new IntentsBitField();
//const fetch = require('node-fetch')
//const {calculategrades} = require("./my-modules/MathStuff.js")
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages)
const client = new Client({ 
    intents: 
    [GatewayIntentBits.GuildMembers,myIntents], partials: [Partials.Channel, Partials.Message, Partials.Reaction] });
//const bareEmbed = {color:null,title:null,url:null,author:{name:null,icon_url:null,url:null},description:null,thumbnail:{url:""},fields:[],image:{url:""},timestamp: new Date().toISOString(),footer:{text:"",icon_url:""}}
const acm_thumbnail = {thumbnail:{url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
const acm_image_link = "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png";
//const archival= require('./theArchives')
const { ChannelType } = require('discord-api-types/v10');
//const {clubReminder,addLeetCode} =require("./reminder");
// const wednesdaydayreminder = {title: "ACM Club Meeting Tonight", description: "Food, probably dogs again, will be provided, as well as some beverage(s).\nWe'll be doing more hack-a-sat related stuff, and we probably will work through at least one problem and do a general poll to see how many people will be there for breakfast on Saturday for the hack-a-sat.\nCome join us today @ about 5:10pm in the [Lilibridge Engineering Lounge](https://goo.gl/maps/JCUxgBBd3cDFe5Jk7) (It's near the Physical Science building on the Poky campus.)\nIf you do attend, please [fill out this form](https://forms.gle/51f6gg8wrx7RAeMK7), it is also accessible if you run `/eventform`" , color: 0x00a4c9,thumbnail:{url: "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"} }

const wednesdaydayreminder = {title: "ACM Club Meeting Tonight", description: "Pizza (and muffins possibly to be cut by cardboard) will be provided, as well as some beverage(s).\nCome join us today @ about 5:10pm in the [Lilibridge Engineering Lounge](https://goo.gl/maps/JCUxgBBd3cDFe5Jk7) (It's near the Physical Science building on the Poky campus.)\nIf you do attend, please [fill out this form](https://forms.gle/51f6gg8wrx7RAeMK7), it is also accessible if you run `/eventform`" , color: 0x00a4c9,thumbnail:{url: "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"} }
//const monrem = const mondayDayReminder = {title: "ACM Club Meeting This Thursday", description: "This thursday there will be an ACM Club Meeting
//const mondayDayReminder = {title: "ACM Club Meeting This Thursday", description: "This thursday there will be an ACM Club Meeting @ 5pm in the [Lilibridge Engineering Lounge](https://goo.gl/maps/JCUxgBBd3cDFe5Jk7)",color: 0x00a4c9, thumbnail:{url: "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
var fs = require("fs");
const {ServerSearch} = require("./my-modules/server_stuff/ServerSearch.js");
const serverSearch = new ServerSearch("./my-modules/server_stuff")
// const ServerSearch = new ServerSearch()
//const { callbackify } = require('util');
// const {ReminderStuff} = require("./my-modules/Reminder.js")
// const { user, password, host} = require("../info.json");
// const { calculategrades } = require('./my-modules/MathStuff');
const { title } = require('process');

// let Reminder = new ReminderStuff();
const net = require('net');

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
function convert(integer) {
    var str = Number(integer).toString(16);
    return str.length == 1 ? "0" + str : str;
};
client.once('ready', async () =>
{
    // let invs = await client.guilds.fetch('613534490941325315').fetchInvites().then((invites)=>console.log(invites))

    console.log('Benders back baby!');
    client.user.color=42185;
    client.user.hex = '0x'+convert(client.user.color).padStart(6,"0");
    // serverSearch.writeLocalChange("613534490941325315","welcomeChannel","613534490941325319")
    // client.guilds.cache.forEach(guild => serverSearch.pushChanges('eventForm'))
    // client.guilds.cache.forEach(guild => console.log(guild.name))

   
//    let annChan = client.channels.cache.get("1080235307582111756");
//    annChan.send({content: "<@&1080291942568566875>", embeds:[wednesdaydayreminder]})
    //let em = {title:"This Weeks LeetCode Problem",color:0x00a4c9,thumbnail:{url:acm_image_link},description:`[Network Delay Time](https://leetcode.com/problems/network-delay-time/)`}
    //annChan.send({embeds:[em]})
  //  annChan.send({content:"<@&947239082508050462> <@&892904752256536679>" , embeds: [wednesdaydayreminder]});
    //console.log(client.channels.cache.get("1020459954458599425"))
});

function DisplayUsed(message){
    let time = new Date();
    console.log(`"${message}" at ${time.toDateString()}`)
}

async function ScrapeXKCD(){
    const xkcdlink = "https://c.xkcd.com/random/comic/";
    const sta = Date.now();
    let result={}
    const pat =/<meta property="og:image" content="([^<]*)">/
    const numpat = /<meta property="og:url" content="([^<]*)">/
    const titlepat = /<meta property="og:title" content="([^<]*)">/
    await rp(xkcdlink).then(function(html){result.title = html.split(titlepat)[1];result.url=html.split(numpat)[1];result.picture=html.split(pat)[1]}).catch(function(err){console.log(err)})
    result.time = Date.now()-sta;
    return result
}

// setInterval(()=>{
//     // console.log('this is hit')
//     fs.stat(pipe_name, (err, stats)=>{
//         if(err){console.error(`Errror checking pipe stats: ${err}`); return}
//         if (stats.size>0){pipe.read();}
//     })
// },1000)
client.on('messageCreate', async message =>{
    // message.guild.invites.fetch().then((invites)=>invites.forEach(ele=>console.log(ele.code)))
    if(message.channel.type ===ChannelType.DM || message.author.bot) {return;}
    const pass_channelid = serverSearch.genericServerSearch('passwordChannel', message.guild.id);
    if(message.channel.id === pass_channelid  && pass_channelid != null){
        const role = serverSearch.findServerPasswordRole(message.guild.id, message.content);
        if(serverSearch.verifyNotDupe(message.guild.id, message.member._roles)){
            console.log("User is already verified")
            return
        }
        if(role){
            if(role[0] === undefined){
                message.author.send({content:"Invalid password, please use a listed password as described above."});
                return
            }
            message.member.roles.add(role[0]['role']).then(()=>{
                message.member.roles.remove(role[1])
            })
        }
    }


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
    // let conn = await pool.getConnection();
    if(interaction.commandName==="randomxkcd"){
        let xkcdinfo = await ScrapeXKCD();
        interaction.reply({embeds:[{title:`${interaction.user.tag}'s Randomly Generated XKCD Comic`,description:`[${xkcdinfo.title}](${xkcdinfo.url})`,image:{url:xkcdinfo.picture},color:0x00a4c9,thumbnail:{url:acm_image_link},footer:{text:`Took ${xkcdinfo.time}ms to finish`}}]})
    }
    //#region 
    if(interaction.commandName === 'rolemenu'){
        return;
        const num_reactions = interaction.options.getInteger('reactions');
        if(num_reactions >=12){
            interaction.reply({content:"Too many reactions added. Please try again", ephemeral: true})
            return;
        }
        const mesid = interaction.options.getString('messageid');
        const toad = interaction.options.getString("toadd")
        
        let conn = await pool.getConnection();
        
        //interaction.reply({content: "This feature is currently unavailable", ephemeral: true})
        //return;
        //console.log(interaction.options.getString('toadd'))
        /*const modal = new ModalBuilder().setCustomId('roleMenu').setTitle("Role Menu");
        const reactionsInput = new TextInputBuilder().setCustomId('reactionsInput').setLabel('Role ID followed by the Emoji').setStyle(TextInputStyle.Short)
        for(let reas=0;reas< num_reactions;reas++){
            let row_ = new ActionRowBuilder().addComponents(reactionsInput);
            modal.addComponents(row_);
        }
        let row_ = new ActionRowBuilder().addComponents(reactionsInput);
            modal.addComponents(row_);
        await interaction.showModal(modal);
        */
    }



    if(interaction.commandName === 'signupform'){
        let link = serverSearch.genericServerSearch("signupForm", interaction.guild.id)
        if(link){
            const signupform = {title: 'Club Sign Up Form', description:`[Fill out this google form](${link}) to become an official member of this club!`,thumbnail:{url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
            interaction.reply({embeds:[signupform],ephemeral:true});
        }

    }
    if(interaction.commandName==='leetcode'){
        interaction.reply({content:"This feature is currently disabled :(. Check back later", ephemeral:true})
        return
        const prob = interaction.options.getString('problem');
        //let pat = /"["[]/https://leetcode.com/problems/add-two-numbers/
        let lepet = /https:\/\/www.leetcode.com\/problems\/*/
        if(!lepet.test(prob)){interaction.reply({content:"Incorrect format. Try again, using the format of `https://www.leetcode.com/problems/problem-name-goes-here`",ephemeral:true});return;}
        let pat = /<title>([^<]*)<\/title>/
        let conn = await pool.getConnection();
            rp(prob).then(function(html){let temp = html.split(pat);
                conn.query("INSERT INTO SERVER_LINKS (SERVER_ID, link, label) VALUES "+`("${interaction.guild.id}","[${temp[1]}](${prob})","leet");`).then(console.log("added leet code success")).catch(function(err){console.log(err)})
            })
            .catch(function(err){console.log(err)})
        
        //let pat = new RegExp("[*](https://www.leetcode)");
        //conn.query("INSERT INTO SERVER_LINKS (SERVER_ID,link,label) VALUES ("+`'${interaction.guild.id}','${prob}','leet');`).then(()=>{interaction.reply({content:"Hopefully added : "+prob+".",ephemeral:true})})
    }
    if(interaction.commandName === 'eventform'){
        let link = serverSearch.genericServerSearch("signupForm", interaction.guild.id)
        if(link){
            const eventform = {title:'Event Sign-In Form', description:`[Fill out this google form](${link}) to sign in to a club event`,thumbnail:{url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
            interaction.reply({embeds:[eventform]});
        }
    }
    if(interaction.commandName === 'bulkdelete'){
        const toDelete = interaction.options.getInteger('number');
        interaction.channel.bulkDelete(toDelete)
        interaction.reply({content: `Successfully deleted ${toDelete} messages.`,ephemeral: true})
    }

    if(interaction.commandName==='tutor'){
        interaction.reply({content:"Feature currently disabled. Check back later",ephemeral:true})
        return
        const course = interaction.options.getString('course');
        const name = interaction.options.getString('name');
        let fields = [];
        const sta = Date.now();
        if(course === null && name === null){//THis gets the tutorers for today
            let day = await conn.query("SELECT * FROM TUTORS WHERE T_DAY = '"+new Date().getDay().toString()+"';");
            if(day !== undefined){
                delete day.meta
                day.forEach(element => {fields.push({name: `${element.T_NAME}`, value: `@${element.T_TIME},\nIRL: Likely Colonial Hall (poky) room 230.\nZoom by email: ${element.T_EMAIL}`})});
                let em = {title: "Tutorers for today: ", fields:fields,color:0x00a4c9,thumbnail:{url:acm_image_link},footer:{text:`Took ${(Date.now()-sta)}ms to finish`}}
                interaction.reply({embeds:[em]});
            }
            /*else{//interaction.reply({content:"Found no tutorers for today :(",ephemeral: true})
                conn.end()
                return;
            }*/
        }
        if(course === null && name !== null){
            let tutorer = await conn.query("SELECT * FROM TUTORS WHERE T_NAME = '"+name+"';");
            if(tutorer!==undefined){
                delete tutorer.meta;
                tutorer.forEach(element => fields.push({name:`${element.T_DAYSTRING}`,value:`${element.T_TIME}\nIRL: Likely Colonial Hall (poky) room 230.\nZoom by email: ${element.T_EMAIL}`}))
                const em = {title: `${tutorer[0].T_NAME}'s Tutoring Hours/Days.`,fields:fields,color:0x00a4c9,thumbnail:{url:acm_image_link},footer:{text:`Took ${(Date.now()-sta)}ms to finish`}}
                interaction.reply({embeds:[em]})    
            }
           /* else{//interaction.reply({content:`Could not find ${name}, please try a different name search`,ephemeral:true})
                conn.end();
                return;
            }*/
        }
        if(course !== null && name === null){//This searche
            interaction.reply({content:"This feature doesn't have functionality...",ephemeral:true})
        }

    }

    if(interaction.commandName  === "enablelogging"){
        const chan = interaction.options.getChannel('logchannel')
        console.log(chan)
        if(!chan.permissionsFor(client.user.id).has(['SEND_MESSAGES','READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'VIEW_CHANNEL']))
        {
            interaction.reply({content:`[Missing permissions](https://www.youtube.com/dQw4w9WgXcQ)`})
            return
        }
        console.log("Has perms")
        serverSearch.writeLocalChange(interaction.guild.id, "logChannel",`${chan.id}`)
        interaction.reply({content:"Hopefully sucessfully added logging potential to that channel"})

    }
    if(interaction.commandName === 'enablebasicwelcome'){
        const chan = interaction.options.getChannel('welcomechannel');
        if(!chan.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'VIEW_CHANNEL'])){
            interaction.reply({content:"Missing permissions :(",ephemeral:true})
            return
        }
        serverSearch.writeLocalChange(interaction.guild.id, "welcomeChannel", chan.id)
        interaction.reply({content:"Hopefully sucessfully added welcome message potential to that channel", ephemeral: true})
    }
    if(interaction.commandName === 'gradecalc'){
        const gradefile = interaction.options.getAttachment('gradefile');
        if(!gradefile) interaction.reply("No file was attached, try again");
        try{
            const response = await fetch(gradefile.url);
            if(!response.ok){return interaction.reply("There was an error with fetching the file: "+response.statusText)}
            const text = await response.text();
            if(text) interaction.reply({content:`${interaction.user}`, embeds:[calculategrades(text, interaction.user.username)],ephemeral:true})
        }catch(error){console.log(error)}
    }
    if(interaction.commandName === 'uptime'){
        let totalSeconds = (client.uptime / 1000); let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400; let hours = Math.floor(totalSeconds / 3600); totalSeconds %= 3600; let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let timestring = `${days}d ${hours}h ${minutes}m ${seconds}s`
        interaction.reply(`${client.user} has been online for: ${timestring}`)
    }
   
});


client.on('messageDelete', async (message) =>{
    const id = serverSearch.genericServerSearch('logChannel',message.guild.id)
    if(!message.guild || message.author.bot) return;
    if(id != null){
        const logchamp = await client.channels.cache.get(id);
        let del ={author:{name:message.author.tag, icon_url: message.author.avatarURL()},color:0x00a4c9,title:`Message deleted in ${message.channel.name}`,description:`${message.content}`,timestamp: new Date().toISOString()}
        logchamp.send({embeds:[del]})
    }
})


client.on('messageUpdate', async (oldMessage, newMessage)=>{
    const id = serverSearch.genericServerSearch('logChannel',message.guild.id)
    if(oldMessage.content === newMessage.content) return;
    if(oldMessage.channel.type === ChannelType.DM || oldMessage.author.bot){return;}
    if(!oldMessage.guild || oldMessage.author.bot) return;
    if(id != null){
        let logchamp = await client.channels.cache.get(id);
        let fields = [{name:`**User**`,value:`**Name: **${newMessage.author.tag}.\n**Mention: **<@${newMessage.author.id}>\n**ID: **${newMessage.author.id}`,inline:true},{name:`**Channel**`,value:`**Name: **\<#${newMessage.channel.id}>\n**Mention:  **<#${newMessage.channel.id}>\n**ID: **${newMessage.channel.id}`,inline:true},{name:"**Before**",value:`${oldMessage.content}`},{name:"**After**",value:`${newMessage.content}`}]
        let edit = {author:{name:oldMessage.author.tag, icon_url:oldMessage.author.avatarURL()},title:`Message edited in ${oldMessage.channel.name}`, fields:fields,color:0x00a4c9}
        logchamp.send({embeds:[edit]})
    }
})


client.on('guildMemberAdd', async newPerson=>{
    let conn = await pool.getConnection();
    let ps = await conn.query("SELECT * FROM welcome WHERE SERVER_ID = '"+newPerson.guild.id+"';")
    if(ps[0] === undefined) return;
    if(ps[0].STATUS !== 1) return;
    let chan = await client.channels.cache.get(ps[0].CHANNEL_ID);
    let basic = {title:`Welcome to the ${newPerson.guild.name}!`,description:`<@${newPerson.user.id}>(${newPerson.user.tag}) has joined the server. You are the ${newPerson.guild.memberCount}th to join the server!\n:robot: beep-boop I am a [not] robot.`,color:0x00a4c9,thumbnail:{url:acm_image_link},footer:{text:`${newPerson.user.tag} joined at ${new Date().toDateString()}`}}
    let stuff = await conn.query("SELECT link FROM SERVER_LINKS WHERE SERVER_ID = '"+newPerson.guild.id+"' AND label = 'club_signup';");
    if(stuff[0] !== undefined && stuff[0].link){
        basic.fields= [{name:'\u200B', value:`While you're here, take a moment to fill out a [club membership form](${stuff[0].link})`}]
    }
    chan.send({embeds:[basic]})
    conn.end();
})

client.on('warn', (warn) => console.warn(warn))
client.on('error',(error) => console.error(error))
client.login(token)
