const cheerio = require('cheerio');
const request = require('request');

const domainPrefix = 'https://www.sfbok.se';


const parseHtmlToProducts = (response) => {
    const $ = cheerio.load(response);
    const foundProducts = $('.view-product-search .views-row').map((_, el) => {
        const $el = $(el);
        const game = {
            url: domainPrefix + $el.find('.field-image a').first().attr('href'),
            name: $el.find('.content h2').first().text().trim(),
            image: $el.find('.field-image img').first().attr('src'),
            price: $el.find('.cart a').first().text().trim(),
            available: $el.find('.cart a').text().indexOf('kr') > -1
        }

        return game;
    }).get();

    return foundProducts;
}

const search = (term) => {
    const concenatedTerm = term.replace(' ', '+');

    const searchUrl = `https://www.sfbok.se/search?keys=${concenatedTerm}`;

    return new Promise((resolve, reject) => {
        request(searchUrl, function (error, response, body) {
            if (error) {
                reject(error);
            }

            if (response.statusCode >= 200 && response.statusCode < 300) {
                resolve({
                    name: 'Sfbok',
                    url: '',
                    games: parseHtmlToProducts(body)
                });
            }

            reject('Unknown error');
        });
    });
}

module.exports = {
    search
}