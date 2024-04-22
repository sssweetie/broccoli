import { SubTask } from 'apps/libs/types/src';
import { httpClient } from '../services/httpClient';

export interface SubtasksAPI {
  read: (dateFrom: string, dateTo: string) => Promise<SubTask[]>;
}

export const subtasksAPI: SubtasksAPI = {
  read: async (dateFrom, dateTo) => {
    const res = await httpClient.get(
      `/dragdrop/subtasks/read?dateTo=${dateFrom}&dateFrom=${dateTo}`
    );
    return res.data;
  },
};
