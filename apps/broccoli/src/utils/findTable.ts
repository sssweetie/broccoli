import { Table } from 'apps/libs/types/src';

export const findTable = (board: Table[], id: string) => {
  return board.find((table) => table._id === id);
};
