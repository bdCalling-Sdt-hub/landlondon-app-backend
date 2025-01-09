import z from "zod";

const createNoteZodSchema = z.object({
    body: z.object({
        date: z.string({ required_error: "Date Is Required" }),
        notes: z.string({ required_error: "Notes Is Required" }),
    })
})

export const NoteValidation = {createNoteZodSchema}