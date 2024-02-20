const {google} = require('googleapis')
const { auth } = require('google-auth-library')

const { token, clientId } = require('./config.json');
//const {psicom, SI} =require('./searchingFile')
const { Client, GatewayIntentBits, Partials ,IntentsBitField, DiscordAPIError, PermissionsBitField} = require('discord.js');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const rp = require('request-promise');
require("./my-modules/server_stuff/server.json")
const myIntents = new IntentsBitField();
const { Routes } = require('discord-api-types/v9');
const {join} = require('path')
const Discord = require('discord.js')


myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages)
const client = new Client({ 
    intents: 
    [GatewayIntentBits.GuildMembers,myIntents], partials: [Partials.Channel, Partials.Message, Partials.Reaction] });

const googleClient = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: ['https://www.googleapis.com/auth/calendar.readonly']
})
client.once('ready', async () =>{
  console.log('logged in baby')
})
client.on('messageCreate', async (message)=>{
  if(message.author.id !== "294781978815889409") return;
  const cal = google.calendar('v3')
  const cli = await googleClient.getClient();

  const events = await cal.events.list({
    auth: cli,
    calendarId: 'c_29an57vstk0tarj9v8l22m1ggo@group.calendar.google.com',
    timeMin: new Date().toISOString(),
    maxResults: 5,
    singleEvents: true,
    orderBy: 'startTime'
  })
  const upcoming = events.data.items;
  if(upcoming.lengths >0){
    upcoming.forEach((ev)=>{
      console.log(`- ${ev.summary}: ${ev.start.dateTime}`)
    })
  }
})



client.login(token)

// const fs = require("fs")
// const Discord = require('discord.js')
// const {join} = require('path')
// const path = req
// const skelecmms = new Discord.Collection()
// const commandPath = join(__dirname, 'commands')
// const commandFiles = fs.readdirSync(commandPath).filter((file)=>file.endsWith(".js"))
//   for (const file of commandFiles){
//     const filePath = join(commandPath, file)
//     const command = require(filePath)
//     // const command = require(join(__dirname, "commands", `${file}`));
//     // skelecmms.set(command.name, command);
//     !'data' in command? "":console.log(`Missing 'data' field in: ${filePath}`) 
//     !'execute' in command? "": console.log(`Missing 'execute' field in: ${filePath}`) 
//     // console.log(command)
//     }

// find('data')

// const data =[
//   {
//     'name':'settings',
//     'description':'Set various server settings',
//     'default_member_permissions':String(1<<5),
//     'options':[
//         {
//             'name':'enable',
//             'description':'Enable certain server settings',
//             'type':2,
//             'options':[
//                 {
//                     'name':'logging',
//                     'description':'Enable logging for this server',
//                     'type':1,
//                     'options':[
//                         {'name':'channel','description':'Channel to enable logging to','required':true,'type':7}
//                     ]
//                 },
//                 {
//                     'name':'welcome',
//                     'description':'Enable welcome message upon user joining',
//                     'type':1,
//                     'options':[
//                         {'name':'channel','description':'Channel to send welcome messages to upon user join','required':true,'type':7}
//                     ]
//                 },
//                 {
//                     'name':'rolemenu',
//                     'description':'Enable rolemenu creation for this server',
//                     'type':1
//                 },
//                 {
//                     'name':'passwordjoin',
//                     'description':'[BETA] Allows for password verification',
//                     'type':1,
//                     'options':[
//                         {'name':'passwordchannel','description':'Channel to watch for passwords in','required':true,'type':7},
//                     ]
//                 }
//             ]
//         },
//         {
//             'name':'disable',
//             'description':'Disable certain server settings',
//             'type':2,
//             'options':[
//                 {
//                     'name':'logging',
//                     'description':'Disable logging for this server',
//                     'type':1,
//                 },
//                 {
//                     'name':'welcome',
//                     'description':'Disable welcome message upon user joining',
//                     'type':1,
//                 },
//                 {
//                     'name':'rolemenu',
//                     'description':'Disable rolemenu creation for this server',
//                     'type':1
//                 },
//                 {
//                     'name':'passwordjoin',
//                     'description':'Disables password verification for this server',
//                     'type':1,
//                 }
//             ]
//         }
//     ]


