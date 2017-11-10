const express = require('express');
const request = require('request');
//should have an abstraction layer here but w/e
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('games.json')
const db = low(adapter)

db.defaults({
    games: []
    })
    .write()

module.exports = function setup(router) {
    router.get('/game', (req, res) => {
        const games = db.get('games')
            .value();

        res.send(games);
    });

    router.post('/game', (req, res) => {
        db.get('games')
            .push(req.body)
            .write();

        res.sendStatus(200);
    });

};