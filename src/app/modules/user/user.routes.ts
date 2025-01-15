import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
const router = express.Router();

router.get(
    '/profile',
    auth(USER_ROLES.ADMIN, USER_ROLES.BRAND, USER_ROLES.INFLUENCER),
    UserController.getUserProfile
);
  
router.get('/influencer-profile',
    auth(USER_ROLES.INFLUENCER),
    UserController.influencerProfile
);

router.post(
    '/create-admin',
    validateRequest(UserValidation.createAdminZodSchema),
    UserController.createAdmin
);

router
    .route('/')
    .post(
        validateRequest(UserValidation.createUserZodSchema),
        UserController.createUser
    )
    .patch(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.BRAND, USER_ROLES.INFLUENCER),
        fileUploadHandler(),
        UserController.updateProfile
    );

export const UserRoutes = router;