import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useDragDrop } from '../../hooks/useDragDrop';
import { ChangeEvent, FormEvent } from 'react';
import { ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useModal } from '../../hooks/useModal';
import { useBoardsMutations } from '../../hooks/useBoardsMutations';
import { BoardTitle } from './components/BoardTitle';
import { DroppableLayout } from './components/DroppableLayout';

const CIRCULAR_SX = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

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
      <BoardTitle
        isOpen={isOpen}
        onBlur={onBlur}
        openModal={openModal}
        title={boardInfo.title}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tables" type="TABLE" direction="horizontal">
          {(provided) => (
            <DroppableLayout
              provided={provided}
              tables={tables}
              isDragDisabled={isDragDisabled}
              backgroundImage={boardInfo.backgroundImage}
              deleteTable={deleteTable}
              mutateTable={mutateTable}
            />
          )}
        </Droppable>
      </DragDropContext>
      <ToastContainer />
    </>
  ) : (
    <CircularProgress sx={CIRCULAR_SX} />
  );
};
