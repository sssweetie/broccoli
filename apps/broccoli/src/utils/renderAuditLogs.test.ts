import { describe, expect } from '@jest/globals';
import { getAuditLogText } from './renderAuditLogs';
import { AuditParams } from 'apps/libs/types/src';
describe('generating auditLog message', () => {
  const titleRes = `Username changes title on "123"`;
  const descriptionRes = 'Username updates task description';

  test('generate auditLog on title change', () => {
    const params: AuditParams = { newName: '123', type: 'updateTitle' };
    const audit = getAuditLogText({ params, userName: 'Username' });
    expect(audit).toBe(titleRes);
  });

  test('generate auditLog on description change', () => {
    const params: AuditParams = {
      newName: 'description',
      type: 'updateDescription',
    };
    const audit = getAuditLogText({ params, userName: 'Username' });
    expect(audit).toBe(descriptionRes);
  });
});
