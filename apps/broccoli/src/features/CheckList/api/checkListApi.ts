import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { CreateSubTask, SubTask } from 'apps/libs/types/src';

export interface ICheckListAPI {
  create: (createSubTask: CreateSubTask) => Promise<void>;
  read: (id: string) => Promise<SubTask[]>;
  update: (subTask: SubTask) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const checkListApi: ICheckListAPI = {
  create: async (createSubTask: CreateSubTask) => {
    await httpClient.post(`/dragdrop/subtask/create`, createSubTask);
  },
  read: async (id) => {
    const response = await httpClient.get(`/dragdrop/subtask/read/${id}`);
    return response.data;
  },
  update: async (subTask: SubTask) => {
    await httpClient.put('/dragdrop/subtask/update', subTask);
  },
  delete: async (id: string) => {
    await httpClient.delete(`/dragdrop/subtask/delete/${id}`);
  },
};
