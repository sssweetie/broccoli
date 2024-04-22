import { SubTask } from 'apps/libs/types/src';
import { Schema, model } from 'mongoose';

const subTaskSchema = new Schema<SubTask>({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
  },
});

export const SubTaskModel = model<SubTask>('subTasks', subTaskSchema);
