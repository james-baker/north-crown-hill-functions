// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-call

import querystring from "querystring";
const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log("Running receive-call");

  var params;
  if (event.httpMethod === "POST") {
    params = querystring.parse(event.body); //POST puts params in the event body encoded as a query string
  } else {
    params = event.queryStringParameters;
  }

  const response = new VoiceResponse();
  response.say('Please leave a message at the beep.');
  response.record({
    action: 'https://nch-functions.netlify.com/.netlify/functions/receive-recording',
    method: 'POST',
    maxLength: 120,
    timeout: 8,
    transcribe: true,
    transcribeCallback: 'https://nch-functions.netlify.com/.netlify/functions/receive-transcript'
  });

  var pmResponse = await slack.postMessage("#bot-testing", `receive-call data: ${JSON.stringify(event)}`);

  console.log("outside the async: "+JSON.stringify(pmResponse));

  return {
    statusCode: 200,
    body: response.toString(),
  };
};
