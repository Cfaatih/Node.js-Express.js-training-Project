const handleAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((err) => next(err));
};

const parseDatabaseObject = (data) => {
    if (!data.metaData || !data.rows) {
        return data;
    }
    let coloums = data.metaData;
    let rows = data.rows;
    let databaseResult = [];

    rows.forEach((row, i) => {
        var obj = {};
        coloums.map((p, j) => {
            obj[p.name.toLowerCase()] = row[j];
        });
        databaseResult.push(obj);
    });
    return databaseResult;
};

module.exports = {
    parseDatabaseObject,
    handleAsync,
};