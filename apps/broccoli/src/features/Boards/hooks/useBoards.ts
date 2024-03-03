import { useMutation, useQuery } from '@tanstack/react-query';
import { BoardsApi } from '../api/boardsApi';

export const useBoards = (boardsApi: BoardsApi) => {
  const { data } = useQuery({
    queryKey: ['boards'],
    queryFn: boardsApi.read,
  });

  const createBoard = useMutation({
    mutationFn: boardsApi.create,
  });

  return { boards: data, createBoard };
};
