import { Service } from "typedi";
import { F, s } from "../utils/jsonresponse";
const logger = require ("../utils/logger");
import { Request, Response } from 'express'
import { User } from "../models/user.model";
import { WalletService } from "../services/wallet.service";

@Service()
export class WalletController {
    constructor(private walletService: WalletService) {

    }

    getWalletDetails = async (req: any, res: Response) => {
        try {
            const userDetails = req.user
            const response = await this.walletService.getWalletDetails(userDetails.id)
            if (response.success) {
                return s(res, 200, true, response.data, "Success")
            }
            return F.clientError(res, {}, 400)
        } catch (error) {
            logger.error(error)
            return F.serverError(res)
        }
    }

    initializeTransaction = async (req: any, res: Response) => {
        try {
            const userDetails = req.user
            const amount = req.body.amount
            const response = await this.walletService.initializeTransaction(userDetails.id, amount)
            if (response.success) {
                return s(res, 200, true, response.data, "Please use the url to complete your transaction and verify")
            }
            return F.clientError(res, {}, 400)
        } catch (error) {
            console.log(error)
            logger.error(error)
            return F.serverError(res)
        }
    }
    verifyTransactionAndFund = async (req: any, res: Response) => {
        try {
            const userDetails = req.user
            const reference = req.body.reference
            const response = await this.walletService.verifyTransactionAndFund(userDetails.id, reference)
            if (response.success) {
                return s(res, 200, true, response.data, "Transaction Verified")
            }
            return F.clientError(res, {}, 400)
        } catch (error) {
            console.log(error)
            logger.error(error)
            return F.serverError(res)
        }
    }
    fundAccount = async (req: any, res: Response) => {
        try {
            const userDetails = req.user
            const amount = req.body.amount
            const response = await this.walletService.fundAccount(userDetails.id, amount)
            if (response.success) {
                return s(res, 200, true, response.data, "Account Successfully Funded")
            }
            return F.clientError(res, {}, 400)
        } catch (error) {
            console.log(error)
            logger.error(error)
            return F.serverError(res)
        }
    }
    transferFunds = async (req: any, res: Response) => {
        try {
            const userDetails = req.user
            const amount = req.body.amount
            const recipient_account = req.body.recipient_account
            const response = await this.walletService.transferFunds(userDetails.id, amount, recipient_account)
            if (response.success) {
                return s(res, 200, true, response.data, "Transfer Successful")
            }
            return F.clientError(res, {}, 400)
        } catch (error) {
            console.log(error)
            logger.error(error)
            return F.serverError(res)
        }
    }
    withdrawFunds = async (req: any, res: Response) => {
        try {
            const userDetails = req.user
            const amount = req.body.amount
            const bank = req.body.bank
            const accountNumber = req.body.accountNumber
            const response = await this.walletService.withdrawFunds(userDetails.id, amount, accountNumber, bank)
            if (response.success) {
                return s(res, 200, true, response.data, "Transfer Successful")
            }
            return F.clientError(res, {}, 400)
        } catch (error) {
            logger.error(error)
            return F.serverError(res)
        }
    }
    
}