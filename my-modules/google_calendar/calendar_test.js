const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const { Event } = require('../events/event_builder.js')
const express = require('express')
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const FULL_PATH = '/home/appsro/CodingStuff/acm_bot/my-modules/google_calendar'
const TOKEN_PATH = path.join(FULL_PATH, 'token.json');
const CREDENTIALS_PATH = path.join(FULL_PATH, 'updated_creds.json')
// const {clien} = require('./credentials.json')
const crypto = require('crypto')
// const fs = require('fs').promises;
// const { OAuth2Client } = require('google-auth-library');
// const {installed } = require('./credentials.json')
// async function createOAuth2Client() {
//   try {
//     const tokenData = await fs.readFile(TOKEN_PATH);
//     const parsedTokenData = JSON.parse(tokenData);

//     // Create an OAuth2Client instance with the parsed token data
//     const oAuth2Client = new OAuth2Client({
//       clientId: installed.client_id,
//       clientSecret: installed.client_secret,
//       redirectUri: `${installed.redirect_uris[0]}/${port}`, // Replace with your redirect URL
//     });
// 	console.log('cool')
//     // Set the credentials for the OAuth2Client
//     oAuth2Client.setCredentials({
//       access_token: installed.access_token,
//       refresh_token: installed.refresh_token,
//     });

//     return oAuth2Client;
//   } catch (error) {
//     console.error(error);
//     throw error; // Re-throw the error to handle it elsewhere, if needed
//   }
// }
// let oAuth2Client;
// (async () => {
//   try {
//     oAuth2Client = await createOAuth2Client();

//     // You can now use the oAuth2Client instance for OAuth2 operations
//   } catch (error) {
//     // Handle errors here
//   }
// })();


// // const crypto = require('crypto')
// // const { google}
// const {installed} = require('./updated_creds.json')

// const oAuth2Cli = new google.auth.OAuth2(
// 	installed.client_id,
// 	installed.client_secret,
// 	installed.redirect_uris[0]
// )
// // oAuth2Cli.setCredentials({access_token: })
// // const oAuth2Cli = new google.auth.OAuth2(installed.client_id, installed.client_secret, installed.redirect_uris[0])
// const oauthState = crypto.randomBytes(32).toString('hex');

// const localtunnel = require('localtunnel')
// const { v4: uuidv4 } = require('uuid')
// const port = 3002
// const {refresh_token} = require('./token.json')
// const tunnel = localtunnel({port: port})

// const calendar = google.calendar({ version: 'v3',  auth:oAuth2Cli})
// const watchResponse = calendar.events.watch({
// 	resource: {
// 		id: uuidv4(),
// 		type: 'web_hook',
// 		address: `${tunnel.url}/webhook`,
// 		token: refresh_token
// 	},
// 	calendarId: 'c_4bd74e7a704b23d7afeb0177ee0364eaf658debc9cfa5660d58a9b38a94bec6e@group.calendar.google.com'
// })


// const authUrl = oAuth2Cli.generateAuthUrl({
// 	access_type: 'offline',
// 	scope: 'https://www.googleapis.com/auth/calendar.events',
// 	redirect_uri: installed.redirect_uris[0],
// 	state: oauthState,
// 	client_id: installed.client_id
// })
// console.log(`Authorize your application by navigating to ${authUrl}`);

// const app = express();
// const port = 3000;
// app.use(bodyParser.json());

// app.get('/auth/google', (req, res)=>{
// 	const authUrl = oAuth2Client.generateAuthUrl({
// 		access_type: 'offline',
// 		scope: SCOPES
// 	})
// 	res.redirect(authUrl)
// })


// const auth = new google.auth.GoogleAuth({
// 	keyFile: path.join(process.cwd(), 'updated_creds.json'),
// 	scopes: ['https://www.googleapis.com/auth/calendar']
// })
// const { v4: uuidv4 } = require('uuid')
// const id_ = uuidv4()
// const request = {
// 	calendarId: 'c_4bd74e7a704b23d7afeb0177ee0364eaf658debc9cfa5660d58a9b38a94bec6e@group.calendar.google.com',
// 	resource: {
// 		id: id_,
// 		type: 'web_hook',
// 		address: 'zschepis03-himalayas.nord:3000/notifications'
// 	}
// }
// const calendar = google.calendar('v3')
// // Start watching for changes
// calendar.events.watch(request, (err, res) => {
// 	if (err) {
// 	  console.error('Error starting watch:', err);
// 	} else {
// 	  console.log('Watch response:', res.data);
// 	}
//   });

