import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { taskApi } from '../api/taskApi';
import { useTaskQueryMutations } from './useTaskQueryMutations';

export const useTask = () => {
  const { createTask } = useTaskQueryMutations(taskApi(httpClient));

  return { createTask };
};
