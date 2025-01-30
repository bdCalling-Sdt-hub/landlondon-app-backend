import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { INote } from "./note.interface";
import { Note } from "./note.model";
import { JwtPayload } from "jsonwebtoken";

const createNoteToDB = async (payload: INote): Promise<INote> => {
    const note = await Note.create(payload);

    if (!note) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Note");
    }

    return note;
}

const getNotesFromDB = async (user: JwtPayload): Promise<INote[]> => {


    const notes = await Note.find({brand: user.id}).select("date notes")

    return notes
}

export const NoteService = {
    createNoteToDB,
    getNotesFromDB
}
