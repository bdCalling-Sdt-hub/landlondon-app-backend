import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IBusiness } from "./business.interface";
import { Business } from "./business.model";
import { JwtPayload } from "jsonwebtoken";
import unlinkFile from "../../../shared/unlinkFile";

const createBusinessToDB = async (payload: IBusiness): Promise<IBusiness> => {

    const isExistBusiness = await Business.findOne({brand: payload.brand});

    if(isExistBusiness){
        if(payload.image){
            unlinkFile(isExistBusiness?.image)
        }
    
        const business = await Business.findOneAndUpdate(
            {brand: payload.brand},
            {$set : payload},
            {new : true}
        );
        
        if (!business) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update Business");
        }

        return business;
    }else{
        const business = await Business.create(payload);
        
        if (!business) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Business");
        }   
        return business;
    }
}

const getBusinessFrom = async (user: JwtPayload): Promise<IBusiness> => {

    const business = await Business.findOne({brand : user.id}).lean();
    if(!business){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No found Data")
    }

    return business;
}

export const BusinessService = {
    createBusinessToDB,
    getBusinessFrom
}
