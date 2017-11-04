const cheerio = require('cheerio');
const request = require('request');

const searchUrlTemplate = 'https://www.alphaspel.se/search/?query=';
const proxyUrlTemplate = 'http://localhost:3001/forward/?queryUrl=';
const domainPrefix = 'https://www.alphaspel.se';


const parseHtmlToProducts = (response) => {
    const $ = cheerio.load(response);
    const foundProducts = $('.product').map((_, el) => {
        const $el = $(el);
        const game = {
            url: domainPrefix + $el.find('a').first().attr('href'),
            name: $el.find('.product-name').text(),
            image: domainPrefix + $el.find('img').first().attr('src'),
            price: $el.find('.price').text()
        }

        return game;
    }).get();

    return foundProducts;
}


const search = (term) => {
    const concenatedTerm = term.replace(' ', '+');

    const searchUrl = searchUrlTemplate + concenatedTerm;
    return new Promise((resolve, reject) => {
        request(proxyUrlTemplate + encodeURI(searchUrl), function(error, response, body) {
            if (error) {
                reject(error);
            }

            if (response.statusCode >= 200 && response.statusCode < 300) {
                resolve(parseHtmlToProducts(body));
            }

            reject('Unknown error');
        });
    });
}

module.exports = {
    search
}