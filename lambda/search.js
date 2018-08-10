const engine = require("../api/crawlers/engine");

exports.handler = function(event, context, callback) {
  const keyword = event.queryStringParameters.keyword;

  engine
    .search(keyword)
    .then(values =>
      callback(null, { statusCode: 200, body: JSON.stringify(values) })
    );
};
