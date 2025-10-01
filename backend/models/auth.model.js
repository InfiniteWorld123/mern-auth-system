import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
        },
        password: {
            type: String,
            required: true,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationCode: String,
        verificationCodeExpiresAt: Date,
        resetPasswordToken: String,
        resetPasswordTokenExpiresAt: Date,
    },
    { timestamps: true }
);

export default mongoose.model("User", authSchema);