const { permissionModel } = require('../modal');

const getPermissions = () => permissionModel.getPermissions();

const getRolePermissions = (userRole) => permissionModel.getRolePermissions(userRole);
module.exports = {
    getPermissions,
    getRolePermissions
};