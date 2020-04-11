// https://nch-functions.netlify.com/.netlify/functions/receive-call
require("dotenv").config();
import querystring from "querystring";
//import fetch from "node-fetch";

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

  // // Send greeting to Slack
  // return fetch(process.env.SLACK_WEBHOOK_URL, {
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   method: "POST",
  //   body: JSON.stringify({ text: `${name} says hello!` }),
  // })
  //   .then(() => ({
  //     statusCode: 200,
  //     body: `Hello, ${name}! Your greeting has been sent to Slack 👋`,
  //   }))
  //   .catch((error) => ({
  //     statusCode: 422,
  //     body: `Oops! Something went wrong. ${error}`,
  //   }));

  return {
    statusCode: 200,
    body: "Received request<br/>Event: " + JSON.stringify(params),
  };
};
