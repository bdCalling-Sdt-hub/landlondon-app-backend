import { JwtPayload } from "jsonwebtoken";
import { ICampaign } from "./campaign.interface";
import { Campaign } from "./campaign.model";
import mongoose from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const createCampaignToDB = async (campaign: ICampaign): Promise<ICampaign> => {
    const newCampaign = await Campaign.create(campaign);
    if (!newCampaign) {
        throw new Error('Campaign could not be created');
    }
    return campaign;
}

const getCampaignsFromDB = async (user: JwtPayload): Promise<ICampaign> => {
    const campaign = await Campaign.findOne({ brand: user.id });
    if (!campaign) {
        throw new Error('Campaigns could not be found');
    }
    return campaign;
}

const getCampaignsListFromDB = async (): Promise<ICampaign[]> => {
    const campaign = await Campaign.find();
    if (!campaign) {
        throw new Error('Campaigns could not be found');
    }
    return campaign;
}


const campaignDetailsFromDB = async (id: string): Promise<ICampaign>=>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Application ID");
    }

    const application = await Campaign.findById(id).lean();
    if(!application){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No data found");
    }

    return application;
}

export const CampaignService = {
    createCampaignToDB,
    getCampaignsFromDB,
    campaignDetailsFromDB,
    getCampaignsListFromDB
}