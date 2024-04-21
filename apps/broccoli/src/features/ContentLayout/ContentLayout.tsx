import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tables } from '../Tables';
import { useDragDrop } from '../../hooks/useDragDrop';
import { AddForm } from '../../components/AddForm/AddForm';
import { ChangeEvent, FormEvent } from 'react';
import { ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useModal } from '../../hooks/useModal';
import { useBoardsMutations } from '../../hooks/useBoardsMutations';

export const ContentLayout = () => {
  const {
    onDragEnd,
    createTable,
    tables,
    isDragDisabled,
    deleteTable,
    boardInfo,
    id,
  } = useDragDrop();

  const { isOpen, openModal, closeModal } = useModal();
  const { updateBoardMutation } = useBoardsMutations();

  const mutateTable = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    const table = { order: tables?.length, tasks: [], title };
    await createTable.mutate({ table, boardId: id });
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    updateBoardMutation.mutate({ _id: id, title: e.target.value });
    closeModal();
  };

  return tables ? (
    <>
      <section className="board-title">
        {!isOpen ? (
          <h4 onClick={openModal}>{boardInfo.title}</h4>
        ) : (
          <input
            className="board-title--input"
            defaultValue={boardInfo.title}
            onBlur={onBlur}
            autoFocus
          />
        )}
      </section>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tables" type="TABLE" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boardInfo.backgroundImage ? (
                <img
                  alt="table background"
                  src={boardInfo.backgroundImage}
                  className="table-background"
                />
              ) : null}
              <div className="table-wrapper">
                <Tables
                  board={tables}
                  isDragDisabled={isDragDisabled}
                  deleteTable={deleteTable.mutate}
                />
                {provided.placeholder}
                <AddForm
                  mutateEntity={mutateTable}
                  title="Create a table"
                  formClassName="edit-table edit-table--independent"
                  addButtonClassName="add-table"
                  inputPlaceholder="Enter a table name..."
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ToastContainer />
    </>
  ) : (
    <CircularProgress
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};
