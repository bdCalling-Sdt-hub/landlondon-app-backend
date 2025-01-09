import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IBookmark } from "./bookmark.interface";
import { Bookmark } from "./bookmark.model";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

const toggleBookmark = async (payload: IBookmark): Promise<string> => {

    if(!mongoose.Types.ObjectId.isValid(payload.influencer)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Influencer ID");
    }

    // Check if the bookmark already exists
    const existingBookmark = await Bookmark.findOne({
        brand: payload.brand,
        influencer: payload.influencer
    });

    if (existingBookmark) {
        // If the bookmark exists, delete it
        await Bookmark.findByIdAndDelete(existingBookmark._id);
        return "Bookmark Remove successfully";
    } else {

        // If the bookmark doesn't exist, create it
        const result = await Bookmark.create(payload);
        if (!result) {
            throw new ApiError(StatusCodes.EXPECTATION_FAILED, "Failed to add bookmark");
        }
        return "Bookmark Added successfully";
    }
};


const getBookmark = async (user: JwtPayload): Promise<IBookmark[]> => {

    const result: IBookmark[] = await Bookmark.find({ brand: user?.id })
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

export const BookmarkService = { toggleBookmark, getBookmark }