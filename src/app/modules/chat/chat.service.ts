import mongoose from 'mongoose';
import { IMessage } from '../message/message.interface';
import { Message } from '../message/message.model';
import { IChat } from './chat.interface';
import { Chat } from './chat.model';
import ApiError from '../../../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';

const createChatToDB = async (payload: any): Promise<IChat> => {

    if (!mongoose.Types.ObjectId.isValid(payload[1])) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Influencer ID")
    }

    const isExistChat: IChat | null = await Chat.findOne({
        participants: { $all: payload },
    });

    if (isExistChat) {
        return isExistChat;
    }
    const chat: IChat = await Chat.create({ participants: payload });
    return chat;
}

const getChatFromDB = async (user: any, search: string): Promise<IChat[]> => {

    const chats: any = await Chat.find({ participants: { $in: [user.id] } })
        .populate({
            path: 'participants',
            select: '_id name profile',
            match: {
                _id: { $ne: user.id }, // Exclude user.id in the populated participants
                ...(search && { name: { $regex: search, $options: 'i' } }), // Apply $regex only if search is valid
            }
        })
        .select('participants status')
        .lean();

    // Filter out chats where no participants match the search (empty participants)
    const filteredChats = chats?.filter(
        (chat: any) => chat?.participants?.length > 0
    );

    //Use Promise.all to handle the asynchronous operations inside the map
    const chatList: IChat[] = await Promise.all(
        filteredChats?.map(async (chat: any) => {

            const lastMessage: IMessage | null = await Message.findOne({ chatId: chat?._id })
                .sort({ createdAt: -1 })
                .select('text createdAt');


            const unReadCount = await Message.countDocuments({ chatId: chat?._id, read: false })
            return {
                ...chat,
                participants: { ...chat?.participants[0] },
                lastMessage: lastMessage || null,
                unReadCount
            };
        })
    );

    return chatList;
};

const getChatForInfluencerFromDB = async (user: any, search: string): Promise<IChat[]> => {

    const chats: any = await Chat.find({ participants: { $in: [user.id] } })
        .populate({
            path: 'participants',
            select: '_id name profile',
            match: {
                _id: { $ne: user.id }, // Exclude user.id in the populated participants
                ...(search && { name: { $regex: search, $options: 'i' } }), // Apply $regex only if search is valid
            }
        })
        .select('participants status')
        .lean();

    // Filter out chats where no participants match the search (empty participants)
    const filteredChats = chats?.filter(
        (chat: any) => chat?.participants?.length > 0
    );

    //Use Promise.all to handle the asynchronous operations inside the map
    const chatList: IChat[] = await Promise.all(
        filteredChats?.map(async (chat: any) => {

            const lastMessage: IMessage | null = await Message.findOne({ chatId: chat?._id })
                .sort({ createdAt: -1 })
                .select('text createdAt');


            const unReadCount = await Message.countDocuments({ chatId: chat?._id, read: false })
            return {
                ...chat,
                participants: { ...chat?.participants[0] },
                lastMessage: lastMessage || null,
                unReadCount
            };
        })
    );

    return chatList.filter((chat:any) => chat.lastMessage !== null);
};

export const ChatService = { createChatToDB, getChatForInfluencerFromDB, getChatFromDB };