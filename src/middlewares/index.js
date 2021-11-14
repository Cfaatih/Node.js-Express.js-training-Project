const validate = require('./validator');
const morganMiddleware = require('./morgan');
const { authentication, authorization } = require('./auth');
module.exports = {
    validate,
    authentication,
    authorization,
    morganMiddleware
};