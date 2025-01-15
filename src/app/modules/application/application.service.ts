import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IApplication } from "./application.interface";
import { Application } from "./application.model";
import { JwtPayload } from "jsonwebtoken";
import { Campaign } from "../campaign/campaign.model";
import mongoose from "mongoose";
import { sendNotifications } from "../../../helpers/notificationsHelper";

const createApplicationToDB = async (payload: IApplication): Promise<IApplication> => {
    const application:any = Application.create(payload);
    if (!application) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Application")
    }

    const data = {
        text: "A Influencer Apply on your campaign.",
        receiver: payload.brand,
        referenceId: application?._id,
        screen: "APPLICATION"
    }
    sendNotifications(data);
    return application;
}

const getApplicationListFromDB = async (user: JwtPayload): Promise<IApplication[]> => {
    const campaign = await Campaign.findOne({ brand: user.id }).lean();
    if (!campaign) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Campaign found By Your ID");
    }
    const applications = await Application.find({ campaign: campaign?._id })
        .lean()
        .populate("influencer", "name profile")

    if (!applications.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Application Found");
    }
    return applications;
}

const responseApplicationToApplication = async (payload: {id: string, status: string}): Promise<IApplication> => {
    const { id, status } = payload;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Application ID");
    }

    if (!status || (status !== "Approved" && status !== "Rejected")) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Status")
    }

    const application = await Application.findByIdAndUpdate(
        { _id: id },
        { status: status },
        { new: true }
    )

    if (!application) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Update application")
    } else {
        if (status === "Approved") {
            const data = {
                text: "Your Application has been approved by the brand. Kindly talk with the brand for the further details.",
                receiver: application.influencer,
                referenceId: id,
                screen: "CAMPAIGN"
            }
            sendNotifications(data);
        }

    }

    return application;
}


const applicationListForInfluencerFromDB = async (user: JwtPayload, status: string): Promise<IApplication[]> => {

    const condition: Record<string, any> = {
        influencer: user.id,
        status : "Approved"
    }

    if ( status && status !== "Completed") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Status")
    }

    if(status){
        condition[status] = status;
    }

    const applications = await Application.find(condition)
        .populate("campaign", "hashtag name image objective")
        .select("campaign");
    if (!applications.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Application Found");
    };

    return applications;
}

export const ApplicationService = {
    createApplicationToDB,
    getApplicationListFromDB,
    responseApplicationToApplication,
    applicationListForInfluencerFromDB
}
