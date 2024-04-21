import { DraggableProvided, Droppable } from '@hello-pangea/dnd';
import { Table as TableType } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';
import { DropdownMenu } from '../../components/DropdownMenu';
import { DeleteTableModal } from '../ContentLayout/components/DeleteTableModal';
import { FormEvent } from 'react';
import { useTask } from '../../hooks/useTask';
import { Tasks } from '../Tasks';
import { MenuItem } from '@mui/material';
import { useModal } from '../../hooks/useModal';
import { AddFormLayout } from '../../components/AddFormLayout';
interface TableProps {
  provided: DraggableProvided;
  table: TableType;
  isDragDisabled: boolean;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Table: React.FC<TableProps> = ({
  provided,
  table,
  isDragDisabled,
  deleteTable,
}) => {
  const { createTask } = useTask();
  const { isOpen, closeModal, openModal } = useModal();

  const mutateTask = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    const task = {
      title,
      order: table.tasks.length - 1,
    };
    await createTask.mutate({ tableId: table._id, task });
  };

  const items = [
    <MenuItem onClick={openModal} key="delete-table">
      Delete table
    </MenuItem>,
  ];

  return (
    <article
      className="table"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <section className="table__header">
        <h3 className="table__title">{table.title}</h3>
        <DropdownMenu items={items} />
      </section>

      <Droppable droppableId={table._id} type="TASK">
        {(provided) => (
          <div
            className="table__tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Tasks
              table={table}
              isDragDisabled={isDragDisabled}
              deleteTable={deleteTable}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddFormLayout
        mutateEntity={mutateTask}
        title="Create a task"
        formClassName="edit-table table__add-form"
        addButtonClassName="add-task"
        inputPlaceholder="Enter a task name..."
      />
      <DeleteTableModal
        isModalOpen={isOpen}
        closeModal={closeModal}
        deleteTable={deleteTable}
        tableId={table._id}
      />
    </article>
  );
};
