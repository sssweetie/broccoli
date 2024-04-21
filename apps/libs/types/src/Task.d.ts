import { Audit } from './Audit';
import { SubTask } from './SubTask';

export interface Task {
  _id: string;
  order: number;
  title?: string;
  description?: string;
  audits?: Audit[];
  subTasks?: SubTask[];
}

export interface AddTask {
  tableId: string;
  task: Partial<Task>;
}

export interface UpdateTask {
  task: Task;
  audit: Audit;
}
