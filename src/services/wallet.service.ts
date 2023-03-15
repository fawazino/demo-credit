import { Service } from "typedi";
import { Op } from 'sequelize'
import { User } from "../models/user.model";
import { Wallet } from "../models/wallet.model";
import { AuthMethods } from "../utils/auth";
import { Crud } from "../utils/crud";
import { InS } from "../utils/jsonresponse";
import { AuthService } from './auth.service'
import { Paystack } from "../externalservices/paystack";
import { Transactions } from "../models/transaction.model";
import { EtransactionPlatform, ETransactionStatus, ETransactionType } from "../interface/transaction";
const short = require('short-uuid')

@Service()
export class WalletService extends Crud {
    constructor(private authMethods: AuthMethods, private authService: AuthService, private paystack: Paystack) {
        super()
    }

    async getWalletDetails(userId: number) {

        const wallet = await this.getAll(
            Wallet, {
            where: {
                userId
            }

        });

        return InS.success(wallet, "success")

    }
    async initializeTransaction(userId:number, amount:number){
       
        let wallet = await this.getOne(Wallet, {
            where: {
                userId
            },
        })
        if(!wallet){
      return InS.failed('Account not found')
        }
        let user = await this.getOne(User, {
            where: {
                id:userId
            },
        })
       if(!wallet.auth_code){
        const initializeTrans = await this.paystack.initializeTransaction(user.email, (amount * 100))

            if(!initializeTrans.success){
                 return InS.failed("Unable to perform transaction", 400)
        }
        return InS.success({url: initializeTrans.data.data.authorization_url})
       } 
    }

    async verifyTransactionAndFund(userId:number, reference:string,){
        let wallet = await this.getOne(Wallet, {
            where: {
                userId
            },
        })
        if(!wallet){
      return InS.failed('Account not found')
        }

        const verifyTransaction = await this.paystack.verifyTransaction(reference)
        console.log(verifyTransaction.data.amount)
        if(!verifyTransaction.success){
            return InS.failed("Unable to perform transaction", 400)
        }
        await this.update(
            Wallet,
            {
                where: {
                    id: wallet.id
                },
            },
            {
                balance: (wallet.balance + (Number(verifyTransaction.data.amount) / 100)),
                auth_code: verifyTransaction.data.authorization.authorization_code
            }
            )
            await this.create(Transactions, {
                transaction_type: ETransactionType.CREDIT,
                amount:Number(verifyTransaction.data.amount) / 100,
                transaction_status: ETransactionStatus.COMPLETED,
                ref: verifyTransaction.data?.reference,
                userId: userId,
                wallet_id: wallet.id,
                description: 'Account Funding',
                platform: EtransactionPlatform.PAYSTACK,
            })
            return InS.success({response: verifyTransaction.message})
    }

    async fundAccount(userId:number, amount:number){
        let wallet = await this.getOne(Wallet, {
            where: {
                userId
            },
        })
        if(!wallet){
      return InS.failed('Account not found', 400)
        }
        let user = await this.getOne(User, {
            where: {
                id: userId
            },
        })
      
        const debit = await this.paystack.debit({
            authorization_code: wallet.auth_code,
            amount: amount  * 100,
            email: user.email,
        })
        
        if (!debit.success) {
            return InS.failed('Failed to charge account', 400)
        }

        await this.update(
            Wallet,
            {
                where: {
                    id: wallet.id
                },
            },
            {
                balance: (wallet.balance + (Number(debit.data.data.amount) / 100))            }
            )

        await this.create(Transactions, {
            transaction_type: ETransactionType.CREDIT,
            amount:Number(debit.data.data.amount) / 100,
            transaction_status: ETransactionStatus.COMPLETED,
            ref: debit.data?.data?.reference,
            userId: userId,
            wallet_id: wallet.id,
            description: 'Account Funding',
            platform: EtransactionPlatform.PAYSTACK,
        })
        return InS.success({response:debit.data.message})

    }

    async transferFunds(userId:number, amount:number, recipient_account:number){
        let wallet = await this.getOne(Wallet, {
            where: {
                userId
            },
        })
        if(!wallet){
      return InS.failed('Account not found', 400)
        }

        let recipientWallet = await this.getOne(Wallet, {
            where: {
                account_number: recipient_account
            },
        })
        if(!recipientWallet){
            return InS.failed('Recipient Account not found', 400)

        }
        if(wallet.balance < amount){
            return InS.failed('Insufficient Funds', 400)
        }
        await this.update(
            Wallet,
            {
                where: {
                    id: wallet.id,
                },
            },
            {
                balance: (wallet.balance - amount)
            }
            )
            await this.update(
                Wallet,
                {
                    where: {
                        account_number: recipient_account
                    },
                },
                {
                    balance: (recipientWallet.balance + amount)
                }
                )
            await this.create(Transactions, {
                transaction_type: ETransactionType.DEBIT,
                amount,
                transaction_status: ETransactionStatus.COMPLETED,
                ref: short.generate(),
                userId: userId,
                wallet_id: wallet.id,
                description: `Transfer to ${recipientWallet.account_number}`,
            })
            await this.create(Transactions, {
                transaction_type: ETransactionType.CREDIT,
                amount,
                transaction_status: ETransactionStatus.COMPLETED,
                ref: short.generate(),
                userId: recipientWallet.userId,
                wallet_id: recipientWallet.id,
                description: `Transfer from ${wallet.account_number}`,
            })
            return InS.success({response: "Transfer Successful"})

    }

    async withdrawFunds(userId:number, amount:number, accountNumber:number, bank:string){
        let wallet = await this.getOne(Wallet, {
            where: {
                userId
            },
        })
        if(!wallet){
      return InS.failed('Account not found', 400)
        }
        if(wallet.balance < amount){
            return InS.failed('insufficient funds', 400)
        }
        //faux withdrawal
        await this.update(
            Wallet,
            {
                where: {
                    id: wallet.id,
                },
            },
            {
                balance: (wallet.balance - amount)
            }
            )

            await this.create(Transactions, {
                transaction_type: ETransactionType.DEBIT,
                amount,
                transaction_status: ETransactionStatus.COMPLETED,
                ref: short.generate(),
                userId: userId,
                wallet_id: wallet.id,
                description: `Withdrawal to ${accountNumber} ${bank}`,
            })
            return InS.success({response: "Withdrawal Successful"})

    }
}