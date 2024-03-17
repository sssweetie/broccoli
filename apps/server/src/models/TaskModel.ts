import { ITask } from 'apps/libs/types/src';
import { Schema, model } from 'mongoose';

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  subTask: [
    {
      type: Schema.Types.ObjectId,
      ref: 'subTask',
    },
  ],
  audits: [
    {
      type: Schema.Types.ObjectId,
      ref: 'audits',
    },
  ],
});

export const TaskModel = model<ITask>('tasks', taskSchema);
