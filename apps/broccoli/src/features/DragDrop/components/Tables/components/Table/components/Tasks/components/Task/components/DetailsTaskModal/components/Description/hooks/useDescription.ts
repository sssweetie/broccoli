import { UseMutateFunction } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IDescription } from '../../../DetailsTaskModal';

interface Mutations {
  updateDescription: (value: string) => Promise<void>;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
  deleteTask: UseMutateFunction<void, Error, string, unknown>;
}

interface Props {
  description: IDescription;
  mutations: Mutations;
}

export const useDescription = ({ description, mutations }: Props) => {
  const [isEdit, setEdit] = useState(false);
  const [descriptionState, setDescriptionState] = useState(
    description.text ? description.text : ''
  );

  const disableEditMode = async () => {
    if (description.text !== descriptionState) {
      await mutations.updateDescription(descriptionState);
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

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionState(e.target.value);
  };

  const onClick = () => {
    setEdit(true);
  };

  const handleDeleteTable = async () => {
    await mutations.deleteTable(description.tableId);
  };

  const handleDeleteTask = async () => {
    await mutations.deleteTask(description.taskId);
  };

  return {
    models: { isEdit, descriptionState },
    operations: {
      handleDeleteTask,
      handleDeleteTable,
      onSubmit,
      onBlur,
      onChange,
      onClick,
    },
  };
};
