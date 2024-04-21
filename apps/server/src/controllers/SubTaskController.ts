import { CreateSubTask, SubTask } from 'apps/libs/types/src';
import { SubTaskModel } from '../models/SubTaskModel';
import { TaskModel } from '../models/TaskModel';

export const SubTaskController = {
  create: async ({ subTask, taskId }: CreateSubTask) => {
    const document = await SubTaskModel.create({
      ...subTask,
    });

    await TaskModel.findByIdAndUpdate(taskId, {
      $push: {
        subTasks: document._id,
      },
    });
  },
  read: async (id: string) => {
    TaskModel;
    const task = await TaskModel.findById(id)
      .populate({ path: 'subTasks' })
      .exec();
    return task.subTasks;
  },
  update: async (subTask: SubTask) => {
    await SubTaskModel.findByIdAndUpdate(subTask._id, { ...subTask });
  },
  delete: async (id: string) => {
    await SubTaskModel.findByIdAndDelete(id);
  },
};
