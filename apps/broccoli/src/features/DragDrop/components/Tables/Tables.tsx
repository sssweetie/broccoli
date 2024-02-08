import { Draggable } from '@hello-pangea/dnd';
import { Table } from './components/Table/Table';
import { ITable } from 'apps/libs/types/src';

interface Props {
  board: ITable[];
  isDragDisabled: boolean;
}

export const Tables = ({ board, isDragDisabled }: Props) => {
  return board.map((table, index) => (
    <Draggable draggableId={table._id} index={index} key={table._id} isDragDisabled={isDragDisabled}>
      {(provided) => <Table provided={provided} table={table} isDragDisabled={isDragDisabled}/>}
    </Draggable>
  ));
};
