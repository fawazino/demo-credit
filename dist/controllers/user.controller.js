"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserController = void 0;
const typedi_1 = require("typedi");
const jsonresponse_1 = require("../utils/jsonresponse");
const user_service_1 = require("../services/user.service");
const userService = typedi_1.Container.get(user_service_1.UserService);
let UserController = class UserController {
    getUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userService.getUsers();
                return (0, jsonresponse_1.s)(res, 200, true, response, "success");
            }
            catch (error) {
                console.log(error);
                return jsonresponse_1.F.serverError(res);
            }
        });
    }
};
UserController = __decorate([
    (0, typedi_1.Service)()
], UserController);
exports.UserController = UserController;
