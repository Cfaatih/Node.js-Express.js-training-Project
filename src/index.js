const express = require('express');
require('dotenv').config();
let bodyparser = require('body-parser');
const { morganMiddleware } = require('./middlewares');
const app = express();
const port = process.env.PORT;
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');
const { ApiError } = require('./payload/ApiError');
const cors = require('cors');
const helmet = require('helmet');
const i18n = require('i18n');
// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

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
app.use(cors());
app.use(helmet());

//Unknown API Error Handling
app.use((req, res, next) => {

    let error = res.__('unkownApiError')
    let status = httpStatus.NOT_FOUND;
    res.status(status).send(new ApiError(status, error, stack = ""));
});

// All The Exceptions Error Handling (Custom Error and System Error Middleware)
app.use((err, req, res, next) => {
    let status = err.status || 500; // status code

    let errors = [
        { status: 500, description: "Internal Server Error" }, // syste error
        { status: 400, description: "Bad Request" }, // custom error
    ].filter((err) => err.status == status);
    let desc = errors.length ? errors[0].description : 0;
    let error = (!desc ? 0 : new ApiError(status, desc)) || err;
    console.error(err);
    res.status(status).send(error);
});


app.listen(port, () => {

    console.log(`the app is listening on ${process.env.URL_BASE}:${port}`);
});