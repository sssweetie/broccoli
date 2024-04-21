import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tables } from '../Tables';
import { useDragDrop } from '../../hooks/useDragDrop';
import { ChangeEvent, FormEvent } from 'react';
import { ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useModal } from '../../hooks/useModal';
import { useBoardsMutations } from '../../hooks/useBoardsMutations';
import { BoardTitle } from './components/BoardTitle';
import { BackgroundImage } from './components/BackgroundImage';
import { AddFormLayout } from '../../components/AddFormLayout';

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
        <BoardTitle
          isOpen={isOpen}
          onBlur={onBlur}
          openModal={openModal}
          title={boardInfo.title}
        />
      </section>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tables" type="TABLE" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <BackgroundImage backgroundImage={boardInfo.backgroundImage} />
              <div className="table-wrapper">
                <Tables
                  board={tables}
                  isDragDisabled={isDragDisabled}
                  deleteTable={deleteTable.mutate}
                />
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
