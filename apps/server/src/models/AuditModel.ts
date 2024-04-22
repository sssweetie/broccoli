import { model, Schema } from 'mongoose';
import { Audit } from 'apps/libs/types/src';

const auditSchema = new Schema<Audit>({
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

export const AuditModel = model<Audit>('audits', auditSchema);
