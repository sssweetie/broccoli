/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITask } from 'apps/libs/types/src';
import { AuditModel } from '../models/AuditModel';
import { TaskModel } from '../models/TaskModel';
import { IAddAudit } from 'apps/libs/types/src/Audit';

export const AuditController = {
  create: async ({ audit, taskId }: IAddAudit) => {
    TaskModel;
    const auditDoc = await AuditModel.create(audit);
    await TaskModel.findByIdAndUpdate(taskId, {
      $push: {
        audits: auditDoc._id,
      },
    });
  },

  read: async (taskId: string) => {
    try {
      const task: ITask = await TaskModel.findById(taskId)
        .populate('audits')
        .exec();
      task.audits.sort((a, b) => b.date.getTime() - a.date.getTime());
      return task.audits;
    } catch (errors) {
      console.log(errors);
    }
  },
};
