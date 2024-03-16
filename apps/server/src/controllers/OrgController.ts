import { OrgModel } from '../models/OrgModel';

export const OrgController = {
  create: async (clerkOrgId: string) => {
    const user = await new OrgModel({ clerkOrgId });
    await user.save();
  },

  delete: async (clerkOrgId: string) => {
    await OrgModel.findOneAndDelete({ clerkOrgId });
  },
};
