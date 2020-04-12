// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-recording

const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");

exports.handler = async (event, context) => {
  console.log("Running receive-recording");

  slack.postMessage("#bot-testing", `receive-recording data: ${JSON.stringify(event)}`);

  return {
    statusCode: 200,
    body: response.toString(),
  };
};
