import { UserResource } from '@clerk/types';
import { UPDATE } from '../constants/DragDrop';

type User = UserResource | null | undefined;
type Title = string | undefined;

interface Params {
  type: string;
  newName?: string;
}

export const createAuditLog = (user: User, title: Title) => {
  const params: Params = {
    type: '',
  };

  if (title) {
    params.type = UPDATE.TITLE;
    params.newName = title;
  } else {
    params.type = UPDATE.DESCRIPTION;
  }

  const audit = {
    userId: user?.id,
    userName: user?.username,
    userImg: user?.imageUrl,
    params,
    date: new Date(),
  };

  return audit;
};
