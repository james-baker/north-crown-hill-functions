// Endpoint: https://nch-functions.netlify.app/.netlify/functions/receive-recording

import qs from "../lib/querystring-wrappers";
import httpResponse from "../lib/httpreturns";
const slack = require("../lib/slack-wrappers");
//const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log(`Running receive-recording as ${event.httpMethod}`);
  const channel = "#bot-testing";

  const params = qs.getParams(event);
  console.log(params);
  if (!params || !params.CallSid) {
    await slack.postMessage(channel, `receive-recording error, missing params or CallSid: ${JSON.stringify(params)}`);
  } else if (!params.RecordingUrl) {
    await slack.postMessage(channel, `receive-recording error for call ${params.CallSid}, params did not contain RecordingUrl`);
  } else {
    const thread_ts = await slack.getThreadContainingGUID(params.CallSid);
    const recording = params.RecordingUrl + ".mp3";
    if (thread_ts) {
      await slack.postReply(channel, `Voicemail (${params.RecordingDuration} seconds) link: ${recording}`, thread_ts);
    } else {
      await slack.postReply(channel, `Unable to find an existing call thread for call ID ${params.CallSid}.\n Voicemail (${params.RecordingDuration} seconds) link: ${recording}`, thread_ts);
    }
  }

  // const response = new VoiceResponse();
  // response.say('Thank you for your message.');
  // response.hangup();

  return httpResponse.xml200('<?xml version="1.0" encoding="UTF-8"?><Response><Say>Thank you for your message.</Say><Hangup/></Response>');
};
