/**
 * middlewares
 */
const status = require('http-status');
const logger = require('../config/logger');
const { userService } = require('../services');
const { ApiError } = require('../payload/ApiError');
const { ApiResponse } = require('../payload/ApiResponse');
const { handleAsync } = require('../utils/util');

//get all users
getAllUsers = handleAsync(async(req, res) => {
    logger.info('All users controller is working');
    let users = await userService.getAllUsers();
    res.status(status.OK).send(new ApiResponse(status.OK, 'OK', users));
});

//get user by ID
getUserById = handleAsync(async(req, res) => {
    logger.info('getUserById controller is working');
    let user = req.body;
    let checkIdExistence = await userService.isIdExist(user.id);

    if (checkIdExistence) {
        logger.info('The user exists');
        let getUser = await userService.getUserById(user.id);
        return res.status(status.OK).
        send(new ApiResponse(status.OK, 'Ok', getUser));
    }
    return res.status(status.NOT_ACCEPTABLE)
        .send(new ApiError(status.NOT_ACCEPTABLE, res.__('userNotExist')));
});

//create user
create = handleAsync(async(req, res) => {
    logger.info('calling create user');
    let user = req.body;
    let checkEmail = await userService.isEmailExist(user.email);

    if (checkEmail) {
        logger.error('User already exist');
        return res.status(status.NOT_ACCEPTABLE)
            .send(new ApiError(status.NOT_ACCEPTABLE, res.__('userExists')));
    }
    let createUserStatus = await userService.createUser(user);
    if (createUserStatus) {
        logger.info('User Created');
        return res.status(status.OK).send(new ApiResponse(status.OK, res.__('userIsCreated')));
    }
    return res.status(status.INTERNAL_SERVER_ERROR)
        .send(new ApiError(status.INTERNAL_SERVER_ERROR, res.__('CreateError')));
});

//update user
updateUser = handleAsync(async(req, res) => {
    logger.info('Calling to user Update');
    let user = req.body;
    let checkId = await userService.isIdExist(user.id);

    if (!checkId) {
        logger.error('The user does not exist');
        res.status(status.NOT_FOUND)
            .send(new ApiError(status.NOT_FOUND, res.__('userNotExist')));
    }

    let userUpdated = await userService.updateUser(user);

    if (userUpdated) {
        logger.info('User is Updated');
        res.status(status.OK)
            .send(new ApiResponse(status.OK, res.__('userUpdated')));
    }
    res.status(status.INTERNAL_SERVER_ERROR)
        .send(new ApiError(status.INTERNAL_SERVER_ERROR, res.__('CreateError')));

});

//delete user
deleteUser = handleAsync(async(req, res) => {
    logger.info('Calling Delete user');
    let user = req.body;
    let checkId = await userService.isIdExist(user.id);

    if (!checkId) {
        logger.error('The user does not exist');
        return res.status(status.OK)
            .send(new ApiError(status.OK, res.__('userNotExist')));
    }
    let userfilter = await userService.deleteUser(user.id);

    if (userfilter) {
        logger.info('User is deleted');
        return res.status(status.OK)
            .send(new ApiResponse(status.OK, res.__('deleteUser')));
    }
    res.status(status.INTERNAL_SERVER_ERROR)
        .send(new ApiError(status.INTERNAL_SERVER_ERROR, res.__('CreateError')));

});

/**
 * export controllers
 */
module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
    create
};