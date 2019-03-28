# How to run the backend

1. Clone repo
2. Install dependencies by running `npm install`
3. Start server by running `npm start`
4. Server is on `localhost:3000`

- Production url is `ec2-54-86-52-215.compute-1.amazonaws.com:3000`

# Routes

## Authentication

### Login

| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /login/  | POST    | username, password, type, name |

- Note: type is either `basic` or `manager`

### Create Account
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /create/  | POST    | username, password |


## Packages

### List All Packages

| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /packages/  | GET    |  |

## Complaints

### List All Complaints
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /complaints/  | GET    |  |

## Driver

### List All Drivers
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /drivers/  | GET    |  |

### Add a Driver
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /drivers/  | POST    | name, address, contact, position, rank, payroll |

### Delete a Driver
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /drivers/  | DELETE    | id |

### Modify a Driver
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /drivers/  | PUT    | name, address, contact, position, rank, payroll |

- Note: You will need to pass in every single value. Logic in FE to pass the default or modified value needed

## Manager

### List All Managers
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /managers/  | GET    |  |

### Add a Manager
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /managers/  | POST    | name, address, contact, position, rank, payroll |

### Delete a Manager
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /managers/  | DELETE    | id |

### Modify a Manager
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /managers/  | PUT    | name, address, contact, position, rank, payroll |

- Note: You will need to pass in every single value. Logic in FE to pass the default or modified value needed

## Customer

### List All Customers
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /customers/  | GET    |  |

### Add a Customer
| Route    | Type    | Body    |
| -------- | :------: | :------: |
| /customers/  | POST    | name, address, contact, creditrating |