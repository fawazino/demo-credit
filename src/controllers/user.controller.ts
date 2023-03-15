import { Request, Response } from "express";
import { Container, Service } from "typedi";
import { F, s } from "../utils/jsonresponse";
import { UserService } from "../services/user.service";

const userService = Container.get(UserService);

@Service()
export class UserController {

    async getUsers(_req: Request, res: Response) {
        try {
            const response = await userService.getUsers()
            return s(res, 200, true, response, "success")
        } catch (error) {
            console.log(error)
            return F.serverError(res)
        }

    }
}