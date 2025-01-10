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


    const todos = await Todo.find({brand: user.id}).select("subject details important")
    if (!todos.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Contact");
    }

    return todos
}


const makeFavoriteToDB = async (id: string): Promise<ITodo>=>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Todo ID");
    }

    const updatedTodo = await Todo.findById(
        {_id: id},
        {important: true ? false : true},
        { new: true}
    );

    if(!updatedTodo){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to updated Todo");
    }

    return updatedTodo;
}

const deleteTodoFromDB = async (id: string): Promise<ITodo>=>{

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Todo ID");
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if(!deletedTodo){
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
