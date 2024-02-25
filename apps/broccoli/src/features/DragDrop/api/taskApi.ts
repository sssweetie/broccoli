import { UpdateTask } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

export interface TaskApi {
  create: ({ tableId, task }: UpdateTask) => Promise<void>;
}

export const taskApi = (httpClient: AxiosInstance): TaskApi => ({
  create: async ({ tableId, task }) => {
    await httpClient.post('/dragdrop/task/create', { tableId, task });
  },
});
