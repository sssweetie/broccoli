import { AddTask, Task, UpdateTask } from 'apps/libs/types/src';
import { httpClient } from '../services/httpClient';

export interface TaskAPI {
  create: (addTask: AddTask) => Promise<void>;
  read: (taskId: string) => Promise<Task>;
  update: (updateTask: UpdateTask) => Promise<void>;
  delete: (taskId: string) => Promise<void>;
}

export const taskApi: TaskAPI = {
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
};
