import { model, Schema } from "mongoose";
import { INote, NoteModel } from "./note.interface";

const noteSchema = new Schema<INote, NoteModel>(
    {
        brand : {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date : {
            type: Date,
            required: true
        },
        notes : {
            type: String,
            required: true
        }
    }
)

export const Note = model<INote, NoteModel>("Note", noteSchema)