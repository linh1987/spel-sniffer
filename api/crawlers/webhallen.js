const request = require('request');

const domainPrefix = 'https://www.webhallen.com';


const parseResponseToProducts = (response) => {
    const responseObj = JSON.parse(response);

    const foundProducts = responseObj.products.map((product) => {
        const game = {
            url: domainPrefix + '/se/product/' + product.id,
            name: product.name,
            image: domainPrefix + `/images/product/${product.id}?trim`,
            price: product.price.price + ' ' + product.price.currency,
            available: Object.keys(product.stock).some(key => !isNaN(Number(key)) && product.stock[key] > 0)
        }

        return game;
    });

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
                        name: 'Webhallen',
                        url: '',
                        games: parseResponseToProducts(body)
                    });
                    return;
                }

                console.log('Webhallen Unknown error: ' + response.statusCode);
            }

            resolve({
                name: 'Webhallen',
                url: '',
                games: []
            });
        });
    });
}

const search = (term) => {
    const concenatedTerm = term.replace(' ', '%20');

    const searchUrl = `https://www.webhallen.com/api/search/product?query%5BsortBy%5D=searchRating&query%5Bfilters%5D%5B0%5D%5Btype%5D=searchString&query%5Bfilters%5D%5B0%5D%5Bvalue%5D=${concenatedTerm}&query%5Bfilters%5D%5B1%5D%5Btype%5D=category&query%5Bfilters%5D%5B1%5D%5Bvalue%5D=3600&query%5BminPrice%5D`;

    return fetchByUrl(searchUrl);
}

const newArrivalsUrlTemplate = 'https://www.webhallen.com/api/search?query%5BsortBy%5D=latest&query%5Bfilters%5D%5B0%5D%5Btype%5D=category&query%5Bfilters%5D%5B0%5D%5Bvalue%5D=3600&query%5Bfilters%5D%5B1%5D%5Btype%5D=stock&query%5Bfilters%5D%5B1%5D%5Bvalue%5D=1&query%5BminPrice%5D=0&query%5BmaxPrice%5D=999999&page=1';

const fetchNewArrivals = () => {
    return fetchByUrl(newArrivalsUrlTemplate);
}

module.exports = {
    search,
    fetchNewArrivals
}