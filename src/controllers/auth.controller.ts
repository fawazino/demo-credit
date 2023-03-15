import { Service } from "typedi";
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { s, F } from "../utils/jsonresponse";
import { User } from "../models/user.model";
const logger = require ("../utils/logger");
import { UserService } from "../services/user.service";
import { AuthMethods } from "../utils/auth";



@Service()
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private authMethods: AuthMethods,
    ) {
    }
   
    createUser = async (req: Request, res: Response) => {
        try {
            const { email, password, repeat_password, first_name, last_name, username} = req.body;
            const response = await this.authService.signUp({ email, password, repeat_password, first_name, last_name, username })
            if (!response.success) {
                return F.unprocessedEntity(res, response.message)
            }
            return s(res, 200, true, { status: "success" }, "Account Sucessfully created")
        } catch (error) {
            console.log(error)
            logger.error(error);
            return F.serverError(res)
        }
    }

    Login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const response = await this.userService.Login(email, password)
            if (!response.success) {
                return F.clientError(res, response.message, response.statusCode)
            }
            return s(res, response.statusCode, true, response.data, response.message)
        } catch (error) {
            logger.error(error)
            return F.serverError(res)
        }
    }
}