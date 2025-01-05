import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ApplicationService } from "./application.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createApplication = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationService.createApplicationToDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Application created Successfully",
        data: result
    })
})

const getApplicationList = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationService.getApplicationListFromDB(req.user);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Application Retrieved Successfully",
        data: result
    })
})

export const ApplicationController = {
    createApplication,
    getApplicationList
}