const express = require("express");
const request = require("request");
const router = express.Router();
const engine = require("./engine");

router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  engine.search(keyword).then(values => res.send(JSON.stringify(values)));
});

router.get("/nyheter", (req, res) => {
  engine.nyheter().then(values => res.send(JSON.stringify(values)));
});

module.exports = router;
