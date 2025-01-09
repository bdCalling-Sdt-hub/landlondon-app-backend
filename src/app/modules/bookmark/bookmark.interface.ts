import { Model, Types } from "mongoose";

export type IBookmark= {
    influencer: Types.ObjectId,
    brand: Types.ObjectId
}

export type BookmarkModel = Model<IBookmark>;