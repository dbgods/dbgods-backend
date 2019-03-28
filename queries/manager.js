const db = require('../database');
const pool = db.getPool();

/*
    Driver
*/

const getManagers = (request, response) => {
    pool.query('SELECT * FROM "employee" where "employee_position"=\'Manager\';', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const addManager = (request, response) => {
    const queryInsert = {
        name: 'insert-manager',
        text: 'INSERT INTO "employee" VALUES (DEFAULT, $1, $2, $3, $4, $5, $6);',
        values: [request.body.name, request.body.address, request.body.contact, "Manager", request.body.rank, request.body.payroll]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Created Manager " + request.body.name});
        }
    });
}


const deleteManager = (request, response) => {
    log("DEL", "/manager", JSON.stringify(request.query));
    if (!request.query.id) {
        response.status(400).json({"Error": "Missing Attribute"});
    } else {
        const queryInsert = {
            name: 'delete-manager',
            text: 'DELETE FROM "manager" WHERE "manager_id" = $1;',
            values: [request.query.id]
        }
        pool.query(queryInsert, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rowCount == 1) {
                    response.status(200).json({"Success": "Deleted Manager ID " + request.query.id});
                } else {
                    response.status(400).json({"Error": "Manager ID " + request.query.id + " does not exist"});
                }
            }
        });
    }
}

const modifyManager = (request, response) => {
    const queryInsert = {
        name: 'modify-manager',
        text: 'UPDATE "manager" SET manager_warehouseregion = $1,'
        + '  WHERE "manager_id" = $2;',
        values: [request.body.region, request.body.id]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Modify Manager ID " + request.body.id});
        }
    });
}


module.exports = {
    getManagers,
    addManager,
    deleteManager,
    modifyManager
}

