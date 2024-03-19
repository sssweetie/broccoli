import TitleIcon from '@mui/icons-material/Title';
import { ChangeEvent, FormEvent, useState } from 'react';

interface IProps {
  tableTitle: string;
  title: string | undefined;
  updateTitle: (title: string) => Promise<void>;
}

export const Title: React.FC<IProps> = ({ tableTitle, title, updateTitle }) => {
  const [isEdit, setEdit] = useState(false);
  const [value, setValue] = useState(title ? title : '');

  const disableEditMode = () => {
    if (title !== value) {
      updateTitle(value);
    }
    setEdit(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    disableEditMode();
  };

  const onBlur = () => {
    disableEditMode();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClick = () => {
    setEdit(true);
  };

  return (
    <form onSubmit={onSubmit} className="task__section">
      <TitleIcon />
      <div className="task__content">
        {isEdit ? (
          <input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus
            className="task__title-input"
          />
        ) : (
          <h3 onClick={onClick}>{value}</h3>
        )}
        <p>
          in table <span className="task__table-name">{tableTitle}</span>
        </p>
      </div>
    </form>
  );
};
