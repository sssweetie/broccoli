import { Draggable } from '@hello-pangea/dnd';
import { ITable } from '../../hooks/useDragDrop';
import { Table } from './components/Table/Table';

interface Props {
  board: ITable[];
}

export const Tables = ({ board }: Props) => {
  return board.map((table, index) => (
    <Draggable draggableId={table.id} index={index} key={table.id}>
      {(provided) => <Table provided={provided} table={table} />}
    </Draggable>
  ));
};
