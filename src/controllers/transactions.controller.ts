import { Service } from "typedi";
import { TransactionService } from "../services/transaction.service";
import { F, s } from "../utils/jsonresponse";
const logger = require ("../utils/logger");
import { Response } from "express"

@Service()
export class TransactionController {
    constructor(private transactionService: TransactionService) {

    }

    getTransactions = async (req: any, res: Response) => {
        try {
            const userDetails = req.user as any;
            const response = await this.transactionService.getTransactions(userDetails.id)
            if (response.success) {
                return s(res, 200, true, response.data, "successful!.")
            }
            return F.clientError(res, response.message, response.statusCode)
        } catch (error) {
            logger.error(error)
            return F.serverError(res)
        }
    }

    getTransactionDetails = async (req: any, res: Response) => {
        try {
            const userDetails = req.user;
            const response = await this.transactionService.getTransactionDetails(userDetails.id, req.params.id)
            if (response.success) {
                return s(res, 200, true, response.data, "successful!.")
            }
            return F.clientError(res, response.message, response.statusCode)
        } catch (error) {
            logger.error(error)
            return F.serverError(res)
        }
    }
}