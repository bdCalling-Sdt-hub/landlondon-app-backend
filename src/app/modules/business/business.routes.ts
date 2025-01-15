import express, { Request, Response, NextFunction } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BusinessValidation } from "./business.validation";
import { BusinessController } from "./business.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getSingleFilePath } from "../../../shared/getFilePath";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.BRAND),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const image = getSingleFilePath(req.files, "image");

                req.body = {
                    brand: req.user.id,
                    ...req.body,
                    image
                }
                next()
            } catch (error) {
                res.status(500).json({ message: "Need Array to insert image " });
            }
        },
        validateRequest(BusinessValidation.createBusinessZodSchema),
        BusinessController.createBusiness
    )
    .get(
        auth(USER_ROLES.BRAND),
        BusinessController.getBusiness
    )

export const BusinessRoutes = router;