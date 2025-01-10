import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { WalletController } from "./wallet.controller";
const router = express.Router();

router.get("/",
    auth(USER_ROLES.BRAND),
    WalletController.getWallet
)

export const WalletRoutes = router;