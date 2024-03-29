const cheerio = require("cheerio");
const request = require("request");

const searchUrlTemplate = "https://www.dragonslair.se/product/?name=";
const domainPrefix = "https://www.dragonslair.se";

const parseHtmlToProducts = (response) => {
  const $ = cheerio.load(response);
  const foundProducts = $(".grid .item")
    .map((_, el) => {
      const $el = $(el);
      const game = {
        url: domainPrefix + $el.find("a").first().attr("href"),
        name: $el.find(".title").text().trim(),
        image: domainPrefix + $el.find(".image img").first().attr("src"),
        price: $el.find(".price").first().text().trim(),
        available: $el.find(".stock .description").text().indexOf("Ja") > -1,
      };

      return game;
    })
    .get();

  return foundProducts;
};

const fetchByUrl = (url) => {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        console.log(error);
      }
      let httpError = "";

      if (response) {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve({
            name: "Dragon's Lair",
            url: url,
            games: parseHtmlToProducts(body),
          });
          return;
        }

        httpError = response.statusCode;
        console.log("Dragon's Lair Unknown error: " + response.statusCode);
      }

      resolve({
        name: "Dragon's Lair",
        url: url,
        error: error && error.toString ? error.toString() : "",
        httpError,
        games: [],
      });
    });
  });
};

const search = (term) => {
  const concenatedTerm = term.replace(" ", "+");

  const searchUrl = `https://www.dragonslair.se/product/name:${concenatedTerm}/boardgame`;

  return fetchByUrl(searchUrl);
};

const newArrivalsUrlTemplate =
  "https://www.dragonslair.se/product/sort:new-arrivals/boardgame";

const fetchNewArrivals = () => {
  return fetchByUrl(newArrivalsUrlTemplate);
};

module.exports = {
  search,
  fetchNewArrivals,
};
