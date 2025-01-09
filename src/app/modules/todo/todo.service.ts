import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ITodo } from "./todo.interface";
import { Todo } from "./todo.model";
import { JwtPayload } from "jsonwebtoken";

const createTodoToDB = async (payload: ITodo): Promise<ITodo> => {
    const todo = await Todo.create(payload);

    if (!todo) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Todo");
    }

    return todo;
}

const getTodoFromDB = async (user: JwtPayload): Promise<ITodo[]> => {


    const todos = await Todo.find({brand: user.id}).select("subject details important")
    if (!todos.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Contact");
    }

    return todos
}

export const TodoService = {
    createTodoToDB,
    getTodoFromDB
}
