const db = require('./database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = db.getPool();

const log = require('./utility.js').log;

const createAccount = (request, response) => {
    // Check for valid obj attributes
    log("POST", "/create", request.body);
    if (!request.body.username || !request.body.password || !request.body.type || !request.body.name) {
        log("POST", "/create", JSON.stringify({"Error": "Missing Attributes"}));
        response.status(300).json({"Error": "Missing Attributes"})
    } else {
        const query = {
            name: 'fetch-usernames',
            text: 'SELECT username from "UserInfo" WHERE "username" = $1;',
            values: [request.body.username]
        }
    
        pool.query(query, (err, results) => {
            if (err) {
                log("POST", "/create", JSON.stringify({"Error": err.message}));
                response.status(400).json({"Error": err.message});
            } else {
                if (!results.rows.length) {
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                       bcrypt.hash(request.body.password, salt, (err, hash) => {
                            // Create User
                            const queryInsert = {
                                name: 'insert-username',
                                text: 'INSERT INTO "UserInfo" VALUES ($1, $2, $3, $4, $5);',
                                values: [request.body.username, hash, salt, request.body.name, request.body.type]
                            }

                            pool.query(queryInsert, (err, results) => {
                                if (err) {
                                    log("POST", "/create", JSON.stringify({"Error": err.message}));
                                    response.status(400).json({"Error": err.message});
                                } else {
                                    log("POST", "/create", JSON.stringify({"Success": "Created User " + request.body.username}));
                                    response.status(200).json({"Success": "Created User " + request.body.username});
                                }
                            })
                       })
                    })
                } else {
                    log("POST", "/create", JSON.stringify({"Error": "Username not available"}));
                    response.status(300).json({"Error": "Username not available"});
                }
            }
        })
    } 
}

const login = (request, response) => {
    log("POST", "/login", JSON.stringify(request.body));
    if (!request.body.username || !request.body.password) {
        log("POST", "/login", JSON.stringify({"Error": "Missing Attributes"}));
        response.status(300).json({"Error": "Missing Attributes"})
    } else {
        // Check if username exists
        const query = {
            name: 'fetch-usernames',
            text: 'SELECT * from "UserInfo" WHERE "username" = $1;',
            values: [request.body.username]
        }

        pool.query(query, (err, results) => {
            if (err) {
                log("POST", "/login", JSON.stringify({"Error": err.message}));
                response.status(400).json({"Error": err.message});
            } else {
                if (results.rows.length === 1) {
                    bcrypt.compare(request.body.password, results.rows[0].password_hash, (err, bresults) => {
                        if (bresults) {
                            let token = jwt.sign({username: request.body.username}, 'dbgods');
                            response.status(200).json({
                                "id": 1,
                                "username": results.rows[0].username,
                                "name": results.rows[0].name,
                                "type": results.rows[0].type,
                                "token": token
                            });
                            log("POST", "/login", JSON.stringify({
                                "id": 1,
                                "username": results.rows[0].username,
                                "name": results.rows[0].name,
                                "type": results.rows[0].type,
                                "token": token
                            }));
                        } else {
                            log("POST", "/login", JSON.stringify({"Error": "Wrong Password"}));
                            response.status(400).json({"Error": "Wrong Password"});
                        }
                    })
                } else {
                    log("POST", "/login", JSON.stringify({"Error": "User Not Found"}));
                    response.status(400).json({"Error": "User Not Found"});
                }
            }
        })
    }
}

module.exports = {
    createAccount,
    login
}