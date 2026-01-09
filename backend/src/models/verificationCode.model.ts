import mongoose from "mongoose";
import VerificationCodeType from "../constants/verificationCodeType.js";

export interface verificationCodeDocument extends mongoose.Document{
    userId:mongoose.Types.ObjectId;
    type:VerificationCodeType;
    expiresAt:Date;
    createdAt:Date;

}

const verificationCodeSchema = new mongoose.Schema<verificationCodeDocument>({
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true },
});
const VerificationCodeModel = mongoose.model<verificationCodeDocument>(
    "VerificationCode",
    verificationCodeSchema,
    "verification_codes"
  );
  export default VerificationCodeModel;