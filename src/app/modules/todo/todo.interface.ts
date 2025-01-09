import { Model, Types } from "mongoose";

export type ITodo = {
    brand: Types.ObjectId;
    subject: string;
    details: string;
    important: boolean;
}

export type TodoModel = Model<ITodo, Record<string, unknown>>;