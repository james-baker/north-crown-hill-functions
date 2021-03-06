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

exports.getMessage = async function getSingleMessage(channel, ts) {
  const web = new WebClient(process.env.SLACK_OAUTH_TOKEN);
  const historyResponse = await web.conversations.history({channel: channel, latest: ts, inclusive: true, limit: 1});
  return historyResponse;
}

exports.getThreadContainingGUID = async function getThreadContainingGUID(guid) {
  const searchResult = await exports.search(guid);
  if (searchResult && searchResult.ok === true && searchResult.messages && searchResult.messages.total >= 1) {
    
    const message = searchResult.messages.matches[0];
    console.log(message);
    //hack: if there's a thread_ts in the "permalink", extract it. otherwise "ts" is a parent.
    if (!message || typeof message.permalink !== "string") {
      return undefined;
    } else if (message.permalink.includes("thread_ts=")) {
      return message.permalink.split("=")[1];
    } else {
      return message.ts;
    }

    // this would work if conversations.history could access replies at all
    // console.log(message);
    // const matchChannel = message.channel.id;
    // //const matchUser = message.username; //nchbot
    // const fullMsg = await exports.getMessage(matchChannel, message.ts);
    // console.log(fullMsg);
    // return fullMsg.messages[0].thread_ts;
  } else {
    console.log(`Failed search for ${guid}:`)
    console.log(searchResult);
  }
  return undefined;
};