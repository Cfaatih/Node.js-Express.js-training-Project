const oracledb = require('oracledb');
const util = require('../utils/util');
const { ApiError } = require('../payload/ApiError');
// const host = '15.15.0.59:1521';
// const database = 'students';
// const username = 'abdifatah';
// const password = 'abdifatah';

const host = 'DESKTOP-73BB6J4:1521';
const database = 'xe';
const username = 'hr';
const password = 'hr';

let executeQuery = async(query) => {
    console.log(1);
    let connection;
    try {
        oracledb.initOracleClient({ libDir: 'D:\\Training@Taaj\\nodejs\\instantclient_21_3' });
        connection = await oracledb.getConnection({
            user: username,
            password: password,
            connectString: host + '/' + database
        });

        console.log('connected database');

        let result = await connection.execute(query);
        // console.log(result);
        return util.parseDatabaseObject(result);

        // return result;
        // await connection.close();
        // return connection;

    } catch (err) {
        console.log(err);
        throw new ApiError(err.status, err.message);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

module.exports = {
    executeQuery
}