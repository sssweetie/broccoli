import { describe, expect } from '@jest/globals';
import { createAuditLog } from './createAuditLog';
import { DESCRIPTION, TITLE } from '../features/AuditLogs/constants';

describe('is table exist', () => {
  const user = undefined;
  const user1 = {
    id: 'string',
    username: 'string',
    imageUrl: 'string',
  };
  const title = '123';
  test('create audit log with title, without user', () => {
    const audit = createAuditLog(user, title);

    expect(audit).toEqual({
      params: {
        type: TITLE,
        newName: title,
      },
      date: audit.date,
    });
  });

  test('create audit log without title, without user', () => {
    const audit = createAuditLog(user);

    expect(audit).toEqual({
      params: {
        type: DESCRIPTION,
        newName: null,
      },
      date: audit.date,
    });
  });

  test('create audit log with title, with user', () => {
    const audit = createAuditLog(user1);

    expect(audit).toEqual({
      userId: 'string',
      userName: 'string',
      userImg: 'string',
      params: {
        type: DESCRIPTION,
        newName: null,
      },
      date: audit.date,
    });
  });

  test('create audit log without title, with user', () => {
    const audit = createAuditLog(user1);

    expect(audit).toEqual({
      userId: 'string',
      userName: 'string',
      userImg: 'string',
      params: {
        type: DESCRIPTION,
        newName: null,
      },
      date: audit.date,
    });
  });
});
