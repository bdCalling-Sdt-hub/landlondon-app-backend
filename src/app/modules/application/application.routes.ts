import express, { Request, Response, NextFunction } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { ApplicationValidation } from "./application.validation";
import { ApplicationController } from "./application.controller";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath } from "../../../shared/getFilePath";

const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.INFLUENCER),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const socialsAnalytics = getMultipleFilesPath(req.files, "image");

                console.log(socialsAnalytics)

                req.body = {
                    influencer: req.user.id,
                    ...req.body,
                    socialsAnalytics
                }
                next()
            } catch (error) {
                res.status(500).json({ message: "Need Array to insert Multiple question together" });
            }
        },
        validateRequest(ApplicationValidation.createApplicationZodValidationSchema),
        ApplicationController.createApplication
    )
    .get(
        auth(USER_ROLES.BRAND),
        ApplicationController.getApplicationList
    )
    .patch(
        auth(USER_ROLES.BRAND),
        validateRequest(ApplicationValidation.updateApplicationStatusValidationSchema),
        ApplicationController.responseApplication
    )

router.get("/influencer",
    auth(USER_ROLES.INFLUENCER),
    ApplicationController.applicationListForInfluencer
)

export const ApplicationRoutes = router;