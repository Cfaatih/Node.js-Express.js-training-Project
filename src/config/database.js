const oracledb = require('oracledb');
const util = require('../utils/util');
const { ApiError } = require('../payload/ApiError');
const logger = require('../config/logger');

const host = '15.15.0.59:1521';
const database = 'students';
const username = 'abdifatah';
const password = 'abdifatah';

/**
 * oracle db connection 
 */
oracledb.initOracleClient({ libDir: 'D:\\Training@Taaj\\nodejs\\instantclient_21_3' });
let executeQuery = async(query, params) => {

    let connection;
    try {
        connection = await oracledb.getConnection({
            user: username,
            password: password,
            connectString: host + '/' + database
        });
        logger.info('Connected database')

        let result = await connection.execute(query, params);
        connection.commit();
        return util.parseDatabaseObject(result);

    } catch (err) {
        logger.error(err)
        return null;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

module.exports = {
    executeQuery
}