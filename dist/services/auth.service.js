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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jsonresponse_1 = require("../utils/jsonresponse");
const logger = require("../utils/logger");
const user_model_1 = require("../models/user.model");
const crud_1 = require("../utils/crud");
const auth_1 = require("../utils/auth");
const wallet_model_1 = require("../models/wallet.model");
let AuthService = class AuthService extends crud_1.Crud {
    constructor(authModule) {
        super();
        this.authModule = authModule;
        this.protect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const bearer = req.headers.authorization;
            if (!bearer || !bearer.startsWith('Bearer ')) {
                return jsonresponse_1.F.unauthenticated(res);
            }
            const token = bearer.split('Bearer ')[1].trim();
            let payload = yield this.verifyToken(token);
            if (!payload.valid)
                return jsonresponse_1.F.unauthenticated(res);
            const user = yield user_model_1.User.findOne({
                where: { id: payload.data.id }
            });
            if (!user)
                return jsonresponse_1.F.unauthenticated(res);
            // @ts-ignore
            req.user = user;
            next();
        });
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, repeat_password, first_name, last_name, username } = data;
            if (password !== repeat_password)
                return jsonresponse_1.InS.failed("Password and confirm password does not match.", 400);
            let user = yield this.getOne(user_model_1.User, {
                where: {
                    email
                },
            });
            if (user) {
                return jsonresponse_1.InS.failed("User with email already exist !!");
            }
            const hashPassword = this.authModule.hashPassword(password);
            user = yield this.create(user_model_1.User, {
                email,
                password: hashPassword,
                first_name,
                last_name,
                username
            });
            yield this.create(wallet_model_1.Wallet, {
                userId: user.id,
                account_number: Math.floor(100000000 + Math.random() * 900000000),
                balance: 0
            });
            const token = this.createAuthToken({ email });
            return jsonresponse_1.InS.success({ token: token, message: "Account succesfully created" });
        });
    }
    createAuthToken(data) {
        let token;
        token = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return token;
    }
    verifyToken(token) {
        try {
            const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return { valid: true, data };
        }
        catch (e) {
            return { valid: false };
        }
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auth_1.AuthMethods])
], AuthService);
exports.AuthService = AuthService;
