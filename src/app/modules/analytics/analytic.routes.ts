import express from "express"
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { AnalyticValidation } from "./analytic.validation";
import { AnalyticController } from "./analytic.controller";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.INFLUENCER),
        validateRequest(AnalyticValidation.createAnalyticZodSchema),
        AnalyticController.createAnalytic
    )


export const AnalyticRoutes = router;