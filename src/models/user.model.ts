import { NUMBER } from "sequelize";
import {
    Table,
    Column,
    CreatedAt,
    Unique,
    AutoIncrement,
    PrimaryKey,
    AllowNull, Model, Default, HasOne, HasMany
  } from "sequelize-typescript";
  const { DataTypes } = require("sequelize");
  import { UserInterface } from "../interface/user";
import { Wallet } from "./wallet.model";
  
  
  @Table
  export class User extends Model<UserInterface>{
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    id!: number;
  
    @Column(DataTypes.STRING)
    first_name!: string;
  
    @Column(DataTypes.STRING)
    last_name!: string;
  
  
    @CreatedAt
    @Column(DataTypes.DATE)
    created_at!: Date
  
    @Unique
    @Column(DataTypes.STRING)
    email!: string;
  
    @Unique
    @Column(DataTypes.STRING)
    phone_number!: string;
  
    @Column(DataTypes.STRING)
    password!: string
  
    @Column(DataTypes.STRING)
    username!: string

    @HasOne(() => Wallet)
    wallet: Wallet

    
  
  }