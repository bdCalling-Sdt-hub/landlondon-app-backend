import { Model, Types } from "mongoose"

export type IWallet = {
    brand: Types.ObjectId;
    balance: number;
    sessionId?:string;
}

export  type WalletModel = Model<IWallet, Record<string, unknown>> 