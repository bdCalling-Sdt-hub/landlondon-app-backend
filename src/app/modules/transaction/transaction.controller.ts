import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TransactionService } from "./transaction.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getTransactions = catchAsync(async (req: Request, res: Response)=>{
    const result = await TransactionService.getTransactionsFromDB(req.user);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Transactions Data retrieved",
        data: result
    })
})

export  const TransactionController = {
    getTransactions
}