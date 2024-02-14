import { TaskModel } from '../models/TaskModels';
import { TableModel } from '../models/TableModels';
import { ITask } from 'apps/libs/types/src';

interface AddTask {
  tableId: string;
  task: Partial<ITask>;
}

export const TaskController = {
  create: async ({ task, tableId }: AddTask) => {
    const document = await TaskModel.create({
      title: task.title,
      order: task.order,
    });
    
    await TableModel.findByIdAndUpdate(tableId, {
      $push: {
        tasks: document._id,
      },
    });
  },
};
