import { IAudit } from './Audit';
import { ISubTask } from './SubTask';

export interface ITask {
  _id: string;
  order: number;
  title?: string;
  description?: string;
  audits?: IAudit[];
  subTasks?: ISubTask[];
}

export interface IAddTask {
  tableId: string;
  task: Partial<ITask>;
}

export interface IUpdateTask {
  task: ITask;
  audit: IAudit;
}
