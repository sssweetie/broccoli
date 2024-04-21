import { UserResource } from '@clerk/types';
import { UPDATE } from '../constants/AuditLog';
import { IAudit, IAuditParams } from 'apps/libs/types/src';

type User = UserResource | null | undefined;
type Title = string | undefined;

export const createAuditLog = (user: User, title: Title): IAudit => {
  const params: IAuditParams = {
    type: '',
    newName: '',
  };

  params.type = title ? UPDATE.TITLE : UPDATE.DESCRIPTION;
  params.newName = title ?? null;

  const audit = {
    userId: user?.id,
    userName: user?.username,
    userImg: user?.imageUrl,
    params,
    date: new Date(),
  };

  return audit;
};
