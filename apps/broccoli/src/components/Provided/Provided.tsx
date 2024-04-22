import { DraggableProvided } from '@hello-pangea/dnd';
import { FC, PropsWithChildren } from 'react';

interface ProvidedProps {
  provided: DraggableProvided;
  className: string;
  onClick?: VoidFunction;
}

export const Provided: FC<PropsWithChildren<ProvidedProps>> = ({
  provided,
  className,
  children,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      ref={provided.innerRef}
      className={className}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
    >
      {children}
    </div>
  );
};
