// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-call

import querystring from "querystring";
const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  console.log("Running receive-call");

  var params;
  if (event.httpMethod === "POST") {
    params = querystring.parse(event.body); //POST puts params in the event body encoded as a query string
  } else {
    params = event.queryStringParameters;
  }

  slack.postMessage("#bot-testing", `Received a request with params: ${JSON.stringify(params)}`);

  return {
    statusCode: 200,
    body: "Received request.",
  };
};
