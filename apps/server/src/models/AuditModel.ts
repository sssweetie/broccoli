import { model, Schema } from 'mongoose';
import { IAudit } from 'apps/libs/types/src';

const auditSchema = new Schema<IAudit>({
  params: {
    type: { type: String, required: true },
    newName: { type: String },
  },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  userImg: { type: String, required: true },
  date: {
    type: Date,
    required: true,
  },
});

export const AuditModel = model<IAudit>('audits', auditSchema);
