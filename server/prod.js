/* eslint consistent-return:0 */
const express = require('express');
//const logger = require('./logger');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const resolve = require('path').resolve;
const app = express();

const apiMiddlewareSetup = require('../api/middleware');

apiMiddlewareSetup(app);

// // If you need a backend, e.g. an API, add your custom backend-specific middleware here
// //app.use('/api', myApi);

// // In production we need to pass these values in instead of relying on webpack
// setup(app, {
//     outputPath: resolve(process.cwd(), 'dist'),
//     publicPath: '/',
// });

// // get the intended host and port number, use localhost and port 3000 if not provided
// //const customHost = argv.host || process.env.HOST;
// const host = null; // Let http.Server use its default IPv6/4 host
// //const prettyHost = customHost || 'localhost';

console.log('listerning on port: ' + port)
// Start your app.
app.listen(port, host, (err) => {
    if (err) {
        return logger.error(err.message);
    }

   // logger.appStarted(port, "localhost");
});