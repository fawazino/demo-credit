"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var DataTypes = require("sequelize").DataTypes;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)(DataTypes.NUMBER)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "first_name", void 0);
    __decorate([
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "last_name", void 0);
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)(DataTypes.DATE)
    ], User.prototype, "created_at", void 0);
    __decorate([
        sequelize_typescript_1.Unique,
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "email", void 0);
    __decorate([
        sequelize_typescript_1.Unique,
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "phone_number", void 0);
    __decorate([
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "address", void 0);
    __decorate([
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "state", void 0);
    __decorate([
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "image", void 0);
    __decorate([
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "city", void 0);
    __decorate([
        (0, sequelize_typescript_1.Column)(DataTypes.STRING)
    ], User.prototype, "marital_status", void 0);
    User = __decorate([
        sequelize_typescript_1.Table
    ], User);
    return User;
}(sequelize_typescript_1.Model));
exports.User = User;
