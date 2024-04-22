import { FC, FormEvent } from 'react';
import { BackgroundImage } from '../BackgroundImage';
import { Draggable, DroppableProvided } from '@hello-pangea/dnd';
import { Table as TableType, VoidFunction } from 'apps/libs/types/src';
import { AddFormLayout } from 'apps/broccoli/src/components/AddFormLayout';
import { Table } from '../../../Table';

interface DroppableLayoutProps {
  provided: DroppableProvided;
  tables: TableType[];
  backgroundImage?: string;
  isDragDisabled: boolean;
  deleteTable: VoidFunction;
  mutateTable: (e: FormEvent<HTMLFormElement>, title: string) => Promise<void>;
}

export const DroppableLayout: FC<DroppableLayoutProps> = ({
  provided,
  tables,
  backgroundImage,
  isDragDisabled,
  deleteTable,
  mutateTable,
}) => {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <BackgroundImage backgroundImage={backgroundImage} />
      <div className="table-wrapper">
        {tables.map((table, index) => (
          <Draggable
            draggableId={table._id}
            key={table._id}
            index={index}
            isDragDisabled={isDragDisabled}
          >
            {(provided) => (
              <Table
                provided={provided}
                deleteTable={deleteTable}
                table={table}
                isDragDisabled={isDragDisabled}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        <AddFormLayout
          mutateEntity={mutateTable}
          title="Create a table"
          formClassName="edit-table edit-table--independent"
          addButtonClassName="add-table"
          inputPlaceholder="Enter a table name..."
        />
      </div>
    </div>
  );
};
