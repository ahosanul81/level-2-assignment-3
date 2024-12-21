import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<TUser>("User", userSchema);
