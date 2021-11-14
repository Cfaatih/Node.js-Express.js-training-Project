const database = require('../config/database');

//-----------------------------------------
const getusers = async() => {
    let query = `select * from users`;
    let result = await database.executeQuery(query, []);
    return result;
};

const getuser = async(id) => {
    let result = await database.executeQuery(`select * from users where userId=:id `, [id]);
    return result;
};

const create = async(user) => {
    let firstName = user.firstName;
    let lastName = user.lastName;
    let email = user.email;
    let password = user.password;
    let active = 0;
    let result = await database.executeQuery(`
                insert into users (userId,firstName,lastName,email,password,active)
                values (USER_SEQ.nextval,:firstName,:lastNam,:email, :password)
                `, [firstName, lastName, email, password, active]);
    console.log(result);
    if (result.rowsAffected === 1)
        return true;
    return false;
};

const updateUser = async(user) => {
    let firstName = user.firstName;
    let lastName = user.lastName;
    let userId = user.id;
    let password = user.password;
    let active = user.active;
    let result = await database.executeQuery(`update users set firstName=:firstName,
    lastName=:lastName,password=:password, active=:active where userId=:userId`, [firstName, lastName, password, active, userId])
    if (result.rowsAffected === 1)
        return true;
    return false;
}

const deleteUser = async(id) => {
    let result = await database.executeQuery(`delete from users where userId=:id`, [id])
    if (result.rowsAffected === 1)
        return true;
    return false;

};

const isEmailExist = async(email) => {
    let result = await database.executeQuery(` select count(*) as emailAlreadyExist from users
         where email=:email`, [email]);
    if (result[0].emailalreadyexist > 0)
        return true;

    return false;
};

const isIdExist = async(id) => {
    let result = await database.executeQuery(`select count(*) as idAlreadyExist
     from users
    where userId=:id`, [id]);
    if (result[0].idalreadyexist > 0)
        return true;

    return false;
}
const getUserByEmailAndPassword = async(email, password) => {
    let result = await database.executeQuery(`
    SELECT U.USERID, U.FIRSTNAME,U.LASTNAME, U.EMAIL, R.ROLENAME
    FROM USERS U
             INNER JOIN USERROLE UR on U.USERID = UR.userId
             INNER JOIN ROLES R on UR.roleId = R.ROLEID
    WHERE EMAIL =:email
      AND PASSWORD =:password
      AND ACTIVE = 1`, [email, password]);
    if (!result)
        return null;
    return result[0];
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