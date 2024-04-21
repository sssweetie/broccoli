import { model, Schema } from 'mongoose';
import { Board } from 'apps/libs/types/src';

const boardSchema = new Schema<Board>({
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

export const BoardModel = model<Board>('boards', boardSchema);
