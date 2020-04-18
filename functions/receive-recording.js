// Endpoint: https://nch-functions.netlify.app/.netlify/functions/receive-recording

import config from "../lib/config";
import qs from "../lib/querystring-wrappers";
import httpResponse from "../lib/httpreturns";
const slack = require("../lib/slack-wrappers");
//const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log(`Running receive-recording as ${event.httpMethod}`);
  const params = qs.getParams(event);
  const channel = (params.test) ? config.testingChannel : config.hotlineChannel;
  const thread_ts = params.ts;
  if (!params) {
    await slack.postReply(channel, `receive-recording error, missing params: ${JSON.stringify(params)}`, thread_ts);
  } else if (!params.RecordingUrl) {
    await slack.postReply(channel, `receive-recording error for call ${params.Caller}, params did not contain RecordingUrl`, thread_ts);
  } else {
    const recording = params.RecordingUrl + ".mp3";
    if (thread_ts) {
      await slack.postReply(channel, `Voicemail (${params.RecordingDuration} seconds) link: ${recording}`, thread_ts);
    } else {
      await slack.postReply(channel, `Couldn't find Slack message thread for ${params.Caller}.\n Voicemail (${params.RecordingDuration} seconds) link: ${recording}`, thread_ts);
    }
  }

  // const response = new VoiceResponse();
  // response.say('Thank you for your message.');
  // response.hangup();

  return httpResponse.xml200('<?xml version="1.0" encoding="UTF-8"?><Response><Say>Thank you for your message.</Say><Hangup/></Response>');
};
