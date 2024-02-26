import { model, Schema } from 'mongoose';
import { ITable } from 'apps/libs/types/src';

const tableSchema = new Schema<ITable>({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tasks',
    },
  ],
});

export const TableModel = model<ITable>('tables', tableSchema);
