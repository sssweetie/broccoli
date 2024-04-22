import { VoidFunction } from 'apps/libs/types/src';
import { FC } from 'react';

interface AddFormButtonProps {
  title: string;
  addButtonClassName: string;
  openModal: VoidFunction;
}

export const AddFormButton: FC<AddFormButtonProps> = ({
  title,
  addButtonClassName,
  openModal,
}) => {
  return (
    <div className={addButtonClassName} onClick={openModal}>
      <span className="add-task__plus">+</span>
      {title}
    </div>
  );
};
