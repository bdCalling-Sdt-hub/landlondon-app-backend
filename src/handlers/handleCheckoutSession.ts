import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import ApiError from '../errors/ApiErrors';
import stripe from '../config/stripe';
import { Wallet } from '../app/modules/wallet/wallet.model';
import { Recharge } from '../app/modules/recharge/recharge.model';

export const handleCheckoutSession = async (data: Stripe.Checkout.Session) => {

    console.log(data)

    // Retrieve the subscription from Stripe
    const session = await stripe.checkout.sessions.retrieve(data?.id);

    if (session.payment_status === "paid") {

        // top-up on the wallet;
        await Wallet.findOneAndUpdate(
            { sessionId: session.id },
            { balance: {$ne: 50 } },
            { new: true }
        );

        // top-up on the wallet;
        await Recharge.findOneAndUpdate(
            { sessionId: session.id },
            { status: "Complete" },
            { new: true }
        );
    } else {
        throw new ApiError(StatusCodes.NOT_FOUND, `Payment Checkout Session not found.`);
    }
}