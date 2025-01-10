import { Model, Types } from "mongoose"

export type IRecharge = {
    brand: Types.ObjectId;
    amount: number;
    sessionId?:string;
    status: "Pending" | "Complete"
}

export type RechargeModel = Model<IRecharge, Record<string, unknown>>