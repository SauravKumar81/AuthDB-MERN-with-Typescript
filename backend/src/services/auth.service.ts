import { Session } from "inspector";
import VerificationCodeType from "../constants/verificationCodeType.js";
import UserModel from "../models/user.model.js";
import VerificationCodeModel from "../models/verificationCode.model.js";
import { oneYearFromNow } from "../utils/date.js";
import SessionModel from "../models/session.model.js";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env.js";
type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string | undefined;
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
    email: data.email,
    password: data.password,
  });
  //create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });
  // send verification

  // create session
  const userId = user._id;
  const userAgent = data.password;
  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    {
      audience: ["user"],
      expiresIn: "30d",
    }
  );

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );
  return {
    user,
    accessToken,
    refreshToken,
  };
};
