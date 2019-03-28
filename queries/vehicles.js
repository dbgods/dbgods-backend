const db = require('../database');
const pool = db.getPool();

/*
    Vehicles
*/

const getVehicles = (request, response) => {
    pool.query('SELECT * FROM "vehicle";', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const addVehicle = (request, response) => {
    const queryInsert = {
        name: 'insert-vehicle',
        text: 'INSERT INTO "vehicle" VALUES (DEFAULT, $1, $2, $3, $4, $5, $6);',
        values: [request.body.type, request.body.maxcapacity, request.body.availability, request.body.whethertorepair,request.body.insurancenumber, request.body.warehouseregion]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Created Vehicle " + request.body.number});
        }
    });
}


const deleteVehicle = (request, response) => {
    log("DEL", "/vehicle", JSON.stringify(request.query));
    if (!request.query.number) {
        response.status(400).json({"Error": "Missing Attribute"});
    } else {
        const queryInsert = {
            name: 'delete-vehicle',
            text: 'DELETE FROM "vehicle" WHERE "vehicle_number" = $1;',
            values: [request.query.number]
        }
        pool.query(queryInsert, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rowCount == 1) {
                    response.status(200).json({"Success": "Deleted Vehicle Number " + request.query.number});
                } else {
                    response.status(400).json({"Error": "Vehicle Number" + request.query.number + " does not exist"});
                }
            }
        });
    }
}

const modifyVehicle = (request, response) => {
    const queryInsert = {
        name: 'modify-vehicle',
        text: 'UPDATE "vehicle" SET vehicle_type = $1, vehicle_maxcapacity = $2,'
        + ' vehicle_availability = $3, vehicle_whethertorepair = $4, vehicle_insurancenumber = $5, vehicle_warehouseregion = $6 WHERE "vehicle_number" = $7;',
        values: [request.body.type, request.body.maxcapacity, request.body.availability, request.body.whethertorepair, request.body.insurancenumber, request.body.warehouseregion, request.body.number]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Modify Vehicle Number " + request.body.number});
        }
    });
}

module.exports = {
    getVehicles,
    addVehicle,
    modifyVehicle,
    deleteVehicle
}

