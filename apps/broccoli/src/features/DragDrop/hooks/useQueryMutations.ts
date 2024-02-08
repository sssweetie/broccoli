import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DragDropApi } from '../api/dragDropApi';
import { ITable } from 'apps/libs/types/src';
import { toast } from 'react-toastify';
import { toastConfig } from 'apps/broccoli/src/services/toastConfig';
export const useQueryMutations = (dragDropApi: DragDropApi) => {
  const { data } = useQuery({
    queryKey: ['board'],
    queryFn: dragDropApi.read,
  });

  const [state, setState] = useState<ITable[] | undefined>(data);

  const queryClient = useQueryClient();

  const onError = () => {
    setState((prevState) => prevState);
    toast.error('Something went wrong! :(', {
      ...toastConfig,
    });
  };

  const onSuccess = (toastMessage: string) => {
    toast.info(toastMessage, {
      ...toastConfig,
    });
  };

  const updateTable = useMutation({
    mutationFn: dragDropApi.update,
    onSuccess: () => onSuccess('Order is updated!'),
    onError,
  });

  const createTable = useMutation({
    mutationFn: dragDropApi.create,
    onSuccess: () => {
      onSuccess('Table is added!');
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

  return { setState, state, updateTable, createTable };
};
