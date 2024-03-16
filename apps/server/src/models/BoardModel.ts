import { model, Schema } from 'mongoose';
import { IBoard } from 'apps/libs/types/src';

const boardSchema = new Schema<IBoard>({
  title: {
    type: String,
    required: true,
  },
  access: {
    type: String,
  },
  backgroundImage: {
    type: String,
  },
  tables: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tables',
    },
  ],
});

export const BoardModel = model<IBoard>('boards', boardSchema);
