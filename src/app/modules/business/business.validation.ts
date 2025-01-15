import z from "zod";
import { checkValidID } from "../../../shared/checkValidID";

const createBusinessZodSchema = z.object({
    body: z.object({
        brand: checkValidID("Brand is required"),
        name: z.string({ required_error: "Name is required" }).nonempty({ message: "Name is required" }),
        website: z.string({ required_error: "Website is required" }).nonempty({ message: "Website must be a valid URL" }),
        image: z.string({ required_error: "Image is required" }).nonempty({ message: "Image is required" }),
        facebook: z.string({ required_error: "Facebook is required" }).nonempty({ message: "Facebook must be a valid URL" }),
        linkedin: z.string({ required_error: "LinkedIn is required" }).nonempty({ message: "LinkedIn must be a valid URL" }),
        twitter: z.string({ required_error: "Twitter is required" }).nonempty({ message: "Twitter must be a valid URL" }),
        instagram: z.string({ required_error: "Instagram is required" }).nonempty({ message: "Instagram must be a valid URL" })
    })
})

export const BusinessValidation = { createBusinessZodSchema }