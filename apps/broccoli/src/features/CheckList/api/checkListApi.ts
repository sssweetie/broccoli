import { ISubTask } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

export interface ICheckListApi {
  //   read: (id: string) => Promise<ISubTask>;
  update: (subTask: ISubTask) => Promise<void>;
}

export const checkListApi = (httpClient: AxiosInstance): ICheckListApi => ({
  //   read: async (id) => {
  //     const response = await httpClient.get(
  //       `/application/dragdrop/checklist/${id}`
  //     );
  //     return response.data;
  //   },
  update: async (subTask: ISubTask) => {
    await httpClient.put('application/dragdrop/checklist', subTask);
  },
});
