"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { isCelebrateError } = require("celebrate");
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const { userRoute } = require('./routes/user.route');
const { AuthRoute } = require('./routes/auth.route');
const env = require('dotenv');
const bodyParser = require('body-parser');
const cors_1 = __importDefault(require("cors"));
const wallet_route_1 = require("./routes/wallet.route");
const transaction_route_1 = require("./routes/transaction.route");
const app = (0, express_1.default)();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get("/", (_req, res) => res.send({ ping: "pong" }));
app.use('/user', userRoute);
app.use('/auth', AuthRoute);
app.use('/wallet', wallet_route_1.walletRoute);
app.use('/transactions', transaction_route_1.transactionRoute);
app.use((error, _req, res, next) => {
    var _a;
    if (isCelebrateError(error)) {
        res.send((_a = error.details.get('body')) === null || _a === void 0 ? void 0 : _a.message);
    }
    next();
});
app.use('*', (_, res) => {
    res.send('route not found');
});
exports.default = app;
