import { IBoard } from 'apps/libs/types/src';
import { AxiosInstance } from 'axios';

// interface CreateBoard {
//   permissions: string;
//   title: string;
//   orgId: string;
// }

export interface BoardsApi {
  create: (title: string) => Promise<void>;
  read: () => Promise<IBoard[]>;
}

export const boardsApi = (httpClient: AxiosInstance): BoardsApi => {
  return {
    create: async (title) => {
      await httpClient.post('/boards/create', title);
    },
    read: async () => {
      const boards = await httpClient.get('/boards/read');
      return boards.data;
    },
  };
};
