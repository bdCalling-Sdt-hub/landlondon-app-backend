import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IApplication } from "./application.interface";
import { Application } from "./application.model";
import { JwtPayload } from "jsonwebtoken";
import { Campaign } from "../campaign/campaign.model";

const createApplicationToDB = async (payload: IApplication): Promise<IApplication> => {
    const application = Application.create(payload);
    if (!application) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Application")
    }
    return application;
}

const getApplicationListFromDB = async (user: JwtPayload): Promise<IApplication[]> => {
    const campaign = await Campaign.findOne({ brand: user.id }).lean();
    if (!campaign) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Campaign found By Your ID");
    }
    const applications = await Application.find({ campaign: campaign?._id })
        .lean()
        .populate("influencer", "name profile");

    if(!applications.length){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Application Found");
    }
    return applications;
}

export const ApplicationService = {
    createApplicationToDB,
    getApplicationListFromDB
}
