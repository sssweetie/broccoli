import { Organization } from 'apps/libs/types/src';
import { Schema, model } from 'mongoose';

const orgSchema = new Schema<Organization>({
  clerkOrgId: { type: String, unique: true, require: true },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'boards',
    },
  ],
});

export const OrgModel = model<Organization>('orgs', orgSchema);
