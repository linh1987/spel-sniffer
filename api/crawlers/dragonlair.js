const cheerio = require('cheerio');
const request = require('request');

const searchUrlTemplate = 'https://www.dragonslair.se/product/?name=';
const domainPrefix = 'https://www.dragonslair.se';


const parseHtmlToProducts = (response) => {
    const $ = cheerio.load(response);
    const foundProducts = $('.grid-item').map((_, el) => {
        const $el = $(el);
        const game = {
            url: domainPrefix + $el.find('a').first().attr('href'),
            name: $el.find('.label').text().trim(),
            image: domainPrefix + $el.find('img').first().attr('src'),
            price: $el.find('.price').first().text().trim(),
            available: $el.find('.controls').text().indexOf('Ja') > -1
        }

        return game;
    }).get();

    return foundProducts;
}


const search = (term) => {
    const concenatedTerm = term.replace(' ', '+');

    const searchUrl = `https://www.dragonslair.se/product/name:${concenatedTerm}/boardgame`;

    return new Promise((resolve, reject) => {
        request(searchUrl, function (error, response, body) {
            if (error) {
                reject(error);
            }

            if (response.statusCode >= 200 && response.statusCode < 300) {
                resolve({
                    name: 'Dragon\'s Lair',
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