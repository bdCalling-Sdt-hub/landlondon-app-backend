import express, { NextFunction, Request, Response } from 'express';
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { RechargeController } from "./recharge.controller";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.BRAND),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { amount } = req.body;
                req.body = { ...req.body, price: Number(amount) };
                next();
            } catch (error) {
                res.status(500).json({ message: "Invalid Amount" });
            }
        }, 
        RechargeController.makeRecharge
    )
    .get(

        auth(USER_ROLES.BRAND),
        RechargeController.getRechargesList
    )

export const RechargeRoutes = router;