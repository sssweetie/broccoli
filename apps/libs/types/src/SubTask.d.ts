export interface ISubTask {
  _id: string;
  title: string;
  isCompleted: boolean;
}
export interface ICreateSubTask {
  subTask: ISubTask;
  taskId: string;
}
