const express = require('express');
const request = require('request');
const router = express.Router();
//should have an abstraction layer here but w/e
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
        games: []
    })
    .write()


router.get('/', (req, res) => {
    const games = db.get('games')
        .value();

    res.send(games);
});

router.post('/', (req, res) => {
    db.get('games')
        .push({
            url: req.body.url,
            name: req.body.name,
            image: req.body.image,
            price: req.body.price
        })
        .write();

    res.sendStatus(200);
});

request.delete('/:id', (req, res) => {

})

module.exports = router;