import { Model, Types } from "mongoose";
import { INPUT_TYPE } from "../../../enums/user";

export type IQuestion = {
    _id?: string;
    brand: Types.ObjectId;
    campaign: Types.ObjectId;
    question: string;
    type: INPUT_TYPE;
    options?: string[];
}

export type QuestionModel = Model<IQuestion & Record<string, unknown>>;