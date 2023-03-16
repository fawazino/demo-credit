"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const auth_service_1 = require("../services/auth.service");
const transactions_controller_1 = require("../controllers/transactions.controller");
exports.transactionRoute = (0, express_1.Router)();
const controller = typedi_1.default.get(transactions_controller_1.TransactionController);
const authService = typedi_1.default.get(auth_service_1.AuthService);
exports.transactionRoute.route('/')
    .get(authService.protect, controller.getTransactions);
exports.transactionRoute.route('/:id')
    .get(authService.protect, controller.getTransactionDetails);
