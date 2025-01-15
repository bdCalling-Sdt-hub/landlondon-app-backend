import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { ReportService } from "./report.service"
import sendResponse from "../../../shared/sendResponse"
import { StatusCodes } from "http-status-codes"

const makeReport = catchAsync( async (req: Request, res: Response) =>{
    const payload = {
        brand : req.user.id,
        ...req.body
    }
    const result = await ReportService.makeReportToDB(payload);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Make Reported Successfully",
        data: result
    })
})

const getReportList = catchAsync( async (req: Request, res: Response) =>{

    const result = await ReportService.getReportListFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Make Reported Successfully",
        data: result
    })
})


export const ReportController = {
    makeReport,
    getReportList
}