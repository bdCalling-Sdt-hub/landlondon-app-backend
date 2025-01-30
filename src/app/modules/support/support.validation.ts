import { z } from "zod";

const supportValidationSchema = z.object({
    message: z.string({required_error : "Message is required"}).nonempty({message: "Message is required"})
});

export const SupportValidation =  {
    supportValidationSchema
};