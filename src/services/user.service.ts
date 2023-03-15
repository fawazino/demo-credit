import { Service } from "typedi";
import { Op } from 'sequelize'
import { User } from "../models/user.model";
import { AuthMethods } from "../utils/auth";
import { Crud } from "../utils/crud";
import { InS } from "../utils/jsonresponse";
import { AuthService } from './auth.service'


@Service()
export class UserService extends Crud {
    constructor(private authMethods: AuthMethods, private authService: AuthService) {
        super()
    }
    async getUsers() {
        return InS.success(await this.getAll(User, {
            attributes: [
                'id',
                "first_name",
                "last_name",
                "email",
                "phone_number",
                "username",
                
            ]
        }), "success")
    }

    async Login(email: string, password: string) {
        const user = await this.getOne(User, {
            where: {
                email
            },
        })

        if (!user) {
            return InS.failed("Unauthorized User", 400)
        }
    
        const verify = this.authMethods.verifyPassword(password, user.password)

        if (!verify) {
            return InS.failed("Incorrect password and Email combination.", 400)
        }

        const token = this.authMethods.generateToken({
            id: user.id,
            email: user.email,
        })

        return InS.success({
            token: token,
            email
        })
    }

}
