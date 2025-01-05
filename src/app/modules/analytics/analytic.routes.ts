import express, {Request, Response, NextFunction} from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { AnalyticValidation } from "./analytic.validation";
import { AnalyticController } from "./analytic.controller";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.INFLUENCER),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction)=>{
            try {
                const {application} = req.body;
                const images= getMultipleFilesPath(req.files, "image");

                if (Array.isArray(images)) {
                    req.body = images?.map((image: string) => {
                        return {
                            image,
                            application,
                            influencer: req.user.id
                        }
                    });
                }


                next()
            } catch (error) {
                res.status(500).json({ message: "Need Array to insert Multiple Image together" });
            }
        },
        validateRequest(AnalyticValidation.createAnalyticZodSchema),
        AnalyticController.createAnalytic
    )


export const AnalyticRoutes = router;