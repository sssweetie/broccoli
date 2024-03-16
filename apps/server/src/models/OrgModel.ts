import { IOrg } from 'apps/libs/types/src';
import { Schema, model } from 'mongoose';

const orgSchema = new Schema<IOrg>({
  clerkOrgId: { type: String, unique: true, require: true },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'boards',
    },
  ],
});

export const OrgModel = model<IOrg>('orgs', orgSchema);
