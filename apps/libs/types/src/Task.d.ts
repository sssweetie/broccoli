import { IAudit } from './Audit';

export interface ITask {
  _id: string;
  order: number;
  title?: string;
  description?: string;
  audits?: IAudit[];
}

export interface AddTask {
  tableId: string;
  task: Partial<ITask>;
}

export interface UpdateTask {
  task: ITask;
  audit: IAudit;
}
