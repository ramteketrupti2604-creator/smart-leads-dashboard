import { Schema, model, Document } from 'mongoose';

export type UserRole = 'Admin' | 'Sales User';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Sales User'], default: 'Sales User' },
  createdAt: { type: Date, default: Date.now }
});

export default model<IUser>('User', userSchema);