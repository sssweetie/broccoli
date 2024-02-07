import { Draggable } from '@hello-pangea/dnd';
import { Task } from './components/Task/Task';
import { ITable } from 'apps/libs/types/src';

interface Props {
  table: ITable;
}

export const Tasks = ({ table }: Props) => {
  return table.tasks.map((task, index) => (
    <Draggable draggableId={task._id} index={index} key={task._id}>
      {(provided) => <Task provided={provided} task={task} />}
    </Draggable>
  ));
};
