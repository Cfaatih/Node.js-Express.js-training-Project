const express = require('express');
require('dotenv').config();
let bodyparser = require('body-parser');
let morganMiddleware = require('./middlewares/morgan');
const app = express();
const port = process.env.PORT;
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const { ApiError } = require('./payload/ApiError');

/**
 * I18n locale
 */
i18n.configure({
    locales: ['en', 'so', 'it', 'ar'],
    cookie: 'currentLocale',
    directory: __dirname + '/locales'
});


/**
 * middleware routes
 */
let mycatalog = require('./route/v1');


/**
 * middlewares
 */
app.use(express.json());
app.use(morganMiddleware);
app.use(process.env.API_VERSION, mycatalog);
// you will need to use cookieParser to expose cookies to req.cookies
app.use(cookieParser());
// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

//Unknown API Error Handling
app.use((req, res, next) => {

    let error = res.__('unkownApiError')
    let status = httpStatus.NOT_FOUND;
    res.status(status).send(new ApiError(status, error, stack = ""));
    // next();
});

app.use((err, req, res, next) => {
    // if (err) {
    res.status(err.status).send(err);
    // return res.status(500).send(new ApiError(500, message = "there is ome error"));
    // next();
});



app.listen(port, () => {

    console.log(`the app is listening on ${process.env.URL_BASE}:${port}`);
});