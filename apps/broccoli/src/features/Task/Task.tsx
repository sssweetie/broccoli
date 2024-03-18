import { DraggableProvided } from '@hello-pangea/dnd';
import { ITask } from 'apps/libs/types/src';
import { DetailsTaskModal } from '../DetailsTaskModal';
import { useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

interface Props {
  provided: DraggableProvided;
  tableTitle: string;
  tableId: string;
  task: ITask;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Task: React.FC<Props> = ({
  provided,
  task,
  tableTitle,
  tableId,
  deleteTable,
}) => {
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
        deleteTable={deleteTable}
        task={task}
        tableId={tableId}
        tableTitle={tableTitle}
      />
    </>
  );
};
