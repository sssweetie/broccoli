/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DragUpdate } from '@hello-pangea/dnd';
import { findTable, isTableExist, reorderTable } from 'apps/broccoli/src/utils';
import { useQueryMutations } from './useQueryMutations';
import { dragDropApi } from '../api/dragDropApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';

export const useDragDrop = () => {
  const { state, updateTable, setState, createTable, deleteTable } =
    useQueryMutations(dragDropApi(httpClient));

  const onDragEnd = async ({ type, source, destination }: DragUpdate) => {
    const boardState = state ? [...state] : [];
    const updateInformation = {
      subType: 0,
      type: type.toLowerCase(),
    };
    const isDragTable = type.toLowerCase() === 'table';
    const isDestinationExist = destination ? true : false;
    const isSamePosition = destination?.index === source.index;
    const isSameTable = source.droppableId === destination?.droppableId;

    if (isDragTable && isDestinationExist && !isSamePosition) {
      const [sourceTable] = boardState.splice(source.index, 1);

      boardState.splice(destination!.index, 0, sourceTable);

      const newBoardState = boardState.map((table, index) => ({
        ...table,
        order: index,
      }));

      setState(newBoardState);

      updateTable.mutateAsync({
        updateInformation,
        boardToUpdate: newBoardState,
      });
    }

    if (!isDragTable && isSameTable) {
      const sourceTable = findTable(boardState, source.droppableId);

      if (sourceTable && sourceTable.tasks) {
        const sourceTask = sourceTable.tasks[source.index];
        sourceTable!.removeTask(source.index);
        sourceTable.insertTask(destination!.index, sourceTask);
        reorderTable(sourceTable);
      }

      setState((prevState) =>
        prevState?.map((table) => {
          if (table._id === sourceTable?._id) {
            return { ...table, tasks: sourceTable.tasks };
          }
          return table;
        })
      );

      updateTable.mutate({
        updateInformation,
        updateTable: sourceTable,
      });
    }

    if (!isDragTable && isDestinationExist && !isSameTable) {
      updateInformation.subType = 1;

      const sourceTable = findTable(boardState, source.droppableId);
      const destinationTable = findTable(boardState, destination!.droppableId);

      if (isTableExist(sourceTable) && isTableExist(destinationTable)) {
        const sourceTask = sourceTable!.tasks[source.index];
        sourceTable!.removeTask(source.index);
        destinationTable!.insertTask(destination!.index, sourceTask);

        reorderTable(sourceTable!);
        reorderTable(destinationTable!);
      }

      setState((prevState) =>
        prevState?.map((table) => {
          if (table._id === sourceTable?._id) {
            return { ...table, tasks: sourceTable.tasks };
          }
          if (table._id === destinationTable?._id) {
            return { ...table, tasks: destinationTable.tasks };
          }
          return table;
        })
      );

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
    board: state,
    onDragEnd,
    createTable,
    deleteTable,
    isDragDisabled: updateTable.isPending,
  };
};
