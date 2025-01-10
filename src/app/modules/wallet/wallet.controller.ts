import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { WalletService } from "./waller.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getWallet = catchAsync ( async (req: Request, res: Response) =>{
    const result = await WalletService.getWalletFromDB(req.user);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Wallet Data retrieved",
        data: result
    })
});

export const WalletController = { getWallet };