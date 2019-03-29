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

//Nested Aggregation (incomplete) 
const getSalaryStat = (request, response) => {
    pool.query('SELECT * FROM "salary_statistic";', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const getComplaintStat = (request, response) => {
    pool.query('SELECT * FROM "countdepartmentinvolved";', (err, results) => {
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

const getJoin = (request, response) => {
    log("POST", "/special/join", JSON.stringify(request.body));
    let table1 = request.body.table1;
    let table1_cond = request.body.table1 + "." + request.body.table1_condition;
    let table1_select = request.body.table1_cols.split(",").map(x => table1 + "." + x).join(", ");


    let table2 = request.body.table2;
    let table2_cond = request.body.table2 + "." + request.body.table2_condition;
    let table2_select = request.body.table2_cols.split(",").map(x => table2 + "." + x).join(", ");

    const query = {
        name: 'special-join',
        text: 'SELECT ' + table1_select + ', ' + table2_select + ' FROM "' + table1 + '" join "' + table2 + '" on ' + table1_cond + ' = ' + table2_cond,
        values: []
    }

    pool.query(query, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const getDivision = (request, response) => {
    log("POST", "/special/division", JSON.stringify(request.body));

    const query = {
        name: 'special-division',
        text: 'SELECT DISTINCT ' + request.body.where + ' FROM "' + request.body.table + '" as main where not exists ('
        + '(select ' + request.body.all + ' from ' + request.body.tabledivisor + ')'
        + ' except (select ' + request.body.all + ' from ' + request.body.tabledivisor + ' as c2 where '
        + 'c2.' + request.body.where + ' = main.' + request.body.where + '))',
        values: []
    }
    // console.log(query.text)
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
    getSalaryStat,
    getComplaintStat,
    getDivision,
    getJoin
}