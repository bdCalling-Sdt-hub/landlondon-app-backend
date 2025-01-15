import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { ReportValidation } from "./report.validation";
import { ReportController } from "./report.controller";

const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.BRAND),
        validateRequest(ReportValidation.createReportValidationSchema),
        ReportController.makeReport
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        ReportController.getReportList
    )

export const ReportRoutes = router;