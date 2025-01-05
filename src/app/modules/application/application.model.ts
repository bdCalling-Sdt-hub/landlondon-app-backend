import { Schema, model } from "mongoose";
import { ApplicationModel, IApplication, IQuestions } from "./application.interface";

const QuestionsSchema = new Schema<IQuestions>({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const ApplicationSchema = new Schema<IApplication>({
    influencer: {
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
});

export const Application = model<IApplication, ApplicationModel>('Application', ApplicationSchema);