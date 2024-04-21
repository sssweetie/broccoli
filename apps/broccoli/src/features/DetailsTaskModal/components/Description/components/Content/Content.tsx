import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { ChangeEvent } from 'react';
interface ContentProps {
  isEdit: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  onClick: () => void;
}

export const Content: React.FC<ContentProps> = ({
  isEdit,
  value,
  onChange,
  onBlur,
  onClick,
}) => {
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
          placeholder="Add a description..."
        />
      ) : (
        <div onClick={onClick} className="task__description">
          {value}
        </div>
      )}
    </div>
  );
};
