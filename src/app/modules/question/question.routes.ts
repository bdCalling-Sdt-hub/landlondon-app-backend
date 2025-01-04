import express, { NextFunction, Request, Response } from "express";
import { questionController } from "./question.controller";
import { QuestionValidation } from "./question.validation";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.post("/",
    auth(USER_ROLES.BRAND),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {questions, campaign} = req.body;

            if (Array.isArray(questions)) {
                req.body = questions.map((question) => {
                    console.log(question)
                    return {
                        ...question,
                        campaign: campaign,
                        brand: req.user.id
                    }
                });
            }

            next();

        } catch (error) {
            res.status(500).json({ message: "Need Array to insert Multiple Question together" });
        }
    },
    validateRequest(QuestionValidation.questionCreateZodValidationSchema),
    questionController.createQuestion
);

router.get("/:id",
    auth(USER_ROLES.BRAND, USER_ROLES.INFLUENCER),
    questionController.getQuestion
);
export const QuestionRoutes = router;