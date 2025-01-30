import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { MessageController } from './message.controller';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
import { getSingleFilePath } from '../../../shared/getFilePath';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.BRAND, USER_ROLES.INFLUENCER),
  fileUploadHandler(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = getSingleFilePath(req.files, "image");
      const doc = getSingleFilePath(req.files, "doc");

      const payload = {
        sender: req.user.id,
        ...req.body,
        image,
        doc
      }

      req.body = { ...payload }
      next();
    } catch (error) {
      res.status(500).json({ message: "Need Array to insert image docs invalid format" });
    }
  },
  MessageController.sendMessage
);
router.get(
  '/:id',
  auth(USER_ROLES.BRAND, USER_ROLES.INFLUENCER),
  MessageController.getMessage
);

export const MessageRoutes = router;
