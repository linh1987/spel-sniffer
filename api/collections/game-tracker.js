const express = require('express');
const request = require('request');
const router = express.Router();
//should have an abstraction layer here but w/e
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('game.json')
const db = low(adapter)

db.defaults({
    games: []
})
.write()


router.get('/game', (req, res) => {
    const games = db.get('queries')
        .value();

    res.send(games);
});

router.post('/game', (req, res) => {
    db.get('queries')
        .push(req.body)
        .write();

    res.sendStatus(200);
});

request.delete('/game/:id', (req, res) => {

})

module.exports = router;