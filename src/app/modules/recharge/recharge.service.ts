import { JwtPayload } from "jsonwebtoken";
import { IRecharge } from "./recharge.interface";
import { Recharge } from "./recharge.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { Wallet } from "../wallet/wallet.model";
import stripe from "../../../config/stripe";

const makeRechargeToDB = async (user: JwtPayload, payload: any): Promise<string | null> => {
    const { price } = payload;

    if (typeof price !== "number" || price <= 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid price amount");
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Top-Up for the Campaign`,
                    },
                    unit_amount: Math.trunc(price * 100),
                },
                quantity: 1,
            },
        ],
        customer_email: user?.email,
        success_url: "http://192.168.10.102:6001/api/v1/success",
        cancel_url: "http://192.168.10.102:6001/api/v1/errors"
    });

    if (!session) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Payment Checkout");
    } else {
        await Recharge.create({
            brand: user.id,
            amount: Number(price),
            sessionId: session.id
        });

        await Wallet.findOneAndUpdate(
            { brand: user.id },
            { sessionId: session.id },
            { new: true }
        );
    }

    return session?.url;
};

const getRechargesFromDB = async (user: JwtPayload): Promise<IRecharge[]> => {
    const recharges = await Recharge.find({ brand: user.id }).lean();

    if (!recharges.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Recharges History Found");
    }

    return recharges;
}

export const RechargeService = { 
    getRechargesFromDB,
    makeRechargeToDB 
};