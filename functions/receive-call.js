// https://nch-functions.netlify.com/.netlify/functions/receive-call
require("dotenv").config();
import querystring from "querystring";
//import fetch from "node-fetch";
const { WebClient } = require('@slack/web-api');
const VoiceResponse = require("twilio").twiml.VoiceResponse;

exports.handler = async (event, context) => {
  const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  console.log("Hello async world!");

  var params;
  if (event.httpMethod === "POST") {
    params = querystring.parse(event.body); //POST puts params in the event body encoded as a query string
  } else {
    params = event.queryStringParameters;
  }

  const web = new WebClient(process.env.SLACK_TOKEN);

  (async () => {
    let response;
    try {
      response = await web.chat.postMessage({
        channel: '#bot-testing',
        text: `Received a request with params: ${JSON.stringify(params)}`,
      });
      if ( response && response.ok ) {
      } else if ( response && response.ok === false && response.error) {
        console.log(`postMessage returned error: ${JSON.stringify(response.error)}`);
      } else {
        console.log(`postMessage produced unknown result: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.log("postMessage chunk threw:")
      console.log(error);
    }
  })();

  return {
    statusCode: 200,
    body: "Received request.",
  };
};
