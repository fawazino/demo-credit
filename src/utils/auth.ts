import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class AuthMethods {
    hashPassword(password: string): string {
        return bcrypt.hashSync(password, 15)
    }

    hashCardNumber(cardNumber: string): string {
        return bcrypt.hashSync(cardNumber, 15)
    }

    hashCardCvv(cardCvv: string): string {
        return bcrypt.hashSync(cardCvv, 15)
    }

    verifyPassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword)
    }

    generateToken<T>(data: T) {
        return jwt.sign(data as Object, process.env.JWT_SECRET, { expiresIn: '2h' })
    }
}