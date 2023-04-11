const { token } = require('./config.json');
//const {psicom, SI} =require('./searchingFile')
const { Client, GatewayIntentBits, Partials ,IntentsBitField} = require('discord.js');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const rp = require('request-promise');

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
//const { callbackify } = require('util');
const {ReminderStuff} = require("./my-modules/Reminder.js")
const mariadb = require('../discord-bot/node_modules/mariadb');
const { user, password, host} = require("../info.json");
const { calculategrades } = require('./my-modules/MathStuff');
const { title } = require('process');
const pool = mariadb.createPool({
     host: `${host}`, 
     user:`${user}`, 
     password: `${password}`,
     database: 'discord',
     connectionLimit: 5
});
let Reminder = new ReminderStuff();

function convert(integer) {
    var str = Number(integer).toString(16);
    return str.length == 1 ? "0" + str : str;
};
client.once('ready', async () =>
{
    console.log('Benders back baby!');
    client.user.color=42185;
    client.user.hex = '0x'+convert(client.user.color).padStart(6,"0");
    //let dude = await client.users.fetch("296654778262487041")
    //dude.send({embeds:[{title:"Pretty Neat Game Dev Club!", description:`${dude.username}, I am Appsrø#5446, an officer in the ACM club as well as the developer of this bot that is sending you this message as well as probably one of the few discord competent people at ISU.\nIf you have any discord related questions, you can probably ask me.`, thumbnail:{url:acm_image_link},color:0x00a4c9}]}).then(console.log("Sent?"))
    //console.log(dude)
    //console.log(   {title:"Pretty Neat Game Dev Club!", description:`${dude.username}, I am Appsrø#5446, an officer in the ACM club as well as the developer of this bot that is sending you this message as well as probably one of the few discord competent people at ISU.\nIf you have any discord related questions, you can probably ask me.`, thumbnail:{url:acm_image_link},color:0x00a4c9})
   /* let ieeeeme = {title: "Welcome",description:"Welcome to the official ISU IEEE discord server",color:0x082d92,fields:
    [
        {name:'This server uses a password verification system to identify new people', value:'To access this server, you can send one of these passwords:'+
            "\n*Note: these passwords are all verbatim as well as case sensitive. Input the respective password in <#950092870264713306> as it is shown here.*"},
        {name: "`club member`", value: "This gives you a verified club member role. You should only use this password if you've already filled out a [club membership form](https://forms.gle/BsAL7F9yp8Lxfcmq8)", inline: true},
        {name: "`student`", value: "This gives you the standard student role", inline: true},
        {name: "`NA`", value: "This gives you the new/incoming students role.", inline: true}
        
    ],thumbnail:{url:"https://images-ext-2.discordapp.net/external/49vtZX43fi9SA_xuA4PQ2n17GWP3GDHd2xJE9Eg17oU/https/www.logolynx.com/images/logolynx/2e/2eaec84e75333bf14596e8fa3ee66e68.png?width=1440&height=421"}}
*/
//    let annChan = client.channels.cache.get("1080235307582111756");
//    annChan.send({content: "<@&1080291942568566875>", embeds:[wednesdaydayreminder]})
    //let em = {title:"This Weeks LeetCode Problem",color:0x00a4c9,thumbnail:{url:acm_image_link},description:`[Network Delay Time](https://leetcode.com/problems/network-delay-time/)`}
    //annChan.send({embeds:[em]})
  //  annChan.send({content:"<@&947239082508050462> <@&892904752256536679>" , embeds: [wednesdaydayreminder]});
    //console.log(client.channels.cache.get("1020459954458599425"))
// tit = new ServerInfo("3432432", {"auditChannel": "1020459954458599425", 'welcomeChannel':'950091351792418873','passwdChannel':'950092870264713306'}, "tit", "none", "none", "none", client);
});
//console.log(tit.getcIDS())
/*
TODO: PASSWORD VERIFICATION SHIT
1: VERIFY SERVER USES PASSWORDS
2: VERIFY SERVER HAS PASSWORD CHANNEL
3: VERIFY PASSWORD

*/
function DisplayUsed(message){
    let time = new Date();
    console.log(`"${message}" at ${time.toDateString()}`)
}
async function updateboth(canval,isval){
   let conn = await pool.getConnection();
   conn.query(`UPDATE Reminder SET canSend=${canval};`)
   conn.query(`UPDATE Reminder SET isSent=${isval};`)
   conn.end();
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
client.on('messageCreate', async message =>{
    if(message.channel.type ===ChannelType.DM || message.author.bot) {return;}
    //Password Verification Shit
    conn = await pool.getConnection();
    //let usesPass = await conn.query("SELECT * FROM PASSWORD_VERIFY WHERE SERVER_ID = '"+message.guildId+"' AND PASSWORD = '"+  message.content+"';")
    let usesPass = await conn.query("SELECT * FROM PASSWORD_VERIFY WHERE SERVER_ID = '"+message.guildId+"'");
    if(usesPass[0]===undefined) return;
    if(usesPass[0].STATUS ===1){
        if(usesPass[0].CHANNEL_ID === message.channel.id){
            let theEntry;
            let roleS = await conn.query("SELECT * FROM PASSWORD_VERIFY WHERE SERVER_ID = '"+message.guildId+"';")
            for(let j=0;j<roleS.length;j++){
                for(let i=0;i<message.member._roles.length;i++){
                    if(roleS[j].ROLE_ID === message.member._roles[i] && roleS[j].STATUS===1) return;
                }
                if(message.content === roleS[j].PASSWORD) theEntry = roleS[j]

        }
        console.log("pre temp_id")
            let temp_id = await conn.query("SELECT ROLE_ID FROM PASSWORD_VERIFY WHERE SERVER_ID = '"+message.guild.id+"' AND PASSWORD = 'temp_role';")
            try{message.member.roles.add(theEntry.ROLE_ID).then(()=>{message.member.roles.remove(temp_id[0].ROLE_ID); message.delete()})}catch(err){console.log(err); message.author.send({content:"Invalid password, please use a listed password as described above."})}
        }

    }
    conn.end();





    if(message.guild.id === "613534490941325315"){
        let tempcode = "";
        let conn = await pool.getConnection();
        let stuff = await conn.query("SELECT * FROM Reminder;");
        delete stuff.meta;
        console.log({"canSend":stuff[0].canSend,"isSent":stuff[0].isSent})
        
        if((stuff[0].canSend === 1) && (new Date().getDay()===3)){
            DisplayUsed("A Club Meeting Reminder Can Be Sent Today")
            let problems = await conn.query(`SELECT link FROM SERVER_LINKS WHERE SERVER_ID="${message.guild.id}" AND label="leet";`)
            delete problems.meta;
            problems.forEach(ele=>{tempcode+=ele.link+"\n"})
            console.log({title:"This Weeks Leet Code Problem(s)",description:`${tempcode}`})
            updateboth(0,1);
            console.log("Yes")
        }
        if((stuff[0].canSend === 0) && (new Date().getDay() !==3)){
            DisplayUsed("A Club Meeting Reminder Cannot Be Sent Today")
            updateboth(1,0);
            console.log("No")
        }
        if((stuff[0].isSent ===1) && (new Date().getDay()===3)) {DisplayUsed("A Club Meeting Reminder Was Probably Sent Today");conn.end();}
        conn.end();
        /*
        if (Reminder.canSend(new Date().getDay())===true){
            console.log("Yes")
            console.log(Reminder.getStatus())
        }*/
    }

})
client.on('interactionCreate', async interaction =>{
    let conn = await pool.getConnection();
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
        let signuplink = await conn.query("SELECT * FROM SERVER_LINKS WHERE SERVER_ID = '"+interaction.guildId+"' AND label = 'club_signup'");
        if(eventlink[0] === undefined){interaction.reply({content: "This server doesn't support this feature :(", ephemeral: true}); return;}
        const signupform = {title: 'Club Sign Up Form', description:`[Fill out this google form](${signuplink[0].link}) to become an official member of this club!`,thumbnail:{url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
        interaction.reply({embeds:[signupform], ephemeral: true})
    }
    if(interaction.commandName==='leetcode'){
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
        let eventlink = await conn.query("SELECT * FROM SERVER_LINKS WHERE SERVER_ID = '" +interaction.guild+"' AND label = 'event_link'");
        if(eventlink[0] === undefined){interaction.reply({content: "This server doesn't support this feature :(", ephemeral: true}); return;}
        const eventform = {title:'Event Sign-In Form', description:`[Fill out this google form](${eventlink[0].link}) to sign in to a club event`,thumbnail:{url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
        interaction.reply({embeds:[eventform]})
    }
    if(interaction.commandName === 'bulkdelete'){
        const toDelete = interaction.options.getInteger('number');
        interaction.channel.bulkDelete(toDelete)
        interaction.reply({content: `Successfully deleted ${toDelete} messages.`,ephemeral: true})
	return;    
    }
    if(interaction.commandName==='tutor'){
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
        const logmodal = new ModalBuilder().setCustomId('logging').setTitle("Enable Logging.");
        const logchannel =new TextInputBuilder().setCustomId('loggingchannel').setLabel("Input the channel to send logs to.").setStyle(TextInputStyle.Short);
        logmodal.addComponents(new ActionRowBuilder().addComponents(logchannel));
        await interaction.showModal(logmodal);
    }
    if(interaction.commandName === 'enablebasicwelcome'){
        const welcomemodal = new ModalBuilder().setCustomId('welcome').setTitle("Enable Basic Welccome Message");
        const welcomechannel = new TextInputBuilder().setCustomId("welcomechannel").setLabel("Input the channel for welcome messages").setStyle(TextInputStyle.Short);
        welcomemodal.addComponents(new ActionRowBuilder().addComponents(welcomechannel));
        await interaction.showModal(welcomemodal);
        return;
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
    if(interaction.isModalSubmit()){
        const chanid = /[0-9]+/;
        if(interaction.customId==='logging'){
            let chann = interaction.fields.getTextInputValue('loggingchannel');
            if(chanid.test(parseInt(chann))===false){
                interaction.reply("Invalid format. Channel IDs are 19 characters long and consist only of numbers")
                conn.end();
                return;
            }

            let logcha = await client.channels.cache.get(chann)
            try{
                await logcha.send("Test message.");
                    let isthere = await conn.query("SELECT STATUS FROM LOGGING WHERE SERVER_ID = '"+interaction.guild.id+"';")
                if(isthere[0] === undefined){
                    await conn.query("INSERT INTO LOGGING (STATUS, CHANNEL_ID, SERVER_ID) VALUES (1, '" +chann+"', '"+interaction.guild.id+"');")
                }
                else{
                    await conn.query("UPDATE LOGGING SET STATUS=1 WHERE SERVER_ID = "+interaction.guild.id+";")
                    conn.end();
                }
                
                
            }catch(error){console.log(error);interaction.reply({content:"Missing Access to send messages in that channel.\nAllow these permissions for me in that channel: View Channel, and Send Messages"})}
            //console.log("The aftermath of an error")

        }
        if(interaction.customId==='welcome'){
            let chann = interaction.fields.getTextInputValue('welcomechannel');
            if(chanid.test(parseInt(chann)===false)){interaction.reply({content:"Invalid format. Channel IDs are 19 characters long and consist only of numbers.",ephemeral:true});};
            let welcha = await client.channels.cache.get(chann);
            try{
                await welcha.send("Test message.");
                let isthere = await conn.query("SELECT STATUS FROM welcome WHERE SERVER_ID = '"+interaction.guild.id+"';");
                if(isthere[0]===undefined) await conn.query("INSERT INTO welcome (SERVER_ID, STATUS, CHANNEL_ID) VALUE ('"+interaction.guild.id+"', 1, '"+chann+"');")
                else{
                    await conn.query("UPDATE welcome SET STATUS=1 WHERE SERVER_ID = '"+interaction.guild.id+"';")
                }
            }catch(error){console.log(error);interaction.reply({content:"Came across an error while doing this. Please try again",ephemeral:true})}
        }
    }
/*
    else{
        interaction.reply({content:"This feature is currently unavailable. Check back later.",ephemeral:true})
        return;
    }
*/
    //#endregion
    else{
        conn.end();
        return;
    }
});


client.on('messageDelete', async (message) =>{
    if(!message.guild || message.author.bot) return;
    let conn = await pool.getConnection();
    let status = await conn.query("SELECT * FROM LOGGING WHERE SERVER_ID = '"+message.guild.id+"';")
    if(status[0] === undefined || status[0].LOGGING_STATUS === 0) {conn.end(); return;}
    let logchamp = await client.channels.cache.get(status[0].CHANNEL_ID);
    let del ={author:{name:message.author.tag, icon_url: message.author.avatarURL()},color:0x00a4c9,title:`Message deleted in ${message.channel.name}`,description:`${message.content}`,timestamp: new Date().toISOString()}
    logchamp.send({embeds:[del]})
    conn.end();
})


client.on('messageUpdate', async (oldMessage, newMessage)=>{
    if(oldMessage.content === newMessage.content) return;
    if(oldMessage.channel.type === ChannelType.DM || oldMessage.author.bot){return;}
    if(!oldMessage.guild || oldMessage.author.bot) return;
    let conn = await pool.getConnection();
    let status = await conn.query("SELECT * FROM LOGGING WHERE SERVER_ID = '"+oldMessage.guild.id+"';")
    if(status[0] === undefined || status[0].LOGGING_STATUS === 0) {conn.end(); return;}
    let logchamp = await client.channels.cache.get(status[0].CHANNEL_ID);
    let fields = [{name:`**User**`,value:`**Name: **${newMessage.author.tag}.\n**Mention: **<@${newMessage.author.id}>\n**ID: **${newMessage.author.id}`,inline:true},{name:`**Channel**`,value:`**Name: **\<#${newMessage.channel.id}>\n**Mention:  **<#${newMessage.channel.id}>\n**ID: **${newMessage.channel.id}`,inline:true},{name:"**Before**",value:`${oldMessage.content}`},{name:"**After**",value:`${newMessage.content}`}]
    let edit = {author:{name:oldMessage.author.tag, icon_url:oldMessage.author.avatarURL()},title:`Message edited in ${oldMessage.channel.name}`, fields:fields,color:0x00a4c9}
    logchamp.send({embeds:[edit]})
    conn.end();

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


async function intodb(){
    /*let things =            [
        ["student", "950097249537495130"],//Student role
        ["club member", "1012133999642165309"],//verfied member
        ["NA",'1012133853906874530'],
        
    ]
    let guildIDs ='950091351792418866';
    let pw = '950092870264713306'
    let conn = await pool.getConnection();
    
    for(let j=0;j<things.length;j++){
        conn.query("INSERT INTO PASSWORD_VERIFY (SERVER_ID, STATUS, CHANNEL_ID, PASSWORD, ROLE_ID) VALUES ('"+guildIDs+"', "+1+", '"+pw+"', '"+ things[j][0]+"', '"+things[j][1]+"');").then(()=>console.log("Insert success"))
    }*/
    //let stuff = {"title": "Welcome","description":"Welcome to the official ISU IEEE discord server","color":"0x082d92","fields":[{"name":"This server uses a password verification system to identify new people", "value":"To access this server, you can send one of these passwords:\n*Note: these passwords are all verbatim as well as case sensitive. Input the respective password in <#950092870264713306> as it is shown here.*"},{"name": "club member", "value": "This gives you a verified club member role. You should only use this password if you have already filled out a [club membership form](https://forms.gle/BsAL7F9yp8Lxfcmq8)", "inline": "true"},{"name": "student", "value": "This gives you the standard student role", "inline": "true"},{"name": "NA", "value": "This gives you the new/incoming students role.", "inline": "true"}],"thumbnail":{"url":"https://images-ext-2.discordapp.net/external/49vtZX43fi9SA_xuA4PQ2n17GWP3GDHd2xJE9Eg17oU/https/www.logolynx.com/images/logolynx/2e/2eaec84e75333bf14596e8fa3ee66e68.png?width=1440&height=421"}}
    //console.log(test)
    //let values = ["'950091351792418866'",'"'+JSON.stringify(stuff)+'"',"'welcomedm'"]
    let conn = await pool.getConnection();
    let stuff = await conn.query("SELECT DISTINCT T_NAME FROM TUTORS;")
    delete stuff.meta;
    stuff.forEach(ele => {
        console.log(`{name: "${ele.T_NAME}",value: "${ele.T_NAME}"},`)
    })
    //conn.query("INSERT INTO EMBED_STRING (SERVER_ID, _embed, label) VALUES ("+ `"950091351792418866", '${JSON.stringify(stuff)}', "welcomedm");`)
    //conn.query("INSERT INTO EMBED_STRING (SERVER_ID, _embed, label) VALUES ('950091351792418866', '" + stuff+"', 'welcomedm');").then(()=>console.log("Insert success"))
    //conn.query("INSERT IGNORE INTO EMBED_STRING (SERVER_ID, _embed, label) VALUES ?", ['950091351792418866',JSON.stringify(stuff),'welcomedm']).then(()=>console.log("Insert success")).catch(console.error)
    //let em = await conn.query("SELECT _embed from EMBED_STRING;")
    //console.log(JSON.parse(em[0]._embed))
}




//intodb()
async function testit(){
    let conn =  await pool.getConnection()
    let leet = await conn.query("SELECT link FROM SERVER_LINKS WHERE label='leet' AND "+`SERVER_ID="613534490941325315";`)
    delete leet.meta
    console.log(leet)
}
//testit()

client.on('warn', (warn) => console.warn(warn))
client.on('error',(error) => console.error(error))
client.login(token)
