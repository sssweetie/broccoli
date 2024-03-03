import { IBoard } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

interface CreateBoard {
  permissions: string;
  title: string;
  orgId: string;
}

export interface BoardsApi {
  create: (createBoard: CreateBoard) => Promise<void>;
  read: () => Promise<IBoard[]>;
}

export const boardsApi = (httpClient: AxiosInstance): BoardsApi => {
  return {
    create: async (createBoard) => {
      await httpClient.post('/boards/create', createBoard);
    },
    read: async () => {
      const boards = await httpClient.get('/boards/read');
      return boards.data;
    },
  };
};
