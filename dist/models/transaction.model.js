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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const { DataTypes } = require("sequelize");
const transaction_1 = require("../interface/transaction");
const user_model_1 = require("./user.model");
const wallet_model_1 = require("./wallet.model");
let Transactions = class Transactions extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transactions.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transactions.prototype, "transaction_type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transactions.prototype, "platform", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transactions.prototype, "transaction_status", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Transactions.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transactions.prototype, "amount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transactions.prototype, "ref", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transactions.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => wallet_model_1.Wallet),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transactions.prototype, "wallet_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transactions.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => wallet_model_1.Wallet),
    __metadata("design:type", wallet_model_1.Wallet)
], Transactions.prototype, "wallet", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", Array)
], Transactions.prototype, "user", void 0);
Transactions = __decorate([
    sequelize_typescript_1.Table
], Transactions);
exports.Transactions = Transactions;
