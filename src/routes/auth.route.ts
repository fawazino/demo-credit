import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { AuthController } from "../controllers/auth.controller";
import { Container } from "typedi";
import { AuthService } from "../services/auth.service";

export const AuthRoute = Router()
const authController = Container.get(AuthController)
const authService = Container.get(AuthService)

AuthRoute.route('/create')
    .post(celebrate({
        body: {
            email: Joi.string().email().required().trim(),
            password: Joi.string().required().min(3).max(15),
            repeat_password: Joi.string().optional().min(3).max(15),
            username:Joi.string().required(),
            first_name:Joi.string().required(),
            last_name:Joi.string().required()
            
        }
    }), authController.createUser)

    AuthRoute.route('/login').post(celebrate({
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }), authController.Login)