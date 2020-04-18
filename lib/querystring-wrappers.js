import querystring from "querystring";

export default {
  getParams: function getParams(event) {
    let params;
    if (event.httpMethod === "POST") {
      let bodyParams = querystring.parse(event.body); //POST puts params in the event body encoded as a query string
      let urlParams = event.queryStringParameters; // feels like cheating, but the URL is the only place to make twilio store state
      params = Object.assign({}, bodyParams, urlParams);
    } else {
      params = event.queryStringParameters;
    }
    console.log(params);
    return params;
  },
};