// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-recording

import qs from "../lib/querystring-wrappers";
const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");

exports.handler = async (event, context) => {
  console.log("Running receive-recording");

  const params = qs.getParams(event);
  console.log(params);
  slack.postMessage("#bot-testing", `receive-recording data: ${JSON.stringify(params)}`);

  return {
    statusCode: 204
  };
};
