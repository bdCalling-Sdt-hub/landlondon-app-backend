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

const responseApplication = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationService.responseApplicationToApplication(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: `Application ${req.body.status}  Successfully`,
        data: result
    })
})

const applicationListForInfluencer = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationService.applicationListForInfluencerFromDB(req.user, req.query.status as string);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Application ${req.query.status}  Successfully`,
        data: result
    })
})

const applicationDetails = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationService.applicationDetailsFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Application Details Successfully`,
        data: result
    })
})

const approvedApplicationList = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationService.approvedApplicationListFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Application Details Successfully`,
        data: result
    })
})

const resubmitApplication = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationService.reSubmitApplicationFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Application Re-Submitted Successfully`,
        data: result
    })
})

export const ApplicationController = {
    createApplication,
    getApplicationList,
    responseApplication,
    applicationListForInfluencer,
    applicationDetails,
    approvedApplicationList,
    resubmitApplication
}