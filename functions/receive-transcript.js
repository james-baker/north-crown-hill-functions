// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-transcript

const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");

exports.handler = async (event, context) => {
  console.log("Running receive-transcript");

  slack.postMessage("#bot-testing", `receive-transcript data: ${JSON.stringify(event)}`);

  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
};
