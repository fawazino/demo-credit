import { Service } from "typedi";
import { Transactions } from "../models/transaction.model";
import { Crud } from "../utils/crud";
import { InS } from "../utils/jsonresponse";

@Service()
export class TransactionService extends Crud {
    constructor() {
        super()
    }

    async getTransactions(userId: string) {

        const transaction = await this.getAll(
            Transactions, {
            where: {
                userId,
            },
            sort: -1
        })

        return InS.success(transaction, "success")

    }

    async getTransactionDetails(userId: string, id: string) {

        const transaction = await this.getAll(
            Transactions, {
            where: {
                userId,
                id
            },
            sort: -1
        });

        return InS.success(transaction, "success")

    }

}