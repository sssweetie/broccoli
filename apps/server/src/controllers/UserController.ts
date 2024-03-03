import { UserModel } from '../models/UserModel';

export const UserController = {
  create: async (id: string) => {
    const user = await new UserModel({ clerkUserId: id });
    await user.save();
  },

  delete: async (clerkUserId: string) => {
    await UserModel.findOneAndDelete({ clerkUserId });
  },
};
