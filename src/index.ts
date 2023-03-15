const env = require('dotenv');


env.config({});

import { sequelize } from "./db";
import app from "./server";


const PORT = process.env.PORT || 4001

app.listen(PORT, async () => {
    // await sequelize.sync({ force: true })
    await sequelize.sync({ force: false, alter: true, })
    console.log("server has started on port ", PORT, ' 🚀')
})
