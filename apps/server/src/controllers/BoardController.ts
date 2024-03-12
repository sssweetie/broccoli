import { IBoard } from 'apps/libs/types/src';
import { BoardModel } from '../models/BoardModel';

export const BoardController = {
  create: async ({
    title,
    backgroundImage,
  }: {
    title: string;
    backgroundImage: string;
  }) => {
    const newBoard = await new BoardModel({
      tables: [],
      access: '',
      title,
      backgroundImage,
    });
    newBoard.save();
  },
  read: async () => {
    const boards = await BoardModel.find();
    return boards;
  },
  update: async (board: Partial<IBoard>) => {
    await BoardModel.findByIdAndUpdate(board._id, { ...board });
  },
  delete: async (id: string) => {
    await BoardModel.findByIdAndDelete(id);
  },
};
