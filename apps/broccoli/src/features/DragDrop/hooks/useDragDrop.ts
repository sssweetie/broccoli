import { DragUpdate } from '@hello-pangea/dnd';
import { useState } from 'react';

export interface ITable {
  id: string;
  title: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
}

const table: ITable = {
  id: '1234',
  title: 'Todo',
  tasks: [
    { id: '234', title: 'First task' },
    { id: '235', title: 'Second task' },
  ],
};

const secondTable: ITable = {
  id: '2345',
  title: 'Done',
  tasks: [
    { id: '134', title: 'First task' },
    { id: '135', title: 'Another task' },
  ],
};

const thirdTable: ITable = {
  id: '3456',
  title: 'In progress',
  tasks: [
    { id: '365', title: 'hello' },
    { id: '366', title: 'world' },
  ],
};

const tables: ITable[] = [table, secondTable, thirdTable];

export const useDragDrop = () => {
  const [board, setBoard] = useState<ITable[]>(tables);

  const onDragEnd = (dragState: DragUpdate) => {
    setBoard((prevBoard) => {
      const boardState = [...prevBoard];

      if (dragState.source.droppableId === 'tables' && !dragState.destination) {
        return prevBoard;
      }

      if (dragState.source.droppableId === 'tables' && dragState.destination) {
        const sourceIndex = dragState.source.index;
        const destinationIndex = dragState.destination.index;
        const source = boardState.splice(sourceIndex, 1);
        boardState.splice(destinationIndex, 0, source[0]);
        return boardState;
      }

      if (dragState.source.droppableId !== 'tables' && dragState.destination) {
        const sourceTable: ITable | undefined = boardState.find(
          (table) => table.id === dragState.source.droppableId
        );

        const destinationTable: ITable | undefined = boardState.find(
          (table) => table.id === dragState.destination?.droppableId
        );

        if (!sourceTable) {
          return prevBoard;
        }

        if (!destinationTable) {
          return prevBoard;
        }

        const sourceTask = sourceTable.tasks[dragState.source.index];

        sourceTable.tasks.splice(dragState.source.index, 1);

        destinationTable?.tasks.splice(
          dragState.destination.index,
          0,
          sourceTask
        );

        return boardState.map((table) => {
          if (table.id === dragState.source.droppableId) {
            return sourceTable;
          }

          if (table.id === dragState.destination?.droppableId) {
            return destinationTable;
          }

          return table;
        });
      }

      if (!dragState.destination) {
        return prevBoard;
      }

      return prevBoard;
    });
  };

  return { board, onDragEnd };
};
