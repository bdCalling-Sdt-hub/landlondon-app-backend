import { z } from "zod";
import { checkValidID } from "../../../shared/checkValidID";

const createReportValidationSchema = z.object({
    body: z.object({
        influencer: checkValidID("Influencer ID is required"),
        reason: z.string({ required_error: "Reason is required" }).nonempty({ message: "Reason is required" }),
    })
});

export  const ReportValidation = {
    createReportValidationSchema
}