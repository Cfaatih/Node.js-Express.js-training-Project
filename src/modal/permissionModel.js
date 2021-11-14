const database = require('../config/database');

const getPermissions = async() => {
    return await database.executeQuery(`select * from PERMISSIONS`, []);

};

const getRolePermissions = async() => {
    return await database.executeQuery(`select role.roleid, role.rolename, permission.permissionname from rolepermissions roleperm
    inner join roles role on role.roleid = roleperm.roleid
    inner join permissions permission on permission.permissionid= roleperm.permissionid`, []);
};
module.exports = {
    getPermissions,
    getRolePermissions
}