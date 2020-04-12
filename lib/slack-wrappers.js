require ("./dotenvconfig");
const { WebClient } = require('@slack/web-api');

exports.postMessage = function postMessage(channel, text) {
  const web = new WebClient(process.env.SLACK_TOKEN);
  (async () => {
    let response;
    try {
      response = await web.chat.postMessage({
        channel: channel,
        text: text,
      });
      if (response && response.ok) {
        console.log(`postMessage successful: ${JSON.stringify(response)}`)
      } else if (response && response.ok === false && response.error) {
        console.log(
          `postMessage returned error: ${JSON.stringify(response.error)}`
        );
      } else {
        console.log(
          `postMessage produced unknown result: ${JSON.stringify(response)}`
        );
      }
    } catch (error) {
      console.log("postMessage chunk threw:");
      console.log(error);
    }
  })();
};
