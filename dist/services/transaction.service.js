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
exports.TransactionService = void 0;
const typedi_1 = require("typedi");
const transaction_model_1 = require("../models/transaction.model");
const crud_1 = require("../utils/crud");
const jsonresponse_1 = require("../utils/jsonresponse");
let TransactionService = class TransactionService extends crud_1.Crud {
    constructor() {
        super();
    }
    getTransactions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.getAll(transaction_model_1.Transactions, {
                where: {
                    userId,
                },
                sort: -1
            });
            return jsonresponse_1.InS.success(transaction, "success");
        });
    }
    getTransactionDetails(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.getAll(transaction_model_1.Transactions, {
                where: {
                    userId,
                    id
                },
                sort: -1
            });
            return jsonresponse_1.InS.success(transaction, "success");
        });
    }
};
TransactionService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], TransactionService);
exports.TransactionService = TransactionService;
