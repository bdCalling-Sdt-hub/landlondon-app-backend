import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ContactService } from "./contact.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createContact = catchAsync (async (req: Request, res: Response) =>{
    const result = await ContactService.createContactToDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Contact send Successfully",
        data: result
    })
})

const getContacts = catchAsync (async (req: Request, res: Response) =>{
    const result = await ContactService.getContactsFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Contacts Retrieved Successfully",
        data: result
    })
});


export const ContactController = {
    createContact,
    getContacts
}