import { model, Schema } from "mongoose";
import { IRecharge, RechargeModel } from "./recharge.interface";

const rechargeSchema = new Schema<IRecharge, RechargeModel>(
    {
        brand: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        sessionId: {
            type: String,
            required: false
        },
        status: {
            type : String,
            enum: ["Pending", "Complete"],
            default: "Pending"
        }
    },
    { timestamps: true }
)

export const Recharge = model<IRecharge, RechargeModel>("Recharge", rechargeSchema)