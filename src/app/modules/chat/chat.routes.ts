import express from 'express';
import auth from '../../middlewares/auth';
import { ChatController } from './chat.controller';
import { USER_ROLES } from '../../../enums/user';
const router = express.Router();


router.route("/")
  .post(
    auth(USER_ROLES.BRAND),
    ChatController.createChat
  )
  .get(
    auth(USER_ROLES.BRAND),
    ChatController.getChat
  );

router.get("/influencer-chat",
    auth(USER_ROLES.INFLUENCER),
    ChatController.getChatForInfluencer
  )

export const ChatRoutes = router;
