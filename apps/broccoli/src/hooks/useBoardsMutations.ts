import { toastActions } from 'apps/broccoli/src/constants/Toast/toastActions';
import { callSuccessToast } from 'apps/broccoli/src/utils';
import { callErrorToast } from 'apps/broccoli/src/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { boardsApi } from '../features/Boards/api/boardsApi';

const TOAST_ERROR_MESSAGE = 'Oops! Something went wrong...';
const ENTITY = 'Board';

export const useBoardsMutations = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['boards'],
    queryFn: boardsApi.read,
  });

  const createBoardMutation = useMutation({
    mutationFn: boardsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
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

  return {
    boards: data,
    createBoardMutation,
    updateBoardMutation,
    deleteBoardMutation,
  };
};
