const env = require('dotenv');
env.config()
import { Sequelize } from 'sequelize-typescript'
import { Transactions } from '../models/transaction.model';
import { User } from '../models/user.model'
import { Wallet } from '../models/wallet.model';

let sequelize: Sequelize;

const Models = [
    User,
    Wallet,
    Transactions
]

if (process.env.ENV_NODE === 'dev') {
    sequelize = new Sequelize({
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
      
    })
} else {
    sequelize = new Sequelize({
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
    })
}

export { sequelize }
