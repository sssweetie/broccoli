import { ITable } from 'apps/libs/types/src';

export const isTableExist = (table: ITable | undefined) => {
  if (table && table.tasks) return true;
  else return false;
};