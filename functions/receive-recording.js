// Endpoint: https://nch-functions.netlify.app/.netlify/functions/receive-recording

import qs from "../lib/querystring-wrappers";
import httpResponse from "../lib/httpreturns";
const slack = require("../lib/slack-wrappers");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log(`Running receive-recording as ${event.httpMethod}`);

  const params = qs.getParams(event);
  console.log(params);
  if (!params || !params.CallSid) {
    await slack.postMessage("#bot-testing", `receive-recording error, missing params or CallSid: ${JSON.stringify(params)}`);
  } else if (!params.RecordingUrl) {
    await slack.postMessage("#bot-testing", `receive-recording error for call ${params.CallSid}, params did not contain RecordingUrl`);
  } else {
    const recording = params.RecordingUrl + ".mp3";
    await slack.postMessage("#bot-testing", `Recorded voicemail (${params.RecordingDuration} seconds) for call ID ${params.CallSid}: ${recording}`);
  }

  const response = new VoiceResponse();
  response.say('Please leave a message at the beep.');
  response.hangup();

  return httpResponse.xml200(response);
};
