//mydb

const database = require('../config/database');

//-----------------------------------------
const getusers = async() => {
    let query = `select * from USERS`;
    let result = await database.executeQuery(query);
    console.log(result);
    return result;

    // return users;
};

const getuser = (id) => {
    return users.filter(u => u.id == id);
};

const create = (user) => {
    users.push(user);
    return true;
};

const updateUser = (user) => {
    const objIndex = users.findIndex(obj => obj.id === user.id);
    users[objIndex].firstName = user.firstName;
    users[objIndex].middleName = user.middleName;
    users[objIndex].lastName = user.lastName;
    users[objIndex].lastName = user.lastName;
}

const deleteUser = (id) => {
    const objIndex = users.findIndex(obj => obj.id == id);
    users.splice(objIndex, 1);
};

const isEmailExist = (email) => {
    return users.filter(u => u.email === email).length > 0;
};

const isIdExist = (id) => {
    return users.filter(u => u.id == id);
};
const getUserByEmailAndPassword = (email, password) => {
    // let query = `select email, password from USERS`;
    // let result = database.executeQuery(query);

    return result.filter(u => u.email === email && u.password === password);
};



module.exports = {
    getusers,
    getuser,
    create,
    updateUser,
    deleteUser,
    isEmailExist,
    isIdExist,
    getUserByEmailAndPassword
};