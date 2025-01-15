import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BusinessService } from "./business.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createBusiness = catchAsync (async (req: Request, res: Response) =>{
    const result = await BusinessService.createBusinessToDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Business added Successfully",
        data: result
    })
})

const getBusiness = catchAsync (async (req: Request, res: Response) =>{
    const result = await BusinessService.getBusinessFrom(req.user);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Business Data retrieved Successfully",
        data: result
    })
});


export const BusinessController = {
    createBusiness,
    getBusiness
}