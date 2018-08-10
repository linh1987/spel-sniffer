const alphaspel = require("./alphaspel");
const dragonlair = require("./dragonlair");
const webhallen = require("./webhallen");
const worldofboardgames = require("./worldofboardgames");
const sfbok = require("./sfbok");

module.exports = {
  search: keyword => {
    return Promise.all([
      alphaspel.search(keyword),
      dragonlair.search(keyword),
      sfbok.search(keyword),
      webhallen.search(keyword),
      worldofboardgames.search(keyword)
    ]);
  },
  nyheter: () => {
    return Promise.all([
      alphaspel.fetchNewArrivals(),
      dragonlair.fetchNewArrivals(),
      sfbok.fetchNewArrivals(),
      webhallen.fetchNewArrivals(),
      worldofboardgames.fetchNewArrivals()
    ]);
  }
};