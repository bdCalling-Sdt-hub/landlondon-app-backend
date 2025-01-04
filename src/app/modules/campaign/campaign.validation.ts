import { z } from "zod";
import { GENDER } from "../../../enums/user";

const campaignValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        image: z.string({ required_error: "Image is required" }),
        objective: z.string({ required_error: "Objective is required" }),
        message: z.string({ required_error: "Message is required" }),
        description: z.string({ required_error: "Description is required" }),
        startDate: z.string({ required_error: "Start date is required" }),
        endDate: z.string({ required_error: "End date is required" }),
        platforms: z.string({ required_error: "Platforms are required" }),
        budget: z.number({ required_error: "Budget is required" }).nonnegative("Budget must be a non-negative number"),
        hashtag: z.array(z.string(), { required_error: "Hashtag is required" }),
        submission_date: z.string({ required_error: "Submission date is required" }),
        do: z.array(z.string(), { required_error: "Do is required" }),
        do_not: z.array(z.string(), { required_error: "Do not is required" }),
        target_age: z.number({ required_error: "Target age is required" }).nonnegative("Target age must be a non-negative number"),
        target_gender: z.enum(Object.values(GENDER) as [string, ...string[]], {
            required_error: "Target gender is required"
        }),
        target_location: z.string({ required_error: "Target location is required" })
    })

});

export const CampaignValidation = {
    campaignValidationSchema
}