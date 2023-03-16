"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var env = require('dotenv');
env.config();
var sequelize_typescript_1 = require("sequelize-typescript");
var user_model_1 = require("../models/user.model");
var sequelize;
exports.sequelize = sequelize;
var Models = [
    user_model_1.User
];
if (process.env.ENV_NODE === 'dev') {
    exports.sequelize = sequelize = new sequelize_typescript_1.Sequelize({
        database: process.env.DB_NAME,
        dialect: 'postgres',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        logging: false,
        models: Models,
    });
}
else {
    exports.sequelize = sequelize = new sequelize_typescript_1.Sequelize({
        database: process.env.DB_NAME,
        dialect: 'postgres',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        models: Models,
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false
            }
        }
    });
}
