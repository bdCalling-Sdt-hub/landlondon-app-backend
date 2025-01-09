import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.INFLUENCER, USER_ROLES.BRAND),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { rating, ...othersData } = req.body;

                req.body = { ...othersData, user: req.user.id, rating: Number(rating) };
                next();

            } catch (error) {
                res.status(500).json({ message: "Failed to convert string to number" });
            }
        },
        validateRequest(ReviewValidation.reviewZodSchema),
        ReviewController.createReview
    )
    .get(
        ReviewController.getReviews
    )


export const ReviewRoutes = router;