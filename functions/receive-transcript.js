// Endpoint: https://nch-functions.netlify.com/.netlify/functions/receive-transcript

const querystring = require("../lib/querystring-wrappers");
const twilioClient = require ("../lib/twilio-wrappers");
const slack = require("../lib/slack-wrappers");

exports.handler = async (event, context) => {
  console.log("Running receive-transcript");

  const params = querystring.getParams(event);
  slack.postMessage("#bot-testing", `receive-transcript data: ${JSON.stringify(params)}`);

  return {
    statusCode: 200,
    body: "received transcript"
  };
};
