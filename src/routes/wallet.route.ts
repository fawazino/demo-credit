import { Router } from "express";
import Container from "typedi";
import { WalletController } from '../controllers/wallet.controller'
import { celebrate, Joi } from "celebrate";
import { AuthService } from "../services/auth.service";

export const walletRoute = Router()

const controller = Container.get(WalletController)
const authService = Container.get(AuthService)

walletRoute.route('/')
    .get(authService.protect, controller.getWalletDetails)

walletRoute.route('/initializeTransaction')
    .post( celebrate({
        body: Joi.object({
            amount: Joi.number().required()
          })
    }),
        authService.protect,
        controller.initializeTransaction
    )

    walletRoute.route('/verifyTransaction')
    .post( celebrate({
        body: Joi.object({
            reference: Joi.string().required()
          })
    }),
        authService.protect,
        controller.verifyTransactionAndFund
    )

    walletRoute.route('/fundAccount')
    .post( celebrate({
        body: Joi.object({
            amount: Joi.number().required()
          })
    }),
        authService.protect,
        controller.fundAccount
    )

    walletRoute.route('/transfer')
    .post( celebrate({
        body: Joi.object({
            amount: Joi.number().required(),
            recipient_account: Joi.number().required()
          })
    }),
        authService.protect,
        controller.transferFunds
    )

    walletRoute.route('/withdraw')
    .post( celebrate({
        body: Joi.object({
            amount: Joi.number().required(),
            accountNumber: Joi.number().required(),
            bank: Joi.string().required()
          })
    }),
        authService.protect,
        controller.withdrawFunds
    )