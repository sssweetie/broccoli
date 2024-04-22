import DescriptionIcon from '@mui/icons-material/Description';
import { UseMutateFunction } from '@tanstack/react-query';
import { Actions } from './components/Actions';
import { Content } from './components/Content';
import { Description as DescriptionType } from '../../DetailsTaskModal';
import { ChangeEvent, FormEvent, useState } from 'react';

interface DescriptionProps {
  description: DescriptionType;
  updateDescription: (description: string) => Promise<void>;
  deleteTableMutation: UseMutateFunction<void, Error, string, unknown>;
  deleteTaskMutation: UseMutateFunction<void, Error, string, unknown>;
}

export const Description: React.FC<DescriptionProps> = ({
  description,
  updateDescription,
  deleteTableMutation,
  deleteTaskMutation,
}) => {
  const [isEdit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(
    description.text ? description.text : ''
  );

  const disableEditMode = async () => {
    if (description.text !== inputValue) {
      await updateDescription(inputValue);
    }

    setEdit(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    disableEditMode();
  };

  const onBlur = async () => {
    disableEditMode();
  };

  const onClick = () => {
    setEdit(true);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleDeleteTable = async () => {
    await deleteTableMutation(description.tableId);
  };

  const handleDeleteTask = async () => {
    await deleteTaskMutation(description.taskId);
  };
  return (
    <form onSubmit={onSubmit} className="task__section">
      <DescriptionIcon />
      <Content
        isEdit={isEdit}
        value={inputValue}
        onClick={onClick}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Actions deleteTask={handleDeleteTask} deleteTable={handleDeleteTable} />
    </form>
  );
};