// https://www.googleapis.com/apiName/apiVersion/resourcePath/watch
// const url = 'https://www.googleapis.com/calendar/v3/calendarsc_4bd74e7a704b23d7afeb0177ee0364eaf658debc9cfa5660d58a9b38a94bec6e@group.calendar.google.com/watch'

// app.get(url, (req, res)=>{
// 	console.log(req, res)
// })
// // app.get('/auth/google/callback', async (req, res) => {
// 	const { code } = req.query;
// 	const { tokens } = await oAuth2Client.getToken(code);
  
// 	// Set the credentials for the authenticated user
// 	oAuth2Client.setCredentials(tokens);
  
// 	// Create a Google Calendar API instance
// 	const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
// 	// Add your code to set up webhook notifications here
  
// 	res.send('Authenticated and set up webhook.');
//   });

// app.listen(port, ()=>{
// 	console.log(`Server is running on port: ${port}`)
// })
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */


async function loadSavedCredentialsIfExist() {
	try
  	{
		const content = await fs.readFile(TOKEN_PATH);
		const credentials = JSON.parse(content);
		return google.auth.fromJSON(credentials);
	} catch (err) 
	{
		return null;
	}
}
function removeHTMLTags(value){
	const locationNoSpan = /<span>([^<]*)<\/span>/
	return value.replace(/<\/?[^>]+(>|$)/g, "")
	// return location.replace()
}

/**
 * Load or request or authorization to call APIs.
 *
 */
function makeUnix(time,formatting="F") {
	// <t:166447530000:R>
	// Discord supports unix timestamps, so, this is the formatting
	return `<t:${time}:${formatting}>`
}
async function authorize() {
	let client = await loadSavedCredentialsIfExist();
	if (client) 
	{
		return client;
	}
	client = await authenticate(
		{
			scopes: SCOPES,
			keyfilePath: CREDENTIALS_PATH,
		});
	if (client.credentials) 
	{
		await saveCredentials(client);
	}
	return client;
}


const calcTime = {
  day: (n_days) => n_days * 24 * 60 * 60 * 1000,
  hour: (n_hours) =>  n_hours * 60 * 60 * 1000,
  minute: (n_minutes) => n_minutes * 60 * 1000,
}



 /**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth, dateShift=0) {
	const calendar = google.calendar({version: 'v3', auth});
	const now = new Date();
	const oneWeekFromNow = dateShift >0 ? dateShift : new Date(now.getTime() + calcTime.day(7)); // 7 days in milliseconds

	const res = await calendar.events.list(
		{
			calendarId: 'c_29an57vstk0tarj9v8l22m1ggo@group.calendar.google.com',
			timeMin: now,
			timeMax: oneWeekFromNow,
			maxResults: 10,
			singleEvents: true,
			orderBy: 'startTime',
		});
	const events = res.data.items;
	if (!events || events.length === 0) 
	{
		console.log('No upcoming events found.');
		return;
	}

	console.log('Upcoming 10 events:');
	let formattedEvents = {embeds:[],event:[]}
	events.map((event, i) => {
		const startTimeStamp = Date.parse(event.start.dateTime)
		const endTimeStamp = Date.parse(event.end.dateTime)
		const loc = event.location ? `At: ${event.location}\n` : ""
		const desc = event.description ? `${removeHTMLTags(event.description+"")}\n` : ""
		const details = [
			`${desc}${loc}`,
			`[Calendar link](${event.htmlLink})\n`,
			`From: ${makeUnix(startTimeStamp/1000)} - ${makeUnix(endTimeStamp/1000)}`
		].join("")
		formattedEvents.event.push(
		{
			data: {
				title: event.summary,
				description: details,
				thumbnail: { url : "https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png" },
                color : 0x00a4c9
				// `${loc}${desc}[Calendar link](${event.htmlLink})\nFrom: ${makeUnix(startTimeStamp/1000)} - ${makeUnix(endTimeStamp/1000)}`
			},
			cronExpression: Event.cronExpression(startTimeStamp, {hour: "10", minute:"00"}),
			// multiple: 
		})
		formattedEvents.embeds.push(
		{ 
			name: event.summary,
			value: details
		})
	});
	// console.log(formattedEvents.event)
	return formattedEvents;


}




module.exports = {
  authorize,
  listEvents,
  calcTime
}


// const test_ = 'At: Lillibridge Engineering, <span>Student Lounge</span>\n' +
// '<span>Join ACM and CS tutors to g</span>et help with your homework and grab a bite to eat!' 
// console.log(removeSpan(test_))
/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

// (async ()=>{
// 	loadSavedCredentialsIfExist()
// })()
// authorize().then(listEvents).catch(console.error);