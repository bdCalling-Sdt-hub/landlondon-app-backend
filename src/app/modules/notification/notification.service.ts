import { JwtPayload } from 'jsonwebtoken';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';
import QueryBuilder from '../../../shared/apiFeature';

// get notifications
const getNotificationFromDB = async ( user: JwtPayload, query: Record<string, any>  ): Promise<{}> => {

    const apiFeatures = new QueryBuilder(Notification.find({receiver: user.id}), query).paginate();
    const notifications = await apiFeatures.queryModel;

    const pagination = await apiFeatures.getPaginationInfo();
    const unreadNotifications = await Notification.find({ receiver: user.id, read: false }).countDocuments();

    return {
        pagination: pagination,
        notifications,
        unreadNotifications
    };
};

// read notifications only for user
const readNotificationToDB = async ( user: JwtPayload): Promise<INotification | undefined> => {

    const result: any = await Notification.updateMany(
        { receiver: user.id, read: false },
        { $set: { read: true } }
    );
    return result;
};

// get notifications for admin
const adminNotificationFromDB = async () => {
    const result = await Notification.find({ type: 'ADMIN' });
    return result;
};

// read notifications only for admin
const adminReadNotificationToDB = async (): Promise<INotification | null> => {
    const result: any = await Notification.updateMany(
        { type: 'ADMIN', read: false },
        { $set: { read: true } },
        { new: true }
    );
    return result;
};

export const NotificationService = {
    adminNotificationFromDB,
    getNotificationFromDB,
    readNotificationToDB,
    adminReadNotificationToDB
};
