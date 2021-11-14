const validate = require('./validator');
const morganMiddleware = require('./morgan');
const authentication = require('./auth').auth;
const authorization = require('./auth').authorization;
module.exports = {
    validate,
    authentication,
    authorization,
    morganMiddleware
};