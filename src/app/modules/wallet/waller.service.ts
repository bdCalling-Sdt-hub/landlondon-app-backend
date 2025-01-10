import { JwtPayload } from "jsonwebtoken";
import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const getWalletFromDB = async(user: JwtPayload): Promise<IWallet> =>{
    const wallet = await Wallet.findOne({brand: user.id}).lean();
    if(!wallet){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Wallet Found");
    }
    return wallet;
}

export const WalletService = { getWalletFromDB }