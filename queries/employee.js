const db = require('../database');
const pool = db.getPool();

/*
    employee
*/

const getEmployee = (request, response) => {
    log("GET", "/employees", JSON.stringify(request.body));
    pool.query('SELECT * FROM "employee";', (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const addEmployee = (request, response) => {
    log("POST", "/employees", JSON.stringify(request.body));
    const queryInsert = {
        name: 'insert-employee',
        text: 'INSERT INTO "employee" (employee_name, employee_address, employee_contact, employee_position, employee_rank, employee_payroll) VALUES ($1, $2, $3, $4, $5, $6);',
        values: [request.body.name, request.body.address, request.body.contact, request.body.position, request.body.rank, request.body.payroll]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Created Employee " + request.body.name});
        }
    });
}


const deleteEmployee = (request, response) => {
    log("DEL", "/employee", JSON.stringify(request.query));
    if (!request.query.id) {
        response.status(400).json({"Error": "Missing Attribute"});
    } else {
        const queryInsert = {
            name: 'delete-employee',
            text: 'DELETE FROM "employee" WHERE "employee_id" = $1;',
            values: [request.query.id]
        }
        pool.query(queryInsert, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rowCount == 1) {
                    response.status(200).json({"Success": "Deleted Employee ID " + request.query.id});
                } else {
                    response.status(400).json({"Error": "Employee ID " + request.query.id + " does not exist"});
                }
            }
        });
    }
}

const modifyEmployee = (request, response) => {
    log("PUT", "/employees", JSON.stringify(request.body));
    const queryInsert = {
        name: 'modify-employee',
        text: 'UPDATE "employee" SET employee_name = $1, employee_address = $2, employee_contact = $3,'
        + ' employee_position = $4, employee_rank = $5, employee_payroll = $6 WHERE "employee_id" = $7;',
        values: [request.body.name, request.body.address, request.body.contact, request.body.position, request.body.rank, request.body.payroll, request.body.id]
    }
    pool.query(queryInsert, (err, results) => {
        if (err) {
            console.log(err.message);
            response.status(400).json({"Error": err.message});
        } else {
            response.status(200).json({"Success": "Modify Employee ID " + request.body.id});
        }
    });
}

module.exports = {
    getEmployee,
    addEmployee,
    deleteEmployee,
    modifyEmployee
}

