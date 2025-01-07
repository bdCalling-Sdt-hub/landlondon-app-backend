import { Model, Types } from 'mongoose';

export type INotification = {
    text: string;
    receiver?: Types.ObjectId;
    read: boolean;
    referenceId?: string;
    screen?: "CAMPAIGN" | "CHAT";
    type?: "ADMIN";
};

export type NotificationModel = Model<INotification>;