import { ISubTask } from 'apps/libs/types/src';
import { Schema, model } from 'mongoose';

const subTaskSchema = new Schema<ISubTask>({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date
  },
});

export const SubTaskModel = model<ISubTask>('subTasks', subTaskSchema);
