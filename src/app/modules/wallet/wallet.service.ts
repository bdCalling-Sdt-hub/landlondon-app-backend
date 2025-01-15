import { JwtPayload } from "jsonwebtoken";
import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { Recharge } from "../recharge/recharge.model";
import { Transaction } from "../transaction/transaction.model";

const getWalletFromDB = async (user: JwtPayload, query: Record<string, any>): Promise<IWallet> => {

    const { page, limit } = query;

    const pages = parseInt(page) || 1;
    const skip = (pages - 1) * limit

    const [wallet, totalRecharge, totalTransaction, transactions, recharges] = await Promise.all([
        Wallet.findOne({ brand: user.id }).select("-_id balance").lean(),
        Recharge.aggregate([
            { $match: { brand: user.id } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        Transaction.aggregate([
            { $match: { brand: user.id } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        Transaction.find({ brand: user.id })
            .select("amount createdAt influencer txid")
            .populate("influencer", "name email profile")
            .skip(skip)
            .limit(limit)
            .lean(),
        Recharge.find({ brand: user.id, status : "Complete" })
            .select("amount createdAt")
            .skip(skip)
            .limit(limit)
            .lean(),
    ]);

    if (!wallet) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Wallet Found");
    }

    const data = {
        ...wallet,
        totalRecharge: totalRecharge[0]?.total || 0,
        totalTransaction: totalTransaction[0]?.total || 0,
        transactions,
        recharges
    };

    return data;
};


export const WalletService = { getWalletFromDB }