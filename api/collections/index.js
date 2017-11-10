const express = require('express');
const router = express.Router();
const gameSetup = require('./game-tracker');
const querySetup = require('./query-tracker');

gameSetup(router);
querySetup(router);

module.exports = router;