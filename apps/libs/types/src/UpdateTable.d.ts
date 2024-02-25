import { ITask } from './Table';

export interface UpdateInformation {
  type: string;
  subType: number;
}

export interface TablesToUpdate {
  sourceTable: UpdateTable;
  destinationTable: UpdateTable;
}

export interface RequiredParamsToUpdate {
  updateInformation: UpdateInformation;
  boardToUpdate?: Partial<ITable>[];
  updateBoard?: TablesToUpdate;
  updateTable?: Partial<ITable>;
}

export interface UpdateTask {
  tableId: string;
  task: Partial<ITask>;
}
