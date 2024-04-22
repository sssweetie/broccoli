/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DragUpdate } from '@hello-pangea/dnd';
import { findTable, isTableExist, reorderTable } from 'apps/broccoli/src/utils';
import { useTableMutations } from './useTableMutations';
import { Task } from 'apps/libs/types/src';

interface InsertTask {
  insertIndex: number;
  taskToInsert: Task;
  tasksToMutate: Task[];
}

interface RemoveTask {
  removeIndex: number;
  tasksToMutate: Task[];
}

const insertTask = (data: InsertTask) => {
  const { insertIndex, taskToInsert, tasksToMutate } = data;
  tasksToMutate.splice(insertIndex, 0, taskToInsert);
};

const removeTask = (data: RemoveTask) => {
  const { tasksToMutate, removeIndex } = data;
  tasksToMutate.splice(removeIndex, 1);
};

export const useDragDrop = () => {
  const { tables, boardInfo, id, createTable, deleteTable, updateTable } =
    useTableMutations();

  const onDragEnd = async ({ type, source, destination }: DragUpdate) => {
    const updateInformation = {
      subType: 0,
      type: type.toLowerCase(),
    };
    const isDragTable = type.toLowerCase() === 'table';
    const isDestinationExist = destination ? true : false;
    const isSamePosition = destination?.index === source.index;
    const isSameTable = source.droppableId === destination?.droppableId;

    if (isDragTable && isDestinationExist && !isSamePosition) {
      const [sourceTable] = tables.splice(source.index, 1);

      tables.splice(destination!.index, 0, sourceTable);

      const newTables = tables.map((table, index) => ({
        ...table,
        order: index,
      }));

      updateTable.mutateAsync({
        updateInformation,
        boardToUpdate: newTables,
      });
    }

    if (!isDragTable && isSameTable) {
      const sourceTable = findTable(tables, source.droppableId);

      if (sourceTable && sourceTable.tasks) {
        const sourceTask = sourceTable.tasks[source.index];
        const removeData: RemoveTask = {
          removeIndex: source.index,
          tasksToMutate: sourceTable.tasks,
        };
        const insertData: InsertTask = {
          insertIndex: destination.index,
          taskToInsert: sourceTask,
          tasksToMutate: sourceTable.tasks,
        };

        removeTask(removeData);
        insertTask(insertData);
        reorderTable(sourceTable);
      }

      updateTable.mutate({
        updateInformation,
        updateTable: sourceTable,
      });
    }

    if (!isDragTable && isDestinationExist && !isSameTable) {
      updateInformation.subType = 1;

      const sourceTable = findTable(tables, source.droppableId);
      const destinationTable = findTable(tables, destination!.droppableId);

      if (isTableExist(sourceTable) && isTableExist(destinationTable)) {
        const sourceTask = sourceTable!.tasks[source.index];
        const removeData: RemoveTask = {
          removeIndex: source.index,
          tasksToMutate: sourceTable.tasks,
        };
        const insertData: InsertTask = {
          insertIndex: destination!.index,
          taskToInsert: sourceTask,
          tasksToMutate: destinationTable.tasks,
        };

        removeTask(removeData);
        insertTask(insertData);
        reorderTable(sourceTable);
        reorderTable(destinationTable);
      }

      updateTable.mutate({
        updateInformation,
        updateBoard: {
          sourceTable,
          destinationTable,
        },
      });
    }
  };

  return {
    onDragEnd,
    tables,
    createTable,
    deleteTable,
    isDragDisabled: updateTable.isPending,
    boardInfo,
    id,
  };
};
