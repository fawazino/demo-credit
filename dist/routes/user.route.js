"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const user_controller_1 = require("../controllers/user.controller");
const auth_service_1 = require("../services/auth.service");
exports.userRoute = (0, express_1.Router)();
const controller = typedi_1.default.get(user_controller_1.UserController);
const authService = typedi_1.default.get(auth_service_1.AuthService);
exports.userRoute.route('/')
    .get(controller.getUsers);
