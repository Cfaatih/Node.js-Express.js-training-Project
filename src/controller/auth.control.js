//import status code module
const status = require('http-status');
const logger = require('../config/logger');
const { ApiResponse } = require('../payload/ApiResponse');
const { authService } = require('../services');

// const { handleAsync } = require('../utils/util');
//export the controller
login = (req, res) => {
    logger.info("info login control is working");
    // let mess = res.__('getUserByIdError');
    // console.log(mess);
    let email = req.body.email;
    let password = req.body.password;
    let loginResponse = uthService.login(email, password);
    res.status(status.OK)
        .send(new ApiResponse(status.OK, 'Good! you are successfully logged in', loginResponse));
};

signup = (req, res) => {
    logger.info("info you seccessfully signed up new user");
    res.status(status.OK)
        .send(new ApiResponse(status.OK, message = 'Good! you successfully are signed up '));
}
module.exports = {
    login,
    signup
};