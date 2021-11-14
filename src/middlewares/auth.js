const status = require('http-status');
const { ApiError } = require('../payload/ApiError');
const { ApiResponse } = require('../payload/ApiError');
const { permissionService } = require("../services");
const jwt = require('jsonwebtoken');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

/**
 * authentication
 */
const auth = (req, res, next) => {
    // let authHeader = req.headers['x-access-token'];
    // let token = authHeader.split(' ')[1];
    let token = req.headers['x-access-token'];
    console.log(token);
    if (!token) {
        throw new ApiError(401, "Please enter a token to access users");
        // res.status(401).send("Please enter a token to access users");
    }
    try {
        let response = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (response) {
            let decoded = jwt.decode(token, { complete: true });

            myCache.set('decodedToken', decoded)
            next();
        }
    } catch (err) {

        throw new ApiError(401, "your token is expired, please login again");
    }

};

/**
 * authorization middleware
 */

const authorization = (apiName) => (req, res, next) => {
    try {
        let myData = myCache.get('decodedToken');
        console.log(myData);
        let userRole = myData.payload;
        console.log(userRole);
        let permissions = permissionService.getRolePermissions()
            .then(res => {
                permissions = res.filter(
                    (permission) =>
                    (permission.rolename = userRole)
                );

                if (permissions.filter((p) => p.permissionname == apiName).length > 0) {
                    return next();
                }

                next(new ApiError(401, "You Can Not Access This Endpoint, Ask For Permission!!"));

            })
            .catch(err => Promise.reject(err));

    } catch (err) {
        console.log(err);
        throw new ApiError(401, "You have no permision to access");
    }



}

module.exports = {
    auth,
    authorization
};