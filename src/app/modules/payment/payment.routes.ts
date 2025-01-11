import express, { NextFunction, Request, Response } from 'express';
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.get("/create-connected-account", auth(USER_ROLES.INFLUENCER), PaymentController.createAccountToStripe);
router.patch("/transfer-payouts/:id", auth(USER_ROLES.BRAND), PaymentController.transferAndPayout);

export const PaymentRoutes = router;