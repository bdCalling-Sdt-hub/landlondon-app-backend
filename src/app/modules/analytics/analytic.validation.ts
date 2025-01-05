import { z } from "zod";
import { checkValidID } from "../../../shared/checkValidID";

const createAnalyticZodSchema = z.object({
    body: z.array(
        z.object({
            application: checkValidID("Application ID is required"),
            image: z.string({ required_error: "Image is required" })
        })
    )
})

export const AnalyticValidation = { createAnalyticZodSchema}