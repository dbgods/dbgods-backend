const db = require('../database');
const pool = db.getPool();

/*
    Customer
*/

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM "customer";', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const addCustomer = (request, response) => {
    const queryInsert = {
        name: 'insert-customer',
        text: 'INSERT INTO "customer" VALUES (DEFAULT, $1, $2, $3, $4);',
        values: [request.body.name, request.body.contact, request.body.address, request.body.creditrating]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Created Customer " + request.body.name});
        }
    });
}


const deleteCustomer = (request, response) => {
    log("DEL", "/customer", JSON.stringify(request.query));
    if (!request.query.id) {
        response.status(400).json({"Error": "Missing Attribute"});
    } else {
        const queryInsert = {
            name: 'delete-customer',
            text: 'DELETE FROM "customer" WHERE "customer_id" = $1;',
            values: [request.query.id]
        }
        pool.query(queryInsert, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rowCount == 1) {
                    response.status(200).json({"Success": "Deleted Customer ID " + request.query.id});
                } else {
                    response.status(400).json({"Error": "Customer ID " + request.query.id + " does not exist"});
                }
            }
        });
    }
}

const modifyCustomer = (request, response) => {
    const queryInsert = {
        name: 'modify-customer',
        text: 'UPDATE "customer" SET customer_name = $1, customer_contact = $2, customer_address = $3,'
        + ' customer_creditrating = $4 WHERE "customer_id" = $5;',
        values: [request.body.name, request.body.contact, request.body.address, request.body.creditrating,  request.body.id]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Modify Customer ID " + request.body.id});
        }
    });
}

module.exports = {
    getCustomers,
    addCustomer,
    deleteCustomer,
    modifyCustomer
}

