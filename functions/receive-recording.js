// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-recording

import qs from "../lib/querystring-wrappers";
const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log(`Running receive-recording as ${event.httpMethod}`);

  const params = qs.getParams(event);
  console.log(params);
  slack.postMessage("#bot-testing", `receive-recording data: ${JSON.stringify(params)}`);

  const response = new VoiceResponse();
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/xml"},
    body: response.toString()
  };
};
