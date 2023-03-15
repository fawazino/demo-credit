import { User } from "../models/user.model";
import { Wallet } from "../models/wallet.model";


export enum ETransactionType {
    CREDIT = "credit",
    DEBIT = "debit"
}

export enum ETransactionStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    REVERSED = "reversed"
}


export enum EtransactionPlatform {
    PAYSTACK = "paystack",
}
export interface ITransactions {
    id: number;
    transaction_type: ETransactionType;
    transaction_status: ETransactionStatus;
    amount: number;
    ref: string;
    created_at: Date;
    account_number: number | Wallet
    user: number | User
    platform: EtransactionPlatform;
    description: string
}