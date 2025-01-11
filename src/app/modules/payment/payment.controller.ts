import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createAccountToStripe = catchAsync(async(req: Request, res: Response)=>{
    const result = await PaymentService.createAccountToStripe(req.user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Connected account created successfully",
        data: result
    })
});

const transferAndPayout = catchAsync(async(req: Request, res: Response)=>{

    const result = await PaymentService.transferAndPayoutToInfluencer(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Money Release Has Completed",
        data: result
    })
});


export const PaymentController = {
    createAccountToStripe,
    transferAndPayout
}