import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { TransactionController } from "./transaction.controller";
const router = express.Router();

router.get("/",
    auth(USER_ROLES.INFLUENCER),
    TransactionController.getTransactions
)

export  const TransactionRoutes = router;