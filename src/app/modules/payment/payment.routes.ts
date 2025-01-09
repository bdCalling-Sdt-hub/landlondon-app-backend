import express, { NextFunction, Request, Response } from 'express';
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post("/create-payment-checkout", 
    auth(USER_ROLES.BRAND),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { price } = req.body;
            req.body = { ...req.body, price: Number(price) };
            next();
        } catch (error) {
            res.status(500).json({ message: "Invalid Price" });
        }
    }, 
    PaymentController.createPaymentCheckoutToStripe
);
router.get("/create-connected-account", auth(USER_ROLES.INFLUENCER), PaymentController.createAccountToStripe);
router.patch("/transfer-payouts/:id", auth(USER_ROLES.BRAND), PaymentController.transferAndPayout);

export const PaymentRoutes = router;