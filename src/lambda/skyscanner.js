const axios = require('axios')

exports.handler = function(event, context, callback) {
  var parameters = event.queryStringParameters;

  axios.get("http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/UK/gbp/en-GB/" + parameters.code + "/anywhere/" + parameters.date + "?apikey=" + process.env.apikey)
    .then((response) => {
      this.response = JSON.stringify(response.data)
      callback(null, {
        statusCode: 200,
        body: this.response
      });
    })
    .catch((err) => {
      console.error(err);
      callback(err);
    })
}
