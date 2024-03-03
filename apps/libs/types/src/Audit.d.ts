export interface AddAudit {
  audit: IAudit;
  taskId: string;
}

export interface IAudit {
  userId: string | undefined;
  userName: string | null | undefined;
  userImg: string | undefined;
  params: AuditParams;
  date: Date;
}

export interface AuditParams {
  type: string;
  newName?: string;
}
