import { AddTask, ITask, UpdateTask } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

export interface TaskApi {
  create: ({ tableId, task }: AddTask) => Promise<void>;
  read: (taskId: string) => Promise<ITask>;
  update: ({ task, audit }: UpdateTask) => Promise<void>;
  delete: (taskId: string) => Promise<void>;
}

export const taskApi = (httpClient: AxiosInstance): TaskApi => ({
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
