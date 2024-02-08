/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DragUpdate } from '@hello-pangea/dnd';
import { DragDropApi } from '../api/dragDropApi';
import { ITable } from 'apps/libs/types/src';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Slide, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { findTable, isTableExist, reorderTable } from 'apps/broccoli/src/utils';

export const useDragDrop = (dragDropApi: DragDropApi) => {
  const { data } = useQuery({
    queryKey: ['board'],
    queryFn: dragDropApi.read,
  });

  const mutation = useMutation({
    mutationFn: dragDropApi.update,
    onSuccess: () => {
      toast.info('Order is updated!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
    },

    onError: () => {
      setState((prevState) => prevState);
      toast.error('Something went wrong!:(', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
    },
  });

  const [state, setState] = useState<ITable[] | undefined>(data);

  const createTable = async (table: ITable) => {
    await dragDropApi.create(table);
  };

  const onDragEnd = async (dragState: DragUpdate) => {
    const boardState = state ? [...state] : [];
    const updateInformation = {
      subType: 0,
      type: dragState.type.toLowerCase(),
    };
    
    const isDragTable = dragState.type.toLowerCase() === 'table';
    const isDestinationExist = dragState.destination ? true : false;
    const isSamePosition =
      dragState.destination?.index === dragState.source.index;
    const isSameTable =
      dragState.source.droppableId === dragState.destination?.droppableId;

    if (isDragTable && isDestinationExist && !isSamePosition) {
      const sourceIndex = dragState.source.index;
      const destinationIndex = dragState.destination!.index;
      const [source] = boardState.splice(sourceIndex, 1);
      boardState.splice(destinationIndex, 0, source);
      const newBoardState = boardState.map((table, index) => ({
        ...table,
        order: index,
      }));

      setState(newBoardState);

      mutation.mutateAsync({
        updateInformation,
        boardToUpdate: newBoardState,
      });
    }

    if (!isDragTable && isSameTable) {
      const sourceTable = findTable(boardState, dragState.source.droppableId);

      if (sourceTable && sourceTable.tasks) {
        const sourceTask = sourceTable.tasks[dragState.source.index];
        sourceTable!.removeTask(dragState.source.index);
        sourceTable.insertTask(dragState.destination!.index, sourceTask);
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

      mutation.mutate({
        updateInformation,
        updateTable: sourceTable,
      });
    }

    if (!isDragTable && isDestinationExist && !isSameTable) {
      updateInformation.subType = 1;

      const sourceTable = findTable(boardState, dragState.source.droppableId);
      const destinationTable = findTable(
        boardState,
        dragState.destination!.droppableId
      );

      if (isTableExist(sourceTable) && isTableExist(destinationTable)) {
        const sourceTask = sourceTable!.tasks[dragState.source.index];
        sourceTable!.removeTask(dragState.source.index);
        destinationTable!.insertTask(dragState.destination!.index, sourceTask);

        reorderTable(sourceTable!);
        reorderTable(destinationTable!);
      }

      const boardsToUpdate = {
        sourceTable,
        destinationTable,
      };

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

      mutation.mutate({ updateInformation, updateBoard: boardsToUpdate });
    }
  };

  useEffect(() => {
    data?.forEach((table) => {
      table.insertTask = function (insertIndex, taskToInsert) {
        this.tasks.splice(insertIndex, 0, taskToInsert);
      };
      table.removeTask = function (removeIndex) {
        this.tasks.splice(removeIndex, 1);
      };
    });

    setState(data);
  }, [data]);

  return {
    board: state,
    onDragEnd,
    createTable,
    isDragDisabled: mutation.isPending,
  };
};
