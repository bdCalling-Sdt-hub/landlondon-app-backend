import { Model, Types } from "mongoose";

export type IFavorite= {
    influencer: Types.ObjectId,
    brand: Types.ObjectId
}

export type FavoriteModel = Model<IFavorite>;