import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardsMutations } from './useBoardsMutations';

export const useBoards = () => {
  const navigate = useNavigate();
  const { createBoardMutation, deleteBoardMutation } = useBoardsMutations();
  const [value, setValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(
    null
  );

  const createBoard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createBoardMutation.mutate({
      title: value,
      backgroundImage: selectedImage?.src ?? '',
    });
  };

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const redirect = (id: string) => {
    navigate(`/application/dragdrop/${id}`);
  };

  const deleteBoard = async (
    e: React.MouseEvent<HTMLLIElement>,
    id: string
  ) => {
    e.stopPropagation();
    await deleteBoardMutation.mutate(id);
  };

  return {
    value,
    selectedImage,
    setSelectedImage,
    changeInputValue,
    createBoard,
    redirect,
    deleteBoard,
  };
};
