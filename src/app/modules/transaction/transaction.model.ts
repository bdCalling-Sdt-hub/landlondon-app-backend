import { model, Schema } from "mongoose";
import { ITransaction, TransactionModel } from "./transaction.interface";
import { randomBytes } from "crypto";

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
        },
        txid: {
            type: String,
            unique: true,
            index: true
        }
    },
    { timestamps: true }
);


transactionSchema.pre("save", async function (next) {
    const transaction = this;

    if (transaction.isNew && !transaction.txid) {
        const prefix = "tx_";
        const uniqueId = randomBytes(8).toString("hex");
        transaction.txid = `${prefix}${uniqueId}`;
    }

    next();
});


export const Transaction = model<ITransaction, TransactionModel>("Transaction" , transactionSchema);