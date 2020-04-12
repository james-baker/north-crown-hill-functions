// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-call

import querystring from "querystring";

const VoiceResponse = require("twilio").twiml.VoiceResponse;
const slack = require("../lib/slack-wrappers");

exports.handler = async (event, context) => {
  const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  console.log("Hello async world!");

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
