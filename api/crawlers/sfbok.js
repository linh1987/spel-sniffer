const cheerio = require('cheerio');
const request = require('request');

const domainPrefix = 'https://www.sfbok.se';


const parseHtmlToProducts = (response) => {
    const $ = cheerio.load(response);
    const foundProducts = $('#block-system-main .view-content .views-row').map((_, el) => {
        const $el = $(el);
        const game = {
            url: domainPrefix + $el.find('.image a').first().attr('href'),
            name: $el.find('.node h2').first().text().trim(),
            image: $el.find('.image img').first().attr('src'),
            price: $el.find('.price').first().text().trim(),
            available: $el.find('.cart a').length > 0
        }

        return game;
    }).get();

    return foundProducts;
}

const fetchByUrl = url => {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (response) {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    resolve({
                        name: 'Sfbok',
                        url: '',
                        games: parseHtmlToProducts(body)
                    });
                    return;
                }
                
                console.log('Sfbok Unknown error: ' + response.statusCode);
            }
            resolve({
                name: 'Sfbok',
                url: '',
                games: []
            });
        });
    });
}

const search = (term) => {
    const concenatedTerm = term.replace(' ', '+');

    const searchUrl = `https://www.sfbok.se/search?keys=${concenatedTerm}`;

    return fetchByUrl(searchUrl);
}

const newArrivalsUrlTemplate = 'https://www.sfbok.se/nyheter-kommande/manadens-nyheter/spel/brad-figurspel?sort=4';

const fetchNewArrivals = () => {
    return fetchByUrl(newArrivalsUrlTemplate);
}

module.exports = {
    search,
    fetchNewArrivals
}