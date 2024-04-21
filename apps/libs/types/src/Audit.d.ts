export interface IAddAudit {
  audit: IAudit;
  taskId: string;
}

export interface IAudit {
  userId: string | undefined;
  userName: string | null | undefined;
  userImg: string | undefined;
  params: IAuditParams;
  date: Date;
}

export interface IAuditParams {
  type: string;
  newName: string | null;
}
