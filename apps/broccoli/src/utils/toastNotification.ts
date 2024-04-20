import { toast } from 'react-toastify';
import { toastConfig } from 'apps/broccoli/src/services/toastConfig';

type Entity = 'Board' | 'Task' | 'Subtask' | 'Order' | 'Table';
export type Action = 'deleted' | 'updated' | 'created';

export const callSuccessToast = (entity: Entity, action: Action) => {
  const message = `${entity} is ${action} successfully!`;

  toast.info(message, {
    ...toastConfig,
  });
};

export const callErrorToast = (toastMessage: string) => {
  toast.error(toastMessage, {
    ...toastConfig,
  });
};
