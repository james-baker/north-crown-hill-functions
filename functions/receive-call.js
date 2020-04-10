// https://nch-functions.netlify.com/.netlify/functions/receive-call
require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
} = process.env;

const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.handler = function(event, context, callback) {
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  console.log('Hello world!')
  callback(null, { statusCode: 200, body: 'Received request' })
};