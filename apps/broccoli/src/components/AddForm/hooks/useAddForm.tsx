import { ChangeEvent, FormEvent, useState } from 'react';
import { MutateForm } from '../AddForm';

export const useAddForm = (mutateEntity: MutateForm) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const turnEditModeOn = () => {
    setEditMode(true);
  };

  const turnEditModeOff = () => {
    setEditMode(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await mutateEntity(e, inputValue);
    setEditMode(false);
    setInputValue('');
  };

  return {
    editMode,
    inputValue,
    turnEditModeOn,
    turnEditModeOff,
    onChange,
    onSubmit,
  };
};
