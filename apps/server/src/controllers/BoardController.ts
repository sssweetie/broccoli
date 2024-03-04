import { BoardModel } from '../models/BoardModel';

export const BoardController = {
  create: async ({ title }: { title: string }) => {
    const newBoard = await new BoardModel({ tables: [], title, access: '' });
    console.log(newBoard);

    newBoard.save();
  },

  read: async () => {
    const boards = await BoardModel.find();
    return boards;
  },
};
