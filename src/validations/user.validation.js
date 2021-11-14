const joi = require('joi');
//validation for create user
const createUser = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

//validation for update user
const updateUser = joi.object({
    id: joi.number().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    password: joi.string().required(),
    active: joi.number()
});

const deleteUser = joi.object({
    id: joi.number().required()
})

const getUserById = joi.object({
    id: joi.number().required()
})

//export the validatoins
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById
};