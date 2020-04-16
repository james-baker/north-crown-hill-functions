// Endpoint: https://nch-functions.netlify.app/.netlify/functions/receive-transcript

import qs from "../lib/querystring-wrappers";
import httpResponse from "../lib/httpreturns";
const slack = require("../lib/slack-wrappers");

exports.handler = async (event, context) => {
  console.log(`Running receive-transcript as ${event.httpMethod}`);

  const params = qs.getParams(event);
  console.log(params);
  if (!params || !params.CallSid) {
    await slack.postMessage("#bot-testing", `receive-transcript error, missing params or CallSid: ${JSON.stringify(params)}`);
  } else if (params.TranscriptionStatus !== "completed") {
    await slack.postMessage("#bot-testing", `receive-transcript TranscriptionStatus was: ${params.TranscriptionStatus}. `+
    "This happens if the recording is <2 seconds or >120 seconds.");
  }else if (!params.TranscriptionText) {
    await slack.postMessage("#bot-testing", `receive-transcript error for call ${params.CallSid}, `+
    "TranscriptionStatus was 'completed' but params did not contain TranscriptionText");
  } else {
    await slack.postMessage("#bot-testing", `Voicemail transcript for call ID ${params.CallSid}: ${params.TranscriptionText}`);
  }

  return httpResponse.empty200;
};
