const engine = require("../api/crawlers/engine");

exports.handler = function(event, context, callback) {
  engine
    .nyheter()
    .then(values =>
      callback(null, { statusCode: 200, body: JSON.stringify(values) })
    );
};
