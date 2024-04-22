import {
  Board,
  CreateTable,
  RequiredParamsToUpdate,
} from 'apps/libs/types/src';
import { httpClient } from '../services/httpClient';

export interface DragDropAPI {
  create: (createTable: CreateTable) => Promise<void>;
  read: (id: string) => Promise<Partial<Board>>;
  update: (params: RequiredParamsToUpdate) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const dragDropApi: DragDropAPI = {
  create: async (createTable) =>
    await httpClient.post('/dragdrop/table/create', createTable),
  read: async (id: string) => {
    const res = await httpClient.get(`/dragdrop/table/read/${id}`);
    return res.data;
  },
  update: async (params: RequiredParamsToUpdate) =>
    await httpClient.put('/dragdrop/table/update', params),
  delete: async (id: string) =>
    await httpClient.delete('/dragdrop/table/delete', { params: { id } }),
};
