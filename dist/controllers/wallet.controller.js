"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const typedi_1 = require("typedi");
const jsonresponse_1 = require("../utils/jsonresponse");
const logger = require("../utils/logger");
const wallet_service_1 = require("../services/wallet.service");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
        this.getWalletDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.user;
                const response = yield this.walletService.getWalletDetails(userDetails.id);
                if (response.success) {
                    return (0, jsonresponse_1.s)(res, 200, true, response.data, "Success");
                }
                return jsonresponse_1.F.clientError(res, {}, 400);
            }
            catch (error) {
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
        this.initializeTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.user;
                const amount = req.body.amount;
                const response = yield this.walletService.initializeTransaction(userDetails.id, amount);
                if (response.success) {
                    return (0, jsonresponse_1.s)(res, 200, true, response.data, "Please use the url to complete your transaction and verify");
                }
                return jsonresponse_1.F.clientError(res, {}, 400);
            }
            catch (error) {
                console.log(error);
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
        this.verifyTransactionAndFund = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.user;
                const reference = req.body.reference;
                const response = yield this.walletService.verifyTransactionAndFund(userDetails.id, reference);
                if (response.success) {
                    return (0, jsonresponse_1.s)(res, 200, true, response.data, "Transaction Verified");
                }
                return jsonresponse_1.F.clientError(res, {}, 400);
            }
            catch (error) {
                console.log(error);
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
        this.fundAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.user;
                const amount = req.body.amount;
                const response = yield this.walletService.fundAccount(userDetails.id, amount);
                if (response.success) {
                    return (0, jsonresponse_1.s)(res, 200, true, response.data, "Account Successfully Funded");
                }
                return jsonresponse_1.F.clientError(res, {}, 400);
            }
            catch (error) {
                console.log(error);
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
        this.transferFunds = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.user;
                const amount = req.body.amount;
                const recipient_account = req.body.recipient_account;
                const response = yield this.walletService.transferFunds(userDetails.id, amount, recipient_account);
                if (response.success) {
                    return (0, jsonresponse_1.s)(res, 200, true, response.data, "Transfer Successful");
                }
                return jsonresponse_1.F.clientError(res, {}, 400);
            }
            catch (error) {
                console.log(error);
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
        this.withdrawFunds = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.user;
                const amount = req.body.amount;
                const bank = req.body.bank;
                const accountNumber = req.body.accountNumber;
                const response = yield this.walletService.withdrawFunds(userDetails.id, amount, accountNumber, bank);
                if (response.success) {
                    return (0, jsonresponse_1.s)(res, 200, true, response.data, "Transfer Successful");
                }
                return jsonresponse_1.F.clientError(res, {}, 400);
            }
            catch (error) {
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
    }
};
WalletController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
