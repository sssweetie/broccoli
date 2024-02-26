import { DraggableProvided } from '@hello-pangea/dnd';
import { ITask, UpdateTask } from 'apps/libs/types/src';
import { DetailsTaskModal } from './components/DetailsTaskModal';
import { useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

interface Props {
  provided: DraggableProvided;
  tableTitle: string;
  tableId: string;
  task: ITask;
  updateTask: UseMutateFunction<void, Error, UpdateTask, unknown>;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Task = ({
  provided,
  task,
  tableTitle,
  tableId,
  updateTask,
  deleteTable,
}: Props) => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <section
        onClick={openModal}
        className="table__task"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {task.title}
      </section>
      <DetailsTaskModal
        isOpen={isOpen}
        closeModal={closeModal}
        updateTask={updateTask}
        deleteTable={deleteTable}
        task={task}
        tableId={tableId}
        tableTitle={tableTitle}
      />
    </>
  );
};
