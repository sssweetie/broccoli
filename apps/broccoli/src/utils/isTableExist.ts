import { Table } from 'apps/libs/types/src';

export const isTableExist = (table?: Table): table is Table => {
  if (table && table.tasks) return true;
  return false;
};
