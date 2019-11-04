require("dotenv").config();

const configObj = {
    "development": {
        "username": "root",
        "password": process.env.DB_PASSWORD_LOCAL,
        "database": "passport_demo",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}

module.exports = configObj;