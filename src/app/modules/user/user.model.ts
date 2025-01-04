import { model, Schema } from "mongoose";
import { USER_ROLES } from "../../../enums/user";
import { IUser, UserModal } from "./user.interface";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";

const userSchema = new Schema<IUser, UserModal>(
    {
        name: {
            type: String,
            required: false,
        },
        appId: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            required: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
            lowercase: true,
        },
        contact: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: false,
            select: 0,
            minlength: 8,
        },
        location: {
            type: String,
            required: false,
        },
        profile: {
            type: String,
            default: 'https://i.ibb.co/z5YHLV9/profile.png',
        },
        verified: {
            type: Boolean,
            default: false,
        },
        authentication: {
            type: {
                isResetPassword: {
                    type: Boolean,
                    default: false,
                },
                oneTimeCode: {
                    type: Number,
                    default: null,
                },
                expireAt: {
                    type: Date,
                    default: null,
                },
            },
            select: 0
        }, 
        isSubscribed: {type: Boolean},
    },
    {
        timestamps: true
    }
)


//exist user check
userSchema.statics.isExistUserById = async (id: string) => {
    const isExist = await User.findById(id);
    return isExist;
};

userSchema.statics.isExistUserByEmail = async (email: string) => {
    const isExist = await User.findOne({ email });
    return isExist;
};

//account check
userSchema.statics.isAccountCreated = async (id: string) => {
    const isUserExist: any = await User.findById(id);
    return isUserExist.accountInformation.status;
};

//is match password
userSchema.statics.isMatchPassword = async (password: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};

//check user
userSchema.pre('save', async function (next) {
    const user = this as IUser

    //check user by email
    const isExist = await User.findOne({ email: user.email });
    if (isExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exist!');
    }

    //check user by phone
    const isExistPhone = await User.findOne({ email: user.contact });
    if (isExistPhone) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Phone Number already exist!');
    }

    if(user.role === USER_ROLES.INFLUENCER){
        user.isSubscribed = true;
    }

    //password hash
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
});
export const User = model<IUser, UserModal>("User", userSchema)