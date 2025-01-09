import { Model, Types } from "mongoose";

export type INote = {
    brand: Types.ObjectId;
    date: Date;
    notes: string;
}

export type NoteModel = Model<INote, Record<string, unknown>>;