// },
//   {
//   'name':'bulkdelete',
//   'description':'Bulk deletes x messages in channel',
//   'options':[
//       {
//           'name':'number',
//           'description':'Deletes x amount of messages',
//           'type':4,
//           'required':true
//       },
//       {
//           'name':'channel', 
//           'description':'Channel to bulk delete in',
//           'type':7,
//           'required':false
//       }
//   ]
// },
// {
//   'name':'tutor',
//   'description':'Tutor commands',
//   'options':[
//       {
//           'name':'course',
//           'description':'Search for a specifc CS courses tutors',
//           'type':1,
//           'required':false,
//           'focused':true,
//           'autocomplete':true,
//           'options':[
//               {'name':'number','description':'Course number', 'type':3,'required':true}
//           ]
//       },
//       {
//           'name':'tutorer',
//           'description':'Search for a specific tutorer to search for',
//           'type':1,
//           'required':false,
//           'focused':true,
//           'autocomplete':true,
//           'options':[
//               {'name':'name','description':'Tutorer name','type':3,'required':true}
//           ]
//       }
//   ]
// }]
// const {getCommandString} = require('./commands/helpful/help.js')
// // let f = getCommandString(data[0])
// // console.log(f)
// const mysql = require('mysql')
// const {mysqlInfo} = require('./config.json')
// // const test_example = {user:{id:"3002"},guild:{id:"30910"}}
// const { create, read, update, delete_} = require("./attempting.js");
// const test_users = [
//   {user:{id:"3337"}, guild:{id:"5893"}},
//   {user:{id:"94032"}, guild:{id:"5893"}},
//   {user:{id:"897"}, guild:{id:"5893"}},
//   {user:{id:"3348823"}, guild:{id:"5893"}},
//   {user:{id:"3002"}, guild:{id:"5893"}}
// ]
// let idx = 4;
// console.log(test_users[idx])
// // test_users.map(ele=>{create.addGuildUser(ele)})
// let check_ = read.getGuildTop10(test_users[idx])
// // .then((res)=>{return res}).catch((err)=>{console.log(err)})
// check_.then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
// const exp = require("constants")
// let commands_ = []
// const folderPath = join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(folderPath);
// for (const folder of commandFolders){
// 	const commandsPath = join(folderPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
// 	for (const file of commandFiles){
// 		const filePath = join(commandsPath, file);
// 		const command = require(filePath);
// 		if('data' in command && 'execute' in command){
//             commands_.push(command)
//         }
// 	}
// }
function insertCom(command){
  const sql = "INSERT INTO slash_commands_data (name, data) VALUES (?, ?)";
  // console.log(command.name)
  // return
  const vals = [command.name, JSON.stringify(command.data)]
  connection.query(sql, vals, (err, result)=>{
    if (err) {
      console.error(`Error inserting command '${command.name}':`, err);
    } else {
      console.log(`Command '${command.name}' inserted successfully.`);
    }
  })
}


 function displayComs(name){
  const sql = "SELECT data FROM slash_commands_data WHERE name = ?"
  const values = [name];
  console.log("beginning...")
    connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error(`Error retrieving command '${name}':`, err);
    } else {
      if (rows.length > 0) {
        const command = JSON.parse(rows[0].data);
        console.log(`Command '${name}':`, command);
        // console.log(getCommandString(command))
        return command
        // return JSON.parse(rows[0].data)
      } 
      else {
        console.log(`Command '${name}' not found.`);
      }
    }
  });
}
getCommandJSON = async (name)=> {
  const sql = "SELECT data FROM slash_commands_data WHERE name = ?";
  const values = [name];
  return new Promise((resolve, reject)=>{
    connection.query(sql, values, (err, rows)=>{
      if(rows === undefined) reject(new Error("Error: rows is undefined"))
      resolve(JSON.parse(rows[0].data))
    })
  })
}



function GenericQuery(sql, values){
  return new Promise((resolve, reject)=>{
    connection.query(sql, values, (err, rows)=>{
      if(err){
        reject(new Error(`Error during the query process\n${JSON.stringify({"sql":sql,"values":values,"error":err.sqlMessage},null, 2)}`))
      }
      else if (rows.length === 0 || rows === undefined) reject(new Error("No results were returned from query."))
      else resolve(rows)

    })
  })
}
function Wrapper(prep){
  connection.connect( (err)=>{
    if(err){ console.log('error while connecting...'); return; }
    console.log('Connected');
    let res = getXP(prep)
    connection.end((err) =>{
      if(err){ console.log("Error while trying to close..."); return; }
    })
    return res
  })
}
// async function get(prep){
// }
function getXP (test_){
  const sql = "SELECT * FROM experience WHERE userid = ? AND serverid = ?";
  const values = [test_.user.id, test_.guild.id]
  return GenericQuery(sql, values)
}
async function test_it(){
  // 1. Possible mishaps...
  //    - User doesn't exist in DB, so...
  //        - would need to add
  //    - User exists, but 
}
// connection.connect((err)=> {
//   if(err){
//     console.error('Error connecting to database: ', err)
//     return
//   }
//   console.log("Connected!");
//   // let output = await getCommandJSON("settings").then((res)=>{return res}).catch((err)=>console.log(`Promise rejection error: ${err}`))
//   // console.log(getCommandString(output))
//   const sql = "INSERT into experience (userid,level,xp,serverid,hex_value) values (?,1,0,?,230)";
//   const values = ["8008","40384032"]
//   let checking_ = connection.query(sql, values, (err, rows) =>{
//     if(err){ console.log(err); }
//     console.log(rows)
//   })
//   // console.log(`Result from generic:\n-----${JSON.stringify(checking_, null, 2)}`)
  
