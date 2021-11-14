const { permissionService } = require("../services");
const { ApiResponse } = require('../payload/ApiResponse');
const { handleAsync } = require('../utils/util');
const status = require('http-status');

const permissions = handleAsync(async(req, res) => {
    let permissionList = await permissionService.getPermissions()
    res.status(status.OK).send(new ApiResponse(status.OK, permissionList));
});
module.exports = { permissions };