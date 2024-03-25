export interface ISubTask {
  _id: string;
  title: string;
  isCompleted: boolean;
  date: Date;
}
export interface ICreateSubTask {
  subTask: ISubTask;
  taskId: string;
}
