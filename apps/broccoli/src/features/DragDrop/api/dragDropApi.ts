import {
  ITable,
  RequiredParamsToUpdate,
} from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

export interface DragDropApi {
  create: (table: ITable) => Promise<void>;
  read: () => Promise<ITable[]>;
  update: (params: RequiredParamsToUpdate) => Promise<void>;
  // delete: () => Promise<void>
}

export const dragDropApi = (httpClient: AxiosInstance): DragDropApi => ({
  create: async (table: ITable) =>
    await httpClient.post('/dragdrop/create', table),
  read: async () => {
    const res = await httpClient.get('/dragdrop/read');
    return res.data;
  },
  update: async (params: RequiredParamsToUpdate) =>
    await httpClient.put('/dragdrop/update', params),
  // delete: async () => (),
});
