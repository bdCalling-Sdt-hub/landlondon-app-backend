import { IMessage } from '../message/message.interface';
import { Message } from '../message/message.model';
import { IChat } from './chat.interface';
import { Chat } from './chat.model';

const createChatToDB = async (payload: any): Promise<IChat> => {
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
            select: '_id firstName lastName image',
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
                lastMessage: lastMessage || null,
                unReadCount
            };
        })
    );

    return chatList;
};

const getChatForInfluencerFromDB = async (user: any, search: string): Promise<IChat[]> => {

    const chats = await Chat.aggregate([
        { $match: { participants: { $in: [user.id] } } },
        {
            $lookup: {
                from: 'messages',
                localField: '_id',
                foreignField: 'chatId',
                as: 'messages'
            }
        },
        { $addFields: { lastMessage: { $arrayElemAt: ['$messages', -1] } } },
        {
            $project: {
                participants: 1,
                status: 1,
                lastMessage: 1,
                messages: { $slice: ['$messages', -20] }
            }
        }
    ]);

    return chats;
};

export const ChatService = { createChatToDB, getChatFromDB };