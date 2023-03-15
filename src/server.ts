const { isCelebrateError } = require("celebrate")
import express, { NextFunction, Request, Response } from "express"
const morgan = require('morgan')
const {userRoute} = require('./routes/user.route')
const {AuthRoute} = require('./routes/auth.route')
const env = require('dotenv');
const bodyParser = require('body-parser')
import cors from "cors"
import { walletRoute } from "./routes/wallet.route"
import { transactionRoute } from "./routes/transaction.route"


const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.get("/", (_req, res) => res.send( { ping: "pong" }))
app.use('/user', userRoute)
app.use('/auth', AuthRoute)
app.use('/wallet', walletRoute)
app.use('/transactions', transactionRoute)


app.use((error: any, _req: Request, res: Response, next: any) => {
    if (isCelebrateError(error)) {
        res.send(error.details.get('body')?.message);
    }
    
    next()
});

app.use('*', (_, res) => {
    res.send('route not found')
})

export default app