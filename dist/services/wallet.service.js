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
exports.WalletService = void 0;
const typedi_1 = require("typedi");
const user_model_1 = require("../models/user.model");
const wallet_model_1 = require("../models/wallet.model");
const auth_1 = require("../utils/auth");
const crud_1 = require("../utils/crud");
const jsonresponse_1 = require("../utils/jsonresponse");
const auth_service_1 = require("./auth.service");
const paystack_1 = require("../externalservices/paystack");
const transaction_model_1 = require("../models/transaction.model");
const transaction_1 = require("../interface/transaction");
const short = require('short-uuid');
let WalletService = class WalletService extends crud_1.Crud {
    constructor(authMethods, authService, paystack) {
        super();
        this.authMethods = authMethods;
        this.authService = authService;
        this.paystack = paystack;
    }
    getWalletDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield this.getAll(wallet_model_1.Wallet, {
                where: {
                    userId
                }
            });
            return jsonresponse_1.InS.success(wallet, "success");
        });
    }
    initializeTransaction(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getOne(wallet_model_1.Wallet, {
                where: {
                    userId
                },
            });
            if (!wallet) {
                return jsonresponse_1.InS.failed('Account not found');
            }
            let user = yield this.getOne(user_model_1.User, {
                where: {
                    id: userId
                },
            });
            if (!wallet.auth_code) {
                const initializeTrans = yield this.paystack.initializeTransaction(user.email, (amount * 100));
                if (!initializeTrans.success) {
                    return jsonresponse_1.InS.failed("Unable to perform transaction", 400);
                }
                return jsonresponse_1.InS.success({ url: initializeTrans.data.data.authorization_url });
            }
        });
    }
    verifyTransactionAndFund(userId, reference) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getOne(wallet_model_1.Wallet, {
                where: {
                    userId
                },
            });
            if (!wallet) {
                return jsonresponse_1.InS.failed('Account not found');
            }
            const verifyTransaction = yield this.paystack.verifyTransaction(reference);
            console.log(verifyTransaction.data.amount);
            if (!verifyTransaction.success) {
                return jsonresponse_1.InS.failed("Unable to perform transaction", 400);
            }
            yield this.update(wallet_model_1.Wallet, {
                where: {
                    id: wallet.id
                },
            }, {
                balance: (wallet.balance + (Number(verifyTransaction.data.amount) / 100)),
                auth_code: verifyTransaction.data.authorization.authorization_code
            });
            yield this.create(transaction_model_1.Transactions, {
                transaction_type: transaction_1.ETransactionType.CREDIT,
                amount: Number(verifyTransaction.data.amount) / 100,
                transaction_status: transaction_1.ETransactionStatus.COMPLETED,
                ref: (_a = verifyTransaction.data) === null || _a === void 0 ? void 0 : _a.reference,
                userId: userId,
                wallet_id: wallet.id,
                description: 'Account Funding',
                platform: transaction_1.EtransactionPlatform.PAYSTACK,
            });
            return jsonresponse_1.InS.success({ response: verifyTransaction.message });
        });
    }
    fundAccount(userId, amount) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getOne(wallet_model_1.Wallet, {
                where: {
                    userId
                },
            });
            if (!wallet) {
                return jsonresponse_1.InS.failed('Account not found', 400);
            }
            let user = yield this.getOne(user_model_1.User, {
                where: {
                    id: userId
                },
            });
            const debit = yield this.paystack.debit({
                authorization_code: wallet.auth_code,
                amount: amount * 100,
                email: user.email,
            });
            if (!debit.success) {
                return jsonresponse_1.InS.failed('Failed to charge account', 400);
            }
            yield this.update(wallet_model_1.Wallet, {
                where: {
                    id: wallet.id
                },
            }, {
                balance: (wallet.balance + (Number(debit.data.data.amount) / 100))
            });
            yield this.create(transaction_model_1.Transactions, {
                transaction_type: transaction_1.ETransactionType.CREDIT,
                amount: Number(debit.data.data.amount) / 100,
                transaction_status: transaction_1.ETransactionStatus.COMPLETED,
                ref: (_b = (_a = debit.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.reference,
                userId: userId,
                wallet_id: wallet.id,
                description: 'Account Funding',
                platform: transaction_1.EtransactionPlatform.PAYSTACK,
            });
            return jsonresponse_1.InS.success({ response: debit.data.message });
        });
    }
    transferFunds(userId, amount, recipient_account) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getOne(wallet_model_1.Wallet, {
                where: {
                    userId
                },
            });
            if (!wallet) {
                return jsonresponse_1.InS.failed('Account not found', 400);
            }
            let recipientWallet = yield this.getOne(wallet_model_1.Wallet, {
                where: {
                    account_number: recipient_account
                },
            });
            if (!recipientWallet) {
                return jsonresponse_1.InS.failed('Recipient Account not found', 400);
            }
            if (wallet.balance < amount) {
                return jsonresponse_1.InS.failed('Insufficient Funds', 400);
            }
            yield this.update(wallet_model_1.Wallet, {
                where: {
                    id: wallet.id,
                },
            }, {
                balance: (wallet.balance - amount)
            });
            yield this.update(wallet_model_1.Wallet, {
                where: {
                    account_number: recipient_account
                },
            }, {
                balance: (recipientWallet.balance + amount)
            });
            yield this.create(transaction_model_1.Transactions, {
                transaction_type: transaction_1.ETransactionType.DEBIT,
                amount,
                transaction_status: transaction_1.ETransactionStatus.COMPLETED,
                ref: short.generate(),
                userId: userId,
                wallet_id: wallet.id,
                description: `Transfer to ${recipientWallet.account_number}`,
            });
            yield this.create(transaction_model_1.Transactions, {
                transaction_type: transaction_1.ETransactionType.CREDIT,
                amount,
                transaction_status: transaction_1.ETransactionStatus.COMPLETED,
                ref: short.generate(),
                userId: recipientWallet.userId,
                wallet_id: recipientWallet.id,
                description: `Transfer from ${wallet.account_number}`,
            });
            return jsonresponse_1.InS.success({ response: "Transfer Successful" });
        });
    }
    withdrawFunds(userId, amount, accountNumber, bank) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getOne(wallet_model_1.Wallet, {
                where: {
                    userId
                },
            });
            if (!wallet) {
                return jsonresponse_1.InS.failed('Account not found', 400);
            }
            if (wallet.balance < amount) {
                return jsonresponse_1.InS.failed('insufficient funds', 400);
            }
            //faux withdrawal
            yield this.update(wallet_model_1.Wallet, {
                where: {
                    id: wallet.id,
                },
            }, {
                balance: (wallet.balance - amount)
            });
            yield this.create(transaction_model_1.Transactions, {
                transaction_type: transaction_1.ETransactionType.DEBIT,
                amount,
                transaction_status: transaction_1.ETransactionStatus.COMPLETED,
                ref: short.generate(),
                userId: userId,
                wallet_id: wallet.id,
                description: `Withdrawal to ${accountNumber} ${bank}`,
            });
            return jsonresponse_1.InS.success({ response: "Withdrawal Successful" });
        });
    }
};
WalletService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auth_1.AuthMethods, auth_service_1.AuthService, paystack_1.Paystack])
], WalletService);
exports.WalletService = WalletService;
