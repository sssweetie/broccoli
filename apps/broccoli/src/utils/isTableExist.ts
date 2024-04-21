import { Table } from 'apps/libs/types/src';

export const isTableExist = (table: Table | undefined) => {
  if (table && table.tasks) return true;
  else return false;
};
