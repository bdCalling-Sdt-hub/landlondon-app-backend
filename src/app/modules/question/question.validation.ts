import { z } from 'zod';
import { INPUT_TYPE } from '../../../enums/user';
import { checkValidID } from '../../../shared/checkValidID';

const questionCreateZodValidationSchema = z.object({
    body: z.array(
        z.object({
            campaign: checkValidID("Campaign ID is required"),
            question: z.string({ required_error: "Question is required" }),
            type: z.enum(Object.values(INPUT_TYPE) as [string, ...string[]], {
                required_error: "Type is required",
            })
        })
    )
});

export const QuestionValidation = {
    questionCreateZodValidationSchema
};