import { DragUpdate } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { DragDropApi } from '../api/dragDropApi';
import { ITable, RequiredParamsToUpdate } from 'apps/libs/types/src';

export const useDragDrop = (dragDropApi: DragDropApi) => {
  const [board, setBoard] = useState<ITable[]>([]);

  const createTable = async (table: ITable) => {
    await dragDropApi.create(table);
  };

  const getTables = async () => {
    try {
      const tables = await dragDropApi.read();
      setBoard(tables);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTable = async (params: RequiredParamsToUpdate) => {
    try {
      await dragDropApi.update(params);
      await getTables();
    } catch (error) {
      console.error(error);
    }
  };

  const onDragEnd = async (dragState: DragUpdate) => {
    const type = dragState.type.toLowerCase();
    let subType = 0;
    const boardState = [...board];
    const updateInformation = {
      subType: 0,
      type: 'table',
    };
    if (type === 'table') {
      if (dragState.destination) {
        subType = 0;
        const sourceIndex = dragState.source.index;
        const destinationIndex = dragState.destination.index;
        const source = boardState.splice(sourceIndex, 1);
        boardState.splice(destinationIndex, 0, source[0]);
        console.log(boardState);
        const newBoardState = boardState.map((value, index) => ({
          _id: value._id,
          order: index,
        }));
        console.log(newBoardState);
        updateInformation.type = type;
        updateInformation.subType = subType;

        await updateTable({ updateInformation, boardToUpdate: newBoardState });
      }
    }

    if (type === 'task') {
      if (dragState.source.droppableId === dragState.destination?.droppableId) {
        subType = 0;

        const sourceTable: ITable | undefined = boardState.find(
          (table) => table._id === dragState.source.droppableId
        );

        if (sourceTable && sourceTable.tasks) {
          const sourceTask = sourceTable.tasks[dragState.source.index];

          sourceTable.tasks.splice(dragState.source.index, 1);

          sourceTable?.tasks.splice(dragState.destination.index, 0, sourceTask);

          sourceTable.tasks.forEach(
            (task, index) =>
              (sourceTable.tasks[index] = {
                _id: task._id,
                order: index,
              })
          );
        }

        updateInformation.subType = subType;
        updateInformation.type = type;

        await updateTable({ updateInformation, updateTable: sourceTable });
      }

      if (dragState.source.droppableId !== dragState.destination?.droppableId) {
        subType = 1;

        const sourceTable: ITable | undefined = boardState.find(
          (table) => table._id === dragState.source.droppableId
        );

        const destinationTable: ITable | undefined = boardState.find(
          (table) => table._id === dragState.destination?.droppableId
        );

        if (
          sourceTable &&
          sourceTable.tasks &&
          destinationTable &&
          destinationTable.tasks
        ) {
          const sourceTask = sourceTable.tasks[dragState.source.index];

          sourceTable.tasks.splice(dragState.source.index, 1);

          destinationTable?.tasks.splice(
            dragState.destination!.index,
            0,
            sourceTask
          );

          sourceTable.tasks.forEach(
            (task, index) =>
              (sourceTable.tasks[index] = {
                _id: task._id,
                order: index,
              })
          );

          destinationTable.tasks.forEach(
            (task, index) =>
              (destinationTable.tasks[index] = {
                _id: task._id,
                order: index,
              })
          );
        }

        updateInformation.subType = subType;
        updateInformation.type = type;
        const updateBoard = {
          sourceTable,
          destinationTable,
        };
        await updateTable({ updateInformation, updateBoard });
      }
    }

    // setBoard((prevBoard) => {
    //   console.log(dragState, prevBoard);
    //   const boardState = [...prevBoard];

    //   if (dragState.source.droppableId === 'tables' && !dragState.destination) {
    //     return prevBoard;
    //   }

    //   if (dragState.source.droppableId === 'tables' && dragState.destination) {
    //     const sourceIndex = dragState.source.index;
    //     const destinationIndex = dragState.destination.index;
    //     const source = boardState.splice(sourceIndex, 1);
    //     boardState.splice(destinationIndex, 0, source[0]);
    //     return boardState;
    //   }

    //   if (dragState.source.droppableId !== 'tables' && dragState.destination) {
    //     const sourceTable: ITable | undefined = boardState.find(
    //       (table) => table._id === dragState.source.droppableId
    //     );

    //     const destinationTable: ITable | undefined = boardState.find(
    //       (table) => table._id === dragState.destination?.droppableId
    //     );

    //     if (!sourceTable) {
    //       return prevBoard;
    //     }

    //     if (!destinationTable) {
    //       return prevBoard;
    //     }

    //     const sourceTask = sourceTable.tasks[dragState.source.index];

    //     sourceTable.tasks.splice(dragState.source.index, 1);

    //     destinationTable?.tasks.splice(
    //       dragState.destination.index,
    //       0,
    //       sourceTask
    //     );

    //     return boardState.map((table) => {
    //       if (table._id === dragState.source.droppableId) {
    //         return sourceTable;
    //       }

    //       if (table._id === dragState.destination?.droppableId) {
    //         return destinationTable;
    //       }

    //       return table;
    //     });
    //   }

    //   if (!dragState.destination) {
    //     return prevBoard;
    //   }

    //   return prevBoard;
    // });
  };

  useEffect(() => {
    getTables();
  }, []);

  return { board, onDragEnd, createTable, updateTable };
};
