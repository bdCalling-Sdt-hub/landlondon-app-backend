import { Model } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

interface IAuthenticationProps {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
}

interface IStripeAccountInfo {
    status?: boolean;
    accountId?: string;
    externalAccountId?: string;
    accountUrl?: string;
    currency?: string;
}

export type IUser = {
    name: string;
    appId: string;
    role: USER_ROLES;
    contact: string;
    email: string;
    password: string;
    location: string;
    profile: string;
    cover: string;
    verified: boolean;
    bio: string;
    about: string;
    authentication?: IAuthenticationProps;
    instagram: string;
    facebook:string;
    tiktok: string;
    youtube: string;
    accountInformation?: IStripeAccountInfo;
}

export type UserModal = {
    isExistUserById(id: string): any;
    isExistUserByEmail(email: string): any;
    isAccountCreated(id: string): any;
    isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;