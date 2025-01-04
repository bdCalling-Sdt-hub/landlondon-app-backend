import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CampaignService } from "./campaign.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createCampaign= catchAsync(async (req: Request, res: Response) => {
    const newCampaign = await CampaignService.createCampaignToDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Campaign created successfully',
        data: newCampaign
    })
});

const getCampaign= catchAsync(async (req: Request, res: Response) => {
    const newCampaign = await CampaignService.getCampaignsFromDB(req.user);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Campaign retrieved successfully',
        data: newCampaign
    })
});

export const CampaignController = {
    createCampaign,
    getCampaign
}