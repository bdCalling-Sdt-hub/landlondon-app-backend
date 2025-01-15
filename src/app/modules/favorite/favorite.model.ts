import { model, Schema } from "mongoose";
import { IFavorite, FavoriteModel } from "./favorite.interface"

const favoriteSchema = new Schema<IFavorite, FavoriteModel>(
    {
        brand: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        influencer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Favorite = model<IFavorite, FavoriteModel>("Favorite", favoriteSchema);