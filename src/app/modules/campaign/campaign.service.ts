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

const getCampaignsListFromDB = async (query: Record<string, any>): Promise<{campaigns: ICampaign[], meta: {page: number, total: number}}> => {
    const { page, limit } = query;

    const pages = parseInt(page as string) || 1;
    const size = parseInt(limit as string) || 10;
    const skip = (pages - 1) * size;

    const campaigns = await Campaign.find({status: "Ongoing"})
        .skip(skip)
        .limit(size)
        .select('name objective image createdAt');
    
    if (!campaigns.length) {
        throw new Error('Campaigns could not be found');
    }

    const count = await Campaign.countDocuments({status: "Ongoing"});

    const data = {
        campaigns,
        meta: {
            page: pages,
            total: count
        }
    } as  { campaigns: ICampaign[], meta: {page: number, total: number} }

    return data;
}


const campaignDetailsFromDB = async (id: string): Promise<ICampaign>=>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Application ID");
    }

    const application = await Campaign.findById(id).select("-createdAt -updatedAt -__v").lean();
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