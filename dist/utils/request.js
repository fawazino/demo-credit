"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const requests = axios_1.default.create({
    timeout: 100000
});
requests.interceptors.request.use(req => {
    console.log(req.data, req.url);
    return req;
}, err => {
    return Promise.reject(err);
});
requests.interceptors.response.use(req => {
    console.log(req.data, req.status);
    return req;
}, err => {
    return Promise.reject(err);
});
exports.default = requests;
