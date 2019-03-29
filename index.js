const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Routes
const login = require('./auth')
const packages = require('./queries/packages')
const complaints = require('./queries/complaints')
const customer = require('./queries/customer')
const vehicles = require('./queries/vehicles')
const warehouse = require('./queries/warehouse')
const driver = require('./queries/driver')
const manager = require('./queries/manager')
const employee = require('./queries/employee')

const special = require('./queries/special')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log("Listening on port 3000"));

// Default
app.get('/', (request, response) => {
    response.json({
        info: "Welcome to DBGods",
        version: "1.0.0"
    });
})

// Login and Authentication

// POST - Login
app.post('/login/', login.login)
// Post - Create Account
app.post('/create/', login.createAccount)

/*
    Individual Routes Below (queries.js)
*/

// Packages
// GET - List All Packages (Driver, Manager)
// app.get('/packages/', packages.getPackages)
app.get('/packages/', special.getPackageSpecial)
app.post('/packages/', packages.addPackage)
app.put('/packages/', packages.modifyPackage)
app.delete('/packages/', packages.deletePackage)

// Employee
app.get('/employees/', employee.getEmployee)
app.post('/employees/', employee.addEmployee)
app.put('/employees/', employee.modifyEmployee)
app.delete('/employees/', employee.deleteEmployee)

// GET - List customer's package (Customer, Driver, Manager)

// Complaints
// GET - List all Complaints (Driver, Manager)
app.get('/complaints/', complaints.getComplaints)
// POST - Add a complaint (Driver, Manager)
app.post('/complaints/', complaints.addComplaint)
// DELETE - Delete a complaint (Driver, Manager)
app.delete('/complaints/', complaints.deleteComplaint)
// PUT - Modify a complaint (Driver, Manager)
app.put('/complaints/', complaints.modifyComplaint)

// Vehicles
// GET - List All Vehicles (Driver, Manager)
app.get('/vehicles/', vehicles.getVehicles)
app.post('/vehicles/insurance', vehicles.addInsurance)
// POST - Add a Vehicle (Driver, Manager)
app.post('/vehicles/', vehicles.addVehicle)
// DELETE - Delete a Vehicle (Driver, Manager)
app.delete('/vehicles/', vehicles.deleteVehicle)
// PUT - Modify a Vehicle (Driver, Manager)
app.put('/vehicles/', vehicles.modifyVehicle)

// Manager
// GET - List All Manager (Manager)
app.get('/managers/', manager.getManagers)
// POST - Add a Manager (Manager)
app.post('/managers/', manager.addManager)
// DELETE - Delete a Manager (Manager)
app.delete('/managers/', manager.deleteManager)
// PUT - Modify a Manager (Manager)
app.put('/managers/', manager.modifyManager)

// Driver
// GET - List All Drivers (Driver, Manager)
// app.get('/drivers/', driver.getDrivers)
app.get('/drivers/', special.getDriverSpecial)
// POST - Add a Driver (Manager)
app.post('/drivers/', driver.addDriver)
// DELETE - Delete a Driver (Manager)
app.delete('/drivers/', driver.deleteDriver)
// PUT - Modify a Driver (Manager)
app.put('/drivers/', driver.modifyDriver)

// Warehouse
// GET - List All Warehouse (Driver, Manager)
app.get('/warehouses/', warehouse.getWarehouses)
// POST - Add a Warehouse (Manager)
app.post('/warehouses/', warehouse.addWarehouse)
// DELETE - Delete a Warehouse (Manager)
app.delete('/warehouses/', warehouse.deleteWarehouse)
// PUT - Modify a Warehouse (Manager)
app.put('/warehouses/', warehouse.modifyWarehouse)

// Customers
// GET - List All Customer (Driver, Manager)
app.get('/customers/', customer.getCustomers)
// POST - Add a Customer (Manager)
app.post('/customers/', customer.addCustomer)
// DELETE - Delete a Customer (Manager)
app.delete('/customers/', customer.deleteCustomer)
// PUT - Modify a Customer (Manager)
app.put('/customers/', customer.modifyCustomer)

// Special
app.post('/special/selection', special.getSelection)
app.post('/special/projection', special.getProjection)
app.post('/special/join', special.getJoin)
app.get('/special/salary', special.getSalaryStat)
app.get('/special/complain', special.getComplaintStat)
app.post('/special/division', special.getDivision)


