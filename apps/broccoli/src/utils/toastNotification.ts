import { toast } from 'react-toastify';
import { toastConfig } from 'apps/broccoli/src/services/toastConfig';

export const callSuccessToast = (toastMessage: string) => {
  toast.info(toastMessage, {
    ...toastConfig,
  });
};

export const callErrorToast = (toastMessage: string) => {
  toast.error(toastMessage, {
    ...toastConfig,
  });
};
