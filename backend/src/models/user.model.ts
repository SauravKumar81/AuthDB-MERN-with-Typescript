import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt.js";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return ; //remove the next() 
  }

  this.password = await hashValue(this.password);
  // remove the next()
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
