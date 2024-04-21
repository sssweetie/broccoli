type UpdateTable = Partial<Table>;

import { Task } from './Task';

export interface Table {
  _id: string;
  order: number;
  title: string;
  tasks: Task[];
  insertTask: (insertIndex: number, taskToInsert: Task) => void;
  removeTask: (removeIndex: number) => void;
}

export interface UpdateInformation {
  type: string;
  subType: 0 | 1;
}

export interface TablesToUpdate {
  sourceTable: UpdateTable;
  destinationTable: UpdateTable;
}

export interface RequiredParamsToUpdate {
  updateInformation: UpdateInformation;
  boardToUpdate?: UpdateTable[];
  updateBoard?: TablesToUpdate;
  updateTable?: UpdateTable;
}

export interface CreateTable {
  table: UpdateTable;
  boardId: string;
}
