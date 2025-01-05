import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IAnalytic } from "./analytic.interface";
import { Analytic } from "./analytic.model";

const createAnalyticToDB = async  (payload: IAnalytic): Promise<IAnalytic[]> =>{
    const analytics = await Analytic.insertMany(payload);
    if(!analytics){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Analytic");
    }
    return analytics;
}

export const AnalyticService = {
    createAnalyticToDB
}