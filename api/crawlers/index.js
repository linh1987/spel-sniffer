const express = require('express');
const request = require('request');
const alphaspel = require('./alphaspel');
const dragonlair = require('./dragonlair');
const sfbok = require('./sfbok');
const router = express.Router();


router.get('/', (req, res) => {
  const keyword = req.query.keyword;
  Promise.all([alphaspel.search(keyword),
      dragonlair.search(keyword),
      sfbok.search(keyword)
    ])
    .then((values) => res.send(JSON.stringify(values)));
});

router.get('/nyheter', (req, res) => {
  const keyword = req.query.keyword;
  Promise.all([alphaspel.fetchNewArrivals(),
      dragonlair.fetchNewArrivals(),
      sfbok.fetchNewArrivals()
    ])
    .then((values) => res.send(JSON.stringify(values)));
});
module.exports = router;