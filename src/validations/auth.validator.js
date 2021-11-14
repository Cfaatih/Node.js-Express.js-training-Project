const joi = require('joi');
const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string(),
});

const register = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});
module.exports = {
    login,
    register
}