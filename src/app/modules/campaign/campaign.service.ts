import { JwtPayload } from "jsonwebtoken";
import { ICampaign } from "./campaign.interface";
import { Campaign } from "./campaign.model";
import mongoose from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { Business } from "../business/business.model";
import QueryBuilder from "../../../shared/apiFeature";
import unlinkFile from "../../../shared/unlinkFile";

const createCampaignToDB = async (campaign: ICampaign): Promise<ICampaign> => {

    const isExistBusiness = await Business.findOne({ brand: campaign.brand });
    if (!isExistBusiness) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "You have to add business information first")
    }

    const isExistCampaign = await Campaign.findOne({ brand: campaign.brand });
    if (isExistCampaign) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "You Already have a campaign");
    }

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

const getCampaignsListFromDB = async (query: Record<string, any>):
    Promise<{ campaigns: ICampaign[], pagination: { page: number, totalPage: number, limit: number, total: number } }> => {
        
    const selectedFields = 'name image objective';

    const apiFeatures = new QueryBuilder(Campaign.find(), query).paginate();
    const campaigns = await apiFeatures.queryModel.select(selectedFields);

    const pagination = await apiFeatures.getPaginationInfo();

    return {
        pagination: pagination,
        campaigns
    };
}


const campaignDetailsFromDB = async (id: string): Promise<ICampaign> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Application ID");
    }

    const application = await Campaign.findById(id).select("-createdAt -updatedAt -__v").lean();
    if (!application) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No data found");
    }

    return application;
}


const updateCampaignInDB = async (user: JwtPayload, payload: ICampaign): Promise<ICampaign> => {

    const isExistCampaign = await Campaign.findOne({ brand: user.id });
    if (!isExistCampaign) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Campaign found By Your ID");
    }

    if(payload.image && isExistCampaign.image){
        unlinkFile(isExistCampaign.image)
    }

    const newCampaign = await Campaign.findOneAndUpdate({ brand: user.id }, payload, { new: true });
    if (!newCampaign) {
        throw new Error('Campaign could not be created');
    }
    return newCampaign;
}

export const CampaignService = {
    createCampaignToDB,
    getCampaignsFromDB,
    campaignDetailsFromDB,
    getCampaignsListFromDB,
    updateCampaignInDB
}