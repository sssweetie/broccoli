import { Draggable } from '@hello-pangea/dnd';
import { Table } from './components/Table/Table';
import { ITable } from 'apps/libs/types/src';

interface Props {
  board: ITable[];
}

export const Tables = ({ board }: Props) => {
  return board.map((table, index) => (
    <Draggable draggableId={table._id} index={index} key={table._id}>
      {(provided) => <Table provided={provided} table={table} />}
    </Draggable>
  ));
};
