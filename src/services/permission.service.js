const { permissionModel } = require('../modal');

const getPermissions = () => permissionModel.getPermissions();

const getRolePermissions = () => permissionModel.getRolePermissions();
module.exports = {
    getPermissions,
    getRolePermissions
};