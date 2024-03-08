import { IBoard, ITable, RequiredParamsToUpdate } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

export interface DragDropApi {
  create: (table: Partial<ITable>) => Promise<void>;
  read: (id: string) => Promise<Partial<IBoard>>;
  update: (params: RequiredParamsToUpdate) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const dragDropApi = (httpClient: AxiosInstance): DragDropApi => ({
  create: async (table: Partial<ITable>) =>
    await httpClient.post('/dragdrop/table/create', table),
  read: async (id: string) => {
    const res = await httpClient.get(`/dragdrop/table/read/${id}`);
    return res.data;
  },
  update: async (params: RequiredParamsToUpdate) =>
    await httpClient.put('/dragdrop/table/update', params),
  delete: async (id: string) =>
    await httpClient.delete('/dragdrop/table/delete', { params: { id } }),
});
