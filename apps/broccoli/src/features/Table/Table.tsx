import { DraggableProvided, Droppable } from '@hello-pangea/dnd';
import { ITable } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';
import { DropdownMenu } from '../../components/DropdownMenu';
import { DeleteTableModal } from '../ContentLayout/components/DeleteTableModal';
import { FormEvent, useState } from 'react';
import { useTask } from '../../hooks/useTask';
import { Tasks } from '../Tasks';
import { taskApi } from '../../api/taskApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { AddForm } from 'apps/broccoli/src/components/AddForm/AddForm';
import { MenuItem } from '@mui/material';
interface IProps {
  provided: DraggableProvided;
  table: ITable;
  isDragDisabled: boolean;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Table: React.FC<IProps> = ({
  provided,
  table,
  isDragDisabled,
  deleteTable,
}) => {
  const { createTask } = useTask(taskApi(httpClient));
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
      <AddForm
        mutate={mutateTask}
        title="Create a task"
        formClassName="edit-table table__add-form"
        addButtonClassName="add-task"
        inputPlaceholder="Enter a task name..."
      />
      <DeleteTableModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        deleteTable={deleteTable}
        tableId={table._id}
      />
    </article>
  );
};
