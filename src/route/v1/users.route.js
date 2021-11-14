const express = require('express');

/**
 * middlwares
 */
const route = express.Router();
const { usersController } = require('../../controller');
const { userValidation } = require('../../validations');
const { validate } = require('../../middlewares');
const { authentication, authorization } = require('../../middlewares');

route.get('/', authentication, authorization('viewAllUsers'), usersController.getAllUsers);
route.get('/userId', authentication, authorization('viewUserByEmail'), validate(userValidation.getUserById), usersController.getUserById);
route.post('/create', authentication, authorization('createUser'), validate(userValidation.createUser), usersController.create);
route.patch('/update', authentication, authorization('updateUser'), validate(userValidation.updateUser), usersController.updateUser);
route.delete('/delete', authentication, authorization('deleteUser'), validate(userValidation.deleteUser), usersController.deleteUser);

module.exports = route;