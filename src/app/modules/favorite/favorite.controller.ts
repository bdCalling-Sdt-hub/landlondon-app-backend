import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FavoriteService } from "./favorite.service";

const toggleFavorite = catchAsync(async(req: Request, res: Response)=>{
    const brand = req.user.id;
    const influencer = req.body.influencer;
    const payload:any = { brand, influencer }
    const result = await FavoriteService.toggleFavorite(payload);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result
    })
});

const getFavorite = catchAsync(async(req: Request, res: Response)=>{
    const user = req.user;
    const result = await FavoriteService.getFavorite(user);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Favorite Retrieved Successfully",
        data: result
    })
});


export const FavoriteController = {toggleFavorite, getFavorite}