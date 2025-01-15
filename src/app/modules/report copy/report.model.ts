import { model, Schema } from "mongoose";
import { IReport, ReportModel } from "./report.interface";

const reportSchema = new Schema<IReport, ReportModel>(
    {
        brand: {
            type : Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        influencer: {
            type : Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reason: {
            type : String,
            required: true
        },
    },
    { timestamps: true }
)

export const Report = model<IReport, ReportModel>("Report", reportSchema)