const express = require('express');
const route = express.Router();
//import the controller for authcontrol
const { authController } = require('../../controller');
const { permissionController } = require('../../controller');
const { authValidation } = require('../../validations');
let { validate } = require('../../middlewares');
const { authentication, authorization } = require('../../middlewares');

route.post('/login', validate(authValidation.login), authController.login);
route.get('/permission', authentication, authorization('viewUserByEmail'), permissionController.permissions);
route.post('/register', authentication, authorization('createUser'), validate(authValidation.register), authController.register);

module.exports = route