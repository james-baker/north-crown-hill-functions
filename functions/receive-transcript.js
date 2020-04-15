// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-transcript

import qs from "../lib/querystring-wrappers";
const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log(`Running receive-transcript as ${event.httpMethod}`);

  const params = qs.getParams(event);
  console.log(params);
  if (!params || !params.TranscriptionText) {
    await slack.postMessage("#bot-testing", "receive-transcript params did not contain Twilio TranscriptionText");
  } else {
    await slack.postMessage("#bot-testing", `receive-transcript data: ${params.TranscriptionText}`);
  }

  const response = new VoiceResponse();
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/xml"},
    body: response.toString()
  };
};
