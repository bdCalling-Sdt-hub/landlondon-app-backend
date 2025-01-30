import express, { NextFunction, Request, Response } from "express";
import { CampaignController } from "./campaign.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import validateRequest from "../../middlewares/validateRequest";
import { CampaignValidation } from "./campaign.validation";
import { getSingleFilePath } from "../../../shared/getFilePath";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.BRAND),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { budget, target_age, ...othersPayload } = req.body;
                const image = getSingleFilePath(req.files, 'image');
                req.body = {
                    brand: req.user.id,
                    ...othersPayload,
                    image,
                    budget: Number(budget),
                    target_age: Number(target_age)
                };
                next();
            } catch (error) {
                res.status(500).json({ message: "Need Array to insert Multiple Service together" });
            }
        },
        validateRequest(CampaignValidation.campaignValidationSchema),
        CampaignController.createCampaign
    )
    .get(
        auth(USER_ROLES.BRAND),
        CampaignController.getCampaign
    )
    .patch(
        auth(USER_ROLES.BRAND),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { budget, target_age, ...othersPayload } = req.body;
                const image = getSingleFilePath(req.files, 'image');
                req.body = {
                    ...othersPayload,
                    image,
                    budget: Number(budget),
                    target_age: Number(target_age)
                };
                next();
            } catch (error) {
                res.status(500).json({ message: "Failed to Upload image" });
            }
        },
        CampaignController.updateCampaign
    )

router.get("/influencer",
    auth(USER_ROLES.INFLUENCER),
    CampaignController.getCampaignList
)

router.get("/:id",
    auth(USER_ROLES.INFLUENCER),
    CampaignController.campaignDetails
)

export const CampaignRoutes = router;