import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ITodo } from "./todo.interface";
import { Todo } from "./todo.model";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

const createTodoToDB = async (payload: ITodo): Promise<ITodo> => {
    const todo = await Todo.create(payload);

    if (!todo) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Todo");
    }

    return todo;
}

const getTodoFromDB = async (user: JwtPayload): Promise<ITodo[]> => {


    const todos = await Todo.find({ brand: user.id }).select("subject details important")
    if (!todos.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Contact");
    }

    return todos
}


const makeFavoriteToDB = async (id: string): Promise<string> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Todo ID");
    }

    const todo: any = await Todo.findById(id).lean();

    const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { $set: { important: !todo.important } },
        { new: true }
    );

    if (!updatedTodo) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to updated Todo");
    }

    if(updatedTodo.important === true){
        return "Marked As Important"
    }else{
        return "Marked As Not Important"
    }
}

const deleteTodoFromDB = async (id: string): Promise<ITodo> => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Todo ID");
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to deleted Todo");
    }

    return deletedTodo;
}

export const TodoService = {
    createTodoToDB,
    getTodoFromDB,
    makeFavoriteToDB,
    deleteTodoFromDB
}
