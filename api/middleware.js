const express = require('express')
const cors = require('cors');
const crawl = require('./crawlers');
const collections = require('./collections');
const bodyParser= require('body-parser')


module.exports = function (app) {
    app.use(cors())
    app.use(bodyParser.json())

    // app.get('/forward', function (req, res) {
    //     const queryUrl = req.query.queryUrl;
    //     request(queryUrl).pipe(res);
    // })

    app.use('/.netlify/functions', crawl);
    //app.use('/collections', collections)

    // app.listen(port, function () {
    //     console.log(`Request forwarder is listening on port ${port}!`)
    // })
}