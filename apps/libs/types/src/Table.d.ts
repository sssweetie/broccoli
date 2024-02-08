export interface ITable {
  _id: string;
  order: number;
  title: string;
  tasks: ITask[];
  insertTask: (insertIndex: number, taskToInsert: ITask) => void;
  removeTask: (removeIndex: number) => void;
}

export interface ITask {
  _id: string;
  order: number;
  title?: string;
  description?: string;
}
