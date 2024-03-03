import { BoardModel } from '../models/BoardModel';
import { IBoard } from 'apps/libs/types/src';

export const BoardController = {
  create: async (board: IBoard) => {
    const newBoard = await new BoardModel(board);
    newBoard.save();
  },

  read: async () => {
    const boards = await BoardModel.find();
    return boards;
  },
};
