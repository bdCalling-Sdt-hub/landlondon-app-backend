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