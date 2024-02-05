import { Draggable } from '@hello-pangea/dnd';
import { ITable } from '../../../../hooks/useDragDrop';
import { Task } from './components/Task/Task';

interface Props {
  table: ITable;
}

export const Tasks = ({ table }: Props) => {
  return table.tasks.map((task, index) => (
    <Draggable draggableId={task.id} index={index} key={task.id}>
      {(provided) => <Task provided={provided} task={task} />}
    </Draggable>
  ));
};
