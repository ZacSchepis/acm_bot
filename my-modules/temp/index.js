const { token } = require('../../config.json');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const rp = require('request-promise');
const myIntents = new IntentsBitField();
//const fetch = require('node-fetch')
//const {calculategrades} = require("./my-modules/MathStuff.js")
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages)
const client = new Client({ 
    intents: 
    [GatewayIntentBits.GuildMembers,myIntents], partials: [Partials.Channel, Partials.Message, Partials.Reaction] });
const { ChannelType } = require('discord-api-types/v10');
var fs = require("fs");
const { title } = require('process');
function convert(integer) {
    var str = Number(integer).toString(16);
    return str.length == 1 ? "0" + str : str;
};




client.once('ready', async () =>
{
    console.log('Benders back baby!');
    client.user.color=42185;
    client.user.hex = '0x'+convert(client.user.color).padStart(6,"0");
});
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
})