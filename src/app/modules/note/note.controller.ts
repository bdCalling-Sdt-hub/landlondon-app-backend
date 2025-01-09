import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { NoteService } from "./note.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createNote = catchAsync (async (req: Request, res: Response) =>{
    const payload = {
        brand: req.user.id,
        date: new Date(req.body.date),
        notes: req.body.notes
    }
    const result = await NoteService.createNoteToDB(payload);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Note send Successfully",
        data: result
    })
})

const getNotes = catchAsync (async (req: Request, res: Response) =>{
    const result = await NoteService.getNotesFromDB(req.user);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Notes Retrieved Successfully",
        data: result
    })
});


export const NoteController = {
    createNote,
    getNotes
}