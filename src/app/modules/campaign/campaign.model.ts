import { Schema, model } from "mongoose";
import { CampaignModel, ICampaign } from "./campaign.interface";
import { GENDER } from "../../../enums/user";

const campaignSchema = new Schema<ICampaign, CampaignModel>(
    {
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: { type: String, required: true },
        image: { type: String, required: true },
        objective: { type: String, required: true },
        message: { type: String, required: true },
        description: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        platforms: { type: String, required: true },
        budget: { type: Number, required: true },
        hashtag: { type: [String], required: true },
        submission_date: { type: String, required: true },
        do: { type: [String], required: true },
        do_not: { type: [String], required: true },
        target_age: { type: Number, required: true },
        sessionId: { type: String, required: false },
        target_gender: {
            type: String,
            enum: Object.values(GENDER),
            required: true
        },
        target_location: { type: String, required: true },
        status: {
            type: String,
            enum: ["Ongoing", "Completed"],
            default: "Ongoing"
        },
        paymentStatus: {
            type: String,
            enum: ["Unpaid" , "Paid"],
            default: "Unpaid"
        },
    },
    { timestamps: true }
);

export const Campaign = model<ICampaign, CampaignModel>('Campaign', campaignSchema);