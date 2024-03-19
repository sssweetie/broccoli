import { IAddTask, ITask, IUpdateTask } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

export interface ITaskAPI {
  create: ({ tableId, task }: IAddTask) => Promise<void>;
  read: (taskId: string) => Promise<ITask>;
  update: ({ task, audit }: IUpdateTask) => Promise<void>;
  delete: (taskId: string) => Promise<void>;
}

export const taskApi = (httpClient: AxiosInstance): ITaskAPI => ({
  create: async (addTask) => {
    await httpClient.post('/dragdrop/task/create', { addTask });
  },
  read: async (taskId) => {
    const res = await httpClient.get(`/dragdrop/task/read/${taskId}`);
    return res.data;
  },
  update: async (updateTask) => {
    await httpClient.put('/dragdrop/task/update', { updateTask });
  },
  delete: async (taskId) => {
    await httpClient.delete(`/dragdrop/task/delete/${taskId}`);
  },
});
