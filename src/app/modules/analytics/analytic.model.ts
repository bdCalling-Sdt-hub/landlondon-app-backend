import { model, Schema } from "mongoose";
import { AnalyticModel, IAnalytic } from "./analytic.interface";

const AnalyticSchema = new Schema<IAnalytic>(
    {
        image: {
            type :String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Analytic = model<IAnalytic, AnalyticModel>("Analytic", AnalyticSchema)