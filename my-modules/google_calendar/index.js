const express = require('express');
const bodyParser = require('body-parser');
const { authorize, listEvents } = require('./calendar_test.js')
const app = express();
const serverPort = 3000;
const cli = authorize().then(res=>{console.log(res) }).catch(console.error)
// listEvents(cli
console.log(cli)
const { google } = require('googleapis');
const localtunnel = require('localtunnel');
const { v4: uuidv4 } = require('uuid');


// Start the tunnel right after you start your Http server using fastify (see Handling the authorization callback step)
const tunnel =  localtunnel({
  port: serverPort
});
// Authorization details for google API are explained in previous steps.
const calendar = google.calendar({ version: 'v3' });
const watchResponse =  calendar.events.watch({
  resource: {
    id: uuidv4(),
    type: 'web_hook',
    address: `${tunnel.url}/webhook`, // Expose localhost using a secure tunnel
    token: webhookToken,
  },
  calendarId: 'primary',
});


// app.use(bodyParser.json());

// // Define a webhook endpoint to receive calendar notifications
// app.post('/calendar-webhook', (req, res) => {
//   const eventData = req.body; // Data about the new event

//   // Process the event data and take action
//   console.log('Received event:', eventData);

//   // Send a response to acknowledge receipt
//   res.status(200).send('Event received');
// });

// app.listen(port, () => {
//   console.log(`Webhook server is running on port ${port}`);
// });