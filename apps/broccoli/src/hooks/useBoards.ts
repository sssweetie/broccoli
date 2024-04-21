import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardsMutations } from './useBoardsMutations';
import { getRandomBackgroundURL } from '../features/Firebase';

export const useBoards = () => {
  const { createBoardMutation, deleteBoardMutation } = useBoardsMutations();
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [images, setImages] = useState<string[]>([]);

  const createBoard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedImage = images[selectedIndex ?? 0];

    await createBoardMutation.mutate({
      title: value,
      backgroundImage: selectedImage ?? '',
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

  const fetchData = useCallback(() => {
    const getRandomIndex = () => Math.floor(Math.random() * 12) + 1;
    const indexes = new Set<number>();

    while (indexes.size < 6) {
      indexes.add(getRandomIndex());
    }

    Promise.all(Array.from(indexes, getRandomBackgroundURL)).then(setImages);
  }, []);

  const onClick = (index: number) => {
    setSelectedIndex(index);
  };

  return {
    value,
    onClick,
    selectedIndex,
    changeInputValue,
    setSelectedIndex,
    fetchData,
    createBoard,
    redirect,
    deleteBoard,
    images,
  };
};
