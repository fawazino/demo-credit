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
exports.AuthController = void 0;
const typedi_1 = require("typedi");
const auth_service_1 = require("../services/auth.service");
const jsonresponse_1 = require("../utils/jsonresponse");
const logger = require("../utils/logger");
const user_service_1 = require("../services/user.service");
const auth_1 = require("../utils/auth");
let AuthController = class AuthController {
    constructor(authService, userService, authMethods) {
        this.authService = authService;
        this.userService = userService;
        this.authMethods = authMethods;
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, repeat_password, first_name, last_name, username } = req.body;
                const response = yield this.authService.signUp({ email, password, repeat_password, first_name, last_name, username });
                if (!response.success) {
                    return jsonresponse_1.F.unprocessedEntity(res, response.message);
                }
                return (0, jsonresponse_1.s)(res, 200, true, { status: "success" }, "Account Sucessfully created");
            }
            catch (error) {
                console.log(error);
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
        this.Login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield this.userService.Login(email, password);
                if (!response.success) {
                    return jsonresponse_1.F.clientError(res, response.message, response.statusCode);
                }
                return (0, jsonresponse_1.s)(res, response.statusCode, true, response.data, response.message);
            }
            catch (error) {
                logger.error(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
    }
};
AuthController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        auth_1.AuthMethods])
], AuthController);
exports.AuthController = AuthController;
