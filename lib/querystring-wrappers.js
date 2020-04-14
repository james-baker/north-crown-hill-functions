import querystring from "querystring";

export default {
  getParams: function getParams(event) {
    if (event.httpMethod === "POST") {
      return querystring.parse(event.body); //POST puts params in the event body encoded as a query string
    } else {
      return event.queryStringParameters;
    }
  },
};
