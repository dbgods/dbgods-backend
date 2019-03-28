const db = require('../database');
const pool = db.getPool();

/*
    Driver
*/

const getDrivers = (request, response) => {
    pool.query('SELECT * FROM "employee" where "employee_position"=\'Driver\';', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const addDriver = (request, response) => {
    const queryInsert = {
        name: 'insert-driver',
        text: 'INSERT INTO "employee" VALUES (DEFAULT, $1, $2, $3, $4, $5, $6);',
        values: [request.body.name, request.body.address, request.body.contact, "Driver", request.body.rank, request.body.payroll]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Created Driver " + request.body.name});
        }
    });
}


const deleteDriver = (request, response) => {
    log("DEL", "/driver", JSON.stringify(request.query));
    if (!request.query.id) {
        response.status(400).json({"Error": "Missing Attribute"});
    } else {
        const queryInsert = {
            name: 'delete-driver',
            text: 'DELETE FROM "driver" WHERE "driver_id" = $1;',
            values: [request.query.id]
        }
        pool.query(queryInsert, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rowCount == 1) {
                    response.status(200).json({"Success": "Deleted Driver ID " + request.query.id});
                } else {
                    response.status(400).json({"Error": "Driver ID " + request.query.id + " does not exist"});
                }
            }
        });
    }
}

const modifyDriver = (request, response) => {
    const queryInsert = {
        name: 'modify-driver',
        text: 'UPDATE "driver" SET driver_licensenumber = $1, '
        + ' driver_vehiclenumber = $2 WHERE "driver_id" = $3;',
        values: [request.body.licensenumber, request.body.vehiclenumber, request.body.id]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Modify Driver ID " + request.body.id});
        }
    });
}


module.exports = {
    getDrivers,
    addDriver,
    deleteDriver,
    modifyDriver
}