//   // Close the MySQL connection
//   connection.end((err) => {
//     if (err) {
//       console.error('Error closing the MySQL connection:', err);
//       return;
//     }
//     console.log('MySQL connection closed.');
//     return checking_
//   });
// })


// console.log(try_it)




















// const {token, clientID} = require("./config.json");
// //const url = "https://www.isu.edu/calendar/"
// // const url = "https://www.trumba.com/calendars/isu_event_calendar?template=table&media=print"
// //const {psicom, SI} =require('./searchingFile')
// const { Client, GatewayIntentBits, Partials ,IntentsBitField} = require('discord.js');
// const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
// const rp = require('request-promise');
// require("./my-modules/server_stuff/server.json")
// const myIntents = new IntentsBitField();
// const redis =require('redis')
// //const fetch = require('node-fetch')
// //const {calculategrades} = require("./my-modules/MathStuff.js")
// myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages)
// const client = new Client({ 
//     intents: 
//     [GatewayIntentBits.GuildMembers,myIntents], partials: [Partials.Channel, Partials.Message, Partials.Reaction] });
// //const bareEmbed = {color:null,title:null,url:null,author:{name:null,icon_url:null,url:null},description:null,thumbnail:{url:""},fields:[],image:{url:""},timestamp: new Date().toISOString(),footer:{text:"",icon_url:""}}
// // const acm_thumbnail = {thumbnail:{url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}}
// // const acm_image_link = "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png";
// // //const archival= require('./theArchives')
// // const { ChannelType } = require('discord-api-types/v10');
// // const cron = require("node-cron")
// client.on('ready', ()=>{
//   console.log('Starting!')

// })
// console.log(client.i)
// // Example: Setting up User XP Hash per Guild
// // redisClient.user
// const setGuildUserXP = (guildId, userId, xp) => {
//   redisClient.hSet(`guild:${guildId}:users`, userId, xp);
// };
// // Example: Setting up Leaderboard Sorted Set per Guild
// const updateGuildLeaderboard = (guildId, userId, xp) => {
//   redisClient.zAdd(`guild:${guildId}:leaderboard`, xp, userId);
// };
// const {Entity, Schema} = require('redis-om')
// const {createClient} = require('redis');
// const redisClient = createClient({host: 'localhost', password:'BzzdrE&5ffcF$!h%GSm5k$B^@!jRXnyosBw5&c6sw6dE96hsgsy&Hs$2CMGX$VMmVdRLZ5jxgSzk!S73$7LMLAgu8jEty9*9A@F2%uMrzeYc6QTRhSd4i2FLib5X#xK%'});
// // redisClient.connect().then(()=>console.log('connected'))
// class Person extends Entity{}
// const personSchema = new Schema(Person, {
//   firstName: { type: 'string' },
//   lastName: { type: 'string' },
//   age: { type: 'number' },
//   verified: { type: 'boolean' },
//   location: { type: 'point' },
//   locationUpdated: { type: 'date' },
//   skills: { type: 'string[]' },
//   personalStatement: { type: 'text' },
// });
// console.log(personSchema)


// const getGuildUserXP = (guildId, userId) => {
//   return new Promise((resolve, reject) => {
//     redisClient.hGet(`guild:${guildId}:users`, userId, (error, result) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(parseInt(result) || 0);
//       }
//     });
//   });
// };

// // Example: Adjusted Leaderboard Retrieval
// const getGuildLeaderboard = (guildId, count) => {
//   return new Promise((resolve, reject) => {
//     redisClient.zRevRank(
//       `guild:${guildId}:leaderboard`,
//       0,
//       count - 1,
//       'WITHSCORES',
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           const leaderboard = [];
//           for (let i = 0; i < result.length; i += 2) {
//             const userId = result[i];
//             const xp = parseInt(result[i + 1]);
//             leaderboard.push({ userId, xp });
//           }
//           resolve(leaderboard);
//         }
//       }
//     );
//   });
// };

// client.on('messageCreate', async (message)=>{
//   // redisClient.hG
//   console.log('test')

//   const userId = message.author.id;
//   const guildId = message.guild.id
//   const xp = await getGuildUserXP(guildId, userId);
//   console.log('test3')

