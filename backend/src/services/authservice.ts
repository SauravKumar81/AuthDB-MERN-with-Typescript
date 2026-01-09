import VerificationCodeType from "../constants/verificationCodeType.js";
import UserModel from "../models/user.model.js";
import VerificationCodeModel from "../models/verificationCode.model.js";
import { oneYearFromNow } from "../utils/date.js";

type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const createAccount = async (data: CreateAccountParams) => {
    //verify the user that exist or not
  const existingUser = await UserModel.exists({
    email: data.email,
  });
  if (existingUser) {
    throw new Error("user already exists");
  }
  //create the user

  const user = await UserModel.create({
    email:data.email,
    password:data.password,

  })
  //create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId:user._id,
    type:VerificationCodeType.EmailVerification,
    expiresAt:oneYearFromNow()
  })


};
