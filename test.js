const rp = require('request-promise');
const fs = require("fs")
//const url = "https://www.isu.edu/calendar/"
// const url = "https://www.trumba.com/calendars/isu_event_calendar?template=table&media=print"

const url = "https://www.chegg.com/homework-help/questions-and-answers/consider-following-scenario-web-browser-lower-connects-web-server--also-local-web-cache-bo-q99387886"



// const url = "https://www.iban.com/exchange-rates";


rp(url).then(function(html){
  console.log(html);
  fs.writeFileSync("a.txt", html)
}).catch(function(err){console.log(err)})

/*XKCD Scraping
const url = "https://c.xkcd.com/random/comic/"
rp(url)
  .then(function(html){
    let pat =/Image URL \(for hotlinking\/embedding\): <a href= "([^<]*)">/
    let num = /Permanent link to this comic: <a href="([^<]*)">/
    console.log(html);
    let comicnum = html.split(num)
    let temp = html.split(pat)
    console.log(`${comicnum[1]}, ${temp[1]}`)

  }).catch(function(err){console.log(err)})
*/


/*Scraping OnlineRadio Box Site Stuff
const url = "https://onlineradiobox.com/us/kxrk/playlist/6?cs=us.kxrk"

rp(url)
  .then(function(html){
    //let pat = /Image URL (for hotlinking\/embedding): <a href\= \"[^<]*\">/
    let songpat = /<td class="track_history_item"><a href="\/track\/[0-9]+\/" class="ajax">([^<]*)<\/a>/
    let temp = html.split(songpat)
    //console.log(temp[1])
    let songs = "";
    for(let s=1;s<temp.length-1;s+=2){
      let t = temp[s].replace(" - "," ")
        let j = t.replaceAll(" ","%20")
          songs += "https://open.spotify.com/search/"+j+"\n"
        }
        fs.writeFileSync("a.txt",songs)

        // console.log(ts)
      
      let formated=temp.split(" - ");
      let tS = "";
      for(j = 0;j<formated.length;j++){
        tS +=formated[1][j]
      }
      console.log(temp[s])
    
    //temp.foreach(ele=>{console.log(`${num++}${ele}`)})
    //console.log(temp[1])
    //fs.writeFileSync("a.txt", html)
    //let imlink = html.split(pat)
    //console.log(imlink[1]);
    //console.log(imlink.length)
  })
  .catch(function(err){console.log(err)})
*/
// const $ = require("cheerio")


// let pat = /<title>([^<]*)<\/title>/
/*
//let re = new RegExp("/<title>([^<]*)<\/title>/")
rp(url)
  .then(function(html){
    //success!
    //console.log(html.search(pat))
      let temp  = html.split(pat)
    console.log(temp[1])
    //console.log($('big > a', html).length);
    //console.log($('big > a', html));
    //console.log(html);
  })
  .catch(function(err){
    //handle error
    console.log(err)
  });
*/

  // let links = ["https://leetcode.com/problems/longest-palindromic-substring/",
  // "https://leetcode.com/problems/add-two-numbers/","https://leetcode.com/problems/zigzag-conversion/"]
    /*links.forEach(ele =>{
      // let  temp = html.
    rp(ele)
      .then(function(html){
      //success!
      let temp  = html.split(pat)
      console.log(temp[1])
      })
      .catch(function(err){
    //handle error
      console.log(err)
      });
    })  

*/


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