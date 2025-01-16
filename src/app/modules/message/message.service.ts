import { IMessage } from './message.interface';
import { Message } from './message.model';

const sendMessageToDB = async (payload: any): Promise<IMessage> => {

  const response = await Message.create(payload);

  //@ts-ignore
  const io = global.io;
  if (io) {
    io.emit(`getMessage::${payload?.chatId}`, response);
  }

  return response;
};

const getMessageFromDB = async (id: any): Promise<IMessage[]> => {

  await Message.updateMany(
    { chatId: id },
    { read: true },
    { new: true }
  )

  const messages = await Message.find({ chatId: id })
    .sort({ createdAt: -1 })
  return messages;
};

export const MessageService = { sendMessageToDB, getMessageFromDB };
