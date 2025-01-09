import z from "zod";

const createContactZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name Is Required" }),
        email: z.string({ required_error: "Email Is Required" })
            .email({ message: "Email is not valid or not formatted correctly" }),
        message: z.string({ required_error: "Message Is Required" }),
    })
})

export const ContactValidation = {createContactZodSchema}