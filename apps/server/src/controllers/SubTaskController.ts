import { ICreateSubTask, ISubTask } from 'apps/libs/types/src';
import { SubTaskModel } from '../models/SubTaskModel';
import { TaskModel } from '../models/TaskModel';

export const SubTaskController = {
  create: async ({ subTask, taskId }: ICreateSubTask) => {
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
  update: async (subTask: ISubTask) => {
    await SubTaskModel.findByIdAndUpdate(subTask._id, { ...subTask });
  },
};
