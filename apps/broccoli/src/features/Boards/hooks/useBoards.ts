import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IBoardsAPI } from '../api/boardsApi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { callSuccessToast } from 'apps/broccoli/src/utils';
import { callErrorToast } from 'apps/broccoli/src/utils';
import { useNavigate } from 'react-router-dom';
import { toastActions } from 'apps/broccoli/src/constants/toastActions';

const TOAST_ERROR_MESSAGE = 'Oops! Something went wrong...';
const ENTITY = 'Board';

export const useBoards = (boardsApi: IBoardsAPI) => {
  const navigate = useNavigate();
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

  const createBoardMutation = useMutation({
    mutationFn: boardsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      closeModal();
      callSuccessToast(ENTITY, toastActions.created);
    },
    onError: () => {
      callErrorToast(TOAST_ERROR_MESSAGE);
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: boardsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
      callSuccessToast(ENTITY, toastActions.updated);
    },
    onError: () => {
      callErrorToast(TOAST_ERROR_MESSAGE);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: boardsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      callSuccessToast(ENTITY, toastActions.deleted);
    },
    onError: () => {
      callErrorToast(TOAST_ERROR_MESSAGE);
    },
  });

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const createBoardOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    boards: data,
    createBoard: createBoardMutation,
    updateBoard: updateBoardMutation,
    isOpen,
    value,
    selectedImage,
    setSelectedImage,
    closeModal,
    openModalOnClick: openModal,
    changeInputValue,
    createBoardOnSubmit,
    redirect,
    deleteBoard,
  };
};
