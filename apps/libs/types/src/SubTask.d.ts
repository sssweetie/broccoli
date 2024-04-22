export interface SubTask {
  _id: string;
  title: string;
  isCompleted: boolean;
  date: Date;
}
export interface CreateSubTask {
  subTask: SubTask;
  taskId: string;
}
