import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { SupportValidation } from "./support.validation";
import { SupportController } from "./support.controller";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.BRAND),
        validateRequest(SupportValidation.supportValidationSchema),
        SupportController.makeSupport
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        SupportController.getSupport
    )

export const SupportRoutes =router;