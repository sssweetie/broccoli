import { AddAudit, Audit } from 'apps/libs/types/src/Audit';
import { httpClient } from '../services/httpClient';

export interface AuditAPI {
  create: (addAudit: AddAudit) => Promise<void>;
  read: (taskId: string) => Promise<Audit[]>;
}

export const auditAPI: AuditAPI = {
  create: async ({ taskId, audit }) => {
    await httpClient.post('/dragdrop/audit/create', { taskId, audit });
  },
  read: async (taskId) => {
    const audit = await httpClient.get(`/dragdrop/audit/read/${taskId}`);
    return audit.data;
  },
};
