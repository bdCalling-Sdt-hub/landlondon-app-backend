import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { RechargeController } from "./recharge.controller";
const router = express.Router();

router.get("",
    auth(USER_ROLES.BRAND),
    RechargeController.getRechargesList
)

export const RechargeRoutes = router;