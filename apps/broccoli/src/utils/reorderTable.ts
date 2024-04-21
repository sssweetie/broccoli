import { Table } from 'apps/libs/types/src';

export const reorderTable = (table: Table) => {
  table.tasks.forEach(
    (task, index) =>
      (table.tasks[index] = {
        ...task,
        order: index,
      })
  );
};
