"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const auth_controller_1 = require("../controllers/auth.controller");
const typedi_1 = require("typedi");
const auth_service_1 = require("../services/auth.service");
exports.AuthRoute = (0, express_1.Router)();
const authController = typedi_1.Container.get(auth_controller_1.AuthController);
const authService = typedi_1.Container.get(auth_service_1.AuthService);
exports.AuthRoute.route('/create')
    .post((0, celebrate_1.celebrate)({
    body: {
        email: celebrate_1.Joi.string().email().required().trim(),
        password: celebrate_1.Joi.string().required().min(3).max(15),
        repeat_password: celebrate_1.Joi.string().optional().min(3).max(15),
        username: celebrate_1.Joi.string().required(),
        first_name: celebrate_1.Joi.string().required(),
        last_name: celebrate_1.Joi.string().required()
    }
}), authController.createUser);
exports.AuthRoute.route('/login').post((0, celebrate_1.celebrate)({
    body: {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required()
    }
}), authController.Login);
