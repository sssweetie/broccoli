import { IUser } from 'apps/libs/types/src';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>({
  clerkUserId: { type: String, unique: true, require: true },
});

export const UserModel = model<IUser>('users', userSchema);
