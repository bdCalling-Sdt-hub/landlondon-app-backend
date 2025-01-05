import { Model, Types } from "mongoose";

export type IAnalytic = {
    image: string;
    application: Types.ObjectId;
    influencer: Types.ObjectId;
}

export type AnalyticModel = Model<IAnalytic & Record<string, unknown>>