"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const env = require('dotenv');
env.config();
const sequelize_typescript_1 = require("sequelize-typescript");
const transaction_model_1 = require("../models/transaction.model");
const user_model_1 = require("../models/user.model");
const wallet_model_1 = require("../models/wallet.model");
let sequelize;
exports.sequelize = sequelize;
const Models = [
    user_model_1.User,
    wallet_model_1.Wallet,
    transaction_model_1.Transactions
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
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false
            }
        }
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
