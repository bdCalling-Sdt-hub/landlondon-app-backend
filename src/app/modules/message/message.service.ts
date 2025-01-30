import QueryBuilder from '../../../shared/apiFeature';
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

const getMessageFromDB = async (id: any, query: any): Promise<{ messages: IMessage[], pagination: any }> => {

  await Message.updateMany(
    { chatId: id },
    { read: true },
    { new: true }
  )

  const apiFeatures = new QueryBuilder(Message.find({ chatId: id }), query).paginate();
  const messages = await apiFeatures.queryModel;
  const pagination = await apiFeatures.getPaginationInfo();
  return { messages, pagination };
};

export const MessageService = { sendMessageToDB, getMessageFromDB };
