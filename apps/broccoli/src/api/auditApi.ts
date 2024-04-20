import { IAddAudit, IAudit } from 'apps/libs/types/src/Audit';
import { AxiosInstance } from 'axios';

export interface IAuditAPI {
  create: (addAudit: IAddAudit) => Promise<void>;
  read: (taskId: string) => Promise<IAudit[]>;
}

export const auditApi = (httpClient: AxiosInstance): IAuditAPI => ({
  create: async ({ taskId, audit }) => {
    await httpClient.post('/dragdrop/audit/create', { taskId, audit });
  },
  read: async (taskId) => {
    const audit = await httpClient.get(`/dragdrop/audit/read/${taskId}`);
    return audit.data;
  },
});
