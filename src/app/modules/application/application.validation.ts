import { z } from "zod";
import { checkValidID } from "../../../shared/checkValidID";

const QuestionsValidationSchema = z.object({
    question: z.string({ required_error: "Question is required" }).nonempty(),
    answer: z.string({ required_error: "Answer is required" }).nonempty()
});

const createApplicationZodValidationSchema = z.object({
    body: z.object({
        influencer: z.string({ required_error: "Influencer is required" }).nonempty(),
        campaign: z.string({ required_error: "Campaign is required" }).nonempty(),
        brand: checkValidID("Brand Object ID is required"),
        questions: z.array(QuestionsValidationSchema),
        socialsAnalytics: z.array(z.string({ required_error: "Social Image is Required" }).nonempty())
    })
});

const updateApplicationStatusValidationSchema = z.object({
    body: z.object({
        id: checkValidID("Application ID is required"),
        status: z.string({ required_error: "Status is required" }).nonempty({ message: "Status is required" }),
    })
});

const updateApplicationPostAnalyticsValidationSchema = z.object({
    body: z.object({
        postAnalytics: z.array(z.string({ required_error: "Post Reach Image is Required" }).nonempty())
    }).strict()
});


export const ApplicationValidation = { 
    createApplicationZodValidationSchema, 
    updateApplicationPostAnalyticsValidationSchema,
    updateApplicationStatusValidationSchema 
};