import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { ApplicationValidation } from "./application.validation";
import { ApplicationController } from "./application.controller";

const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.INFLUENCER),
        validateRequest(ApplicationValidation.createApplicationZodValidationSchema),
        ApplicationController.createApplication
    )
    .get(
        auth(USER_ROLES.BRAND),
        ApplicationController.getApplicationList
    )

export const ApplicationRoutes = router;