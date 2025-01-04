import { Model, Types } from "mongoose";
import { INPUT_TYPE } from "../../../enums/user";

export type IQuestion = {
    brand: Types.ObjectId;
    campaign: Types.ObjectId;
    question: string;
    type: INPUT_TYPE;
}

export type QuestionModel = Model<IQuestion & Record<string, unknown>>;