// https://nch-functions.netlify.com/.netlify/functions/receive-call
require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
} = process.env;

const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.handler = async (event, context) => {
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  console.log('Hello async world!');
  console.log("Event: "+JSON.stringify(event));
  console.log("Context: "+JSON.stringify(context));
  return {
    statusCode: 200,
    body: "Received request"
  };
};