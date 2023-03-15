import { Router } from "express";
import Container from "typedi";
import { UserController } from '../controllers/user.controller'
import { celebrate, Joi } from "celebrate";
import { AuthService } from "../services/auth.service";

export const userRoute = Router()

const controller = Container.get(UserController)
const authService = Container.get(AuthService)

userRoute.route('/')
    .get(
        controller.getUsers
    )