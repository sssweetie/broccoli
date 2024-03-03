import { ITable, RequiredParamsToUpdate } from 'apps/libs/types/src';
import { TableModel } from '../models/TableModel';
import { TaskModel } from '../models/TaskModel';
import { BoardModel } from '../models/BoardModel';

interface CreateTable {
  table: Partial<ITable>;
  boardId: string;
}

export const TableController = {
  create: async ({ table, boardId }: CreateTable) => {
    BoardModel;
    const newTable = await TableModel.create(table);
    await BoardModel.findByIdAndUpdate(boardId, {
      $push: {
        tables: newTable._id,
      },
    });
  },
  read: async (id: string) => {
    try {
      const board = await BoardModel.findById(id).populate({
        path: 'tables',
        populate: {
          path: 'tasks',
        },
      });
      const tables: ITable[] = board.tables;
      tables.sort((a, b) => a.order - b.order);
      tables.forEach((table) => {
        table.tasks.sort((a, b) => a.order - b.order);
      });

      return tables;
    } catch (errors) {
      console.log(errors);
    }
  },
  update: async ({
    updateInformation,
    boardToUpdate,
    updateBoard,
    updateTable,
  }: RequiredParamsToUpdate) => {
    const type = updateInformation.type;

    if (type === 'table' && updateInformation.subType === 0) {
      // card is dropped on another spot
      for (const table of boardToUpdate) {
        await TableModel.findByIdAndUpdate(table._id, { order: table.order });
      }
    }

    if (type === 'task' && updateInformation.subType === 0) {
      // task is dropped on the same table but another spot
      for (const task of updateTable.tasks) {
        await TaskModel.findByIdAndUpdate(task._id, { order: task.order });
      }
    }

    if (type === 'task' && updateInformation.subType === 1) {
      //task is dropped on another table
      await TableModel.findByIdAndUpdate(updateBoard.sourceTable._id, {
        tasks: updateBoard.sourceTable.tasks.map((task) => task._id),
      });

      await TableModel.findByIdAndUpdate(updateBoard.destinationTable._id, {
        tasks: updateBoard.destinationTable.tasks.map((task) => task._id),
      });

      for (const task of updateBoard.sourceTable.tasks) {
        await TaskModel.findByIdAndUpdate(task._id, { order: task.order });
      }

      for (const task of updateBoard.destinationTable.tasks) {
        await TaskModel.findByIdAndUpdate(task._id, { order: task.order });
      }
    }
  },

  delete: async (id: string) => await TableModel.findByIdAndDelete(id),
};
