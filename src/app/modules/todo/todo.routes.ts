import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TodoValidation } from "./todo.validation";
import { TodoController } from "./todo.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.BRAND),
        validateRequest(TodoValidation.createTodoZodSchema),
        TodoController.createTodo
    )
    .get(
        auth(USER_ROLES.BRAND),
        TodoController.getTodos
    );


router.route("/:id")
    .delete(
        auth(USER_ROLES.BRAND),
        TodoController.deletedTodo
    )
    .patch(
        auth(USER_ROLES.BRAND),
        TodoController.makeFavorite
    );

export const TodoRoutes = router;