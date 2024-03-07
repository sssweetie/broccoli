import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DragDropApi } from '../api/dragDropApi';
import { ITable } from 'apps/libs/types/src';
import { toastConfig } from 'apps/broccoli/src/services/toastConfig';
import { toast } from 'react-toastify';
import { callSuccessToast } from 'apps/broccoli/src/utils';
export const useQueryMutations = (dragDropApi: DragDropApi, id: string) => {
  const { data } = useQuery({
    queryKey: ['board'],
    queryFn: () => dragDropApi.read(id),
  });

  const [state, setState] = useState<ITable[] | undefined>(data);

  const queryClient = useQueryClient();

  const onError = () => {
    setState((prevState) => prevState);
    toast.error('Something went wrong! :(', {
      ...toastConfig,
    });
  };

  const updateTable = useMutation({
    mutationFn: dragDropApi.update,
    onSuccess: () => callSuccessToast('Order is updated!'),
    onError,
  });

  const createTable = useMutation({
    mutationFn: dragDropApi.create,
    onSuccess: () => {
      callSuccessToast('Table is added!');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError,
  });

  const deleteTable = useMutation({
    mutationFn: dragDropApi.delete,
    onSuccess: () => {
      callSuccessToast('Table is deleted!');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError,
  });

  useEffect(() => {
    data?.forEach((table) => {
      table.insertTask = function (insertIndex, taskToInsert) {
        this.tasks.splice(insertIndex, 0, taskToInsert);
      };
      table.removeTask = function (removeIndex) {
        this.tasks.splice(removeIndex, 1);
      };
    });

    setState(data);
  }, [data]);

  return { setState, state, updateTable, createTable, deleteTable };
};
