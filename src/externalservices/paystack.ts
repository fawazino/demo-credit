import axios from "axios";
import { Service } from "typedi";
import { InS } from "../utils/jsonresponse";
const logger = require ("../utils/logger");
import fetch from "node-fetch";

type payStackDebit = {
    authorization_code: string;
    email: string;
    amount: number
}
 
@Service()
export class Paystack {

    constructor() {
        this.paystackUrl = process.env.PAYSTACK_URL
        this.secretKey = process.env.PAYSTACK_KEY
    }
    paystackUrl: string
    secretKey: string
    publicKey: string

    async initializeTransaction(email:string, amount:number){
        if (!email || !amount) {
            return InS.failed('missing required fields', 400)
        }

        if (amount < 1) {
            return InS.failed('amount cannot be less than 1', 400)
        }
        try {
        const url = `${this.paystackUrl}/transaction/initialize`
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.secretKey}`
            },
            body: JSON.stringify({ email, amount })
        };

        const response = await fetch(url, options)
        const json = await response.json()
        if (response.status === 200) {
            logger.info("Success")
            return InS.success({ ...json }, "Transaction successful")
        }
        logger.error(json)
        return InS.failed('Unable to charge card', 400)
        } catch (error) {
            logger.error(error)
            return InS.failed('Debit Failed', 400)
        }
    }

    async verifyTransaction(reference: string) {
        try {
            const { data } = await axios.get(`${this.paystackUrl}/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`
                }
            })

            if (data.status) {
                logger.info("Success")
                return InS.success({ ...data.data }, 'payment verification successful')
            }

            return InS.failed('failed payment verification', 400)

        } catch (error) {
            console.log(error)
            logger.error(error)
            return InS.failed('failed payment verification', 400)
        }
    }

    async debit(info: payStackDebit) {
        if (!info.authorization_code || !info.email || !info.amount) {
            return InS.failed('missing required fields', 400)
        }

        if (info.amount < 1) {
            return InS.failed('amount must be less than 1', 400)
        }

        try {
            const url = `${this.paystackUrl}/transaction/charge_authorization`
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.secretKey}`
                },
                body: JSON.stringify({ ...info, amount: String(info.amount) })
            };

            const response = await fetch(url, options)
            const json = await response.json()
            if (response.status === 200) {
                logger.info("Success")
                return InS.success({ ...json }, "Payment verification successful")
            }
            logger.error(json)
            return InS.failed('Unable to charge card', 400)


        } catch (error) {
            logger.error(error)
            return InS.failed('Debit Failed', 400)
        }

    }

    
}