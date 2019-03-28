const db = require('../database');
const pool = db.getPool();

/*
    Complaints
*/

// GET - List All Complaints
const getComplaints = (request, response) => {
    pool.query('SELECT * FROM "complaint" ORDER BY "complaint_id" desc;', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const addComplaint = (request, response) => {
    const queryInsert = {
        name: 'insert-complaint',
        text: 'INSERT INTO "complaint" VALUES (DEFAULT, $1, $2, $3, $4, $5);',
        values: [request.body.info, request.body.departmentinvolved, request.body.type, request.body.urgency, request.body.timestamp]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Created Complaint " + request.body.id});
        }
    });
}


const deleteComplaint = (request, response) => {
    log("DEL", "/complaint", JSON.stringify(request.query));
    if (!request.query.id) {
        response.status(400).json({"Error": "Missing Attribute"});
    } else {
        const queryInsert = {
            name: 'delete-complaint',
            text: 'DELETE FROM "complaint" WHERE "complaint_id" = $1;',
            values: [request.query.id]
        }
        pool.query(queryInsert, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rowCount == 1) {
                    response.status(200).json({"Success": "Deleted Complaint ID " + request.query.id});
                } else {
                    response.status(400).json({"Error": "Complaint ID " + request.query.id + " does not exist"});
                }
            }
        });
    }
}

const modifyComplaint = (request, response) => {
    const queryInsert = {
        name: 'modify-complaint',
        text: 'UPDATE "complaint" SET complaint_info = $1, complaint_departmentinvolved = $2, complaint_type = $3,'
        + ' complaint_urgency = $4, complaint_timestamp = $6 WHERE "complaint_id" = $5;',
        values: [request.body.info, request.body.departmentinvolved, request.body.type, request.body.urgency, request.body.id, request.body.timestamp]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Modify Complaint ID " + request.body.id});
        }
    });
}

module.exports = {
    getComplaints,
    addComplaint,
    deleteComplaint,
    modifyComplaint
}

