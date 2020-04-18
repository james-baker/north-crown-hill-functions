// Endpoint: https://nch-functions.netlify.app/.netlify/functions/receive-transcript

import config from "../lib/config";
import qs from "../lib/querystring-wrappers";
import httpResponse from "../lib/httpreturns";
const slack = require("../lib/slack-wrappers");

exports.handler = async (event, context) => {
  console.log(`Running receive-transcript as ${event.httpMethod}`);
  const params = qs.getParams(event);
  const channel = (params.test) ? config.testingChannel : config.hotlineChannel;
  const thread_ts = params.ts;
  if (!params) {
    await slack.postReply(channel, `receive-transcript error, missing params: ${JSON.stringify(params)}`, thread_ts);
  } else if (params.TranscriptionStatus !== "completed") {
    await slack.postReply(channel, `No transcription - TranscriptionStatus was: ${params.TranscriptionStatus}. `+
    "This happens if the recording is <2 seconds or >120 seconds.", thread_ts);
  } else if (!params.TranscriptionText) {
    await slack.postReply(channel, `receive-transcript error for call ${params.Caller}, `+
    "TranscriptionStatus was 'completed' but params did not contain TranscriptionText", thread_ts);
  } else {
    if (thread_ts) {
      await slack.postReply(channel, `Automatic transcription: ${params.TranscriptionText}`, thread_ts);
    } else {
      await slack.postMessage(channel, `Couldn't find Slack message thread for ${params.Caller}.\n Automatic transcription: ${params.TranscriptionText}`);
    }
  }

  return httpResponse.empty200;
};
