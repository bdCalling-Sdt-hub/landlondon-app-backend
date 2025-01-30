import { Request, Response } from 'express';
import Stripe from 'stripe';
import colors from 'colors';
import { StatusCodes } from 'http-status-codes';
import stripe from '../../config/stripe';
import config from '../../config';
import ApiError from '../../errors/ApiErrors';
import { handleAccountConnectEvent, handleCheckoutSession } from '../../handlers';
import { logger } from '../../shared/logger';

const handleStripeWebhook = async (req: Request, res: Response) => {

    let event: Stripe.Event | undefined;

    // Verify the event signature
    try {
        
        // Use raw request body for verification
        event = stripe.webhooks.constructEvent(
            req.body, 
            req.headers['stripe-signature'] as string, 
            config.stripe.webhookSecret as string
        );
    } catch (error) {
        
        // Return an error if verification fails
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            `Webhook signature verification failed. ${error}`,
        );
    }

    // Check if the event is valid
    if (!event) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid event received!');
    }

    // Extract event data and type
    const data = event.data.object as Stripe.Subscription | Stripe.Account;
    const eventType = event.type;

    // Handle the event based on its type
    try {
        switch (eventType) {
            case 'account.updated':
            case 'account.external_account.created':
            case 'account.external_account.deleted':
                await handleAccountConnectEvent(data as Stripe.Account);
                break;

            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session;

                if (session.payment_status === "paid") {
                    await handleCheckoutSession(event.data.object as Stripe.Checkout.Session);
                }
                break;

            default:
                logger.warn(colors.bgGreen.bold(`Unhandled event type: ${eventType}`));
        }
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error handling event: ${error}`,);
    }

    res.sendStatus(200); // Send success response
};

export default handleStripeWebhook;