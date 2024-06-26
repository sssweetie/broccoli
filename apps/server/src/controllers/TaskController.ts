import { TaskModel } from '../models/TaskModel';
import { TableModel } from '../models/TableModel';
import { AddTask, UpdateTask } from 'apps/libs/types/src';
import { AuditController } from './AuditController';
import { AuditModel } from '../models/AuditModel';

export const TaskController = {
  create: async ({ task, tableId }: AddTask) => {
    const document = await TaskModel.create({
      title: task.title,
      order: task.order,
      description: 'Description placeholder',
    });

    await TableModel.findByIdAndUpdate(tableId, {
      $push: {
        tasks: document._id,
      },
    });
  },
  read: async (taskId: string) => {
    const task = await TaskModel.findById(taskId);
    return task;
  },
  update: async ({ task, audit }: UpdateTask) => {
    await TaskModel.findByIdAndUpdate(task._id, { ...task });
    await AuditController.create({ audit, taskId: task._id });
  },
  delete: async (taskId: string) => {
    const auditLogIds = await TaskModel.findById(taskId);

    Promise.all(
      auditLogIds.audits.map((id) => AuditModel.findByIdAndDelete(id))
    );

    await TaskModel.findByIdAndDelete(taskId);
  },
};
