import { UserResource } from '@clerk/types';
import { Audit, AuditParams } from 'apps/libs/types/src';
import { DESCRIPTION, TITLE } from '../features/AuditLogs/constants';

type User = UserResource | null | undefined;

export const createAuditLog = (user: User, title?: string): Audit => {
  const params: AuditParams = {
    type: TITLE,
    newName: '',
  };

  params.type = title ? TITLE : DESCRIPTION;
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
