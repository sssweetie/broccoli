/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DragUpdate } from '@hello-pangea/dnd';
import { findTable, isTableExist, reorderTable } from 'apps/broccoli/src/utils';
import { useTableMutations } from './useTableMutations';
import { dragDropApi } from '../api/dragDropApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';

export const useDragDrop = () => {
  const { tables, boardInfo, id, createTable, deleteTable, updateTable } =
    useTableMutations(dragDropApi(httpClient));

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

      const newtables = tables.map((table, index) => ({
        ...table,
        order: index,
      }));

      updateTable.mutateAsync({
        updateInformation,
        boardToUpdate: newtables,
      });
    }

    if (!isDragTable && isSameTable) {
      const sourceTable = findTable(tables, source.droppableId);

      if (sourceTable && sourceTable.tasks) {
        const sourceTask = sourceTable.tasks[source.index];
        sourceTable!.removeTask(source.index);
        sourceTable.insertTask(destination!.index, sourceTask);
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
        sourceTable!.removeTask(source.index);
        destinationTable!.insertTask(destination!.index, sourceTask);

        reorderTable(sourceTable!);
        reorderTable(destinationTable!);
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
