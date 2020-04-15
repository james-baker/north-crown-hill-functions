// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-call

import qs from "../lib/querystring-wrappers";
const twilioClient = require("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log(`Running receive-call as ${event.httpMethod}`);

  var params = qs.getParams(event);
  await slack.postMessage("#bot-testing", `receive-call params: ${JSON.stringify(params)}`);

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
  response.say('Thank you for your message.');
  response.hangup();

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/xml"},
    body: response.toString(),
  };
};
