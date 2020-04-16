export default {
  xml200: function (response) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/xml"},
      body: response.toString(),
    }
  },
  empty200: {
    statusCode: 200,
    headers: { "Content-Type": "text/xml"},
    body: '<?xml version="1.0" encoding="UTF-8"?><Response/>'
  },
}

