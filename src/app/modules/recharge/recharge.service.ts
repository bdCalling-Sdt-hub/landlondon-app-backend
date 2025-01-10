import { JwtPayload } from "jsonwebtoken";
import { IRecharge } from "./recharge.interface";
import { Recharge } from "./recharge.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const getRechargesFromDB = async  (user: JwtPayload): Promise<IRecharge[]> => {
    const recharges = await Recharge.find({brand: user.id}).lean();

    if(!recharges.length){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Recharges History Found");
    }

    return recharges;
}

export const RechargeService = { getRechargesFromDB };