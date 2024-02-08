import { Draggable } from '@hello-pangea/dnd';
import { Task } from './components/Task/Task';
import { ITable } from 'apps/libs/types/src';

interface Props {
  table: ITable;
  isDragDisabled: boolean;
}

export const Tasks = ({ table, isDragDisabled }: Props) => {
  return table.tasks.map((task, index) => (
    <Draggable
      draggableId={task._id}
      index={index}
      key={task._id}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => <Task provided={provided} task={task} />}
    </Draggable>
  ));
};
