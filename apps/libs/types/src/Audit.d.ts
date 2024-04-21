export interface AddAudit {
  audit: Audit;
  taskId: string;
}

export interface Audit {
  params: AuditParams;
  date: Date;
  userId?: string;
  userName?: string | null;
  userImg?: string;
}

export interface AuditParams {
  type: string;
  newName: string | null;
}
