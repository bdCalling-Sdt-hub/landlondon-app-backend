import { Schema, model } from 'mongoose';
import { IQuestion, QuestionModel } from './question.interface';
import { INPUT_TYPE } from '../../../enums/user';

const questionSchema = new Schema<IQuestion, QuestionModel>(
    {
        brand: { type: Schema.Types.ObjectId, required: true, ref: 'Brand' },
        campaign: { type: Schema.Types.ObjectId, required: true, ref: 'Campaign' },
        question: { type: String, required: true },
        type: {
            type: String,
            enum: Object.values(INPUT_TYPE),
            required: true
        },
        options: [
            {
                type: String,
                required: false
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Question = model<IQuestion, QuestionModel>('Question', questionSchema);