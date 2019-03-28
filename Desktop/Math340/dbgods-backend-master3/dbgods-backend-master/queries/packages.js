const db = require('../database');
const pool = db.getPool();

/*
    Packages
*/

// GET - List All Packages
const getPackages = (request, response) => {
    log("GET", "/package", JSON.stringify(request.body));    
    pool.query('SELECT * FROM "package" ORDER BY package_trackingno asc;', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const addPackage = (request, response) => {
    log("POST", "/package", JSON.stringify(request.body));    
    const queryInsert = {
        name: 'insert-package',
        text: 'INSERT INTO "package" (package_content, package_type, package_status, package_driverid, package_senderid, package_receiverid) VALUES ($1, $2, $3, $4, $5, $6);',
        values: [request.body.content, request.body.type, request.body.status, request.body.driverid, request.body.senderid, request.body.receiverid]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log("Error: " + err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Created Package"});
        }
    });
}

const deletePackage = (request, response) => {
    log("DEL", "/package", JSON.stringify(request.query));
    if (!request.query.trackingno) {
        response.status(400).json({"Error": "Missing Attribute"});
    } else {
        const queryInsert = {
            name: 'delete-package',
            text: 'DELETE FROM "package" WHERE "package_trackingno" = $1;',
            values: [request.query.trackingno]
        }
        pool.query(queryInsert, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rowCount == 1) {
                    response.status(200).json({"Success": "Deleted Package TrackingNo " + request.query.trackingno});
                } else {
                    response.status(400).json({"Error": "Tracking ID " + request.query.trackingno + " does not exist"});
                }
            }
        });
    }
}

const modifyPackage = (request, response) => {
    log("PUT", "/package", JSON.stringify(request.body));    
    const queryInsert = {
        name: 'modify-package',
        text: 'UPDATE "package" SET package_content = $1, package_type = $2,'
        + ' package_status = $3, package_driverid = $4, package_senderid = $5, package_receiverid = $6 WHERE "package_trackingno" = $7;',
        values: [request.body.content,request.body.type, request.body.status, request.body.driverid, request.body.senderid, request.body.receiverid ,request.body.trackingno]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Modify Package TrackingNo " + request.body.trackingno});
        }
    });
}

module.exports = {
    getPackages,
    addPackage,
    deletePackage,
    modifyPackage
}

