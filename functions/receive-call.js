require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
} = process.env;

exports.handler = function(event, context, callback) {
  console.log('Hello world!')
};