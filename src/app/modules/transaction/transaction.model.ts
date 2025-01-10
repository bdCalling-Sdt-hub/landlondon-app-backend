import { model, Schema } from "mongoose";
import { ITransaction, TransactionModel } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction, TransactionModel>(
    {
        brand: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        influencer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }
);


export const Transaction = model<ITransaction, TransactionModel>("Transaction" , transactionSchema);