import { ISubTask } from 'apps/libs/types/src';
import { Schema, model } from 'mongoose';

const taskSchema = new Schema<ISubTask>({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

export const TaskModel = model<ISubTask>('tasks', taskSchema);
