import { ChangeEvent, FC } from 'react';

interface BoardTitleProps {
  isOpen: boolean;
  title?: string;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  openModal: () => void;
}

export const BoardTitle: FC<BoardTitleProps> = ({
  isOpen,
  title,
  onBlur,
  openModal,
}) => {
  return !isOpen ? (
    <h4 onClick={openModal}>{title}</h4>
  ) : (
    <input
      className="board-title--input"
      defaultValue={title}
      onBlur={onBlur}
      autoFocus
    />
  );
};
