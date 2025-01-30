import { Schema, model, Model, Types } from "mongoose";
import { ISupport, SupportModel } from "./support.interface";


const supportSchema = new Schema<ISupport>(
    {
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const Support = model<ISupport, SupportModel>('Support', supportSchema);