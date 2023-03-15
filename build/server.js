"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isCelebrateError = require("celebrate").isCelebrateError;
var express_1 = __importDefault(require("express"));
var morgan = require('morgan');
var userRoute = require('./routes/user.route').userRoute;
var env = require('dotenv');
var bodyParser = require('body-parser');
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
var api = '/api/v1/';
app.get(api, function (_req, res) { return res.send({ ping: "pong" }); });
app.use(api + 'user', userRoute);
app.use(function (error, _req, res, next) {
    var _a;
    if (isCelebrateError(error)) {
        res.send((_a = error.details.get('body')) === null || _a === void 0 ? void 0 : _a.message);
    }
    next();
});
app.use('*', function (_, res) {
    res.send('route not found');
});
exports.default = app;
