import { IBoard } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

interface CreateBoard {
  title: string;
  backgroundImage: string;
}

export interface BoardsApi {
  create: ({ title, backgroundImage }: CreateBoard) => Promise<void>;
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
