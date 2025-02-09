import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IApplication } from "./application.interface";
import { Application } from "./application.model";
import { JwtPayload } from "jsonwebtoken";
import { Campaign } from "../campaign/campaign.model";
import mongoose from "mongoose";
import { sendNotifications } from "../../../helpers/notificationsHelper";
import QueryBuilder from "../../../shared/apiFeature";

const createApplicationToDB = async (payload: IApplication): Promise<IApplication> => {

    const isApplied =  await Application.findOne({campaign: payload.campaign, influencer: payload.influencer});
    if(isApplied){
        throw new ApiError(StatusCodes.BAD_REQUEST, "You already Applied in this campaign");
    }

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
        .populate("influencer", "name profile youtube tiktok facebook instagram about location contact")
        .populate("campaign", "budget");

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
        .select("campaign createdAt");
    if (!applications.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Application Found");
    };

    return applications;
}

const applicationDetailsFromDB = async (id: string): Promise<IApplication | null> => {

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Application ID");
    }

    const applications = await Application.findById(id).populate("campaign influencer")

    if (!applications) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Application Found");
    };

    return applications;
}


const approvedApplicationListFromDB = async (query: Record<string, any>):

    Promise<{ applications: IApplication[], pagination: { page: number, totalPage: number, limit: number, total: number } }> => {

    const apiFeatures = new QueryBuilder(Application.find({status: "Approved"}), query).paginate();
    const applications = await apiFeatures.queryModel.populate("influencer socialsAnalytics")

    const pagination = await apiFeatures.getPaginationInfo();

    return {
        pagination: pagination,
        applications
    };
}

const reSubmitApplicationFromDB = async (id: string): Promise<IApplication | null> => {

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Application ID");
    }

    const applications = await Application.findByIdAndDelete(id);

    if (!applications) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Application Found");
    };

    const notificationData = {
        text: "Your Application has been Re-Submitted by the brand",
        receiver: applications.influencer,
        referenceId: applications?.campaign,
        screen: "CAMPAIGN"
    }
    sendNotifications(notificationData);

    return applications;
}

export const ApplicationService = {
    createApplicationToDB,
    getApplicationListFromDB,
    responseApplicationToApplication,
    applicationListForInfluencerFromDB,
    applicationDetailsFromDB,
    approvedApplicationListFromDB,
    reSubmitApplicationFromDB
}
