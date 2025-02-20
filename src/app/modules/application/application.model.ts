import { Schema, model } from "mongoose";
import { ApplicationModel, IApplication, IQuestions } from "./application.interface";

const QuestionsSchema = new Schema<IQuestions>({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const ApplicationSchema = new Schema<IApplication>(
    {
        influencer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        campaign: {
            type: Schema.Types.ObjectId,
            ref: 'Campaign',
            required: true
        },
        questions: {
            type: [QuestionsSchema],
            required: true
        },
        socialsAnalytics: {
            type: [String],
            required: false
        },
        budget: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Completed"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

export const Application = model<IApplication, ApplicationModel>('Application', ApplicationSchema);