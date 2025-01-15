import { model, Schema } from "mongoose";
import { IBusiness, BusinessModel } from "./business.interface";

const businessSchema = new Schema<IBusiness, BusinessModel>(
    {
        brand: { 
            type: Schema.Types.ObjectId, 
            ref: "Brand", 
            required: true 
        },
        name: { type: String, required: true },
        website: { type: String, required: true },
        image: { type: String, required: true },
        facebook: { type: String, required: true },
        linkedin: { type: String, required: true },
        twitter: { type: String, required: true },
        instagram: { type: String, required: true }
    },
    { timestamps: true }
)

export const Business = model<IBusiness, BusinessModel>("Business", businessSchema)