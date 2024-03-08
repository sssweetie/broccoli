export interface ITable {
  _id: string;
  order: number;
  title: string;
  tasks: ITask[];
  insertTask: (insertIndex: number, taskToInsert: ITask) => void;
  removeTask: (removeIndex: number) => void;
}

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

