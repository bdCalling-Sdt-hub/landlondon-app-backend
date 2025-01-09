import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ContactValidation } from "./contact.validation";
import { ContactController } from "./contact.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
const router = express.Router();

router.route("/")
    .post(
        validateRequest(ContactValidation.createContactZodSchema),
        ContactController.createContact
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        ContactController.getContacts
    )

export const ContactRoutes = router;