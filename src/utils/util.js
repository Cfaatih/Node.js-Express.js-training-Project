const handleAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((err) => next(err));
};

const parseDatabaseObject = (data) => {
    let coloums = data.metaData;
    let rows = data.rows;
    let databaseResult = [];

    rows.forEach((row, i) => {
        var obj = {};
        coloums.map((p, j) => {
            obj[p.name] = row[j];
        });
        databaseResult.push(obj);
    });
    // console.log(arr);

    return databaseResult;
};

module.exports = {
    parseDatabaseObject,
    handleAsync,
};