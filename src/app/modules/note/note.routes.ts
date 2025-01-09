import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { NoteValidation } from "./note.validation";
import { NoteController } from "./note.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.BRAND),
        validateRequest(NoteValidation.createNoteZodSchema),
        NoteController.createNote
    )
    .get(
        auth(USER_ROLES.BRAND),
        NoteController.getNotes
    )

export const NoteRoutes = router;