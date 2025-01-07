import { Schema, model } from 'mongoose';
import { IMessage, MessageModel } from './message.interface';

const messageSchema = new Schema<IMessage, MessageModel>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Chat',
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: { 
      type: String,
      required: false 
    },
    image: { 
      type: String,
      required: false 
    },
    docs: { 
      type: String,
      required: false 
    },
    read: {
      type: Boolean,
      default: false
    },
    type:{
      type: String,
      enum: ["text" , "image"  , "docs" , "both"],
      default: "text"
    }
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessage, MessageModel>('Message', messageSchema);
