"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMethods = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typedi_1 = require("typedi");
let AuthMethods = class AuthMethods {
    hashPassword(password) {
        return bcrypt_1.default.hashSync(password, 15);
    }
    hashCardNumber(cardNumber) {
        return bcrypt_1.default.hashSync(cardNumber, 15);
    }
    hashCardCvv(cardCvv) {
        return bcrypt_1.default.hashSync(cardCvv, 15);
    }
    verifyPassword(password, hashedPassword) {
        return bcrypt_1.default.compareSync(password, hashedPassword);
    }
    generateToken(data) {
        return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, { expiresIn: '2h' });
    }
};
AuthMethods = __decorate([
    (0, typedi_1.Service)()
], AuthMethods);
exports.AuthMethods = AuthMethods;
