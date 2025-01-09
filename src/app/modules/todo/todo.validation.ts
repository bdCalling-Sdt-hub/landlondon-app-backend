import z from "zod";

const createTodoZodSchema = z.object({
    body: z.object({
        subject: z.string({ required_error: "Subject Is Required" }),
        details: z.string({ required_error: "Details Is Required" }),
    })
})

export const TodoValidation = {createTodoZodSchema}