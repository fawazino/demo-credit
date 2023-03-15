import {
    Table,
    Column,
    CreatedAt,
    AutoIncrement,
    PrimaryKey,
    AllowNull, Model, BelongsTo, ForeignKey, DataType
} from "sequelize-typescript";
const { DataTypes} = require("sequelize");
import { EtransactionPlatform, ETransactionStatus, ETransactionType, ITransactions } from "../interface/transaction";
import { User } from "./user.model";
import { Wallet } from "./wallet.model";





@Table
export class Transactions extends Model<ITransactions>{
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id!: number;

    @Column
    transaction_type!: ETransactionType;

    @Column
    platform: EtransactionPlatform;


    @Column
    transaction_status: ETransactionStatus

    @CreatedAt
    @Column
    created_at!: Date

    @Column
    amount: number;

    @Column
    ref: string;


    @Column
    description: string;

    @ForeignKey(() => Wallet)
    @Column
    wallet_id: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => Wallet)
    wallet: Wallet

    @BelongsTo(() => User)
    user: User[]
}