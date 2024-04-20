import { ISubTask } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

export interface ISubtasksAPI {
  read: (dateFrom: string, dateTo: string) => Promise<ISubTask[]>;
}

export const subtasksAPI = (httpClient: AxiosInstance): ISubtasksAPI => ({
  read: async (dateFrom, dateTo) => {
    const res = await httpClient.get(
      `/dragdrop/subtasks/read?dateTo=${dateFrom}&dateFrom=${dateTo}`
    );
    return res.data;
  },
});
