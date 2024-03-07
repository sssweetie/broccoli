import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { ChangeEvent } from 'react';

interface Props {
  isEdit: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  onClick: () => void;
}

export const Content = ({
  isEdit,
  value,
  onChange,
  onBlur,
  onClick,
}: Props) => {
  return (
    <div className="task__content">
      <h3>Description</h3>
      {isEdit ? (
        <TextareaAutosize
          autoFocus
          className="task__description"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <div onClick={onClick} className="task__description">
          {value}
        </div>
      )}
    </div>
  );
};
