//import logger
const logger = require('../config/logger');
//import the user model
const { userModel } = require('../modal');

const isEmailExist = async(email) => {
    if (await userModel.isEmailExist(email)) {
        return true;
    }
    return false;
};

const isIdExist = async(id) => {
    if (await userModel.isIdExist(id))
        return true;

    return false;

};

const getAllUsers = async() => {
    return userModel.getusers();
};

const getUserById = async(id) => {
    let userStatus = await userModel.getuser(id)
    return userStatus;
};


const createUser = async(user) => {
    logger.info('create user');
    let newUser = await userModel.create(user);
    return newUser;
};

const updateUser = async(id) => {
    let userUpdate = await userModel.updateUser(id);
    return userUpdate;
};

const deleteUser = async(id) => {
    logger.info('delete user');
    return await userModel.deleteUser(id);
};

module.exports = {
    isEmailExist,
    isIdExist,
    updateUser,
    createUser,
    getAllUsers,
    getUserById,
    deleteUser
};