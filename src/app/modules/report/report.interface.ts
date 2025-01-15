import { Model, Types } from "mongoose"

export type IReport = {
    brand: Types.ObjectId;
    influencer: Types.ObjectId;
    reason: string;
}

export type ReportModel = Model<IReport, Record<string, any>>;