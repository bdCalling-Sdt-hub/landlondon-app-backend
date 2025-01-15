import { Model, Types } from "mongoose"

export type ITransaction = {
    brand: Types.ObjectId;
    influencer : Types.ObjectId;
    amount: number;
    txid: string;
}

export type TransactionModel = Model<ITransaction, Record<string, unknown>>