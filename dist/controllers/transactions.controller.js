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
exports.TransactionController = void 0;
const typedi_1 = require("typedi");
const transaction_service_1 = require("../services/transaction.service");
const jsonresponse_1 = require("../utils/jsonresponse");
const logger = require("../utils/logger");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
        this.getTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.user;
                const response = yield this.transactionService.getTransactions(userDetails.id);
                if (response.success) {
                    return (0, jsonresponse_1.s)(res, 200, true, response.data, "successful!.");
                }
                return jsonresponse_1.F.clientError(res, response.message, response.statusCode);
            }
            catch (error) {
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
        this.getTransactionDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.user;
                const response = yield this.transactionService.getTransactionDetails(userDetails.id, req.params.id);
                if (response.success) {
                    return (0, jsonresponse_1.s)(res, 200, true, response.data, "successful!.");
                }
                return jsonresponse_1.F.clientError(res, response.message, response.statusCode);
            }
            catch (error) {
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
    }
};
TransactionController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
