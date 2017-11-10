const express = require('express');
const request = require('request');
//should have an abstraction layer here but w/e
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('queries.json')
const db = low(adapter)

db.defaults({
        queries: []
    })
    .write()

module.exports = function setup(router) {
    router.get('/query', (req, res) => {
        const games = db.get('queries')
            .value();

        res.send(games);
    });

    router.post('/query', (req, res) => {
        db.get('queries')
            .push(req.body)
            .write();

        res.sendStatus(200);
    });

};