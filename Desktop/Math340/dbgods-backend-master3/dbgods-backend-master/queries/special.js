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

module.exports = {
    getPackageSpecial,
    getDriverSpecial
}