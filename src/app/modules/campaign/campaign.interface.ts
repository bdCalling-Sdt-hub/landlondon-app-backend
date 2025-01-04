import { Model, Types } from "mongoose";
import { GENDER } from "../../../enums/user";

export type ICampaign = {
    brand: Types.ObjectId;
    name: string;
    image: string;
    objective: string;
    message: string;
    description: string;
    startDate: string;
    endDate: string;
    platforms: string;
    budget: number;
    hashtag: string[];
    submission_date: string;
    do: string[];
    do_not: string[];
    target_age: number;
    target_gender: GENDER;
    target_location: string;
};

export type CampaignModel = Model<ICampaign & Record<string, unknown>>;