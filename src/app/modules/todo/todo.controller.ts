import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TodoService } from "./todo.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createTodo = catchAsync (async (req: Request, res: Response) =>{
    const payload = {
        brand: req.user.id,
        ...req.body
    }
    const result = await TodoService.createTodoToDB(payload);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Todo created Successfully",
        data: result
    })
})

const getTodos = catchAsync (async (req: Request, res: Response) =>{
    const result = await TodoService.getTodoFromDB(req.user);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Todos Retrieved Successfully",
        data: result
    })
});

const makeFavorite = catchAsync (async (req: Request, res: Response) =>{
    const result = await TodoService.makeFavoriteToDB(req.params.id);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: result as string
    })
});


const deletedTodo = catchAsync (async (req: Request, res: Response) =>{
    const result = await TodoService.deleteTodoFromDB(req.params.id);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Todo Deleted Successfully",
        data: result
    })
});


export const TodoController = {
    createTodo,
    getTodos,
    makeFavorite,
    deletedTodo
}