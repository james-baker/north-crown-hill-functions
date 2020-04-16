require ("./dotenvconfig");
const { WebClient } = require('@slack/web-api');

async function postMessageCore(channel, text, thread) {
  const web = new WebClient(process.env.SLACK_BOT_TOKEN);
  var response;
    try {
      let pmParams = { channel: channel, text: text };
      if (thread) {
        pmParams.thread_ts = thread;
      }
      response = await web.chat.postMessage(pmParams);
    } catch (error) {
      console.log("slack-wrappers/postMessage threw:");
      console.log(error);
    }
  if (typeof response === "object" && response.ok) {
    return response;
  }
  if (typeof response === "object" && response.ok === false && response.error) {
    console.log(
      `postMessage returned error: ${JSON.stringify(response.error)}`
    );
  } else {
    console.log(
      `postMessage produced unknown result: ${JSON.stringify(response)}`
    );
  }
  return false;
}

exports.postMessage = async function postMessage(channel, text) {
  return await postMessageCore(channel, text, undefined);
};

exports.postReply = async function postReply(channel, text, thread) {
  return await postMessageCore(channel, text, thread);
};

exports.search = async function search(searchQuery) {
  const web = new WebClient(process.env.SLACK_OAUTH_TOKEN);
  const searchResponse = await web.search.messages({query: searchQuery, count: 1});
  return searchResponse;
};

exports.getMessage = async function getMessage(channel, ts) {
  const web = new WebClient(process.env.SLACK_BOT_TOKEN);
  const historyResponse = await web.conversations.history({channel: channel, oldest: ts, inclusive: true, limit: 1});
  return historyResponse;
}