// Endpoint: https://nch-functions.netlify.app/.netlify/functions/receive-recording

import qs from "../lib/querystring-wrappers";
const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log(`Running receive-recording as ${event.httpMethod}`);

  const params = qs.getParams(event);
  console.log(params);
  if (!params || !params.RecordingUrl) {
    await slack.postMessage("#bot-testing", "receive-recording params did not contain Twilio RecordingUrl");
  } else {
    const recording = params.RecordingUrl + ".mp3";
    await slack.postMessage("#bot-testing", `receive-recording data: ${recording}`);
  }

  const response = new VoiceResponse();
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/xml"},
    body: response.toString()
  };
};
