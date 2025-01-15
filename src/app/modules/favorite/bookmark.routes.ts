import express from "express";
import { FavoriteController } from "./favorite.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.BRAND),
        FavoriteController.toggleFavorite
    )
    .get(
        auth(USER_ROLES.BRAND),
        FavoriteController.getFavorite
    )


export const FavoriteRoutes = router;
