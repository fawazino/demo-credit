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
exports.Wallet = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const { DataTypes } = require("sequelize");
const transaction_model_1 = require("./transaction.model");
const user_model_1 = require("./user.model");
let Wallet = class Wallet extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(DataTypes.INTEGER),
    __metadata("design:type", Number)
], Wallet.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Wallet.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(DataTypes.INTEGER),
    __metadata("design:type", Number)
], Wallet.prototype, "account_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(DataTypes.INTEGER),
    __metadata("design:type", Number)
], Wallet.prototype, "balance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(DataTypes.STRING),
    __metadata("design:type", String)
], Wallet.prototype, "auth_code", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Wallet.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => transaction_model_1.Transactions),
    __metadata("design:type", Array)
], Wallet.prototype, "transactions", void 0);
Wallet = __decorate([
    sequelize_typescript_1.Table
], Wallet);
exports.Wallet = Wallet;
