import { IReview } from "./review.interface";
import { Review } from "./review.model";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";

const createReviewToDB = async(payload:IReview): Promise<IReview>=>{
    const result = await Review.create(payload);
    if(!result){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed To create Review")
    }
    return payload;
};

const getReviewFromDB = async(): Promise<IReview[]>=>{
    const result = await Review.find();
    if(!result.length){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Review Found")
    }
    return result;
};


export const ReviewService ={ createReviewToDB, getReviewFromDB}