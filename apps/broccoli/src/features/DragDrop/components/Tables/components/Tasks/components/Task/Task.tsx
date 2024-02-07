import { DraggableProvided } from '@hello-pangea/dnd';
import { ITask } from 'apps/libs/types/src';

interface Props {
  provided: DraggableProvided;
  task: ITask;
}

export const Task = ({ provided, task }: Props) => {
  return (
    <section
      className="table__task"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {task.title}
    </section>
  );
};
