const db = require('../database');
const pool = db.getPool();

/*
    Warehouse
*/

const getWarehouses = (request, response) => {
    pool.query('SELECT * FROM "warehouse";', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const addWarehouse = (request, response) => {
    const queryInsert = {
        name: 'insert-warehouse',
        text: 'INSERT INTO "warehouse" VALUES (DEFAULT, $1);',
        values: [request.body.maxcapacity]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Created Warehouse " + request.body.region});
        }
    });
}


const deleteWarehouse = (request, response) => {
    log("DEL", "/warehouse", JSON.stringify(request.query));
    if (!request.query.region) {
        response.status(400).json({"Error": "Missing Attribute"});
    } else {
        const queryInsert = {
            name: 'delete-warehouse',
            text: 'DELETE FROM "warehouse" WHERE "warehouse_region" = $1;',
            values: [request.query.region]
        }
        pool.query(queryInsert, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rowCount == 1) {
                    response.status(200).json({"Success": "Deleted Warehouse Region " + request.query.region});
                } else {
                    response.status(400).json({"Error": "Warehouse Region" + request.query.region + " does not exist"});
                }
            }
        });
    }
}

const modifyWarehouse = (request, response) => {
    const queryInsert = {
        name: 'modify-warehouse',
        text: 'UPDATE "warehouse" SET warehouse_maxcapacity = $1'
        + ' WHERE "warehouse_region" = $2;',
        values: [request.body.maxcapacity, request.body.region]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Modify Warehouse Region " + request.body.region});
        }
    });
}

module.exports = {
    getWarehouses,
    addWarehouse,
    deleteWarehouse,
    modifyWarehouse
}

