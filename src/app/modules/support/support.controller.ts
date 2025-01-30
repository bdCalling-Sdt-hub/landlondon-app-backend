import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { SupportService } from "./support.service"
import sendResponse from "../../../shared/sendResponse"
import { StatusCodes } from "http-status-codes"

const makeSupport = catchAsync (async (req: Request, res: Response)=>{
    const payload = {
        brand: req.user.id,
        ...req.body
    }
    const result = await SupportService.makeSupportToDB(payload);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Send Support Message",
        data: result
    })
})


const getSupport = catchAsync (async (req: Request, res: Response)=>{
    const result = await SupportService.getSupportFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Support Data Retrieved",
        data: result
    })
})

export  const SupportController = {
    makeSupport,
    getSupport
}  