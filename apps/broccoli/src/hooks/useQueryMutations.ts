import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IDragDropAPI } from '../api/dragDropApi';
import { ITable } from 'apps/libs/types/src';
import { toastConfig } from 'apps/broccoli/src/services/toastConfig';
import { toast } from 'react-toastify';
import { callSuccessToast } from 'apps/broccoli/src/utils';
export const useQueryMutations = (dragDropApi: IDragDropAPI, id: string) => {
  const { data } = useQuery({
    queryKey: ['board'],
    queryFn: () => dragDropApi.read(id),
  });
  const [state, setState] = useState<ITable[] | undefined>(data?.tables);
  const queryClient = useQueryClient();
  const boardInfo = {
    title: data?.title,
    backgroundImage: data?.backgroundImage,
  };

  const onError = () => {
    setState((prevState) => prevState);
    toast.error('Oops! Something went wrong...', {
      ...toastConfig,
    });
  };

  const updateTable = useMutation({
    mutationFn: dragDropApi.update,
    onSuccess: () => callSuccessToast('Order', 'updated'),
    onError,
  });

  const createTable = useMutation({
    mutationFn: dragDropApi.create,
    onSuccess: () => {
      callSuccessToast('Table', 'created');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError,
  });

  const deleteTable = useMutation({
    mutationFn: dragDropApi.delete,
    onSuccess: () => {
      callSuccessToast('Table', 'deleted');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError,
  });

  useEffect(() => {
    data?.tables?.forEach((table) => {
      table.insertTask = function (insertIndex, taskToInsert) {
        this.tasks.splice(insertIndex, 0, taskToInsert);
      };
      table.removeTask = function (removeIndex) {
        this.tasks.splice(removeIndex, 1);
      };
    });

    setState(data?.tables);
  }, [data]);

  return {
    setState,
    state,
    boardInfo,
    updateTable,
    createTable,
    deleteTable,
  };
};
