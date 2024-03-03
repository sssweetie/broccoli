import { ITable } from 'apps/libs/types/src';

export const reorderTable = (table: ITable) => {
  table.tasks.forEach(
    (task, index) =>
      (table.tasks[index] = {
        ...task,
        order: index,
      })
  );
};
