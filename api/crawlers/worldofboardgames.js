const cheerio = require('cheerio');
const request = require('request');

const domainPrefix = 'https://www.worldofboardgames.com';

const parseHtmlToProducts = (response) => {
    const $ = cheerio.load(response);
    const foundProducts = $('.product').map((_, el) => {
        const $el = $(el);
        const game = {
            url: $el.find('a').first().attr('href'),
            name: $el.find('div.medium a').text().trim(),
            image: $el.find('img').first().attr('src'),
            price: $el.find('strong').first().text().trim(),
            available: $el.find('a.button').first().attr('href').indexOf('additem') > -1
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
                        name: 'WorldOfBoardgames',
                        url: '',
                        games: parseHtmlToProducts(body)
                    });
                    return;
                }

                console.log('WorldOfBoardgames Unknown error: ' + response.statusCode);
            }

            resolve({
                name: 'WorldOfBoardgames',
                url: '',
                games: []
            });
        });
    });
}

const search = (term) => {
    const concenatedTerm = term.replace(' ', '%20');

    const searchUrl = `https://www.worldofboardgames.com/webshop-sok.php?searchString=${concenatedTerm}&search=S%F6k`;

    return fetchByUrl(searchUrl);
}

const newArrivalsUrlTemplate = 'https://www.worldofboardgames.com/sallskapsspel/nya_produkter';

const fetchNewArrivals = () => {
    return fetchByUrl(newArrivalsUrlTemplate);
}

module.exports = {
    search,
    fetchNewArrivals
}