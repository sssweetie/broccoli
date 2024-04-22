import { VoidFunction } from 'apps/libs/types/src';
import { ChangeEvent, FC } from 'react';

interface BoardTitleProps {
  isOpen: boolean;
  title?: string;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  openModal: VoidFunction;
}

export const BoardTitle: FC<BoardTitleProps> = ({
  isOpen,
  title,
  onBlur,
  openModal,
}) => {
  return (
    <section className="board-title">
      {!isOpen ? (
        <h4 onClick={openModal}>{title}</h4>
      ) : (
        <input
          className="board-title--input"
          defaultValue={title}
          onBlur={onBlur}
          autoFocus
        />
      )}
    </section>
  );
};
