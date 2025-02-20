import { Model, Types } from "mongoose";

export type IQuestions = {
    question: string;
    answer: string;
}

export type IApplication = {
    influencer: Types.ObjectId;
    campaign: Types.ObjectId;
    brand: Types.ObjectId;
    questions: IQuestions[];
    budget: number;
    socialsAnalytics: string[];
    status: "Pending" | "Approved" | "Rejected" | "Completed";
}

export type ApplicationModel = Model<IApplication & Record<string, unknown>>;