//   const newXp = xp + 10; // Increment XP by 10
//   console.log(xp)
//   setGuildUserXP(userId, newXp);
//   updateGuildLeaderboard(guildId, userId, newXp);
//   // On message:
//   // 1. Check if user is in database
//   // 2. If not, add to database. 
//   // 3. Upon doing so, add some xp amount:
//   //    xp = (userLevel / 1000) * random.range(0,1)
//   //    lvls = I could use a log scale, but, that is not.
//   // Each server will have:
//   // key: serverID, vals:[{userID: userID, xp: xp, lvl: lvl, color:color}]
// })


// redisClient.on('error', err => console.log('Redis client error', err));

// client.on('warn', (warn) => console.warn(warn))
// client.on('error',(error) => console.error(error))
// client.login(token)



// // const url = "https://www.iban.com/exchange-rates";
// /*

// rp(url).then(function(html){
//   console.log(html);
//   fs.writeFileSync("a.txt", html)
// }).catch(function(err){console.log(err)})
// */

// //#region

// /*XKCD Scraping
// const url = "https://c.xkcd.com/random/comic/"
// rp(url)
//   .then(function(html){
//     let pat =/Image URL \(for hotlinking\/embedding\): <a href= "([^<]*)">/
//     let num = /Permanent link to this comic: <a href="([^<]*)">/
//     console.log(html);
//     let comicnum = html.split(num)
//     let temp = html.split(pat)
//     console.log(`${comicnum[1]}, ${temp[1]}`)

//   }).catch(function(err){console.log(err)})
// */


// /*Scraping OnlineRadio Box Site Stuff
// const url = "https://onlineradiobox.com/us/kxrk/playlist/6?cs=us.kxrk"

// rp(url)
//   .then(function(html){
//     //let pat = /Image URL (for hotlinking\/embedding): <a href\= \"[^<]*\">/
//     let songpat = /<td class="track_history_item"><a href="\/track\/[0-9]+\/" class="ajax">([^<]*)<\/a>/
//     let temp = html.split(songpat)
//     //console.log(temp[1])
//     let songs = "";
//     for(let s=1;s<temp.length-1;s+=2){
//       let t = temp[s].replace(" - "," ")
//         let j = t.replaceAll(" ","%20")
//           songs += "https://open.spotify.com/search/"+j+"\n"
//         }
//         fs.writeFileSync("a.txt",songs)

//         // console.log(ts)
      
//       let formated=temp.split(" - ");
//       let tS = "";
//       for(j = 0;j<formated.length;j++){
//         tS +=formated[1][j]
//       }
//       console.log(temp[s])
    
//     //temp.foreach(ele=>{console.log(`${num++}${ele}`)})
//     //console.log(temp[1])
//     //fs.writeFileSync("a.txt", html)
//     //let imlink = html.split(pat)
//     //console.log(imlink[1]);
//     //console.log(imlink.length)
//   })
//   .catch(function(err){console.log(err)})
// */
// // const $ = require("cheerio")


// // let pat = /<title>([^<]*)<\/title>/
// /*
// //let re = new RegExp("/<title>([^<]*)<\/title>/")
// rp(url)
//   .then(function(html){
//     //success!
//     //console.log(html.search(pat))
//       let temp  = html.split(pat)
//     console.log(temp[1])
//     //console.log($('big > a', html).length);
//     //console.log($('big > a', html));
//     //console.log(html);
//   })
//   .catch(function(err){
//     //handle error
//     console.log(err)
//   });
// */

//   // let links = ["https://leetcode.com/problems/longest-palindromic-substring/",
//   // "https://leetcode.com/problems/add-two-numbers/","https://leetcode.com/problems/zigzag-conversion/"]
//     /*links.forEach(ele =>{
//       // let  temp = html.
//     rp(ele)
//       .then(function(html){
//       //success!
//       let temp  = html.split(pat)
//       console.log(temp[1])
//       })
//       .catch(function(err){
//     //handle error
//       console.log(err)
//       });
//     })  

// */


    //console.log(lepet.test("https://www.leetcode.com/problems/this"))




//https://leetcode.com/problems/zigzag-conversion/
// /*
// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }
// google.forms.get.documentId("1d4sdkseGkTZGIai21Nx2ltWqO8WcnaSb9Z3-1ocqaD8")
// /**
//  * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Prints the title of a sample doc:
//  * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
//  * @param {google.auth.OAuth2} auth The authenticated Google OAuth 2.0 client.
//  */
// async function printDocTitle(auth) {
//   const docs = google.docs({version: 'v1', auth});
//   const res = await docs.documents.get({
//     documentId: '1Yl7FhubSj22WC6jCMkBGRdEcncUhfguqxMYfcqf3Bww',
//   });
//   console.log(`The title of the document is: ${res.data.title}`);
// }

// authorize().then(printDocTitle).catch(console.error);
// */
//#endregion