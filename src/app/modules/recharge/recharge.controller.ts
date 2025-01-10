import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { RechargeService } from "./recharge.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getRechargesList = catchAsync(async (req: Request, res: Response) => {
    const result = await RechargeService.getRechargesFromDB(req.user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: " Recharge Data retrieved",
        data: result
    })
});

export const RechargeController = {  getRechargesList }