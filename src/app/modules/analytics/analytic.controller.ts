import { Response, Request } from "express"
import catchAsync from "../../../shared/catchAsync";
import { AnalyticService } from "./analytic.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createAnalytic = catchAsync ( async (req: Request, res: Response)=>{
    const result = await AnalyticService.createAnalyticToDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Analytic Uploaded Successfully",
        data: result
    })
})

export const AnalyticController = {
    createAnalytic
}