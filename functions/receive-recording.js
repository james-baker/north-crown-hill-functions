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
    const searchResult = await slack.search(params.CallSid);
    console.log(searchResult);
    if (searchResult && searchResult.ok === true && searchResult.messages && searchResult.messages.total === 1) {
      console.log(searchResult.messages.matches[0]);
      const match = searchResult.messages.matches[0];
      const matchChannel = match.channel.id;
      console.log(matchChannel);
      const matchUser = match.username; //nchbot
      const matchTS = match.ts;
      const messageResult = await slack.getMessage(matchChannel, matchTS);
      console.log(messageResult);
    
      const recording = params.RecordingUrl + ".mp3";
      await slack.postReply(channel, `Recorded voicemail (${params.RecordingDuration} seconds) for call ID ${params.CallSid}: ${recording}`, messageResult.messages[0].thread_ts);
    }
  }

  // const response = new VoiceResponse();
  // response.say('Thank you for your message.');
  // response.hangup();

  return httpResponse.xml200('<?xml version="1.0" encoding="UTF-8"?><Response><Say>Thank you for your message.</Say><Hangup/></Response>');
};
