// Endpoint: https://nch-functions.netlify.app/.netlify/functions/receive-transcript

import qs from "../lib/querystring-wrappers";
import httpResponse from "../lib/httpreturns";
const slack = require("../lib/slack-wrappers");

exports.handler = async (event, context) => {
  console.log(`Running receive-transcript as ${event.httpMethod}`);
  const channel = "#bot-testing";

  const params = qs.getParams(event);
  if (!params || !params.CallSid) {
    await slack.postMessage(channel, `receive-transcript error, missing params or CallSid: ${JSON.stringify(params)}`);
  } else if (params.TranscriptionStatus !== "completed") {
    await slack.postMessage(channel, `receive-transcript TranscriptionStatus was: ${params.TranscriptionStatus}. `+
    "This happens if the recording is <2 seconds or >120 seconds.");
  } else if (!params.TranscriptionText) {
    await slack.postMessage(channel, `receive-transcript error for call ${params.CallSid}, `+
    "TranscriptionStatus was 'completed' but params did not contain TranscriptionText");
  } else {
    const thread_ts = params.ts; //await slack.getThreadContainingGUID(params.CallSid);
    if (thread_ts) {
      await slack.postReply(channel, `Voicemail transcript: ${params.TranscriptionText}`, thread_ts);
    } else {
      await slack.postMessage(channel, `Unable to find an existing call thread for call ID ${params.CallSid}.\n Voicemail transcript: ${params.TranscriptionText}`);
    }
  }

  return httpResponse.empty200;
};
