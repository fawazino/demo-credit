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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const { DataTypes } = require("sequelize");
const wallet_model_1 = require("./wallet.model");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(DataTypes.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(DataTypes.STRING),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(DataTypes.STRING),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)(DataTypes.DATE),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(DataTypes.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(DataTypes.STRING),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(DataTypes.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(DataTypes.STRING),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => wallet_model_1.Wallet),
    __metadata("design:type", wallet_model_1.Wallet)
], User.prototype, "wallet", void 0);
User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;
