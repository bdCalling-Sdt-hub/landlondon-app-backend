import { Model, Types } from "mongoose";

export type ISupport = {
    _id?: string;
    brand: Types.ObjectId;
    message: string;
}

export type SupportModel = Model<ISupport, Record<string, any>>;