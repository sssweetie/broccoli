import { ISubTask } from 'apps/libs/types/src';
import { SubTaskModel } from '../models/SubTaskModel';
import { TaskModel } from '../models/TaskModel';

export const SubTaskController = {
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
