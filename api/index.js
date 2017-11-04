const express = require('express')
const app = express()
const cors = require('cors');
const request = require('request');
const port = 3001;
const crawl = require('./crawlers');
const collections = require('./collections');
const bodyParser= require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.get('/forward', function (req, res) {
    const queryUrl = req.query.queryUrl;
    request(queryUrl).pipe(res);
})

app.use('/crawl', crawl);
app.use('/collections', collections)

app.listen(port, function () {
    console.log(`Request forwarder is listening on port ${port}!`)
})