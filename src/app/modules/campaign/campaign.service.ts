import { JwtPayload } from "jsonwebtoken";
import { ICampaign } from "./campaign.interface";
import { Campaign } from "./campaign.model";

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

export const CampaignService = {
    createCampaignToDB,
    getCampaignsFromDB
}