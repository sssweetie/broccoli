import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toastConfig } from 'apps/broccoli/src/services/toastConfig';
import { toast } from 'react-toastify';
import { callSuccessToast } from 'apps/broccoli/src/utils';
import { useParams } from 'react-router-dom';
import { dragDropApi } from '../api/dragDropAPI';
export const useTableMutations = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['board'],
    queryFn: () => dragDropApi.read(id!),
  });
  const queryClient = useQueryClient();
  const boardInfo = {
    title: data?.title,
    backgroundImage: data?.backgroundImage,
  };

  const onError = () => {
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
  }, [data]);

  return {
    tables: data?.tables ?? [],
    boardInfo,
    updateTable,
    createTable,
    deleteTable,
    id,
  };
};
