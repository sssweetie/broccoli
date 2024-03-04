import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BoardsApi } from '../api/boardsApi';
import { ChangeEvent, FormEvent, useState } from 'react';

export const useBoards = (boardsApi: BoardsApi) => {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['boards'],
    queryFn: boardsApi.read,
  });

  const createBoard = useMutation({
    mutationFn: boardsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      closeModal();
    },
  });

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createBoard.mutate({ title: value });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    boards: data,
    createBoard,
    isOpen,
    value,
    closeModal,
    openModal,
    onChange,
    onSubmit,
  };
};
