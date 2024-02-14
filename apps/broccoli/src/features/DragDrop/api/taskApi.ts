import { ITask } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

export interface UpdateTask {
  tableId: string;
  task: Partial<ITask>;
}

export interface TaskApi {
  create: ({ tableId, task }: UpdateTask) => Promise<void>;
}

export const taskApi = (httpClient: AxiosInstance): TaskApi => ({
  create: async ({ tableId, task }) => {
    await httpClient.post('/dragdrop/task/create', { tableId, task });
  },
});
