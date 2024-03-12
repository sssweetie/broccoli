import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BoardsApi } from '../api/boardsApi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { callSuccessToast } from 'apps/broccoli/src/utils';
import { callErrorToast } from 'apps/broccoli/src/utils';

export const useBoards = (boardsApi: BoardsApi) => {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(
    null
  );
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
      callSuccessToast('Board is created successful;y!');
    },
    onError: () => {
      callErrorToast('Oops! Something went wrong...');
    },
  });

  const updateBoard = useMutation({
    mutationFn: boardsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
      callSuccessToast('Board is updated successfully!');
    },
    onError: () => {
      callErrorToast('Oops! Something went wrong...');
    },
  });

  const deleteBoard = useMutation({
    mutationFn: boardsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      callSuccessToast('Board is deleted successfully!');
    },
    onError: () => {
      callErrorToast('Oops! Something went wrong...');
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
    await createBoard.mutate({
      title: value,
      backgroundImage: selectedImage?.src ?? '',
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    boards: data,
    createBoard,
    updateBoard,
    deleteBoard,
    isOpen,
    value,
    selectedImage,
    setSelectedImage,
    closeModal,
    openModal,
    onChange,
    onSubmit,
  };
};
