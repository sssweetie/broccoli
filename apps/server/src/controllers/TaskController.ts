import { TaskModel } from '../models/TaskModel';
import { TableModel } from '../models/TableModel';
import { ITask, UpdateTask } from 'apps/libs/types/src';
import { AuditController } from './AuditController';
import { AuditModel } from '../models/AuditModel';

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
  read: async (taskId: string) => {
    const task = await TaskModel.findById(taskId);
    const audit = await AuditController.read(taskId);
    return { task, audit };
  },
  update: async ({ task, audit }: UpdateTask) => {
    await TaskModel.findByIdAndUpdate(task._id, { ...task });
    await AuditController.create({ audit, taskId: task._id });
  },
  delete: async (taskId: string) => {
    const auditLogIds = await TaskModel.findById(taskId);
    
    const promises = auditLogIds.audits.map((id) =>
      AuditModel.findByIdAndDelete(id)
    );
    Promise.all(promises);

    await TaskModel.findByIdAndDelete(taskId);
  },
};
