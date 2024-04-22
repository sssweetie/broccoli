import { ChangeEvent, FormEvent, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { AddForm } from './components/AddForm';
import { AddFormButton } from './components/AddFormButton';

export type MutateForm = (
  e: FormEvent<HTMLFormElement>,
  inputValue: string
) => void;

export interface AddFormLayoutProps {
  title: string;
  formClassName: string;
  inputPlaceholder: string;
  addButtonClassName: string;
  mutateEntity: MutateForm;
}

export const AddFormLayout: React.FC<AddFormLayoutProps> = ({
  inputPlaceholder,
  addButtonClassName,
  formClassName,
  title,
  mutateEntity,
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [inputValue, setInputValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await mutateEntity(e, inputValue);
    closeModal();
    setInputValue('');
  };

  return isOpen ? (
    <AddForm
      title={title}
      inputPlaceholder={inputPlaceholder}
      formClassName={formClassName}
      inputValue={inputValue}
      closeModal={closeModal}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  ) : (
    <AddFormButton
      title={title}
      addButtonClassName={addButtonClassName}
      openModal={openModal}
    />
  );
};
