import { IAudit } from './Audit';
import { ISubTask } from './SubTask';

export interface ITask {
  _id: string;
  order: number;
  title?: string;
  description?: string;
  audits?: IAudit[];
  subTask?: ISubTask[];
}

export interface AddTask {
  tableId: string;
  task: Partial<ITask>;
}

export interface UpdateTask {
  task: ITask;
  audit: IAudit;
}
