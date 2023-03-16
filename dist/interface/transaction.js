"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtransactionPlatform = exports.ETransactionStatus = exports.ETransactionType = void 0;
var ETransactionType;
(function (ETransactionType) {
    ETransactionType["CREDIT"] = "credit";
    ETransactionType["DEBIT"] = "debit";
})(ETransactionType = exports.ETransactionType || (exports.ETransactionType = {}));
var ETransactionStatus;
(function (ETransactionStatus) {
    ETransactionStatus["PENDING"] = "pending";
    ETransactionStatus["COMPLETED"] = "completed";
    ETransactionStatus["FAILED"] = "failed";
    ETransactionStatus["REVERSED"] = "reversed";
})(ETransactionStatus = exports.ETransactionStatus || (exports.ETransactionStatus = {}));
var EtransactionPlatform;
(function (EtransactionPlatform) {
    EtransactionPlatform["PAYSTACK"] = "paystack";
})(EtransactionPlatform = exports.EtransactionPlatform || (exports.EtransactionPlatform = {}));
