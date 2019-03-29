const db = require('../database');
const pool = db.getPool();

const getPackageSpecial = (request, response) => {
    pool.query('SELECT * FROM "package_join_customer_driver";', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const getDriverSpecial = (request, response) => {
    pool.query('SELECT * FROM "driver_view";', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

// Selection
const getSelection = (request, response) => {
    log("POST", "/special/selection", JSON.stringify(request.body));
    let sign = request.body.sign;
    let where = request.body.column;

    if (request.body.isNumber == "true") {
        request.body.condition = parseInt(request.body.condition, 10);
    }

    const query = {
        name: 'special-selection',
        text: 'SELECT * FROM "vehicle" WHERE ' + where + ' ' + sign + ' $1;',
        values: [request.body.condition]
    }
    console.log(query.text)
    pool.query(query, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const getProjection = (request, response) => {
    log("POST", "/special/projection", JSON.stringify(request.body));
    let table = request.body.table;
    let column = request.body.column;

    const query = {
        name: 'special-selection',
        text: 'SELECT ' + column + ' FROM "' + table + '"',
        values: []
    }
    console.log(query.text)
    pool.query(query, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}


module.exports = {
    getPackageSpecial,
    getDriverSpecial,
    getSelection,
    getProjection,
}