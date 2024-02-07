export interface ITable {
  _id: string;
  order: number;
  title: string;
  tasks: ITask[];
}

export interface ITask {
  _id: string;
  order: number;
  title?: string;
  description?: string;
}

