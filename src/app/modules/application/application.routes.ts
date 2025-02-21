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

                const { budget, ...othersPayload } = req.body;

                req.body = {
                    influencer: req.user.id,
                    budget: Number(budget),
                    ...othersPayload,
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

router.get("/approved",
    auth(USER_ROLES.BRAND),
    ApplicationController.approvedApplicationList
)

router.route("/:id")
    .get(
        auth(USER_ROLES.INFLUENCER, USER_ROLES.BRAND),
        ApplicationController.applicationDetails
    )
    .delete(
        auth(USER_ROLES.BRAND),
        ApplicationController.resubmitApplication
    )

export const ApplicationRoutes = router;