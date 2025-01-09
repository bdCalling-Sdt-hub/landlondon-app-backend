import { model, Schema } from "mongoose";
import { ITodo, TodoModel } from "./todo.interface";

const todoSchema = new Schema<ITodo, TodoModel>(
    {
        brand : {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        subject : {
            type: String,
            required: true
        },
        details : {
            type: String,
            required: true
        },
        important: {
            type: Boolean,
            default: false
        }
    }
)

export const Todo = model<ITodo, TodoModel>("Todo", todoSchema)