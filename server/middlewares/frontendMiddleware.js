module.exports = (app, options) => {
    const isProd = process.env.NODE_ENV === 'production';

    if (isProd || 1 === 1) {
        const addProdMiddlewares = require('./addProdMiddlewares');
        addProdMiddlewares(app, options);
    } else {
        // const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
        // const addDevMiddlewares = require('./addDevMiddlewares');
        // addDevMiddlewares(app, webpackConfig);
    }

    return app;
};