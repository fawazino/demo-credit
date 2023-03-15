import { Router } from "express";
import Container from "typedi";
import { AuthService } from "../services/auth.service";
import { TransactionController } from "../controllers/transactions.controller";

export const transactionRoute = Router()

const controller = Container.get(TransactionController)
const authService = Container.get(AuthService)


transactionRoute.route('/')
    .get(authService.protect, controller.getTransactions)

transactionRoute.route('/:id')
    .get(authService.protect, controller.getTransactionDetails)



