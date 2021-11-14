const jwt = require('jsonwebtoken');
const { userModel } = require('../modal');
const logger = require('../config/logger');
const { ApiError } = require('../payload/ApiError');

const login = async(email, password) => {
    let user = await userModel.getUserByEmailAndPassword(email, password);
    logger.info("the authentication is working");
    if (!user || user.length <= 0) {
        logger.info("Email or Password does not exist");
        throw new ApiError(401, "email or password does not exist");
    }
    //create token
    let token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '20m' });
    return {
        accessToken: token
    };
}


const isEmailExist = async(email) => {
    console.log(`Executing isEmailExist from service ${email}`);

    if (await userModel.isEmailExist(email)) {
        return true;
    }
    return false;
}

const register = async(user) => {
    let err = '';
    let isEmailExist = await userModel.isEmailExist(user.email)
    console.log(isEmailExist);
    if (isEmailExist) {
        err = 'Sorry this user is already exists'
    }
    let result = await userModel.create(user);
    if (!result)
        err = "something went wrong"
    return { result, err };
}

module.exports = {
    login,
    register,
    isEmailExist
}