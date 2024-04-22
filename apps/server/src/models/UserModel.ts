import { User } from 'apps/libs/types/src';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<User>({
  clerkUserId: { type: String, unique: true, require: true },
});

export const UserModel = model<User>('users', userSchema);
