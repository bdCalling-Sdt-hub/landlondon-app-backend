import { JwtPayload } from "jsonwebtoken";
import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const getTransactionsFromDB = async (user: JwtPayload): Promise<ITransaction[]> =>{
    const transactions = await Transaction.find({brand: user.id}).populate("influencer" , "email").select("influencer amount");
    if(!transactions.length){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Transactions Found");
    }

    return transactions;
}

const getTransactionsForInfluencerFromDB = async (user: JwtPayload): Promise<ITransaction[]> =>{
    const transactions = await Transaction.find({influencer: user.id}).populate("brand" , "email").select("brand amount");
    if(!transactions.length){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Transactions Found");
    }

    return transactions;
}

export const  TransactionService = {
    getTransactionsFromDB,
    getTransactionsForInfluencerFromDB
}
