//import status code module
const status = require('http-status');
const logger = require('../config/logger');
const { ApiResponse } = require('../payload/ApiResponse');
const { authService } = require('../services');
const { handleAsync } = require('../utils/util');

// const { handleAsync } = require('../utils/util');
//export the controller
login = handleAsync(async(req, res) => {
    logger.info("info login control is working");
    let email = req.body.email;
    let password = req.body.password;
    let loginResponse = await authService.login(email, password);
    res.status(status.OK)
        .send(new ApiResponse(status.OK, res.__('login'), loginResponse));
});

register = handleAsync(async(req, res) => {
    logger.info("info you have seccessfully registered a new user");
    let user = req.body;
    let checkEmail = await authService.isEmailExist(user.email);

    if (checkEmail) {
        return res.status(status.NOT_ACCEPTABLE)
            .send(new ApiError(status.NOT_ACCEPTABLE, res.__('userExists')));
    }

    let registerUser = await authService.register(user);

    if (registerUser) {

        return res.status(status.OK)
            .send(new ApiResponse(status.OK, res.__('registerSuccess')));
    }

    if (err) {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .send(new ApiError(status.INTERNAL_SERVER_ERROR, err));
    }
});
module.exports = {
    login,
    register
};