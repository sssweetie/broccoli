import { model, Schema } from 'mongoose';
import { Table } from 'apps/libs/types/src';

const tableSchema = new Schema<Table>({
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

export const TableModel = model<Table>('tables', tableSchema);
