// Endpoint: https://nch-functions.netlify.app/.netlify/functions/receive-call

import qs from "../lib/querystring-wrappers";
import httpResponse from "../lib/httpreturns";
//const twilioClient = require("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log(`Running receive-call as ${event.httpMethod}`);
  const channel = "#bot-testing";

  var params = qs.getParams(event);
  if (!params) {
    await slack.postMessage(channel, `receive-call error, missing params: ${JSON.stringify(params)}`);
  }

  const messageConfirmation = await slack.postMessage(channel, `Receiving new call from ${params.Caller}...`);
  //await slack.postReply(channel, `Call ID: ${params.CallSid}`, messageConfirmation.ts)

  const response = new VoiceResponse();
  response.say('Please leave a message at the beep.');
  response.record({
    action: `https://nch-functions.netlify.app/.netlify/functions/receive-recording?ts=${messageConfirmation.ts}`,
    method: 'POST',
    maxLength: 120,
    timeout: 8,
    transcribe: true,
    transcribeCallback: `https://nch-functions.netlify.app/.netlify/functions/receive-transcript?ts=${messageConfirmation.ts}`
  });
  response.say('We did not hear your message. Please call again.');
  response.hangup();

  return httpResponse.xml200(response);
};
