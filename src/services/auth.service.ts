import { Container, Service } from "typedi";
import jwt from 'jsonwebtoken'
import { InS, F, s } from "../utils/jsonresponse";
const logger = require ("../utils/logger");
import { Request, Response, NextFunction } from 'express'
import { User } from "../models/user.model";
import { Crud } from "../utils/crud";
import { AuthMethods } from "../utils/auth";
import moment from "moment";
import { Wallet } from "../models/wallet.model";


type body = {
    email: string,
    password: string,
    repeat_password: string,
    first_name: string,
    last_name: string,
    username: string,
    
}


@Service()
export class AuthService extends Crud {
    constructor(private authModule: AuthMethods) {
        super()
    }
   
    async signUp(data: body) {
        const { email, password, repeat_password, first_name, last_name, username } = data;
        if (password !== repeat_password) return InS.failed("Password and confirm password does not match.", 400)
         
        let user = await this.getOne(User, {
            where: {
                email
            },
        })

        if (user) {
            return InS.failed("User with email already exist !!")
        }

        const hashPassword = this.authModule.hashPassword(password)
        user = await this.create(User, {
            email,
            password: hashPassword,
            first_name,
            last_name,
            username
            
        })
        await this.create(Wallet, {
            userId: user.id,
            account_number: Math.floor(100000000 + Math.random() * 900000000),
            balance: 0

        })

        const token = this.createAuthToken({ email })

        return InS.success({token:token, message: "Account succesfully created"});
    }
    
    createAuthToken<T>(data: T) {
        let token: string;
        token = jwt.sign(data as Object, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        });
      
        return token
    }

    verifyToken(token: string) {
        try {
            const data: any = jwt.verify(token, process.env.JWT_SECRET as string);
            return { valid: true, data }
        } catch (e) {
            return { valid: false }
        }
    }


    protect = async (req: Request, res: Response, next: NextFunction) => {
        const bearer = req.headers.authorization
        if (!bearer || !bearer.startsWith('Bearer ')) {
            return F.unauthenticated(res)
        }
        const token = bearer.split('Bearer ')[1].trim()
        let payload = await this.verifyToken(token)
        if (!payload.valid) return F.unauthenticated(res)
        const user = await User.findOne({
            where: { id: payload.data.id }
        })

        if (!user) return F.unauthenticated(res)

        // @ts-ignore
        req.user = user
        next()
    }
}