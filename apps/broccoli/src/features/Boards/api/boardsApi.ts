import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { Board, CreateBoard } from 'apps/libs/types/src';

export interface BoardsAPI {
  create: (createBoard: CreateBoard) => Promise<void>;
  read: () => Promise<Board[]>;
  update: (board: Partial<Board>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const boardsApi: BoardsAPI = {
  create: async (createBoard) => {
    await httpClient.post('/boards/create', createBoard);
  },
  read: async () => {
    const boards = await httpClient.get('/boards/read');
    return boards.data;
  },
  update: async (board) => {
    await httpClient.put('/boards/update', board);
  },
  delete: async (id) => {
    await httpClient.delete(`/boards/delete/${id}`);
  },
};
