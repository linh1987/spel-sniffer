const express = require('express');
const request = require('request');
const router = express.Router();
//should have an abstraction layer here but w/e
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    games: [],
    queries: []
})
.write()


router.get('/', (req, res) => {
    const games = db.get('queries')
        .value();

    res.send(games);
});

router.post('/', (req, res) => {
    db.get('queries')
        .push(req.body)
        .write();

    res.sendStatus(200);
});

request.delete('/:id', (req, res) => {

})

module.exports = router;