import { model, Schema } from "mongoose";
import { IWallet, WalletModel } from "./wallet.interface";

const walletSchema = new Schema<IWallet, WalletModel>(
    {
        brand: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        balance: {
            type: Number,
            default: 0
        },
        sessionId: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const Wallet = model<IWallet, WalletModel>("Wallet", walletSchema)