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

const getCampaignList = catchAsync(async (req: Request, res: Response) => {
    const result = await CampaignService.getCampaignsListFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Campaign List retrieved successfully',
        pagination: result.pagination,
        data: result.campaigns
    })
});

const campaignDetails = catchAsync(async (req: Request, res: Response) => {
    const result = await CampaignService.campaignDetailsFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: `Campaign Details Retrieved Successfully`,
        data: result
    })
})

const updateCampaign = catchAsync(async (req: Request, res: Response) => {
    const result = await CampaignService.updateCampaignInDB(req.user, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: `Campaign Updated Successfully`,
        data: result
    })
})

export const CampaignController = {
    createCampaign,
    getCampaign,
    campaignDetails,
    getCampaignList,
    updateCampaign
}