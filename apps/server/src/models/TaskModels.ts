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
});

export const TaskModel = model<ITask>('tasks', taskSchema);
