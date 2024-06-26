import { Slide, ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Slide,
};

export type Action = 'deleted' | 'updated' | 'created';

export const toastActions: Record<Action, Action> = {
  deleted: 'deleted',
  created: 'created',
  updated: 'updated',
};
