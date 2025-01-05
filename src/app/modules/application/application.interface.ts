import { Model, Types } from "mongoose";

export type IQuestions = {
    question: string;
    answer: string;
}

export type IApplication = {
    influencer: Types.ObjectId;
    campaign: Types.ObjectId;
    questions: IQuestions[];
    socialsAnalytics: string[];
}

export type ApplicationModel = Model<IApplication & Record<string, unknown>>;