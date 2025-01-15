import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IFavorite } from "./favorite.interface";
import { Favorite } from "./favorite.model";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

const toggleFavorite = async (payload: IFavorite): Promise<string> => {

    if(!mongoose.Types.ObjectId.isValid(payload.influencer)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Influencer ID");
    }

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({
        brand: payload.brand,
        influencer: payload.influencer
    });

    if (existingFavorite) {
        // If the favorite exists, delete it
        await Favorite.findByIdAndDelete(existingFavorite._id);
        return "Favorite Remove successfully";
    } else {

        // If the favorite doesn't exist, create it
        const result = await Favorite.create(payload);
        if (!result) {
            throw new ApiError(StatusCodes.EXPECTATION_FAILED, "Failed to add favorite");
        }
        return "Favorite Added successfully";
    }
};


const getFavorite = async (user: JwtPayload): Promise<IFavorite[]> => {

    const result: IFavorite[] = await Favorite.find({ brand: user?.id })
        .populate({
            path: 'influencer',
            model: 'User',
            select: ' name email profile'
        }).select("influencer");


    if (!result.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No data found");
    }

    return result;
}

export const FavoriteService = { toggleFavorite, getFavorite }