import { catchError, catchTransactionError } from "../utils/catchError.js";
import { sendResponse } from "../utils/sendResponse.js"; // This utility is defined below
import { FRONTEND_URL, JWT_SECRET, NODE_ENV } from "../constants/env.js"
import { createResetToken, createVerificationCode } from "../utils/generate.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js"
import bcrypt from "bcrypt"
import { sendResetPasswordEmail, sendVerifyEmail } from "../services/email.service.js";


export const signUp = catchTransactionError(async (req, res, next, session) => {
    const { name, email, password } = req.body;

    const doesUserExist = await User.findOne({ email }, null, { session });
    if (doesUserExist) throw new AppError("Email address is already in use by another account.", 409);

    const hashedPassword = await bcrypt.hash(password, 12);
    const { code, expiresAt } = createVerificationCode(15);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        verificationCode: code,
        verificationCodeExpiresAt: expiresAt
    });

    await newUser.save({ session });

    const userPayload = {
        ...newUser.toObject(),
        password: undefined
    };

    const jwtToken = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "None" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    await sendVerifyEmail({ 
        to: email, 
        subject: "Verify Your Email", 
        verificationCode: code, 
        verificationLink: `${FRONTEND_URL}/verify-email` 
    });

    sendResponse({
        res,
        status: 201,
        success: true,
        message: "Account created successfully. Verification email sent.",
        payload: {
            user: userPayload // payload منظم
        }
    });
});

export const signIn = catchError(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new AppError("Invalid credentials (email or password is wrong)", 401);

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new AppError("Invalid credentials (email or password is wrong)", 401);

    if (!user.isVerified) throw new AppError("Account is not verified. Please check your email for the verification link", 403);

    const userPayload = {
        ...user.toObject(),
        password: undefined
    };

    const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "None" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    sendResponse({
        res,
        status: 200,
        success: true,
        message: "Signed in successfully.",
        payload: {
            user: userPayload
        }
    });
})

export const signOut = catchError(async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "None" : "strict",
        path: "/"
    };
    res.clearCookie("token", cookieOptions);
    sendResponse({
        res,
        status: 204,
        success: true,
        message: "Signed out successfully.",
    });
})

export const verifyEmail = catchTransactionError(async (req, res, next, session) => {
    const { code } = req.body;

    const user = await User.findOne({
        verificationCode: code,
        verificationCodeExpiresAt: { $gt: Date.now() }
    }, null, { session });

    if (!user) throw new AppError("Invalid or expired verification code", 401);

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiresAt = null;

    await user.save({ session });

    await sendWelcomeEmail({ 
        to: email, 
        subject: "Welcome to our auth system", 
        name: user.name, 
        loginLink: `${FRONTEND_URL}/sign-in` 
    });

    sendResponse({
        res,
        success: true,
        status: 200,
        message: "Email is successfully verified",
        payload: {
            user: {
                ...user.toObject(),
                password: undefined
            }
        }
    });
});

export const forgotPassword = catchError(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email });

    if (!user) {
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: "Password reset link sent successfully (if the user exists).",
        });
    }

    const { token, expiresAt } = createResetToken(30);

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiresAt = expiresAt;
    await user.save();

    await sendResetPasswordEmail({ 
        to: email, 
        subject: "Reset Password", 
        resetPasswordLink: `${FRONTEND_URL}/reset-password/${token}` 
    });

    sendResponse({
        res,
        status: 200,
        success: true,
        message: "Password reset link sent successfully (if the user exists).",
    });
});

export const resetPassword = catchTransactionError(async (req, res, next, session) => {
    const { password } = req.body;
    const { token } = req.params;

    const userWithToken = await User.findOne({ resetPasswordToken: token }, null, { session });

    if (!userWithToken) throw new AppError("Invalid reset password token", 401);
    if (userWithToken.resetPasswordExpiresAt <= Date.now()) throw new AppError("Token is expired", 401);

    const hashedPassword = await bcrypt.hash(password, 12);

    userWithToken.password = hashedPassword;
    userWithToken.resetPasswordToken = null;
    userWithToken.resetPasswordExpiresAt = null;

    await userWithToken.save({ session });

    sendResponse({ res, success: true, status: 200, message: "Password is reset successfully" })
})

export const checkAuth = catchError(async (req, res) => {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found or session expired", 404);

    const userPayload = {
        ...user.toObject(),
        password: undefined
    };

    sendResponse({
        res,
        status: 200,
        success: true,
        message: "User is authenticated and session is active.",
        payload: {
            user: userPayload
        }
    });
});