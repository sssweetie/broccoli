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
};
