const express = require('express');
const request = require('request');
const alphaspel = require('./alphaspel');
const router = express.Router();


router.get('/', (req, res) => {
  const keyword = req.query.keyword;

  alphaspel.search(keyword).then((products) => res.send(JSON.stringify(products)));
});

module.exports = router;
