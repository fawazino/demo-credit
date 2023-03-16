"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const wallet_controller_1 = require("../controllers/wallet.controller");
const celebrate_1 = require("celebrate");
const auth_service_1 = require("../services/auth.service");
exports.walletRoute = (0, express_1.Router)();
const controller = typedi_1.default.get(wallet_controller_1.WalletController);
const authService = typedi_1.default.get(auth_service_1.AuthService);
exports.walletRoute.route('/')
    .get(authService.protect, controller.getWalletDetails);
exports.walletRoute.route('/initializeTransaction')
    .post((0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object({
        amount: celebrate_1.Joi.number().required()
    })
}), authService.protect, controller.initializeTransaction);
exports.walletRoute.route('/verifyTransaction')
    .post((0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object({
        reference: celebrate_1.Joi.string().required()
    })
}), authService.protect, controller.verifyTransactionAndFund);
exports.walletRoute.route('/fundAccount')
    .post((0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object({
        amount: celebrate_1.Joi.number().required()
    })
}), authService.protect, controller.fundAccount);
exports.walletRoute.route('/transfer')
    .post((0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object({
        amount: celebrate_1.Joi.number().required(),
        recipient_account: celebrate_1.Joi.number().required()
    })
}), authService.protect, controller.transferFunds);
exports.walletRoute.route('/withdraw')
    .post((0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object({
        amount: celebrate_1.Joi.number().required(),
        accountNumber: celebrate_1.Joi.number().required(),
        bank: celebrate_1.Joi.string().required()
    })
}), authService.protect, controller.withdrawFunds);
