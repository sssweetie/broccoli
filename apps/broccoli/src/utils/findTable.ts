import { ITable } from 'apps/libs/types/src';

export const findTable = (board: ITable[], id: string) => {
  return board.find((table) => table._id === id);
};
