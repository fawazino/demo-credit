import { NUMBER } from "sequelize";
import {
    Table,
    Column,
    CreatedAt,
    Unique,
    AutoIncrement,
    PrimaryKey,
    AllowNull, Model, Default, HasOne, HasMany, ForeignKey, BelongsTo
  } from "sequelize-typescript";
  const { DataTypes } = require("sequelize");
  import { WalletInterface } from "../interface/wallet";
import { Transactions } from "./transaction.model";
  import { User } from "./user.model";
  
  
  @Table
  export class Wallet extends Model<WalletInterface>{
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    id!: number;

    @ForeignKey(() => User)
    @Column
    userId: number
  
    @Column(DataTypes.INTEGER)
    account_number!: number;
  
    @Column(DataTypes.INTEGER)
    balance!: number;

    @Column(DataTypes.STRING)
    auth_code!: string;
  
    @BelongsTo(() => User)
    user!: User
    
    @HasMany(() => Transactions)
    transactions!: Transactions[]
  
  }